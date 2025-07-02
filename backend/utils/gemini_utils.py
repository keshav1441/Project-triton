import os
from dotenv import load_dotenv
import google.generativeai as genai
from typing import List

# Load .env
load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise EnvironmentError("❌ GEMINI_API_KEY not found in .env")

genai.configure(api_key=api_key)

def embed_texts(texts: List[str]) -> List[List[float]]:
    model = "models/embedding-001"
    return [
        genai.embed_content(model=model, content=text, task_type="retrieval_document")["embedding"]
        for text in texts
    ]

def generate_answer(prompt: str) -> str:
    model = genai.GenerativeModel("gemini-2.5-flash")
    response = model.generate_content(prompt)
    print(response)
    return response.text
