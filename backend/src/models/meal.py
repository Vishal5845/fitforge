from pydantic import BaseModel


class MealCompletionRequest(BaseModel):
    user_id: str
    meal: str