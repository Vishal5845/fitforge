from src.config.database import db

weight_goals = db["weight_goals"]

def set_weight_goal(
    user_id: str,
    target_weight: float,
    current_weight: float,
):
    existing_goal = weight_goals.find_one(
        {"user_id": user_id}
    )
    if existing_goal:
        weight_goals.update_one(
            {"user_id": user_id},
            {
                "$set": {
                    "target_weight": target_weight,
                }
            },
        )
    else:
        weight_goals.insert_one(
            {
                "user_id": user_id,
                "starting_weight": current_weight,
                "target_weight": target_weight,
            }
        )
    goal = weight_goals.find_one(
        {"user_id": user_id},
        {"_id": 0},
    )
    return goal

def get_weight_goal(user_id: str):
    goal = weight_goals.find_one(
        {"user_id": user_id},
        {"_id": 0},
    )
    return goal