from pydantic import BaseModel

class NotificationResponse(BaseModel):
    id: str
    title: str
    body: str
    type: str
    read: bool = False
    createdAt: str
