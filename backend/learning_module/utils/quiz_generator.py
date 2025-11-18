from google import genai
from google.genai import types
from typing import List, Optional, Literal
from pydantic import BaseModel, Field
from dotenv import load_dotenv
import os


load_dotenv()
api_key=os.getenv("GEMINI_API_KEY")

client = genai.Client(api_key=api_key)

def generate_quiz(prompt) :
    class QuizMetadata(BaseModel):
        difficulty: Literal["easy", "medium", "hard", "mixed"] = "mixed"
        topic: Optional[str] = None
        subtopics: List[str] = []
        source_context_ids: List[str] = []
        estimated_time_minutes: Optional[int] = None


    class QuizOption(BaseModel):
        option_id: str
        text: str


    class QuizQuestion(BaseModel):
        question_id: str
        type: Literal["multiple_choice"] = "multiple_choice"
        difficulty: Literal["easy", "medium", "hard"] = "medium"
        question_text: str
        options: List[QuizOption]
        correct_answers: List[str] = Field(
            default_factory=list,
            description="List of option IDs"
        )
        explanation: Optional[str] = None
        context_reference_ids: List[str] = []


    class Quiz(BaseModel):
        quiz_id: str
        title: str
        description: Optional[str] = None
        metadata: QuizMetadata
        questions: List[QuizQuestion]
    
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
        config={
            "response_mime_type": "application/json",
            "response_json_schema": Quiz.model_json_schema(),
        },
    )
    
    return response