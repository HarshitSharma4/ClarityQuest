from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.logger import api_log
from app.db.mongo import mongo_db
from app.db.neo4j import neo4j_db

from app.api.v1 import chat, voice, memory

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup logic
    api_log("Starting up AI Backend...")
    await mongo_db.connect()
    await neo4j_db.connect()
    yield
    # Shutdown logic
    api_log("Shutting down AI Backend...")
    await mongo_db.close()
    await neo4j_db.close()

app = FastAPI(
    title=settings.PROJECT_NAME,
    version="0.1.0",
    lifespan=lifespan
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify actual origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "clarity-quest-backend"}

# Include routers
app.include_router(chat.router, prefix=f"{settings.API_V1_STR}/chat", tags=["chat"])
app.include_router(voice.router, prefix=f"{settings.API_V1_STR}/voice", tags=["voice"])
app.include_router(memory.router, prefix=f"{settings.API_V1_STR}/memory", tags=["memory"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
