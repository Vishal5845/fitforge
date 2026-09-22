import requests

from src.config.database import db
from src.services.exercise_animation_map import EXERCISE_ANIMATION_MAP

EXERCISEDB_URL = "https://oss.exercisedb.dev/api/v1/exercises"


def get_exercise(name: str):
    # Get FitForge's own exercise information first
    exercise = db["exercise_library"].find_one(
        {"name": name},
        {"_id": 0},
    )
    if not exercise:
        return None
    exercise_id = EXERCISE_ANIMATION_MAP.get(name)
    if exercise_id:
        exercise["animation_url"] = (
            f"https://static.exercisedb.dev/media/{exercise_id}.gif"
        )
    else:
        exercise["animation_url"] = None
    return exercise
    # try:
    #     search_name = name.lower().strip()
    #     search_words = set(search_name.split())
    #     cursor = None
    #     match = None
    #     # ExerciseDB is paginated, so search page by page
    #     for _ in range(20):
    #         params = {"limit": 100}
    #         if cursor:
    #             params["cursor"] = cursor
    #         response = requests.get(
    #             EXERCISEDB_URL,
    #             params=params,
    #             timeout=10,
    #         )
    #         if not response.ok:
    #             break
    #         data = response.json()
    #         exercises = data.get("data", [])
    #         # 1. Exact name match
    #         match = next(
    #             (
    #                 item
    #                 for item in exercises
    #                 if item.get("name", "").lower().strip() == search_name
    #             ),
    #             None,
    #         )
    #         # 2. Match all words
    #         if match is None:
    #             match = next(
    #                 (
    #                     item
    #                     for item in exercises
    #                     if search_words.issubset(
    #                         set(item.get("name", "").lower().split())
    #                     )
    #                 ),
    #                 None,
    #             )
    #         if match:
    #             break
    #         # Move to next page
    #         meta = data.get("meta", {})
    #         if not meta.get("hasNextPage"):
    #             break
    #         cursor = meta.get("nextCursor")
    #         if not cursor:
    #             break
    #     if match:
    #         exercise["animation_url"] = match.get("gifUrl")
    # except Exception as error:
    #     print("ExerciseDB lookup failed:", error)
    # # Never break the workout if animation lookup fails
    # exercise.setdefault("animation_url", None)
    # return exercise