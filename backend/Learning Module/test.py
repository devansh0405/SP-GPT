from flask import Flask, render_template, request, jsonify
from utils.get_captions import get_video_id
from utils.summarizer import summarize_transcript, answer_query

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_video_id', methods=['POST'])
def get_video_id_route():
    data = request.get_json()
    youtube_url = data.get('youtube_url')
    if not youtube_url:
        return jsonify({'error': 'YouTube URL is required'}), 400

    try:
        video_id = get_video_id(youtube_url)
        return jsonify({'video_id': video_id})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/summarize', methods=['POST'])
def summarize_route():
    data = request.get_json()
    print("[DEBUG] Route hit")
    youtube_url = data.get('youtube_url', '').strip()
    query = data.get('query', '').strip()

    if not query:
        return jsonify({'error': 'Query is required'}), 400

    try:
        # Case 1: YouTube URL is provided
        if youtube_url:
            # Get transcript from the YouTube video (your existing logic)
            transcript = summarize_transcript(youtube_url)
            print("[DEBUG] Transcript obtained")
            response = answer_query(transcript, query)
        else:
            # Case 2: No YouTube URL — answer from general knowledge
            response = answer_query("", query)

        return jsonify({'response': response})

    except Exception as e:
        return jsonify({'error': str(e)}), 500



if __name__ == '__main__':
    app.run(debug=True)