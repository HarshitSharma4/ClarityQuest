from fastapi import APIRouter
from typing import List
from app.schemas.mentor import MentorResponse, VoiceResponse as MentorVoiceResponse, TopicResponse
from app.db.mongo import mongo_db
from app.core.logger import api_log

router = APIRouter()

@router.get("", response_model=List[MentorResponse])
async def get_mentors():
    api_log("Fetching mentors")
    db = mongo_db.get_db()
    mentors = await db.mentors.find().to_list(length=20)
    return [
        MentorResponse(
            id=str(m.get("_id", m.get("id", ""))),
            name=m["name"],
            role=m["role"],
            description=m["description"],
            avatar=m.get("avatar", ""),
            personality=m.get("personality", ""),
            expertise=m.get("expertise", []),
        )
        for m in mentors
    ]

@router.get("/voices", response_model=List[MentorVoiceResponse])
async def get_voices():
    api_log("Fetching voice options")
    db = mongo_db.get_db()
    voices = await db.voices.find().to_list(length=20)
    return [
        MentorVoiceResponse(
            id=str(v.get("_id", v.get("id", ""))),
            name=v["name"],
            type=v["type"],
        )
        for v in voices
    ]

@router.get("/topics", response_model=List[TopicResponse])
async def get_topics():
    api_log("Fetching conversation topics")
    db = mongo_db.get_db()
    topics = await db.topics.find().to_list(length=20)
    return [
        TopicResponse(
            id=str(t.get("_id", t.get("id", ""))),
            name=t["name"],
            description=t["description"],
        )
        for t in topics
    ]
