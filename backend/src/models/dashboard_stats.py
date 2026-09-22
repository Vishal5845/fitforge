from pydantic import BaseModel


class DashboardStatsResponse(BaseModel):
    total_workouts: int
    total_minutes: int
    total_exercises: int
    current_streak: int
    today_workout_completed: bool
    today_exercises: int
    today_minutes: int