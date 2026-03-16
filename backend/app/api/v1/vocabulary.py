from fastapi import APIRouter, HTTPException
from typing import List
from app.schemas.vocabulary import VocabWordResponse
from app.db.mongo import mongo_db
from app.core.logger import api_log

router = APIRouter()

@router.get("", response_model=List[VocabWordResponse])
async def get_vocabulary():
    api_log("Fetching vocabulary")
    db = mongo_db.get_db()
    words = await db.vocabulary.find().to_list(length=100)
    return [
        VocabWordResponse(
            id=str(w.get("_id", w.get("id", ""))),
            word=w["word"],
            meaning=w["meaning"],
            example=w["example"],
            pronunciation=w["pronunciation"],
            difficulty=w["difficulty"],
            mastered=w.get("mastered", False),
        )
        for w in words
    ]

@router.put("/{word_id}/master")
async def toggle_mastered(word_id: str):
    api_log(f"Toggling mastered for word {word_id}")
    db = mongo_db.get_db()
    word = await db.vocabulary.find_one({"id": word_id})
    if not word:
        raise HTTPException(status_code=404, detail="Word not found")
    new_val = not word.get("mastered", False)
    await db.vocabulary.update_one({"id": word_id}, {"$set": {"mastered": new_val}})
    return {"id": word_id, "mastered": new_val}
