from fastapi import APIRouter, HTTPException
from src.services.weight_service import (
    add_weight,
    get_latest_weight,
    get_weight_history,
)
from src.services.weight_goal_service import (
    set_weight_goal,
    get_weight_goal,
)

router = APIRouter(
    prefix="/weight",
    tags=["Weight"],
)

@router.post("/add")
def add_user_weight(data: dict):
    user_id = data.get("user_id")
    weight = data.get("weight")
    if not user_id:
        raise HTTPException(
            status_code=400,
            detail="user_id is required",
        )
    if weight is None:
        raise HTTPException(
            status_code=400,
            detail="weight is required",
        )
    try:
        weight = float(weight)
    except (TypeError, ValueError):
        raise HTTPException(
            status_code=400,
            detail="weight must be a number",
        )
    if weight <= 0:
        raise HTTPException(
            status_code=400,
            detail="weight must be greater than 0",
        )
    if weight > 500:
        raise HTTPException(
            status_code=400,
            detail="Invalid weight value",
        )
    return add_weight(
        user_id,
        weight,
    )


@router.get("/{user_id}")
def latest_weight(user_id: str):
    weight = get_latest_weight(user_id)
    if not weight:
        raise HTTPException(
            status_code=404,
            detail="Weight not found",
        )
    return weight

@router.get("/{user_id}/history")
def weight_history(user_id: str):
    return get_weight_history(user_id)

@router.post("/goal")
def add_weight_goal(data: dict):
    user_id = data.get("user_id")
    target_weight = data.get("target_weight")
    if not user_id:
        raise HTTPException(
            status_code=400,
            detail="user_id is required",
        )
    if target_weight is None:
        raise HTTPException(
            status_code=400,
            detail="target_weight is required",
        )
    try:
        target_weight = float(target_weight)
    except (TypeError, ValueError):
        raise HTTPException(
            status_code=400,
            detail="target_weight must be a number",
        )
    if target_weight <= 0 or target_weight > 500:
        raise HTTPException(
            status_code=400,
            detail="Invalid target weight",
        )
    current_weight = get_latest_weight(user_id)
    if not current_weight:
        raise HTTPException(
            status_code=400,
            detail="Add your current weight before setting a goal",
        )
    return set_weight_goal(
        user_id,
        target_weight,
        current_weight["weight"],
    )

@router.get("/goal/{user_id}")
def weight_goal(user_id: str):
    goal = get_weight_goal(user_id)

    if not goal:
        raise HTTPException(
            status_code=404,
            detail="Weight goal not found",
        )
    return goal