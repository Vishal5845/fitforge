from src.config.database import db

users_collection = db["users"]

def create_user(user_data):
    user_data["is_onboarding_completed"] = True
    user_data["profile_updated"] = False

    users_collection.update_one(
        {"user_id": user_data["user_id"]},
        {"$set": user_data},
        upsert=True
    )

def update_user(user_id: str, updated_data: dict):
    updated_data["profile_updated"] = True
    result = users_collection.update_one(
        {"user_id": user_id},
        {"$set": updated_data}
    )
    if result.matched_count == 0:
        return None
    return users_collection.find_one(
        {"user_id": user_id},
        {"_id": 0}
    )

