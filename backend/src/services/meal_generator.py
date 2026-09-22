from src.ai.gemini_client import FoodAIClient

def generate_meal_plan(goal,diet_type,calories):
    client = FoodAIClient()
    return client.get_daily_meal_plan(
        diet_type,
        calories,
        goal
    )