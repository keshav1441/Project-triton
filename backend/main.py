from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import auth
from routes import auth, scheduler, profile, connect, chatbot

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, tags=["auth"])
app.include_router(scheduler.router, prefix="/api", tags=["scheduler"])
app.include_router(profile.router, prefix="/api", tags=["profile"])
app.include_router(connect.router, prefix="/api", tags=["connect"])
app.include_router(chatbot.router, prefix="/api", tags=["chatbot"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
