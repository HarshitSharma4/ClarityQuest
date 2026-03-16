from fastapi import APIRouter
from typing import List
from app.schemas.lesson import LessonResponse
from app.db.mongo import mongo_db
from app.core.logger import api_log

router = APIRouter()

@router.get("", response_model=List[LessonResponse])
async def get_lessons():
    api_log("Fetching all lessons")
    db = mongo_db.get_db()
    lessons = await db.lessons.find().to_list(length=100)
    return [
        LessonResponse(
            id=str(l.get("_id", l.get("id", ""))),
            title=l["title"],
            description=l["description"],
            duration=l["duration"],
            difficulty=l["difficulty"],
            tags=l.get("tags", []),
            thumbnail=l.get("thumbnail", ""),
            watched=l.get("watched", False),
            chapters=l.get("chapters", []),
        )
        for l in lessons
    ]

@router.get("/{lesson_id}", response_model=LessonResponse)
async def get_lesson(lesson_id: str):
    api_log(f"Fetching lesson {lesson_id}")
    db = mongo_db.get_db()
    l = await db.lessons.find_one({"id": lesson_id})
    if not l:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Lesson not found")
    return LessonResponse(
        id=str(l.get("_id", l.get("id", ""))),
        title=l["title"],
        description=l["description"],
        duration=l["duration"],
        difficulty=l["difficulty"],
        tags=l.get("tags", []),
        thumbnail=l.get("thumbnail", ""),
        watched=l.get("watched", False),
        chapters=l.get("chapters", []),
    )
