from dotenv import load_dotenv
from fastapi import FastAPI, Request 
import os
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

load_dotenv()

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
REDIRECT_URI = os.getenv("REDIRECT_URI")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or your React port
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
    return RedirectResponse("https://redesigned-bassoon-j77q7ww9v5j2j76x-5173.app.github.dev/#/Landing")


