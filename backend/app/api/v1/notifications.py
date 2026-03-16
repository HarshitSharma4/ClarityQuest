from fastapi import APIRouter, HTTPException
from typing import List
from app.schemas.notification import NotificationResponse
from app.db.mongo import mongo_db
from app.core.logger import api_log

router = APIRouter()

@router.get("", response_model=List[NotificationResponse])
async def get_notifications():
    api_log("Fetching notifications")
    db = mongo_db.get_db()
    notifs = await db.notifications.find().sort("createdAt", -1).to_list(length=50)
    return [
        NotificationResponse(
            id=str(n.get("_id", n.get("id", ""))),
            title=n["title"],
            body=n["body"],
            type=n["type"],
            read=n.get("read", False),
            createdAt=n["createdAt"],
        )
        for n in notifs
    ]

@router.put("/{notif_id}/read")
async def mark_read(notif_id: str):
    api_log(f"Marking notification {notif_id} as read")
    db = mongo_db.get_db()
    result = await db.notifications.update_one({"id": notif_id}, {"$set": {"read": True}})
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Notification not found")
    return {"id": notif_id, "read": True}
