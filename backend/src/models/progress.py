from pydantic import BaseModel


class ProgressResponse(BaseModel):
    current_streak: int
    total_workouts: int
    total_minutes: int
    total_exercises: int