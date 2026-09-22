from fastapi import APIRouter

from src.models.progress import ProgressResponse
from src.services.progress_service import get_progress

router = APIRouter(
    prefix="/progress",
    tags=["Progress"],
)


@router.get(
    "/{user_id}",
    response_model=ProgressResponse,
)
def progress(user_id: str):
    return get_progress(user_id)