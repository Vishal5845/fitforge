from fastapi import APIRouter, HTTPException
from src.models.auth import (
    RegisterUser,
#    SendOTPRequest,
 #   VerifyOTPRequest,
)
from src.services.subscription_service import create_subscription
# from src.services.email_service import send_otp_email
from src.config.database import db

import bcrypt
import uuid
import random
from datetime import datetime, timedelta, timezone


router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)


# -------------------------
# TEMPORARY REGISTER
# OTP BYPASSED FOR DEPLOYMENT
# -------------------------

@router.post("/register")
def register(user: RegisterUser):
    email = user.email.strip().lower()
    # Check email
    existing_user = db["users_auth"].find_one({
        "email": email
    })

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    # Check phone
    if db["users"].find_one({
        "phone_number": user.phone_number
    }):
        raise HTTPException(
            status_code=400,
            detail="Phone number already exists"
        )

    password_hash = bcrypt.hashpw(
        user.password.encode(),
        bcrypt.gensalt()
    ).decode()

    user_id = str(uuid.uuid4())

    try:
        db["users_auth"].insert_one({
            "user_id": user_id,
            "email": email,
            "phone_number": user.phone_number,
            "password_hash": password_hash,
            "role": user.role,
        })

        db["users"].insert_one({
            "user_id": user_id,
            "name": user.name,
            "email": email,
            "phone_number": user.phone_number,
            "role": user.role,
            "is_onboarding_completed": False,
            "profile_updated": False
        })

        create_subscription(user_id)

    except Exception as e:
        print("REGISTER ERROR:", repr(e))

        raise HTTPException(
            status_code=500,
            detail="Failed to create account"
        )

    return {
        "message": "User registered",
        "user_id": user_id
    }

# -------------------------
# SEND OTP
# -------------------------

# @router.post("/send-otp")
# def send_otp(data: SendOTPRequest):

#     email = data.email.strip().lower()

#     existing_user = db["users_auth"].find_one({
#         "email": email
#     })

#     if existing_user:
#         raise HTTPException(
#             status_code=400,
#             detail="Email already exists"
#         )
#     if db["users"].find_one({
#         "phone_number": data.phone_number
#     }):
#         raise HTTPException(
#             status_code=400,
#             detail="Phone number already exists"
#         )

#     otp = str(random.randint(100000, 999999))

#     expires_at = datetime.now(timezone.utc) + timedelta(minutes=10)

#     db["email_otps"].delete_many({
#         "email": email
#     })

#     db["email_otps"].insert_one({
#         "email": email,
#         "otp": otp,
#         "expires_at": expires_at,
#         "created_at": datetime.now(timezone.utc)
#     })

#     try:
#         send_otp_email(email, otp)
#     except Exception as e:
#         print("RESEND ERROR:", repr(e))

#         db["email_otps"].delete_many({
#             "email": email
#         })

#         raise HTTPException(
#             status_code=500,
#             detail=f"Failed to send verification email: {str(e)}"
#         )

#     return {
#         "message": "Verification code sent"
#     }


# # -------------------------
# # VERIFY OTP + REGISTER
# # -------------------------

# @router.post("/verify-otp")
# def verify_otp(data: VerifyOTPRequest):

#     email = data.email.strip().lower()

#     otp_record = db["email_otps"].find_one({
#         "email": email,
#         "otp": data.otp
#     })

#     if not otp_record:
#         raise HTTPException(
#             status_code=400,
#             detail="Invalid verification code"
#         )

#     expires_at = otp_record["expires_at"]

#     # Handle MongoDB datetime as UTC
#     if expires_at.tzinfo is None:
#         expires_at = expires_at.replace(tzinfo=timezone.utc)

#     if datetime.now(timezone.utc) > expires_at:
#         db["email_otps"].delete_many({
#             "email": email
#         })

#         raise HTTPException(
#             status_code=400,
#             detail="Verification code has expired"
#         )

#     # Check email again before creating account
#     existing_user = db["users_auth"].find_one({
#         "email": email
#     })

#     if existing_user:
#         raise HTTPException(
#             status_code=400,
#             detail="Email already exists"
#         )

#     # Check phone
#     if db["users"].find_one({
#         "phone_number": data.phone_number
#     }):
#         raise HTTPException(
#             status_code=400,
#             detail="Phone number already exists"
#         )

#     password_hash = bcrypt.hashpw(
#         data.password.encode(),
#         bcrypt.gensalt()
#     ).decode()

#     user_id = str(uuid.uuid4())

#     try:

#         db["users_auth"].insert_one({
#             "user_id": user_id,
#             "email": email,
#             "phone_number": data.phone_number,
#             "password_hash": password_hash,
#             "role": data.role,
#         })

#         db["users"].insert_one({
#             "user_id": user_id,
#             "name": data.name,
#             "email": email,
#             "phone_number": data.phone_number,
#             "role": data.role,
#             "is_onboarding_completed": False,
#             "profile_updated": False
#         })

#         create_subscription(user_id)

#         # OTP can no longer be reused
#         db["email_otps"].delete_many({
#             "email": email
#         })

#     except Exception:
#         raise HTTPException(
#             status_code=500,
#             detail="Failed to create account"
#         )

#     return {
#         "message": "Email verified and account created",
#         "user_id": user_id
#     }


# -------------------------
# LOGIN
# -------------------------

@router.post("/login")
def login(data: dict):

    auth_user = db["users_auth"].find_one(
        {"email": data["email"]}
    )

    if not auth_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    valid_password = bcrypt.checkpw(
        data["password"].encode(),
        auth_user["password_hash"].encode()
    )

    if not valid_password:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )
    profile = db["users"].find_one(
        {"user_id": auth_user["user_id"]},
        {"_id": 0}
    ) or {}
    return {
        "user_id": auth_user["user_id"],
        "email": auth_user["email"],
        "name": profile.get("name"),
        "phone_number": profile.get("phone_number"),
        "role": auth_user["role"],
    }
