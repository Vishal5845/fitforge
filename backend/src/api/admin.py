from fastapi import APIRouter
from src.config.database import db
from fastapi import HTTPException

router = APIRouter(
    prefix="/admin",
    tags=["Admin"]
)

@router.get("/users")
def get_users():
    users = list(
        db["users"].find(
            {},
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

@router.delete("/users/{user_id}")
def delete_user(user_id: str):
    user = db["users"].find_one({"user_id": user_id})
    if not user:
        return {
            "success": False,
            "message": "User not found"
        }
    db["users"].delete_one({"user_id": user_id})
    db["users_auth"].delete_one({"user_id": user_id})
    db["subscriptions"].delete_one({"user_id": user_id})
    db["workout_plans"].delete_one({"user_id": user_id})
    db["meal_plans"].delete_one({"user_id": user_id})
    return {
        "success": True,
        "message": "User deleted successfully"
    }

@router.get("/users/{user_id}")
def get_user_details(user_id: str):
    # print("USER ID:", user_id)
    user = db["users"].find_one(
        {"user_id": user_id},
        {"_id": 0}
    )
    # print("USER =", user)
    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )
    subscription = db["subscriptions"].find_one(
        {"user_id": user_id},
        {"_id": 0}
    )
    # print("SUBSCRIPTION =", subscription)
    return {
        "success": True,
        "user": user,
        "subscription": subscription
    }