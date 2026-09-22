from fastapi import APIRouter, HTTPException
from src.services.workout_generator import generate_workout
from src.services.workout_plan_service import save_workout_plan
from src.config.database import db
from src.services.subscription_service import (
    can_generate_workout,
    use_workout_trial,
)
from src.services.workout_history_service import (
    save_workout_history,
    get_workout_history,
)
from src.models.workout_completion import WorkoutCompletionRequest

router = APIRouter(
    prefix="/workout",
    tags=["Workout"]
)

@router.post("/generate")
def generate(data: dict):
    if not can_generate_workout(data["user_id"]):
        raise HTTPException(
            status_code=403,
            detail="Your free AI plan has been used. Upgrade to Pro to unlock unlimited workout and meal plan generations, advanced insights, and premium features."
        )
    workout = generate_workout(
        data["goal"],
        data["experience"],
        data["workout_days"],
        data["workout_location"],
        data["body_type"],
    )
    save_workout_plan(
        data["user_id"],
        workout,
    )
    use_workout_trial(data["user_id"])
    return workout

@router.get("/{user_id}")
def get_workout(user_id: str):
    workout = db["workout_plans"].find_one(
        {"user_id": user_id},
        {"_id": 0}
    )
    if workout is None:
        raise HTTPException(
            status_code=404,
            detail="Workout not found"
        )
    return workout

@router.post("/complete")
def complete_workout(data: WorkoutCompletionRequest):
    save_workout_history(
        user_id=data.user_id,
        workout_name=data.workout_name,
        day_name=data.day_name,
        total_exercises=data.total_exercises,
        estimated_duration=data.estimated_duration,
    )

    return {
        "success": True,
        "message": "Workout completed successfully."
    }

@router.get("/history/{user_id}")
def workout_history(user_id: str):
    return get_workout_history(user_id)