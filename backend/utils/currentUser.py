from jose import jwt
import httpx
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import os

COGNITO_REGION = os.getenv("COGNITO_REGION")
COGNITO_USER_POOL_ID = os.getenv("COGNITO_USER_POOL_ID")
COGNITO_APP_CLIENT_ID = os.getenv("COGNITO_CLIENT_ID")

JWKS_URL = f"https://cognito-idp.{COGNITO_REGION}.amazonaws.com/{COGNITO_USER_POOL_ID}/.well-known/jwks.json"
bearer_scheme = HTTPBearer()

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme)):
    token = credentials.credentials

    async with httpx.AsyncClient() as client:
        jwks = (await client.get(JWKS_URL)).json()
    
    unverified_header = jwt.get_unverified_header(token)
    kid = unverified_header["kid"]
    key = next((k for k in jwks["keys"] if k["kid"] == kid), None)

    if not key:
        raise HTTPException(status_code=401, detail="Invalid token")

    try:
        payload = jwt.decode(
            token,
            key,
            algorithms=["RS256"],
            audience=COGNITO_APP_CLIENT_ID,
            issuer=f"https://cognito-idp.{COGNITO_REGION}.amazonaws.com/{COGNITO_USER_POOL_ID}",
        )
    except Exception as e:
        raise HTTPException(status_code=403, detail="Token verification failed")

    return payload
