import os
import resend
from dotenv import load_dotenv

load_dotenv()

resend.api_key = os.getenv("RESEND_API_KEY")
EMAIL_FROM = os.getenv("EMAIL_FROM")


def send_otp_email(email: str, otp: str):
    if not resend.api_key:
        raise RuntimeError("RESEND_API_KEY is not configured")

    if not EMAIL_FROM:
        raise RuntimeError("EMAIL_FROM is not configured")

    response = resend.Emails.send({
        "from": EMAIL_FROM,
        "to":email,
        "subject": "Your FitForge Verification Code",
        "html": f"""
        <div style="
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: auto;
            padding: 40px;
            color: #0f172a;
        ">
            <h1 style="color: #2563eb;">FitForge</h1>
            <h2>Verify your email</h2>
            <p>
                Thanks for creating your FitForge account.
                Use the verification code below to continue:
            </p>
            <div style="
                margin: 30px 0;
                padding: 20px;
                background: #eff6ff;
                border-radius: 12px;
                text-align: center;
            ">
                <span style="
                    font-size: 36px;
                    font-weight: bold;
                    letter-spacing: 8px;
                    color: #2563eb;
                ">
                    {otp}
                </span>
            </div>
            <p>
                This code will expire in <strong>10 minutes</strong>.
            </p>
            <p style="color: #64748b;">
                If you didn't create a FitForge account, you can safely
                ignore this email.
            </p>
        </div>
        """
    })

    return response