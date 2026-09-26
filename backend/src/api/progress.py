from datetime import datetime

from fastapi import APIRouter

from src.config.database import db
from src.models.progress import ProgressResponse
from src.services.progress_service import get_progress

router = APIRouter(
    prefix="/progress",
    tags=["Progress"],
)


@router.get("/{user_id}/monthly")
def monthly_progress(user_id: str):
    now = datetime.utcnow()

    month_start = datetime(
        now.year,
        now.month,
        1,
    )

    if now.month == 12:
        next_month_start = datetime(
            now.year + 1,
            1,
            1,
        )
    else:
        next_month_start = datetime(
            now.year,
            now.month + 1,
            1,
        )

    history = list(
        db["workout_history"].find(
            {
                "user_id": user_id,
                "completed_at": {
                    "$gte": month_start,
                    "$lt": next_month_start,
                },
            },
            {
                "_id": 0,
                "completed_at": 1,
            },
        )
    )

    days_in_month = (
        next_month_start - month_start
    ).days

    week_counts = {}

    for workout in history:
        completed_at = workout.get("completed_at")

        if not completed_at:
            continue

        day_of_month = completed_at.day

        week_number = (
            (day_of_month - 1) // 7
        ) + 1

        week_counts[week_number] = (
            week_counts.get(week_number, 0) + 1
        )

    number_of_weeks = (
        days_in_month + 6
    ) // 7

    return [
        {
            "week": f"W{i}",
            "workouts": week_counts.get(i, 0),
        }
        for i in range(1, number_of_weeks + 1)
    ]


@router.get(
    "/{user_id}",
    response_model=ProgressResponse,
)
def progress(user_id: str):
    return get_progress(user_id)
