# backend/utils/retriever.py

import chromadb
from utils.gemini_utils import embed_texts

# ✅ NEW CLIENT SYNTAX (ChromaDB 0.5+)
client = chromadb.PersistentClient(path="./chroma_store")

CONFIDENCE_THRESHOLD = 0.6

def cosine_similarity(vec1, vec2):
    from numpy import dot
    from numpy.linalg import norm
    return dot(vec1, vec2) / (norm(vec1) * norm(vec2))

def retrieve_top_docs(query: str, k=3):
    collection = client.get_or_create_collection(name="rag_docs")

    query_embedding = embed_texts([query])[0]

    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=k,
        include=["documents", "distances"]
    )

    docs = results["documents"][0]
    distances = results["distances"][0]

    scored = [(doc, 1 - dist) for doc, dist in zip(docs, distances)]
    return scored
