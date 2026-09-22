from fastapi import APIRouter, HTTPException
from src.config.database import db
from src.services.meal_generator import (
    generate_meal_plan
)
from src.services.meal_plan_service import (
    save_meal_plan
)
from src.services.subscription_service import (
    can_generate_meal,
    use_meal_trial,
)
from src.services.meal_plan_service import (
    get_today_meal_history,
)
from src.services.meal_plan_service import (
    get_today_nutrition_summary,
)
from src.models.meal import MealCompletionRequest
from src.services.meal_plan_service import complete_meal

router = APIRouter(
    prefix="/meal",
    tags=["Meal"]
)

@router.post("/generate")
def generate(data: dict):
    if not can_generate_meal(data["user_id"]):
        raise HTTPException(
            status_code=403,
            detail="Your free AI plan has been used. Upgrade to Pro to unlock unlimited workout and meal plan generations, advanced insights, and premium features."
        )
    print("MEAL REQUEST:", data)
    goal = data["goal"]
    if goal == "muscle_gain":
        calories = 2800
    elif goal == "fat_loss":
        calories = 2200
    else:
        calories = 2500
    meal_plan = generate_meal_plan(
        goal,
        data["diet_type"],
        calories
    )
    print("MEAL PLAN:", meal_plan)
    save_meal_plan(
        data["user_id"],
        meal_plan
    )
    use_meal_trial(data["user_id"])
    print("MEAL SAVED")
    return meal_plan



@router.get("/{user_id}")
def get_meal(user_id: str):
    meal = db["meal_plans"].find_one(
        {"user_id": user_id},
        {"_id": 0}
    )
    if meal is None:
        raise HTTPException(
            status_code=404,
            detail="Meal plan not found"
        )
    return meal

@router.post("/toggle")
def complete(
    data: MealCompletionRequest,
):
    return complete_meal(
        data.user_id,
        data.meal,
    )

@router.get("/history/{user_id}")
def meal_history(user_id: str):
    return get_today_meal_history(user_id)

@router.get("/summary/{user_id}")
def summary(user_id: str):
    return get_today_nutrition_summary(user_id)