from pydantic import BaseModel
from typing import List, Optional

class JobStageSchema(BaseModel):
    name: str
    status: str
    timestamp: Optional[str] = None

class JobResponse(BaseModel):
    id: str
    title: str
    type: str
    status: str
    createdAt: str
    completedAt: Optional[str] = None
    estimatedTime: Optional[int] = None
    queuePosition: Optional[int] = None
    stages: List[JobStageSchema] = []
    tags: List[str] = []

class JobCreateRequest(BaseModel):
    title: str
    type: str = "recording"
    tags: List[str] = []
