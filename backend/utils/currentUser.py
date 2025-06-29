from jose import jwt
import httpx
from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from bson import ObjectId
import os
from dotenv import load_dotenv
from db import users_collection
from datetime import datetime

load_dotenv()

# Load env
COGNITO_REGION = os.getenv("COGNITO_REGION")
COGNITO_USER_POOL_ID = os.getenv("COGNITO_USER_POOL_ID")
COGNITO_APP_CLIENT_ID = os.getenv("COGNITO_CLIENT_ID")
MONGO_URI = os.getenv("MONGO_URI")

JWKS_URL = f"https://cognito-idp.{COGNITO_REGION}.amazonaws.com/{COGNITO_USER_POOL_ID}/.well-known/jwks.json"
bearer_scheme = HTTPBearer()

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme)):
    token = credentials.credentials

    try:
        # Get JWKS
        async with httpx.AsyncClient() as client:
            jwks_response = await client.get(JWKS_URL)
            jwks = jwks_response.json()

        unverified_header = jwt.get_unverified_header(token)
        kid = unverified_header.get("kid")
        if not kid:
            raise HTTPException(status_code=401, detail="Invalid token header")

        key = next((k for k in jwks["keys"] if k["kid"] == kid), None)
        if not key:
            raise HTTPException(status_code=401, detail="Public key not found")

        public_key = {
            "kty": key["kty"],
            "kid": key["kid"],
            "use": key["use"],
            "n": key["n"],
            "e": key["e"],
            "alg": key["alg"]
        }

        payload = jwt.decode(
            token,
            public_key,
            algorithms=["RS256"],
            audience=COGNITO_APP_CLIENT_ID,
            issuer=f"https://cognito-idp.{COGNITO_REGION}.amazonaws.com/{COGNITO_USER_POOL_ID}",
        )
        
        username = payload.get("cognito:username")
        email = payload.get("email")
        sub = payload.get("sub")
        
        print(f"Extracted username: {username}, email: {email}, sub: {sub}")
        
        if not username:
            raise HTTPException(status_code=401, detail="Username not found in token")

        # Async database operations
        user = await users_collection.find_one({"username": username})
        
        if not user and email:
            user = await users_collection.find_one({"email": email})
            
        if not user and sub:
            user = await users_collection.find_one({"cognito_sub": sub})
        
        if not user:
            # Auto-create user
            new_user = {
                "username": username,
                "email": email,
                "cognito_sub": sub,
                "created_at": datetime.utcnow()
            }
            result = await users_collection.insert_one(new_user)
            new_user["_id"] = str(result.inserted_id)
            return new_user

        # Convert ObjectId to string
        if "_id" in user and isinstance(user["_id"], ObjectId):
            user["_id"] = str(user["_id"])

        return user

    except Exception as e:
        print(f"Token verification error: {e}")
        raise HTTPException(status_code=403, detail=f"Token verification failed: {e}")