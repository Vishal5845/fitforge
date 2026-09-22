from datetime import datetime
from src.config.database import db


def save_workout_history(
    user_id: str,
    workout_name: str,
    day_name: str,
    total_exercises: int,
    estimated_duration: int,
):
    db["workout_history"].insert_one({
        "user_id": user_id,
        "workout_name": workout_name,
        "day_name": day_name,
        "total_exercises": total_exercises,
        "estimated_duration": estimated_duration,
        "completed_at": datetime.utcnow(),
    })


def get_workout_history(user_id: str):
    history = list(
        db["workout_history"]
        .find({"user_id": user_id}, {"_id": 0})
        .sort("completed_at", -1)
    )

    return history