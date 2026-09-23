from fastapi import FastAPI
from src.config.database import client
from src.api.users import router as user_router
from src.api.workout import router as workout_router
from src.api.meal import router as meal_router
from src.api.auth import router as auth_router
from src.api.progress import router as progress_router
from src.api.subscription import router as subscription_router
from src.api.admin import router as admin_router
from src.api.coach import router as coach_router
from src.api.dashboard import router as dashboard_router
from src.api.exercise import router as exercise_router
from src.api.water import router as water_router
from src.api.weight import router as weight_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="FitForge API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://fitforge-cyan-alpha.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "dbs": client.list_database_names()
    }

app.include_router(user_router)
app.include_router(workout_router)
app.include_router(meal_router)
app.include_router(auth_router)
app.include_router(progress_router)
app.include_router(subscription_router)
app.include_router(admin_router)
app.include_router(coach_router)
app.include_router(dashboard_router)
app.include_router(exercise_router)
app.include_router(water_router)
app.include_router(weight_router)