from pydantic import BaseModel


class WaterUpdateRequest(BaseModel):
    user_id: str
    amount: int