from flask import Flask, request, jsonify, session, render_template
from werkzeug.utils import secure_filename
from flask_cors import CORS
import json
import uuid
from typing import Optional
import io
from PIL import Image
from utils.quiz_generator import generate_quiz
from utils.get_captions import get_transcript

app = Flask(__name__)
CORS(app)
app.secret_key = "your-secret-key-here"  # Change this to a secure key

# Store active quizzes in memory (use Redis/DB for production)
active_quizzes = {}

def read_image(image_file):
    """Read and prepare image for Gemini API"""
    image_bytes = image_file.read()
    image = Image.open(io.BytesIO(image_bytes))
    return image

def create_quiz_prompt(transcript: Optional[str], query: str, has_image: bool) -> str:
    """Create a comprehensive prompt for quiz generation"""
    prompt_parts = []
    
    if transcript:
        prompt_parts.append(f"Based on the following YouTube transcript:\n{transcript}\n")
    
    if has_image:
        prompt_parts.append("Also consider the provided image in the context.\n")
    
    prompt_parts.append(f"User request: {query}\n")
    prompt_parts.append(
        "Generate a quiz with 5-10 questions based on the provided content. "
        "Make sure questions are clear, have 4 options each, and include explanations."
    )
    
    return "\n".join(prompt_parts)

@app.route("/")
def home():
    """Home page with quiz interface"""
    return render_template("index.html")

@app.route("/quiz", methods=["GET", "POST"])
def quiz():
    """
    POST: Generate or submit answer for a quiz
    GET: Retrieve current quiz state
    
    POST multipart/form-data for quiz generation:
        - action: "generate" (required)
        - yt_url: string (optional)
        - query: string (required)
        - image: file (optional)
    
    POST JSON for answer submission:
        - action: "submit_answer" (required)
        - quiz_id: string (required)
        - question_id: string (required)
        - selected_option_id: string (required)
    
    GET query parameters:
        - quiz_id: string (required)
        - question_index: int (optional, default: 0)
    """
    
    if request.method == "POST":
        # Check if it's form data (quiz generation) or JSON (answer submission)
        if request.content_type and 'multipart/form-data' in request.content_type:
            return handle_quiz_generation()
        else:
            return handle_answer_submission()
    
    elif request.method == "GET":
        return handle_quiz_retrieval()

def handle_quiz_generation():
    """Handle POST request for generating a new quiz"""
    try:
        yt_url = request.form.get("yt_url", "")
        query = request.form.get("query", "")
        image_file = request.files.get("image", None)
        
        if not query:
            return jsonify({"error": "Query is required"}), 400
        
        # Build the prompt based on available inputs
        transcript = None
        if yt_url:
            try:
                transcript = get_transcript(yt_url)
            except Exception as e:
                return jsonify({"error": f"Failed to get YouTube transcript: {str(e)}"}), 400
        
        # Create prompt
        prompt = [create_quiz_prompt(transcript, query, bool(image_file))]
        
        # Generate quiz using Gemini
        # Note: The current generate_quiz function doesn't support images
        # You may need to modify it to handle image input
        if image_file :
            img_part = read_image(image_file)
            final_prompt = prompt.append(img_part)
            prompt = final_prompt

        response = generate_quiz(prompt)
        
        # Parse the response
        quiz_data = json.loads(response.text)
        
        # Generate unique quiz_id if not present
        if "quiz_id" not in quiz_data or not quiz_data["quiz_id"]:
            quiz_data["quiz_id"] = str(uuid.uuid4())
        
        # Store quiz in memory with user progress tracking
        active_quizzes[quiz_data["quiz_id"]] = {
            "quiz": quiz_data,
            "current_question_index": 0,
            "answers": {},  # {question_id: selected_option_id}
            "score": 0,
            "completed": False
        }
        
        # Return first question
        first_question = quiz_data["questions"][0]
        
        return jsonify({
            "quiz_id": quiz_data["quiz_id"],
            "title": quiz_data["title"],
            "description": quiz_data.get("description", ""),
            "total_questions": len(quiz_data["questions"]),
            "current_question_index": 0,
            "question": {
                "question_id": first_question["question_id"],
                "question_text": first_question["question_text"],
                "options": first_question["options"],
                "difficulty": first_question.get("difficulty", "medium")
            }
        }), 200
        
    except Exception as e:
        return jsonify({"error": f"Quiz generation failed: {str(e)}"}), 500

