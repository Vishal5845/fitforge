from datetime import datetime, timedelta

from src.config.database import db
from src.services.dashboard_service import get_dashboard_stats


def get_progress(user_id: str):
    stats = get_dashboard_stats(user_id)

    history = list(
        db["workout_history"]
        .find(
            {"user_id": user_id},
            {"_id": 0, "completed_at": 1}
        )
    )

    completed_dates = {
        workout["completed_at"].date()
        for workout in history
        if workout.get("completed_at")
    }

    today = datetime.utcnow().date()

    # Monday of the current week
    week_start = today - timedelta(days=today.weekday())
    day_names = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    weekly_activity = [
        {
            "day": day_names[i],
            "completed": (week_start + timedelta(days=i)) in completed_dates,
        }
        for i in range(7)
    ]
    return {
        **stats,
        "weekly_activity": weekly_activity,
    }