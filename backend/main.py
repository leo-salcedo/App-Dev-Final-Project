from dotenv import load_dotenv
from fastapi import FastAPI, Form, Request
import os
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient

app = FastAPI()

load_dotenv()

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
REDIRECT_URI = os.getenv("REDIRECT_URI")
FRONTEND_LINK = os.getenv("PERSONAL_LINK_FRONT")


MONGO_URL = "mongodb+srv://asamaga:TESTING1234@appdev.dihekdl.mongodb.net/?retryWrites=true&w=majority&appName=AppDev"  # Replace with your Atlas connection string
client = AsyncIOMotorClient(MONGO_URL, tls=True, tlsAllowInvalidCertificates=True)
db = client["websiteInfo"]           
users_collection = db["emails"]

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

    # (You can still keep the token exchange + user fetching here)

    # Redirect to frontend (React)
    return RedirectResponse(FRONTEND_LINK + "/#/Homework")

@app.post("/regLogin")
async def regularLogin(fname: str = Form(...), lname: str = Form(...)):


    new_user = {
        "fname": fname,
        "lname": lname
    }
    await users_collection.insert_one(new_user)
    return RedirectResponse(FRONTEND_LINK + "/#/Homework", status_code=303)

