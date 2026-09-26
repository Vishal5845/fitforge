from datetime import datetime, timedelta

from src.config.database import db

def get_dashboard_stats(user_id: str):
    history = list(
        db["workout_history"]
        .find(
            {"user_id": user_id},
            {"_id": 0}
        )
        .sort("completed_at", -1)
    )
    total_workouts = len(history)
    total_minutes = sum(
        item.get("estimated_duration", 0)
        for item in history
    )
    total_exercises = sum(
        item.get("total_exercises", 0)
        for item in history
    )
    # Today's workout
    today = datetime.utcnow().date()
    today_workouts = [
        workout
        for workout in history
        if workout.get("completed_at")
        and workout["completed_at"].date() == today
    ]
    today_workout_completed = len(today_workouts) > 0
    today_exercises = sum(
        item.get("total_exercises", 0)
        for item in today_workouts
    )
    today_minutes = sum(
        item.get("estimated_duration", 0)
        for item in today_workouts
    )
    # Calculate current streak
        # Calculate login streak
    current_streak = 0

    login_history = list(
        db["login_activity"]
        .find(
            {"user_id": user_id},
            {"_id": 0, "activity_date": 1}
        )
        .sort("activity_date", -1)
    )

    login_dates = {
        datetime.strptime(
            item["activity_date"],
            "%Y-%m-%d"
        ).date()
        for item in login_history
        if item.get("activity_date")
    }

    if login_dates:
        expected_date = today

        # If the user hasn't logged in today,
        # continue the streak from yesterday.
        if expected_date not in login_dates:
            expected_date -= timedelta(days=1)

        while expected_date in login_dates:
            current_streak += 1
            expected_date -= timedelta(days=1)

    return {
        "total_workouts": total_workouts,
        "total_minutes": total_minutes,
        "total_exercises": total_exercises,
        "current_streak": current_streak,

        "today_workout_completed": today_workout_completed,
        "today_exercises": today_exercises,
        "today_minutes": today_minutes,
    }