def handle_answer_submission():
    """Handle POST request for submitting an answer"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({"error": "JSON data required"}), 400
        
        quiz_id = data.get("quiz_id")
        question_id = data.get("question_id")
        selected_option_id = data.get("selected_option_id")
        
        if not all([quiz_id, question_id, selected_option_id]):
            return jsonify({
                "error": "quiz_id, question_id, and selected_option_id are required"
            }), 400
        
        # Retrieve quiz state
        if quiz_id not in active_quizzes:
            return jsonify({"error": "Quiz not found"}), 404
        
        quiz_state = active_quizzes[quiz_id]
        quiz_data = quiz_state["quiz"]
        
        # Find the question
        current_question = None
        for q in quiz_data["questions"]:
            if q["question_id"] == question_id:
                current_question = q
                break
        
        if not current_question:
            return jsonify({"error": "Question not found"}), 404
        
        # Check if answer is correct
        is_correct = selected_option_id in current_question["correct_answers"]
        
        # Store answer
        quiz_state["answers"][question_id] = selected_option_id
        
        if is_correct:
            quiz_state["score"] += 1
        
        # Move to next question
        quiz_state["current_question_index"] += 1
        next_index = quiz_state["current_question_index"]
        
        # Check if quiz is completed
        if next_index >= len(quiz_data["questions"]):
            quiz_state["completed"] = True
            
            return jsonify({
                "quiz_id": quiz_id,
                "is_correct": is_correct,
                "correct_answers": current_question["correct_answers"],
                "explanation": current_question.get("explanation", ""),
                "completed": True,
                "final_score": quiz_state["score"],
                "total_questions": len(quiz_data["questions"]),
                "percentage": round((quiz_state["score"] / len(quiz_data["questions"])) * 100, 2)
            }), 200
        
        # Return next question
        next_question = quiz_data["questions"][next_index]
        
        return jsonify({
            "quiz_id": quiz_id,
            "is_correct": is_correct,
            "correct_answers": current_question["correct_answers"],
            "explanation": current_question.get("explanation", ""),
            "completed": False,
            "current_score": quiz_state["score"],
            "current_question_index": next_index,
            "total_questions": len(quiz_data["questions"]),
            "next_question": {
                "question_id": next_question["question_id"],
                "question_text": next_question["question_text"],
                "options": next_question["options"],
                "difficulty": next_question.get("difficulty", "medium")
            }
        }), 200
        
    except Exception as e:
        return jsonify({"error": f"Answer submission failed: {str(e)}"}), 500

def handle_quiz_retrieval():
    """Handle GET request to retrieve quiz state"""
    try:
        quiz_id = request.args.get("quiz_id")
        
        if not quiz_id:
            return jsonify({"error": "quiz_id is required"}), 400
        
        if quiz_id not in active_quizzes:
            return jsonify({"error": "Quiz not found"}), 404
        
        quiz_state = active_quizzes[quiz_id]
        quiz_data = quiz_state["quiz"]
        
        # If quiz is completed, return summary
        if quiz_state["completed"]:
            return jsonify({
                "quiz_id": quiz_id,
                "completed": True,
                "final_score": quiz_state["score"],
                "total_questions": len(quiz_data["questions"]),
                "percentage": round((quiz_state["score"] / len(quiz_data["questions"])) * 100, 2),
                "answers": quiz_state["answers"]
            }), 200
        
        # Return current question
        current_index = quiz_state["current_question_index"]
        current_question = quiz_data["questions"][current_index]
        
        return jsonify({
            "quiz_id": quiz_id,
            "title": quiz_data["title"],
            "description": quiz_data.get("description", ""),
            "completed": False,
            "current_score": quiz_state["score"],
            "current_question_index": current_index,
            "total_questions": len(quiz_data["questions"]),
            "question": {
                "question_id": current_question["question_id"],
                "question_text": current_question["question_text"],
                "options": current_question["options"],
                "difficulty": current_question.get("difficulty", "medium")
            }
        }), 200
        
    except Exception as e:
        return jsonify({"error": f"Quiz retrieval failed: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
