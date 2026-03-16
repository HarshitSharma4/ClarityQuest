from fastapi import APIRouter, HTTPException
from app.schemas.result import AnalysisResultResponse
from app.db.mongo import mongo_db
from app.core.logger import api_log

router = APIRouter()

@router.get("/{job_id}", response_model=AnalysisResultResponse)
async def get_result(job_id: str):
    api_log(f"Fetching result for job {job_id}")
    db = mongo_db.get_db()
    r = await db.results.find_one({"jobId": job_id})
    if not r:
        raise HTTPException(status_code=404, detail="Result not found")
    return AnalysisResultResponse(
        id=str(r.get("_id", r.get("id", ""))),
        jobId=r["jobId"],
        overallScore=r["overallScore"],
        subscores=r["subscores"],
        coachNote=r["coachNote"],
        transcript=r["transcript"],
        correctedTranscript=r["correctedTranscript"],
        pronunciationIssues=r["pronunciationIssues"],
        fluencyMetrics=r["fluencyMetrics"],
        grammarErrors=r["grammarErrors"],
        toneAnalysis=r["toneAnalysis"],
        actionPlan=r["actionPlan"],
    )
