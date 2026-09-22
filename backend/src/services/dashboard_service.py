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
    current_streak = 0

    if history:
        expected_date = today
        completed_days = {
            workout["completed_at"].date()
            for workout in history
            if workout.get("completed_at")
        }

        # If the user hasn't worked out today,
        # start checking from yesterday.
        if expected_date not in completed_days:
            expected_date -= timedelta(days=1)
        while expected_date in completed_days:
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