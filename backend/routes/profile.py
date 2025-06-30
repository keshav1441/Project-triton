from fastapi import APIRouter, Depends, HTTPException
from typing import Optional
from db import users_collection
from models.user import UserModel
from utils.currentUser import get_current_user

router = APIRouter()

@router.get("/profile", response_model=UserModel)
async def read_user_me(current_user: UserModel = Depends(get_current_user)):
    """
    Retrieve the current user's profile information
    """
    current_user_data = await users_collection.find_one({"email": current_user.email})
    return{
        "email": current_user_data.get("email", ""),
        "username": current_user_data.get("username", ""),
        "cognito_sub": current_user_data.get("cognito_sub", ""),
        "avatar_url": current_user_data.get("avatar_url", "")
    }
