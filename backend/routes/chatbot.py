from fastapi import APIRouter
from utils.retriever import retrieve_top_docs, CONFIDENCE_THRESHOLD
from utils.gemini_utils import generate_answer
from models.chatModel import ChatQuery

router = APIRouter()

@router.post("/chat")
async def chat(query: ChatQuery):
    top_docs = retrieve_top_docs(query.query, k=3)

    context = ""
    for doc, confidence in top_docs:
        if confidence >= CONFIDENCE_THRESHOLD:
            context += doc + "\n"

    if context:
        prompt = f"Using the following context, answer the question:\n\n{context}\n\nQuestion: {query.query}"
    else:
        prompt = query.query  # fallback to LLM only

    answer = generate_answer(prompt)
    return {"response": answer}
