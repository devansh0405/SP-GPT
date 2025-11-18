from youtube_transcript_api import YouTubeTranscriptApi
from urllib.parse import urlparse, parse_qs


ytt_api = YouTubeTranscriptApi()

def get_video_id(url: str) -> str:
    """
    Extract the video ID from a YouTube URL.
    Supports standard, short, and embed links.
    """
    parsed_url = urlparse(url)

    # Case 1: Standard URL, e.g. https://www.youtube.com/watch?v=VIDEO_ID
    if parsed_url.hostname in ("www.youtube.com", "youtube.com"):
        if parsed_url.path == "/watch":
            return parse_qs(parsed_url.query)["v"][0]
        elif parsed_url.path.startswith("/embed/"):
            return parsed_url.path.split("/")[2]
        elif parsed_url.path.startswith("/v/"):
            return parsed_url.path.split("/")[2]

    # Case 2: Short URL, e.g. https://youtu.be/VIDEO_ID
    if parsed_url.hostname == "youtu.be":
        return parsed_url.path[1:]

    raise ValueError("Invalid YouTube URL format")

def get_transcript(url: str) -> str :
    """
    Fetches the transcript of a YouTube video using its ID.
    This transcript is passed to generate a summary and stored as context for the LLM.
    """
    video_id = get_video_id(url)
    transcript = ytt_api.fetch(video_id, languages=['hi', 'en'])

    raw_transcript = transcript.to_raw_data()
    raw_transcript = " ".join(item['text'] for item in raw_transcript)
    return raw_transcript