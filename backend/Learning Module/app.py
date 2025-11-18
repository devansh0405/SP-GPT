from flask import Flask, request, jsonify, render_template
from flask_cors import CORS 
from google import genai
from google.genai import types
from PIL import Image
import io
import os
from dotenv import load_dotenv
from utils.get_captions import get_transcript  # rename to avoid recursion

load_dotenv()

# --- Helper functions ---
def read_image(file_storage):
    img_bytes = file_storage.read()
    img = Image.open(io.BytesIO(img_bytes))
    return img
    # buf = io.BytesIO()
    # img.save(buf, format="PNG")
    # buf.seek(0)

    # # Gemini expects a Part, not bytes
    # return types.Part.from_bytes(data=buf.getvalue(), mime_type="image/png")


# --- Flask setup ---
app = Flask(__name__)
CORS(app)   # <--- ENABLE CORS FOR ALL ROUTES
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
chat = client.chats.create(model="gemini-2.0-flash")


# ✅ HOME PAGE ROUTE
@app.route("/", methods=["GET"])
def home():
    return render_template("index.html")


@app.route("/chatbot", methods=["POST"])
def gemini_wrapper():
    """
    multipart/form-data:
        yt_url: string
        query: string
        image: file (optional)
    """

    yt_url = request.form.get("yt_url", "")
    query = request.form.get("query", "")
    image_file = request.files.get("image", None)

    if not query:
        return jsonify({"error": "Query is required"}), 400

    # --- CASE 1: YouTube only ---
    if yt_url and not image_file:
        transcript = get_transcript(yt_url)
        prompt = f"YOUTUBE_TRANSCRIPT: {transcript}\nQuery: {query}"
        response = chat.send_message(prompt)
        print(response)
        return jsonify({"response": response.text})

    # --- CASE 2: YouTube + Image ---
    if yt_url and image_file:
        transcript = get_transcript(yt_url)
        img_part = read_image(image_file)
        print(type(img_part))
        prompt = transcript + query
        response = chat.send_message([prompt, img_part])
        print(response)
        return jsonify({"response": response.text})

    # --- CASE 3: Image only ---
    if not yt_url and image_file:
        img_part = read_image(image_file)
        print(type(img_part))
        response = chat.send_message([query, img_part])
        print(response)
        return jsonify({"response": response.text})

    # --- CASE 4: Text only ---
    if not yt_url and not image_file:
        response = chat.send_message([query])
        print(response)
        return jsonify({"response": response.text})

    return jsonify({"error": "Unexpected condition"}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)