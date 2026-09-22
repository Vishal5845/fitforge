from fastapi import APIRouter
from src.config.database import db

router = APIRouter(
    prefix="/coach",
    tags=["Coach"]
)

@router.get("/members")
def get_members():
    users = list(
        db["users"].find(
            {"role": "user"},
            {"_id": 0}
        )
    )
    for user in users:
        subscription = db["subscriptions"].find_one(
            {"user_id": user["user_id"]},
            {"_id": 0}
        )
        if subscription:
            user["plan"] = subscription.get("plan", "trial")
            user["subscription_status"] = subscription.get("status", "active")
        else:
            user["plan"] = "trial"
            user["subscription_status"] = "inactive"
    return users

@router.get("/members/{user_id}")
def get_member(user_id: str):
    user = db["users"].find_one(
        {"user_id": user_id},
        {"_id": 0}
    )
    if not user:
        return {
            "success": False,
            "message": "Member not found"
        }
    subscription = db["subscriptions"].find_one(
        {"user_id": user_id},
        {"_id": 0}
    )
    return {
        "success": True,
        "user": user,
        "subscription": subscription
    }

@router.get("/members/{user_id}/workout")
def get_member_workout(user_id: str):
    workout = db["workout_plans"].find_one(
        {"user_id": user_id},
        {"_id": 0}
    )
    return workout

@router.get("/members/{user_id}/meal")
def get_member_meal(user_id: str):
    meal = db["meal_plans"].find_one(
        {"user_id": user_id},
        {"_id": 0}
    )
    return meal