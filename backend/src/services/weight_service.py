from datetime import datetime, UTC
from src.config.database import db

weight_history = db["weight_history"]

def add_weight(
    user_id: str,
    weight: float,
):
    now = datetime.now(UTC)
    weight_history.insert_one(
        {
            "user_id": user_id,
            "weight": weight,
            "recorded_at": now,
        }
    )
    return {
        "user_id": user_id,
        "weight": weight,
        "recorded_at": now,
    }


def get_latest_weight(user_id: str):
    weight = weight_history.find_one(
        {"user_id": user_id},
        {
            "_id": 0,
        },
        sort=[("recorded_at", -1)],
    )
    if not weight:
        return None
    return weight


def get_weight_history(user_id: str):
    history = list(
        weight_history.find(
            {"user_id": user_id},
            {
                "_id": 0,
            },
        ).sort("recorded_at", 1)
    )
    return history