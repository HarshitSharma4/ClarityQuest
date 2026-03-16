from fastapi import APIRouter
from typing import List
from app.schemas.practice import DrillSchema, ScenarioSchema
from app.db.mongo import mongo_db
from app.core.logger import api_log

router = APIRouter()

@router.get("/prompts", response_model=List[str])
async def get_prompts():
    api_log("Fetching practice prompts")
    db = mongo_db.get_db()
    doc = await db.practice_config.find_one({"type": "prompts"})
    if doc:
        return doc.get("items", [])
    return []

@router.get("/drills", response_model=List[DrillSchema])
async def get_drills():
    api_log("Fetching pronunciation drills")
    db = mongo_db.get_db()
    drills = await db.drills.find().to_list(length=50)
    return [
        DrillSchema(target=d["target"], focus=d["focus"], difficulty=d["difficulty"])
        for d in drills
    ]

@router.get("/scenarios", response_model=List[ScenarioSchema])
async def get_scenarios():
    api_log("Fetching roleplay scenarios")
    db = mongo_db.get_db()
    scenarios = await db.scenarios.find().to_list(length=50)
    return [
        ScenarioSchema(
            id=str(s.get("_id", s.get("id", ""))),
            title=s["title"],
            category=s["category"],
            description=s["description"],
            questions=s.get("questions", []),
            tips=s.get("tips", []),
        )
        for s in scenarios
    ]
