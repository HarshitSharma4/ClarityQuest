from pydantic import BaseModel
from typing import List

class DrillSchema(BaseModel):
    target: str
    focus: str
    difficulty: str

class ScenarioSchema(BaseModel):
    id: str
    title: str
    category: str
    description: str
    questions: List[str]
    tips: List[str]
