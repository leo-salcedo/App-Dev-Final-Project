import base64
import datetime
import json
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Request 
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, EmailStr
from typing import Optional
import os
import httpx
import jwt

app = FastAPI()

load_dotenv()

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
REDIRECT_URI = os.getenv("REDIRECT_URI")
FRONTEND_LINK = os.getenv("PERSONAL_LINK_FRONT")
MONGO_URI = os.getenv("MONGO_URI")





app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

mongo_client = AsyncIOMotorClient(MONGO_URI)
database = mongo_client["websiteInfo"]
users_collection = database["emails"]
print("✅ Type of users_collection:", type(users_collection))

class UserModel(BaseModel):
    email: EmailStr

@app.get("/login")
def signin():
    google_auth_url = (
        "https://accounts.google.com/o/oauth2/v2/auth?"
        f"response_type=code&client_id={GOOGLE_CLIENT_ID}&"
        f"redirect_uri={REDIRECT_URI}&scope=openid%20email%20profile"
    )
    return RedirectResponse(google_auth_url)


@app.get("/auth/callback")
async def auth_callback(request: Request):
    code = request.query_params.get("code")

    if not code:
        return {"error": "No code provided"}

    # Step 1: Exchange code for access token
    token_url = "https://oauth2.googleapis.com/token"
    token_data = {
        "code": code,
        "client_id": GOOGLE_CLIENT_ID,
        "client_secret": GOOGLE_CLIENT_SECRET,
        "redirect_uri": REDIRECT_URI,
        "grant_type": "authorization_code"
    }

    async with httpx.AsyncClient() as client_http:
        token_response = await client_http.post(token_url, data=token_data)
        token_json = token_response.json()
        access_token = token_json.get("access_token")

        if not access_token:
            return {"error": "Failed to get access token"}

        # Step 2: Use access token to get user info
        userinfo_url = "https://www.googleapis.com/oauth2/v2/userinfo"
        headers = {"Authorization": f"Bearer {access_token}"}
        userinfo_response = await client_http.get(userinfo_url, headers=headers)
        userinfo = userinfo_response.json()

        # Step 3: Extract the email
        email = userinfo.get("email")

        if not email:
            return {"error": "Failed to get user email"}

        # Step 4: Insert into MongoDB
        existing_user = await users_collection.find_one({"email": email})
        if not existing_user:
            await users_collection.insert_one({"email": email})

    # Redirect to frontend (React)
    return RedirectResponse(FRONTEND_LINK + "/#/tree")


