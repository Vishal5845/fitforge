from pydantic import BaseModel

class ExerciseResponse(BaseModel):
    name: str
    muscle_group: str
    difficulty: str
    equipment: str
    instructions: list[str]
    tips: list[str]
    mistakes: list[str]

    animation_url: str | None = None