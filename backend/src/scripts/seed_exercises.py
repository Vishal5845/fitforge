from src.config.database import db

exercises = [
    # =========================
    # CHEST
    # =========================
    {
        "name": "Bench Press",
        "muscle_group": "Chest",
        "difficulty": "Intermediate",
        "equipment": "Barbell",
        "instructions": [
            "Lie flat on the bench.",
            "Grip the bar slightly wider than shoulder width.",
            "Lower the bar slowly to your chest.",
            "Press the bar back until your arms are extended."
        ],
        "tips": [
            "Keep your shoulder blades retracted.",
            "Keep your feet firmly planted.",
            "Control the lowering phase."
        ],
        "mistakes": [
            "Bouncing the bar off your chest.",
            "Flaring your elbows too much.",
            "Lifting your hips off the bench."
        ],
        "video_url": ""
    },
    {
        "name": "Incline Dumbbell Press",
        "muscle_group": "Upper Chest",
        "difficulty": "Intermediate",
        "equipment": "Dumbbells",
        "instructions": [
            "Adjust the bench to a 30-45° incline.",
            "Press the dumbbells upward.",
            "Lower slowly until elbows reach 90°.",
            "Press back up."
        ],
        "tips": [
            "Do not arch your lower back.",
            "Move both dumbbells together."
        ],
        "mistakes": [
            "Using excessive weight.",
            "Locking elbows aggressively."
        ],
        "video_url": ""
    },
    {
        "name": "Push-Up",
        "muscle_group": "Chest",
        "difficulty": "Beginner",
        "equipment": "Bodyweight",
        "instructions": [
            "Start in a plank position.",
            "Lower your chest.",
            "Push back to the top."
        ],
        "tips": [
            "Keep your body straight.",
            "Brace your core."
        ],
        "mistakes": [
            "Sagging hips.",
            "Partial range of motion."
        ],
        "video_url": ""
    },

    # =========================
    # LEGS
    # =========================
    {
        "name": "Squat",
        "muscle_group": "Quadriceps",
        "difficulty": "Intermediate",
        "equipment": "Barbell",
        "instructions": [
            "Stand shoulder-width apart.",
            "Brace your core.",
            "Lower until thighs are parallel.",
            "Drive through your heels."
        ],
        "tips": [
            "Keep your chest up.",
            "Push knees outward."
        ],
        "mistakes": [
            "Rounded back.",
            "Heels lifting."
        ],
        "video_url": ""
    },
    {
        "name": "Leg Press",
        "muscle_group": "Quadriceps",
        "difficulty": "Beginner",
        "equipment": "Machine",
        "instructions": [
            "Place feet shoulder-width apart.",
            "Lower with control.",
            "Press upward."
        ],
        "tips": [
            "Do not lock your knees."
        ],
        "mistakes": [
            "Lifting your hips."
        ],
        "video_url": ""
    },

    # =========================
    # BACK
    # =========================
    {
        "name": "Lat Pulldown",
        "muscle_group": "Back",
        "difficulty": "Beginner",
        "equipment": "Cable Machine",
        "instructions": [
            "Grip the bar wider than shoulders.",
            "Pull toward your upper chest.",
            "Slowly return."
        ],
        "tips": [
            "Lead with your elbows."
        ],
        "mistakes": [
            "Using momentum."
        ],
        "video_url": ""
    },
    {
        "name": "Barbell Row",
        "muscle_group": "Back",
        "difficulty": "Intermediate",
        "equipment": "Barbell",
        "instructions": [
            "Hinge at the hips.",
            "Pull the bar toward your stomach.",
            "Lower under control."
        ],
        "tips": [
            "Keep your back neutral."
        ],
        "mistakes": [
            "Rounding your back."
        ],
        "video_url": ""
    },

    # =========================
    # SHOULDERS
    # =========================
    {
        "name": "Shoulder Press",
        "muscle_group": "Shoulders",
        "difficulty": "Intermediate",
        "equipment": "Dumbbells",
        "instructions": [
            "Start with dumbbells at shoulder height.",
            "Press overhead.",
            "Lower slowly."
        ],
        "tips": [
            "Avoid excessive back arch."
        ],
        "mistakes": [
            "Using momentum."
        ],
        "video_url": ""
    },
    {
        "name": "Lateral Raise",
        "muscle_group": "Shoulders",
        "difficulty": "Beginner",
        "equipment": "Dumbbells",
        "instructions": [
            "Raise dumbbells to shoulder level.",
            "Lower slowly."
        ],
        "tips": [
            "Lead with your elbows."
        ],
        "mistakes": [
            "Swinging the weights."
        ],
        "video_url": ""
    },

    # =========================
    # BICEPS
    # =========================
    {
        "name": "Barbell Curl",
        "muscle_group": "Biceps",
        "difficulty": "Beginner",
        "equipment": "Barbell",
        "instructions": [
            "Hold the bar.",
            "Curl upward.",
            "Lower slowly."
        ],
        "tips": [
            "Keep elbows close."
        ],
        "mistakes": [
            "Swinging your body."
        ],
        "video_url": ""
    },

    # =========================
    # TRICEPS
    # =========================
    {
        "name": "Triceps Pushdown",
        "muscle_group": "Triceps",
        "difficulty": "Beginner",
        "equipment": "Cable Machine",
        "instructions": [
            "Grip the rope.",
            "Push downward.",
            "Return slowly."
        ],
        "tips": [
            "Keep elbows tucked."
        ],
        "mistakes": [
            "Moving your shoulders."
        ],
        "video_url": ""
    }
]

collection = db["exercise_library"]

collection.delete_many({})

collection.insert_many(exercises)

print(f"Inserted {len(exercises)} exercises.")