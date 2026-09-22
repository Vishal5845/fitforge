from fastapi import APIRouter

from src.models.water import WaterUpdateRequest
from src.services.water_service import (
    update_water,
    get_water,
)

router = APIRouter(
    prefix="/water",
    tags=["Water"],
)

@router.post("/update")
def update(
    data: WaterUpdateRequest,
):
    return update_water(
        data.user_id,
        data.amount,
    )

@router.get("/{user_id}")
def water(
    user_id: str,
):
    return get_water(user_id)