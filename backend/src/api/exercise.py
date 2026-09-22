from fastapi import APIRouter, HTTPException

from src.models.exercise import ExerciseResponse
from src.services.exercise_service import get_exercise

router = APIRouter(
    prefix="/exercise",
    tags=["Exercise"],
)

@router.get(
    "/{exercise_name}",
    response_model=ExerciseResponse,
)
def exercise(exercise_name: str):
    data = get_exercise(exercise_name)

    if not data:
        raise HTTPException(
            status_code=404,
            detail="Exercise not found",
        )

    return data