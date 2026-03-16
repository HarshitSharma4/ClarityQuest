from pydantic import BaseModel
from typing import List

class ChapterSchema(BaseModel):
    title: str
    timestamp: int

class LessonResponse(BaseModel):
    id: str
    title: str
    description: str
    duration: int
    difficulty: str
    tags: List[str]
    thumbnail: str
    watched: bool = False
    chapters: List[ChapterSchema] = []
