# models/user.py
from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional

class UserModel(BaseModel):
    sub: str = Field(..., description="Cognito User ID (sub)")
    email: Optional[EmailStr] = None
    username: Optional[str] = None
    groups: List[str] = []

