from fastapi import APIRouter
from src.services.subscription_service import get_subscription

router = APIRouter(
    prefix="/subscriptions",
    tags=["Subscriptions"],
)

@router.get("/{user_id}")
def subscription(user_id: str):
    return get_subscription(user_id)