from fastapi import APIRouter, Depends
from typing import Optional
from db import users_collection
from models.user import UserModel
from utils.currentUser import get_current_user 


router = APIRouter()

async def get_user_by_id(sub: str) -> Optional[UserModel]:
    user_data = await users_collection.find_one({"sub": sub})
    if user_data:
        return UserModel(**user_data)
    return None

async def create_user_from_cognito(cognito_payload: dict) -> UserModel:
    user_data = {
        "sub": cognito_payload["sub"],
        "email": cognito_payload.get("email"),
        "username": cognito_payload.get("cognito:username"),
        "groups": cognito_payload.get("cognito:groups", []),
    }
    await users_collection.insert_one(user_data)
    print(f"Created new user: {user_data['username']} with sub: {user_data['sub']}")
    return UserModel(**user_data)

@router.post("/api/user", response_model=UserModel)
async def get_user_data(user: dict = Depends(get_current_user)):
    user_id = user["sub"]
    db_user = await get_user_by_id(user_id)

    if not db_user:
        db_user = await create_user_from_cognito(user)

    return db_user