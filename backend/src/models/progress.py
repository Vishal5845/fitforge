from pydantic import BaseModel


class WeeklyActivityItem(BaseModel):
    day: str
    completed: bool


class ProgressResponse(BaseModel):
    current_streak: int
    total_workouts: int
    total_minutes: int
    total_exercises: int
    weekly_activity: list[WeeklyActivityItem]