from pydantic import BaseModel
from typing import Optional

class UserProfile(BaseModel):
    user_id: str
    name: str
    age: int
    gender: str
    height: float
    weight: float
    goal: str
    experience: str
    workout_days: int
    workout_location: str
    body_type: str
    diet_type: str
    nutrition_focus: str
    subscription_plan: Optional[str] = "one_time"
    role: Optional[str] = "user"

class UserUpdate(BaseModel):
    goal: str
    experience: str
    workout_days: int
    workout_location: str
    body_type: str
    diet_type: str
    nutrition_focus: str
    weight: float