from pydantic import BaseModel
from typing import List, Optional

class ProgressDataPoint(BaseModel):
    date: str
    overall: int
    pronunciation: int
    grammar: int
    fluency: int

class BadgeSchema(BaseModel):
    id: str
    title: str
    icon: str
    earned: bool
    date: Optional[str] = None

class ProgressResponse(BaseModel):
    progress: List[ProgressDataPoint]
    badges: List[BadgeSchema]
