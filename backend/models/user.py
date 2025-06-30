# models/user.py
from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
from datetime import datetime

class UserModel(BaseModel):
    sub: str = Field(..., description="Cognito User ID")
    email: Optional[EmailStr] = None
    username: Optional[str] = None
    groups: List[str] = []
    name: Optional[str] = None
    joined_on: Optional[datetime] = None
    item_scanned: Optional[int] = 0
    events_attended: Optional[int] = 0
    waste_collected: Optional[float] = 0.0


