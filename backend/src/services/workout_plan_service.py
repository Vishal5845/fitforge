from src.config.database import db
from datetime import datetime, UTC

workout_plans = db["workout_plans"]

def save_workout_plan(user_id, workout):
    workout_plan = {
        "user_id": user_id,
        "program_name": workout["program_name"],
        "summary": workout["summary"],
        "estimated_duration": workout["estimated_duration"],
        "rest_between_sets": workout["rest_between_sets"],
        "days": workout["days"],
        "updated_at": datetime.now(UTC)
    }

    workout_plans.update_one(
        {"user_id": user_id},
        {"$set": workout_plan},
        upsert=True
    )