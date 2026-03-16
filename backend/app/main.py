from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.logger import api_log
from app.db.mongo import mongo_db
from app.db.neo4j import neo4j_db
from app.db.seed import seed_database

from app.api.v1 import chat, voice, memory
from app.api.v1 import auth, lessons, jobs, results, vocabulary, notifications, progress, practice, mentors

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup logic
    api_log("Starting up AI Backend...")
    await mongo_db.connect()
    await neo4j_db.connect()
    # Seed database with initial data
    db = mongo_db.get_db()
    await seed_database(db)
    api_log("Database seeded successfully")
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
app.include_router(auth.router, prefix=f"{settings.API_V1_STR}/auth", tags=["auth"])
app.include_router(chat.router, prefix=f"{settings.API_V1_STR}/chat", tags=["chat"])
app.include_router(voice.router, prefix=f"{settings.API_V1_STR}/voice", tags=["voice"])
app.include_router(memory.router, prefix=f"{settings.API_V1_STR}/memory", tags=["memory"])
app.include_router(lessons.router, prefix=f"{settings.API_V1_STR}/lessons", tags=["lessons"])
app.include_router(jobs.router, prefix=f"{settings.API_V1_STR}/jobs", tags=["jobs"])
app.include_router(results.router, prefix=f"{settings.API_V1_STR}/results", tags=["results"])
app.include_router(vocabulary.router, prefix=f"{settings.API_V1_STR}/vocabulary", tags=["vocabulary"])
app.include_router(notifications.router, prefix=f"{settings.API_V1_STR}/notifications", tags=["notifications"])
app.include_router(progress.router, prefix=f"{settings.API_V1_STR}/progress", tags=["progress"])
app.include_router(practice.router, prefix=f"{settings.API_V1_STR}/practice", tags=["practice"])
app.include_router(mentors.router, prefix=f"{settings.API_V1_STR}/mentors", tags=["mentors"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
