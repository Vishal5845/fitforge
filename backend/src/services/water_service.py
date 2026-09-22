from datetime import datetime, UTC
from src.config.database import db

water_collection = db["water_history"]

def update_water(
    user_id: str,
    amount: int,
):
    today = datetime.now(UTC).strftime("%Y-%m-%d")
    existing = water_collection.find_one(
        {
            "user_id": user_id,
            "date": today,
        }
    )
    current = 0
    if existing:
        current = existing.get("water_ml", 0)
    current += amount
    if current < 0:
        current = 0
    water_collection.update_one(
        {
            "user_id": user_id,
            "date": today,
        },
        {
            "$set": {
                "water_ml": current,
            }
        },
        upsert=True,
    )
    return {
        "current_ml": current,
        "target_ml": 3000,
    }


def get_water(user_id: str,):
    today = datetime.now(UTC).strftime("%Y-%m-%d")
    data = water_collection.find_one(
        {
            "user_id": user_id,
            "date": today,
        },
        {"_id": 0},
    )
    if not data:
        return {
            "current_ml": 0,
            "target_ml": 3000,
        }
    return {
        "current_ml": data.get("water_ml", 0),
        "target_ml": 3000,
    }