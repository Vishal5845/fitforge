import json
from src.ai.gemini_client import FoodAIClient
import traceback

def generate_demo_workout(
    goal,
    experience,
    workout_days,
    workout_location,
    body_type
):
    program_name = "Push Pull Legs"
    if body_type == "ectomorph":
        program_name = "Hypertrophy Focus"
    elif body_type == "mesomorph":
        program_name = "Push Pull Legs"

    elif body_type == "endomorph":
        program_name = "Strength + Conditioning"
    
    if workout_location == "both":
        workout_location = "gym"
    if workout_location == "home":
        return {
            "program_name": "Home Workout",
            "summary": "A simple home workout using bodyweight exercises.",
            "estimated_duration": 45,
            "rest_between_sets": "60-90 sec",
            "days": [
                {
                    "name": "Full Body",
                    "exercises": [
                        {
                            "name": "Push Ups",
                            "sets": 4,
                            "reps": "12-15"
                        },
                        {
                            "name": "Bodyweight Squats",
                            "sets": 4,
                            "reps": "15-20"
                        },
                        {
                            "name": "Lunges",
                            "sets": 3,
                            "reps": "12-15"
                        },
                        {
                            "name": "Plank",
                            "sets": 3,
                            "reps": "30-60 sec"
                        }
                    ]
                }
            ]
        }
    if experience == "intermediate" and workout_days == 5:
        return {
            "program_name": program_name,
            "summary": "Intermediate hypertrophy program.",
            "estimated_duration": 70,
            "rest_between_sets": "90 sec",
            "days": [
                {
                    "name": "Push",
                    "exercises": [
                        {"name": "Bench Press", "sets": 4, "reps": "6-8"},
                        {"name": "Incline Dumbbell Press", "sets": 3, "reps": "8-10"},
                        {"name": "Shoulder Press", "sets": 3, "reps": "8-10"},
                        {"name": "Lateral Raise", "sets": 3, "reps": "12-15"},
                        {"name": "Tricep Pushdown", "sets": 3, "reps": "10-12"}
                    ]
                },
                {
                    "name": "Pull",
                    "exercises": [
                        {"name": "Pull Ups", "sets": 4, "reps": "6-10"},
                        {"name": "Barbell Row", "sets": 4, "reps": "6-8"},
                        {"name": "Lat Pulldown", "sets": 3, "reps": "10-12"},
                        {"name": "Face Pull", "sets": 3, "reps": "12-15"},
                        {"name": "Barbell Curl", "sets": 3, "reps": "10-12"}
                    ]
                },
                {
                    "name": "Legs",
                    "exercises": [
                        {"name": "Squat", "sets": 4, "reps": "6-8"},
                        {"name": "Romanian Deadlift", "sets": 4, "reps": "8-10"},
                        {"name": "Leg Press", "sets": 3, "reps": "10-12"},
                        {"name": "Leg Curl", "sets": 3, "reps": "10-12"},
                        {"name": "Calf Raise", "sets": 4, "reps": "12-15"}
                    ]
                },
                {
                    "name": "Upper",
                    "exercises": [
                        {"name": "Bench Press", "sets": 4, "reps": "6-8"},
                        {"name": "Pull Ups", "sets": 4, "reps": "6-10"},
                        {"name": "Shoulder Press", "sets": 3, "reps": "8-10"},
                        {"name": "Seated Row", "sets": 3, "reps": "10-12"},
                        {"name": "Bicep Curl", "sets": 3, "reps": "10-12"}
                    ]
                },
                {
                    "name": "Lower",
                    "exercises": [
                        {"name": "Squat", "sets": 4, "reps": "6-8"},
                        {"name": "RDL", "sets": 4, "reps": "8-10"},
                        {"name": "Leg Extension", "sets": 3, "reps": "12-15"},
                        {"name": "Leg Curl", "sets": 3, "reps": "10-12"},
                        {"name": "Calf Raise", "sets": 4, "reps": "12-15"}
                    ]
                }
            ]
        }
    
    if experience == "intermediate" and workout_days == 6:
        return {
             "program_name": program_name,
            "summary": "6-day Push Pull Legs routine.",
            "estimated_duration": 75,
            "rest_between_sets": "90 sec",
            "days": [
                {
                    "name": "Push A",
                    "exercises": [
                        {"name": "Bench Press", "sets": 4, "reps": "6-8"},
                        {"name": "Incline Dumbbell Press", "sets": 3, "reps": "8-10"},
                        {"name": "Shoulder Press", "sets": 3, "reps": "8-10"},
                        {"name": "Lateral Raise", "sets": 3, "reps": "12-15"},
                        {"name": "Tricep Pushdown", "sets": 3, "reps": "10-12"}
                    ]
                },
                {
                    "name": "Pull A",
                    "exercises": [
                        {"name": "Pull Ups", "sets": 4, "reps": "6-10"},
                        {"name": "Barbell Row", "sets": 4, "reps": "6-8"},
                        {"name": "Lat Pulldown", "sets": 3, "reps": "10-12"},
                        {"name": "Face Pull", "sets": 3, "reps": "12-15"},
                        {"name": "Barbell Curl", "sets": 3, "reps": "10-12"}
                    ]
                },
                {
                    "name": "Legs A",
                    "exercises": [
                        {"name": "Squat", "sets": 4, "reps": "6-8"},
                        {"name": "Romanian Deadlift", "sets": 4, "reps": "8-10"},
                        {"name": "Leg Press", "sets": 3, "reps": "10-12"},
                        {"name": "Leg Curl", "sets": 3, "reps": "10-12"},
                        {"name": "Calf Raise", "sets": 4, "reps": "12-15"}
                    ]
                },
                {
                    "name": "Push B",
                    "exercises": [
                        {"name": "Incline Bench Press", "sets": 4, "reps": "6-8"},
                        {"name": "Chest Fly", "sets": 3, "reps": "10-12"},
                        {"name": "Arnold Press", "sets": 3, "reps": "8-10"},
                        {"name": "Cable Lateral Raise", "sets": 3, "reps": "12-15"},
                        {"name": "Overhead Tricep Extension", "sets": 3, "reps": "10-12"}
                    ]
                },
                {
                    "name": "Pull B",
                    "exercises": [
                        {"name": "Chest Supported Row", "sets": 4, "reps": "8-10"},
                        {"name": "Lat Pulldown", "sets": 4, "reps": "8-10"},
                        {"name": "Face Pull", "sets": 3, "reps": "12-15"},
                        {"name": "Hammer Curl", "sets": 3, "reps": "10-12"},
                        {"name": "Preacher Curl", "sets": 3, "reps": "10-12"}
                    ]
                },
                {
                    "name": "Legs B",
                    "exercises": [
                        {"name": "Hack Squat", "sets": 4, "reps": "8-10"},
                        {"name": "RDL", "sets": 4, "reps": "8-10"},
                        {"name": "Leg Extension", "sets": 3, "reps": "12-15"},
                        {"name": "Seated Leg Curl", "sets": 3, "reps": "12-15"},
                        {"name": "Standing Calf Raise", "sets": 4, "reps": "12-15"}
                    ]
                }
            ]
        }

    return {
        "program_name": f"{program_name} Full Body",
        "summary": "Full body workout for beginners.",
        "estimated_duration": 50,
        "rest_between_sets": "60 sec",
        "days": [
            {
                "name": "Full Body",
                "exercises": [
                    {"name": "Squat", "sets": 3, "reps": "8-10"},
                    {"name": "Bench Press", "sets": 3, "reps": "8-10"},
                    {"name": "Lat Pulldown", "sets": 3, "reps": "10-12"}
                ]
            }
        ]
    }

def generate_ai_workout(
    goal,
    experience,
    workout_days,
    workout_location,
    body_type
):
    client = FoodAIClient()
    result = client.get_workout(
        goal,experience,workout_days,workout_location,body_type
    )
    if not result["success"]:
        raise Exception("Gemini unavailable")
    return result["workout"]

def generate_workout(
    goal,
    experience,
    workout_days,
    workout_location,
    body_type
):
    try:
        return generate_ai_workout(
            goal,
            experience,
            workout_days,
            workout_location,
            body_type
        )

    except Exception as e:
        print(f"AI workout generation failed: {e}")
        traceback.print_exc()

        return generate_demo_workout(
            goal,
            experience,
            workout_days,
            workout_location,
            body_type
        )