# models/user.py
from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional

class UserModel(BaseModel):
    sub: str = Field(..., description="Cognito User ID (sub)")
    email: Optional[EmailStr] = None
    username: Optional[str] = None
    groups: List[str] = []

    class Config:
        schema_extra = {
            "example": {
                "sub": "d3e85d65-4e04-4f5a-854c-5a5fe58f12b6",
                "email": "user@example.com",
                "username": "johndoe",
                "groups": ["admin"]
            }
        }
