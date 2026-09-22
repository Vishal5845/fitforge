from fastapi import APIRouter
from src.models.user import UserProfile
from src.models.user import UserUpdate
from src.services.user_service import create_user
from src.config.database import db
from src.services.user_service import update_user
from fastapi import HTTPException

router = APIRouter(prefix="/users", tags=["Users"])

@router.post("/")
def create_user_profile(user: UserProfile):
    create_user(user.model_dump())
    return {"message": "User created"}


@router.get("/email/{email}")
def get_user_by_email(email: str):
    user = db["users"].find_one(
        {"email": email},
        {"_id": 0}
    )
    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )
    return user

@router.get("/user-id/{user_id}")
def get_user_by_user_id(user_id: str):
    user = db["users"].find_one(
        {"user_id": user_id},
        {"_id": 0}
    )
    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )
    return user

@router.put("/{user_id}")
def update_user_profile(user_id: str, user: UserUpdate):
    updated_user = update_user(
        user_id,
        user.model_dump()
    )
    if not updated_user:
        return {
            "success": False,
            "message": "User not found"
        }
    return {
        "success": True,
        "user": updated_user
    }