from pydantic import BaseModel

class VocabWordResponse(BaseModel):
    id: str
    word: str
    meaning: str
    example: str
    pronunciation: str
    difficulty: str
    mastered: bool = False
