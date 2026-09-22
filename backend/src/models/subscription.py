from pydantic import BaseModel
from typing import Optional

class Subscription(BaseModel):
    user_id: str
    plan: str = "trial"
    status: str = "active"
    trial_used: bool = False
    stripe_customer_id: Optional[str] = None
    stripe_subscription_id: Optional[str] = None