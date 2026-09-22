from src.config.database import db
from fastapi import HTTPException

subscriptions = db["subscriptions"]

def create_subscription(user_id: str):
    subscriptions.insert_one({
        "user_id": user_id,
        "plan": "trial",
        "status": "active",
        "workout_trial_used": False,
        "meal_trial_used": False,
        "stripe_customer_id": None,
        "stripe_subscription_id": None,
    })

def get_subscription(user_id: str):
    subscription = subscriptions.find_one(
        {"user_id": user_id},
        {"_id": 0}
    )
    if subscription is None:
        raise HTTPException(
            status_code=404,
            detail="Subscription not found"
        )
    return subscription

def upgrade_to_pro(
    user_id: str,
    plan: str,
    customer_id: str,
    subscription_id: str,
):
    subscriptions.update_one(
        {"user_id": user_id},
        {
            "$set": {
                "plan": plan,
                "status": "active",
                "trial_used": True,
                "stripe_customer_id": customer_id,
                "stripe_subscription_id": subscription_id,
            }
        },
    )

def can_generate_workout(user_id: str):
    subscription = subscriptions.find_one(
        {"user_id": user_id}
    )
    if not subscription:
        return False
    if subscription["plan"] != "trial":
        return True
    return not subscription.get("workout_trial_used", False)

def use_workout_trial(user_id: str):
    subscriptions.update_one(
        {"user_id": user_id},
        {
            "$set": {
                "workout_trial_used": True
            }
        }
    )

def can_generate_meal(user_id: str):
    subscription = subscriptions.find_one({"user_id": user_id})
    if not subscription:
        return False
    if subscription["plan"] != "trial":
        return True
    return not subscription.get("meal_trial_used", False)

def use_meal_trial(user_id: str):
    subscriptions.update_one(
        {"user_id": user_id},
        {
            "$set": {
                "meal_trial_used": True
            }
        }
    )