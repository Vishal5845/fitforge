from src.config.database import db


EXERCISES = [
    {
        "name": "Push Ups",
        "muscle_group": "Chest, Triceps",
        "difficulty": "Beginner",
        "equipment": "Bodyweight",
        "instructions": [
            "Start in a high plank position with your hands slightly wider than shoulder-width.",
            "Keep your body in a straight line from your head to your heels.",
            "Lower your chest toward the floor while keeping your elbows controlled.",
            "Push through your palms to return to the starting position.",
        ],
        "tips": [
            "Keep your core tight throughout the movement.",
            "Do not let your hips sag.",
        ],
        "mistakes": [
            "Flaring the elbows too far out.",
            "Dropping the hips during the movement.",
        ],
    },
    {
        "name": "Bodyweight Squats",
        "muscle_group": "Quadriceps, Glutes",
        "difficulty": "Beginner",
        "equipment": "Bodyweight",
        "instructions": [
            "Stand with your feet approximately shoulder-width apart.",
            "Brace your core and begin lowering your hips.",
            "Bend your knees while keeping your chest controlled.",
            "Drive through your feet to return to standing.",
        ],
        "tips": [
            "Keep your knees tracking in line with your toes.",
            "Keep your weight balanced through your feet.",
        ],
        "mistakes": [
            "Allowing the knees to collapse inward.",
            "Rounding the lower back.",
        ],
    },
    {
        "name": "Lunges",
        "muscle_group": "Quadriceps, Glutes",
        "difficulty": "Beginner",
        "equipment": "Bodyweight",
        "instructions": [
            "Stand upright with your feet together.",
            "Step forward with one leg.",
            "Lower your body until both knees are comfortably bent.",
            "Push through the front foot to return to the starting position.",
        ],
        "tips": [
            "Keep your torso controlled and upright.",
            "Keep the front knee tracking over the foot.",
        ],
        "mistakes": [
            "Taking an unstable step.",
            "Allowing the front knee to collapse inward.",
        ],
    },
    {
        "name": "Plank",
        "muscle_group": "Core",
        "difficulty": "Beginner",
        "equipment": "Bodyweight",
        "instructions": [
            "Place your forearms on the floor with your elbows under your shoulders.",
            "Extend your legs behind you.",
            "Keep your body in a straight line.",
            "Brace your core and hold the position.",
        ],
        "tips": [
            "Keep your hips level.",
            "Breathe steadily while holding the position.",
        ],
        "mistakes": [
            "Letting the hips drop.",
            "Raising the hips too high.",
        ],
    },
    {
        "name": "Bench Press",
        "muscle_group": "Chest, Triceps, Shoulders",
        "difficulty": "Intermediate",
        "equipment": "Barbell",
        "instructions": [
            "Lie on the bench with your feet firmly on the floor.",
            "Grip the bar slightly wider than shoulder-width.",
            "Lower the bar toward your mid-chest with control.",
            "Press the bar upward until your arms are extended.",
        ],
        "tips": [
            "Keep your shoulder blades controlled against the bench.",
            "Use a controlled lowering phase.",
        ],
        "mistakes": [
            "Bouncing the bar off the chest.",
            "Losing control of the bar.",
        ],
    },
    {
        "name": "Incline Dumbbell Press",
        "muscle_group": "Upper Chest, Shoulders, Triceps",
        "difficulty": "Intermediate",
        "equipment": "Dumbbells, Bench",
        "instructions": [
            "Set the bench to a moderate incline.",
            "Hold the dumbbells at chest level.",
            "Press both dumbbells upward.",
            "Lower them under control back toward the chest.",
        ],
        "tips": [
            "Keep your wrists neutral.",
            "Avoid excessively flaring your elbows.",
        ],
        "mistakes": [
            "Using excessive weight.",
            "Dropping the dumbbells too quickly.",
        ],
    },
    {
        "name": "Shoulder Press",
        "muscle_group": "Shoulders, Triceps",
        "difficulty": "Intermediate",
        "equipment": "Dumbbells",
        "instructions": [
            "Hold the dumbbells at shoulder height.",
            "Brace your core.",
            "Press the dumbbells overhead.",
            "Lower them under control to shoulder height.",
        ],
        "tips": [
            "Keep your core stable.",
            "Use a controlled range of motion.",
        ],
        "mistakes": [
            "Arching the lower back excessively.",
            "Using momentum to press the weight.",
        ],
    },
    {
        "name": "Lateral Raise",
        "muscle_group": "Side Delts",
        "difficulty": "Beginner",
        "equipment": "Dumbbells",
        "instructions": [
            "Stand with dumbbells at your sides.",
            "Keep a slight bend in your elbows.",
            "Raise your arms outward until approximately shoulder height.",
            "Lower the dumbbells slowly.",
        ],
        "tips": [
            "Use controlled movement.",
            "Keep the weight relatively light.",
        ],
        "mistakes": [
            "Swinging the dumbbells.",
            "Using excessive weight.",
        ],
    },
    {
        "name": "Tricep Pushdown",
        "muscle_group": "Triceps",
        "difficulty": "Beginner",
        "equipment": "Cable Machine",
        "instructions": [
            "Stand facing the cable machine.",
            "Grip the attachment with your elbows close to your body.",
            "Push the attachment downward until your arms are extended.",
            "Return to the starting position under control.",
        ],
        "tips": [
            "Keep your elbows close to your sides.",
            "Focus on moving through the elbows.",
        ],
        "mistakes": [
            "Using body momentum.",
            "Moving the elbows excessively.",
        ],
    },
    {
        "name": "Pull Ups",
        "muscle_group": "Back, Biceps",
        "difficulty": "Advanced",
        "equipment": "Pull-up Bar",
        "instructions": [
            "Grip the bar with your hands approximately shoulder-width apart.",
            "Hang with your arms extended.",
            "Pull your body upward by driving your elbows down.",
            "Lower yourself under control.",
        ],
        "tips": [
            "Keep your core engaged.",
            "Avoid excessive swinging.",
        ],
        "mistakes": [
            "Using excessive momentum.",
            "Performing partial repetitions.",
        ],
    },
    {
        "name": "Barbell Row",
        "muscle_group": "Back, Biceps",
        "difficulty": "Intermediate",
        "equipment": "Barbell",
        "instructions": [
            "Stand with your feet approximately hip-width apart.",
            "Hinge forward while maintaining a controlled back position.",
            "Pull the bar toward your torso.",
            "Lower the bar under control.",
        ],
        "tips": [
            "Keep your core braced.",
            "Pull toward your lower chest or upper abdomen.",
        ],
        "mistakes": [
            "Rounding the back.",
            "Using excessive momentum.",
        ],
    },
    {
        "name": "Lat Pulldown",
        "muscle_group": "Lats, Biceps",
        "difficulty": "Beginner",
        "equipment": "Cable Machine",
        "instructions": [
            "Sit at the lat pulldown machine and secure your legs.",
            "Grip the bar slightly wider than shoulder-width.",
            "Pull the bar toward your upper chest.",
            "Slowly return the bar to the starting position.",
        ],
        "tips": [
            "Keep your chest controlled.",
            "Focus on driving your elbows downward.",
        ],
        "mistakes": [
            "Pulling the bar behind the neck.",
            "Using excessive body momentum.",
        ],
    },
    {
        "name": "Face Pull",
        "muscle_group": "Rear Delts, Upper Back",
        "difficulty": "Beginner",
        "equipment": "Cable Machine",
        "instructions": [
            "Set a cable at approximately upper-chest or face height.",
            "Grip the rope attachment.",
            "Pull the rope toward your face while separating your hands.",
            "Return slowly to the starting position.",
        ],
        "tips": [
            "Keep your shoulders controlled.",
            "Focus on the rear shoulders and upper back.",
        ],
        "mistakes": [
            "Using excessive weight.",
            "Rushing the movement.",
        ],
    },
    {
        "name": "Barbell Curl",
        "muscle_group": "Biceps",
        "difficulty": "Beginner",
        "equipment": "Barbell",
        "instructions": [
            "Stand upright holding the barbell with an underhand grip.",
            "Keep your elbows close to your body.",
            "Curl the bar toward your shoulders.",
            "Lower it slowly to the starting position.",
        ],
        "tips": [
            "Keep your upper arms stable.",
            "Use controlled repetitions.",
        ],
        "mistakes": [
            "Swinging the torso.",
            "Using momentum to lift the bar.",
        ],
    },
    {
        "name": "Squat",
        "muscle_group": "Quadriceps, Glutes",
        "difficulty": "Intermediate",
        "equipment": "Barbell",
        "instructions": [
            "Position the bar securely across your upper back.",
            "Stand with your feet around shoulder-width apart.",
            "Brace your core and lower your hips.",
            "Drive through your feet to return to standing.",
        ],
        "tips": [
            "Keep your knees tracking with your toes.",
            "Maintain a controlled descent.",
        ],
        "mistakes": [
            "Rounding the lower back.",
            "Allowing the knees to collapse inward.",
        ],
    },
    {
        "name": "Romanian Deadlift",
        "muscle_group": "Hamstrings, Glutes",
        "difficulty": "Intermediate",
        "equipment": "Barbell",
        "instructions": [
            "Stand holding the barbell in front of your thighs.",
            "Push your hips backward while maintaining a controlled back position.",
            "Lower the bar along your legs until you feel a strong hamstring stretch.",
            "Drive your hips forward to return upright.",
        ],
        "tips": [
            "Keep the bar close to your legs.",
            "Focus on the hip hinge.",
        ],
        "mistakes": [
            "Rounding the back.",
            "Turning the movement into a squat.",
        ],
    },
    {
        "name": "Leg Press",
        "muscle_group": "Quadriceps, Glutes",
        "difficulty": "Beginner",
        "equipment": "Leg Press Machine",
        "instructions": [
            "Sit securely in the leg press machine.",
            "Place your feet comfortably on the platform.",
            "Lower the platform under control.",
            "Press through your feet to return to the starting position.",
        ],
        "tips": [
            "Keep your lower back supported.",
            "Do not lock your knees aggressively.",
        ],
        "mistakes": [
            "Allowing the hips to lift from the pad.",
            "Locking the knees forcefully.",
        ],
    },
    {
        "name": "Leg Curl",
        "muscle_group": "Hamstrings",
        "difficulty": "Beginner",
        "equipment": "Leg Curl Machine",
        "instructions": [
            "Position yourself securely on the machine.",
            "Align your knees with the machine's pivot point.",
            "Curl the pad toward your body.",
            "Return slowly to the starting position.",
        ],
        "tips": [
            "Use controlled repetitions.",
            "Avoid using momentum.",
        ],
        "mistakes": [
            "Lifting the hips from the pad.",
            "Using excessive weight.",
        ],
    },
    {
        "name": "Calf Raise",
        "muscle_group": "Calves",
        "difficulty": "Beginner",
        "equipment": "Bodyweight",
        "instructions": [
            "Stand upright with your feet comfortably positioned.",
            "Raise your heels while pushing through the balls of your feet.",
            "Pause briefly at the top.",
            "Lower your heels under control.",
        ],
        "tips": [
            "Use a full range of motion.",
            "Pause briefly at the top.",
        ],
        "mistakes": [
            "Bouncing through repetitions.",
            "Using a shortened range of motion.",
        ],
    },
    {
        "name": "Seated Row",
        "muscle_group": "Back, Biceps",
        "difficulty": "Beginner",
        "equipment": "Cable Machine",
        "instructions": [
            "Sit upright with your feet supported.",
            "Grip the handle with both hands.",
            "Pull the handle toward your torso.",
            "Return the handle slowly.",
        ],
        "tips": [
            "Keep your chest controlled.",
            "Squeeze your shoulder blades together.",
        ],
        "mistakes": [
            "Rounding the back.",
            "Using excessive momentum.",
        ],
    },
    {
        "name": "Bicep Curl",
        "muscle_group": "Biceps",
        "difficulty": "Beginner",
        "equipment": "Dumbbells",
        "instructions": [
            "Stand upright holding a dumbbell in each hand.",
            "Keep your elbows close to your body.",
            "Curl the dumbbells toward your shoulders.",
            "Lower them slowly.",
        ],
        "tips": [
            "Keep your upper arms stable.",
            "Use controlled repetitions.",
        ],
        "mistakes": [
            "Swinging the weights.",
            "Moving the elbows excessively.",
        ],
    },
    {
        "name": "RDL",
        "muscle_group": "Hamstrings, Glutes",
        "difficulty": "Intermediate",
        "equipment": "Barbell",
        "instructions": [
            "Stand holding the barbell in front of your thighs.",
            "Push your hips backward while keeping the bar close to your legs.",
            "Lower until you feel a controlled hamstring stretch.",
            "Drive your hips forward to stand upright.",
        ],
        "tips": [
            "Maintain a controlled hip hinge.",
            "Keep the bar close to your body.",
        ],
        "mistakes": [
            "Rounding the lower back.",
            "Bending the knees excessively.",
        ],
    },
    {
        "name": "Leg Extension",
        "muscle_group": "Quadriceps",
        "difficulty": "Beginner",
        "equipment": "Leg Extension Machine",
        "instructions": [
            "Sit securely on the machine.",
            "Position your legs behind the pad.",
            "Extend your knees until your legs are straight.",
            "Lower the pad under control.",
        ],
        "tips": [
            "Use controlled repetitions.",
            "Avoid aggressive knee locking.",
        ],
        "mistakes": [
            "Using excessive weight.",
            "Swinging the legs.",
        ],
    },
    {
        "name": "Seated Leg Curl",
        "muscle_group": "Hamstrings",
        "difficulty": "Beginner",
        "equipment": "Leg Curl Machine",
        "instructions": [
            "Sit securely on the machine.",
            "Position your legs against the pads.",
            "Curl your legs downward and backward.",
            "Return slowly to the starting position.",
        ],
        "tips": [
            "Keep your hips firmly against the seat.",
            "Use a controlled tempo.",
        ],
        "mistakes": [
            "Using momentum.",
            "Lifting the hips from the seat.",
        ],
    },
]


def seed_exercises():
    collection = db["exercise_library"]

    for exercise in EXERCISES:
        collection.update_one(
            {"name": exercise["name"]},
            {"$set": exercise},
            upsert=True,
        )

    print(f"Seeded {len(EXERCISES)} exercises.")


if __name__ == "__main__":
    seed_exercises()