from pydantic import BaseModel


class RegisterUser(BaseModel):
    name: str
    email: str
    password: str
    phone_number: str
    role: str = "user"

class SendOTPRequest(BaseModel):
    email: str
    phone_number: str

class VerifyOTPRequest(BaseModel):
    email: str
    otp: str
    name: str
    password: str
    phone_number: str
    role: str = "user"