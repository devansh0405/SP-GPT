from dotenv import load_dotenv
load_dotenv() #load env variables for API_KEYS
import os
from google import genai
from google.genai import types
from .get_captions import get_transcript

client = genai.Client(api_key = os.getenv("GEMINI_API_KEY"))

def generate_content(prompt: str) -> str :
    response = client.models.generate_content(
        model='gemini-2.0-flash-lite', contents=prompt
    )
    return response

def summarize_transcript(url: str) -> str :
    """
    Summarizes the raw transcript using Gemini API.
    Break the raw_transcript into chunks summarize each chunk, then combine
    """
    raw_transcript = get_transcript(url)

    chunk_size = 2000
    chunks = [raw_transcript[i: i+chunk_size] for i in range(0, len(raw_transcript), chunk_size)]

    summaries = []
    for chunk in chunks :
        prompt = f"Summarize the following text while keeping it as detailed as possible: {chunk}"
        response = generate_content(prompt)
        summaries.append(response.text)

    summary = "\n".join(summaries)
    return generate_content(f"Combine the following summaries into a coherent yet deatailed and concise summary: {summary}").text

def answer_query(transcript: str, query: str) -> str :
    """
    Answer a query based on provided youtube link and query.
    if link not found -> answer based on general knowledge.
    """
    if transcript == "" :
        prompt = f"Follow the provided instructions: {query}"
        return generate_content(prompt=prompt).text
    
    prompt = f"Based on the following transcript: {transcript},\n answer the Query: {query}"
    return generate_content(prompt=prompt).text


def save_to_md(file_path: str, content: str) -> None :
    '''
    Save the response content to a markdown file.
    '''
    with open(file_path, 'w', encoding='utf-8') as file :
        file.write(content)
    print("File saved to: ", file_path)
   

if __name__ == "__main__" :
    yt_url = input("Enter Youtube URL: ")
    print("-----------RAW TRANSCRIPT---------------\n", get_transcript(yt_url))
    print("-----------Summarized Transcript--------\n", summarize_transcript(yt_url))
