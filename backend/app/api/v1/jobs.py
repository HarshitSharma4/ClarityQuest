from fastapi import APIRouter, HTTPException
from typing import List
from app.schemas.job import JobResponse, JobCreateRequest
from app.db.mongo import mongo_db
from app.core.logger import api_log
from datetime import datetime

router = APIRouter()

@router.get("", response_model=List[JobResponse])
async def get_jobs():
    api_log("Fetching all jobs")
    db = mongo_db.get_db()
    jobs = await db.jobs.find().sort("createdAt", -1).to_list(length=50)
    return [
        JobResponse(
            id=str(j.get("_id", j.get("id", ""))),
            title=j["title"],
            type=j["type"],
            status=j["status"],
            createdAt=j["createdAt"],
            completedAt=j.get("completedAt"),
            estimatedTime=j.get("estimatedTime"),
            queuePosition=j.get("queuePosition"),
            stages=j.get("stages", []),
            tags=j.get("tags", []),
        )
        for j in jobs
    ]

@router.get("/{job_id}", response_model=JobResponse)
async def get_job(job_id: str):
    api_log(f"Fetching job {job_id}")
    db = mongo_db.get_db()
    j = await db.jobs.find_one({"id": job_id})
    if not j:
        raise HTTPException(status_code=404, detail="Job not found")
    return JobResponse(
        id=str(j.get("_id", j.get("id", ""))),
        title=j["title"],
        type=j["type"],
        status=j["status"],
        createdAt=j["createdAt"],
        completedAt=j.get("completedAt"),
        estimatedTime=j.get("estimatedTime"),
        queuePosition=j.get("queuePosition"),
        stages=j.get("stages", []),
        tags=j.get("tags", []),
    )

@router.post("", response_model=JobResponse)
async def create_job(data: JobCreateRequest):
    api_log(f"Creating job: {data.title}")
    db = mongo_db.get_db()
    now = datetime.utcnow().isoformat()
    job_doc = {
        "id": f"j{int(datetime.utcnow().timestamp())}",
        "title": data.title,
        "type": data.type,
        "status": "queued",
        "createdAt": now,
        "tags": data.tags,
        "stages": [
            {"name": "Uploaded", "status": "success", "timestamp": now},
            {"name": "Transcribing", "status": "pending"},
            {"name": "Alignment", "status": "pending"},
            {"name": "Scoring", "status": "pending"},
            {"name": "Report ready", "status": "pending"},
        ],
    }
    await db.jobs.insert_one(job_doc)
    return JobResponse(**{k: v for k, v in job_doc.items() if k != "_id"})
