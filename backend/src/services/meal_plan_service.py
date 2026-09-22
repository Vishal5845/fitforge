from src.config.database import db
from datetime import datetime, UTC

meal_plans = db["meal_plans"]
meal_history = db["meal_history"]

# consumed_protein = 0
# consumed_carbs = 0
# consumed_fat = 0

def save_meal_plan(user_id,meal_plan):
    meal_plans.update_one(
        {"user_id": user_id},
        {
            "$set": {
                "user_id": user_id,
                **meal_plan,
                "updated_at": datetime.now(UTC),
            }
        },
        upsert=True
    )

def get_meal_plan(user_id):
    return meal_plans.find_one(
        {"user_id": user_id},
        {"_id": 0}
    )

def complete_meal(
    user_id: str,
    meal: str,
):
    today = datetime.now(UTC).strftime("%Y-%m-%d")
    history = meal_history.find_one(
        {
            "user_id": user_id,
            "date": today,
        }
    )
    current = False
    if history:
        current = history.get(meal, False)
    meal_history.update_one(
        {
            "user_id": user_id,
            "date": today,
        },
        {
            "$set": {
                meal: not current,
            }
        },
        upsert=True,
    )
    updated = meal_history.find_one(
        {
            "user_id": user_id,
            "date": today,
        },
        {"_id": 0},
    )
    return updated

def get_today_meal_history(user_id: str):
    today = datetime.now(UTC).strftime("%Y-%m-%d")
    history = meal_history.find_one(
        {
            "user_id": user_id,
            "date": today,
        },
        {"_id": 0},
    )
    if history is None:
        return {
            "breakfast": False,
            "lunch": False,
            "dinner": False,
            "snacks": False,
        }
    return {
        "breakfast": history.get("breakfast", False),
        "lunch": history.get("lunch", False),
        "dinner": history.get("dinner", False),
        "snacks": history.get("snacks", False),
    }

def get_today_nutrition_summary(user_id: str):
    today = datetime.now(UTC).strftime("%Y-%m-%d")

    history = meal_history.find_one(
        {
            "user_id": user_id,
            "date": today,
        }
    )
    meal_plan = meal_plans.find_one(
        {
            "user_id": user_id,
        },
        {"_id": 0},
    )
    if not meal_plan:
        return None
    consumed_calories = 0
    consumed_protein = 0
    consumed_carbs = 0
    consumed_fat = 0
    meals = [
        "breakfast",
        "lunch",
        "dinner",
        "snacks",
    ]
    for meal in meals:
        if history and history.get(meal):
            meal_data = meal_plan[meal]
            consumed_calories += meal_data["calories"]
            consumed_protein += meal_data["protein"]
            consumed_carbs += meal_data["carbs"]
            consumed_fat += meal_data["fat"]

    return {
        "target_calories": meal_plan["daily_calories"],
        "consumed_calories": consumed_calories,
        
        "target_protein": meal_plan["macronutrients"]["protein"],
        "consumed_protein": consumed_protein,

        "target_carbs": meal_plan["macronutrients"]["carbs"],
        "consumed_carbs": consumed_carbs,

        "target_fat": meal_plan["macronutrients"]["fat"],
        "consumed_fat": consumed_fat,
    }