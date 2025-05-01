import json
from dotenv import load_dotenv
from fastapi import FastAPI, Form, Request
import os
from fastapi.responses import JSONResponse, RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import httpx
import urllib

app = FastAPI()

load_dotenv()

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
REDIRECT_URI = os.getenv("REDIRECT_URI")
FRONTEND_LINK = os.getenv("PERSONAL_LINK_FRONT")


MONGO_URL = "mongodb+srv://asamaga:TESTING1234@appdev.dihekdl.mongodb.net/?retryWrites=true&w=majority&appName=AppDev"  
client = AsyncIOMotorClient(MONGO_URL)
db = client["websiteInfo"]           
users_collection = db["emails"]

print("🔵 FRONTEND_LINK =", FRONTEND_LINK)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_LINK] if FRONTEND_LINK else [],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
print("🟢 CORS setup complete with origins:", app.user_middleware)

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

        userinfo_url = "https://www.googleapis.com/oauth2/v1/userinfo?alt=json"
        userinfo_response = await client.get(
            userinfo_url,
            headers={"Authorization": f"Bearer {access_token}"}
        )

        google_user_info = userinfo_response.json()

    user_name = google_user_info["name"]
    user_email = google_user_info["email"]

    default_labels = [
        '1A', '1B', '1C',
        '2A', '2B',
        '3A', '3B',
        '4A', '4B',
        '5A', '6A',
        '7A', '7B', '7C'
    ]

    progress_data = {f"status-{label}": "not-started" for label in default_labels}
    progress_data["name"] = user_name
    progress_data["email"] = user_email

    existing_user = await users_collection.find_one({"email": user_email})
    
    if existing_user:
        for field in ["year", "proficient", "pronoun"]:
            if field in existing_user:
                progress_data[field] = existing_user[field]

    # Check for existing user
    existing_user = await users_collection.find_one({"email": user_email})

    if existing_user:
        saved_progress = {k: v for k, v in existing_user.items() if k.startswith("status-")}
        progress_data.update(saved_progress)
    else:
        await users_collection.insert_one(progress_data)

    progress_data.pop("_id", None)

    encoded_progress = urllib.parse.quote(json.dumps(progress_data))

    redirect_url = (
        f"{FRONTEND_LINK}/#/Homework?"
        f"name={urllib.parse.quote(user_name)}&"
        f"email={urllib.parse.quote(user_email)}&"
        f"progress={encoded_progress}"
    )

    return RedirectResponse(redirect_url, status_code=303)


@app.post("/submit-progress")
async def submit_progress(request: Request):
    data = await request.json()
    print("Received progress data:", data)

    email = data.get("email")
    if not email:
        return JSONResponse(status_code=400, content={"message": "Missing email"})

    await users_collection.update_one(
        {"email": email},         
        {"$set": data},          
        upsert=True            
    )

    return JSONResponse(content={"message": "Progress saved!"})

