import chromadb
from chromadb.config import Settings
from gemini_utils import embed_texts
import uuid
import textwrap

client = chromadb.PersistentClient(path="backend/chroma_store")

# Chunk size in characters (can adjust if needed)
CHUNK_SIZE = 2000  

def chunk_text(text: str, chunk_size=CHUNK_SIZE):
    return textwrap.wrap(text, chunk_size)

def ingest_documents(documents: list[str], ids: list[str]):
    collection = client.get_or_create_collection(name="rag_docs")

    chunked_docs = []
    chunked_ids = []

    for doc, base_id in zip(documents, ids):
        chunks = chunk_text(doc)
        for i, chunk in enumerate(chunks):
            chunked_docs.append(chunk)
            chunked_ids.append(f"{base_id}_chunk{i}")

    embeddings = embed_texts(chunked_docs)
    collection.add(documents=chunked_docs, ids=chunked_ids, embeddings=embeddings)

    print(f"✅ Ingested {len(chunked_docs)} chunks from {len(documents)} documents.")