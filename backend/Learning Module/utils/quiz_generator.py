from summarizer import generate_content

def generate_quiz(transcript: str, num_questions: int = 5) -> dict :
    """
    Generate a quiz based on the provided transcript. 
    Uses Gemini API to generate questions and answers.
    """
    