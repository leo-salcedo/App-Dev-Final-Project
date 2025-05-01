from dotenv import load_dotenv
from fastapi import FastAPI, Form, Request, HTTPException
from pydantic import BaseModel
import os
from fastapi.responses import JSONResponse, RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import httpx
import datetime

app = FastAPI()

load_dotenv()

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
REDIRECT_URI = os.getenv("REDIRECT_URI")
FRONTEND_LINK = os.getenv("PERSONAL_LINK_FRONT")

MONGO_URL = "mongodb+srv://asamaga:TESTING1234@appdev.dihekdl.mongodb.net/?retryWrites=true&w=majority&appName=AppDev"  # Replace with your Atlas connection string
client = AsyncIOMotorClient(MONGO_URL)
db = client["websiteInfo"]           
users_collection = db["emails"]
homework_status_collection = db["homework_status"]  # New collection for homework status

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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

    # Step 2: Exchange code for access_token
    token_url = "https://oauth2.googleapis.com/token"

    async with httpx.AsyncClient() as client:
        token_response = await client.post(token_url, data={
            "code": code,
            "client_id": GOOGLE_CLIENT_ID,
            "client_secret": GOOGLE_CLIENT_SECRET,
            "redirect_uri": REDIRECT_URI,
            "grant_type": "authorization_code"
        })

        token_response_data = token_response.json()
        access_token = token_response_data["access_token"]

        # Step 3: Fetch user info from Google
        userinfo_url = "https://www.googleapis.com/oauth2/v1/userinfo?alt=json"
        userinfo_response = await client.get(
            userinfo_url,
            headers={"Authorization": f"Bearer {access_token}"}
        )

        google_user_info = userinfo_response.json()

    # google_user_info now contains {"name": ..., "email": ..., "picture": ..., etc.}

    # (Optional) Insert into MongoDB
    existing_user = await users_collection.find_one({"email": google_user_info["email"]})
    if not existing_user:
        await users_collection.insert_one({
            "name": google_user_info["name"],
            "email": google_user_info["email"]
        })


    user_name = google_user_info["name"]
    user_email = google_user_info["email"]

    redirect_url = (
        f"{FRONTEND_LINK}/#/Homework?"
        f"name={user_name}&"
        f"email={user_email}"
    )

    return RedirectResponse(redirect_url, status_code=303)
    

class HomeworkStatus(BaseModel):
    email: str
    homeworkId: str
    status: str

@app.post("/api/homework/status")
async def update_homework_status(status: HomeworkStatus):
    try:
        # Check if user exists
        user = await users_collection.find_one({"email": status.email})
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        # Update or create homework status
        await homework_status_collection.update_one(
            {
                "email": status.email,
                "homeworkId": status.homeworkId
            },
            {
                "$set": {
                    "status": status.status,
                    "lastUpdated": datetime.datetime.utcnow()
                }
            },
            upsert=True
        )

        return {"message": "Status updated successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


