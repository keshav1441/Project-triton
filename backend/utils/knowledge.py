# backend/utils/upload_knowledge.py

import os
import uuid
import fitz  # PyMuPDF
from ingestion import ingest_documents

KNOWLEDGE_DIR = "../knowledge"

def extract_text_from_pdf(path):
    try:
        doc = fitz.open(path)
        text = "\n".join([page.get_text() for page in doc])
        doc.close()
        return text.strip()
    except Exception as e:
        print(f"❌ Failed to read {path}: {e}")
        return ""

def load_documents(folder_path):
    documents = []
    ids = []

    for filename in os.listdir(folder_path):
        full_path = os.path.join(folder_path, filename)
        ext = filename.lower().split('.')[-1]

        if os.path.isfile(full_path):
            content = ""

            if ext == "txt":
                with open(full_path, "r", encoding="utf-8") as f:
                    content = f.read().strip()

            elif ext == "pdf":
                content = extract_text_from_pdf(full_path)

            if content:
                documents.append(content)
                ids.append(str(uuid.uuid4()))

    return documents, ids

if __name__ == "__main__":
    docs, ids = load_documents(KNOWLEDGE_DIR)

    if docs:
        print(f"📄 Found {len(docs)} documents. Uploading to ChromaDB...")
        ingest_documents(docs, ids)
    else:
        print("⚠️ No supported documents found in the knowledge folder.")
