from fastapi import APIRouter
from app.schemas.progress import ProgressResponse
from app.db.mongo import mongo_db
from app.core.logger import api_log

router = APIRouter()

@router.get("", response_model=ProgressResponse)
async def get_progress():
    api_log("Fetching progress data")
    db = mongo_db.get_db()
    progress = await db.progress.find().sort("date", 1).to_list(length=100)
    badges = await db.badges.find().to_list(length=50)
    return ProgressResponse(
        progress=[
            {
                "date": p["date"],
                "overall": p["overall"],
                "pronunciation": p["pronunciation"],
                "grammar": p["grammar"],
                "fluency": p["fluency"],
            }
            for p in progress
        ],
        badges=[
            {
                "id": str(b.get("_id", b.get("id", ""))),
                "title": b["title"],
                "icon": b["icon"],
                "earned": b["earned"],
                "date": b.get("date"),
            }
            for b in badges
        ],
    )
