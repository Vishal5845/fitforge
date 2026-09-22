from fastapi import APIRouter

from src.models.dashboard_stats import DashboardStatsResponse
from src.services.dashboard_service import get_dashboard_stats

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"],
)


@router.get(
    "/stats/{user_id}",
    response_model=DashboardStatsResponse,
)
def dashboard_stats(user_id: str):
    return get_dashboard_stats(user_id)