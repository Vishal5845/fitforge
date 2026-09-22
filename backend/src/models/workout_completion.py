from pydantic import BaseModel

class WorkoutCompletionRequest(BaseModel):
    user_id: str
    workout_name: str
    day_name: str
    total_exercises: int
    estimated_duration: int