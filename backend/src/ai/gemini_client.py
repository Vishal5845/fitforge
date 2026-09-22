"""Google Gemini client for AI-powered food recommendations (FREE API)"""
import os
import json
import requests
import time
import requests
from dotenv import load_dotenv
# print("GEMINI_API_KEY =", os.getenv("GEMINI_API_KEY"))

load_dotenv()
class FoodAIClient:
    """Client for Google Gemini-powered food recommendations using REST API"""
    def __init__(self):
        self.api_key = os.getenv("GEMINI_API_KEY")
        # self.demo_mode = not bool(self.api_key)
        self.demo_mode = os.getenv("DEMO_MODE", "false").lower() == "true"
        print("DEMO MODE:", self.demo_mode)
        if self.demo_mode:
            print("Running in DEMO MODE (Gemini disabled)")
        # Use gemini-2.5-flash (latest model) or fall back to demo mode
        self.base_url = "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent"
        # print("Meal URL:", self.base_url)
    # Public Methods
    def get_recommendation(self, dietary_needs: str, calories: int) -> dict:
        dietary_needs, calories = self._validate_inputs(
            dietary_needs,
            calories
        )
        prompt = self.build_recommendation_prompt(dietary_needs, calories)
        if self.demo_mode:
            return {
                "success": True,
                "source": "demo",
                "meal": self._demo_recommendation(dietary_needs, calories)
            }
        
        try:
            return self._call_with_retry(prompt, calories)
        except Exception as e:
            return self._handle_fallback(e, dietary_needs, calories)
    def analyze_nutrition(self, food_description: str) -> dict:
        if not food_description or len(food_description.strip()) < 3:
            raise ValueError("Food description is too short.")
        
        prompt = self._build_analysis_prompt(food_description)
        
        if self.demo_mode:
            return {
                "success": True,
                "source": "demo",
                "analysis": self._demo_analysis(food_description)
            }
        try:
            res = self._call_llm(prompt)
            parsed = self._parse_response(res)

            return {
                "success": True,
                "source": "gemini",
                "analysis": parsed
            }
        except Exception as e:
            print(f"Nutrition analysis fallback triggered: {e}")

            return {
                "success": True,
                "source": "demo",
                "analysis": self._demo_analysis(food_description)
            }

    def _parse_response(self, response: str) -> dict:
        try:
            response = response.strip()

            if response.startswith("```"):
                lines = response.splitlines()
                if lines and lines[0].startswith("```"):
                    lines = lines[1:]
                if lines and lines[-1].strip() == "```":
                    lines = lines[:-1]
                response = "\n".join(lines).strip()
            return json.loads(response)
        except json.JSONDecodeError:
            repaired = self._repair_json(response)
            return json.loads(repaired)

    def _repair_json(self, bad_response: str) -> str:
        repair_prompt = f"""
            You are a strict JSON repair tool.

            You MUST return ONLY valid JSON.
            No explanations.
            No markdown.
            Return ONLY valid JSON.
            Do not add explanations.
            {bad_response}
        """
        return self._call_llm(repair_prompt)

    def _validate_response(self, data, target_calories) -> dict:
        if "total_calories" not in data:
            raise ValueError("Missing calories")
        if abs(data["total_calories"] - target_calories) > target_calories * 0.1:
            raise ValueError("Calories out of acceptable range")

        return data
    
    # Core Logic
    def _call_with_retry(self, prompt, calories: int, retries: int=2) -> dict:
        for i in range(retries):
            res = self._call_llm(prompt)
            parsed = self._parse_response(res)

            try:
                validated = self._validate_response(parsed, calories)

                return {
                    "success": True,
                    "source": "gemini",
                    "meal": validated
                }

            except Exception as e:
                print(f"Validation failed on retry {i+1}: {e}")
                if i == retries - 1:
                    raise
                

        raise ValueError("Failed after retries")
    
    def _generate_content(self, prompt: str) -> str:
        """Make API request to Gemini"""
        headers = {"Content-Type": "application/json"}
        
        data = {
            "contents": [
                {
                    "parts": [
                        {"text": prompt}
                    ]
                }
            ]
        }
        params = {"key": self.api_key}
        response = None
        for attempt in range(2):
            try:
                response = requests.post(
                    self.base_url,
                    headers=headers,
                    json=data,
                    params=params,
                    timeout=10
                )
                break
            except requests.exceptions.ReadTimeout:
                if attempt == 1:
                    raise
                print("Gemini timed out. Retrying in 2 seconds...")
                time.sleep(2)
                
        if response.status_code != 200:
            try:
                error_data = response.json()
            except:
                error_data = response.text
            raise RuntimeError(f"Gemini API failed: {error_data}")
        result = response.json()
        # Safe parsing
        try:
            candidates = result.get("candidates")
            if not candidates:
                raise ValueError("No candidates in response")
            content = candidates[0].get("content", {})
            parts = content.get("parts", [])
            if not parts:
                raise ValueError("No content parts found")
            text = parts[0].get("text")
            if not text or not text.strip():
                raise RuntimeError("Empty response from Gemini API")

            return text.strip()
        except (KeyError, IndexError) as e:
            raise Exception(f"Invalid API response format: {result}")
        
    def _call_llm(self, prompt: str) -> str:
        return self._generate_content(prompt)
    
    # Prompt Builders
    def build_recommendation_prompt(self, dietary_type: str, calories: int) -> str:
        if dietary_type == "vegetarian":
            diet_rules = """
                - Use vegetarian ingredients only.
                - Include Vitamin B12 via fortified foods or supplements.
                - Pair iron sources with Vitamin C for absorption.
                """
        elif dietary_type == "vegan":
            diet_rules = """
                - Use strictly plant-based ingredients.
                - Vitamin B12 must come from fortified foods or supplements.
                - Ensure omega-3 (ALA sources like flax/chia).
                - Pair iron with Vitamin C.
                """
        else:  # non_vegetarian
            diet_rules = """
                - Include animal-based protein sources if beneficial.
                - Prefer lean meats, eggs, or fish.
                - Ensure balanced fat intake (avoid excessive saturated fat).
                - Include diverse micronutrients naturally from animal + plant sources.
                """

        return f"""
            You are a STRICT JSON API.

            You MUST return ONLY valid JSON.
            No markdown. No explanations. No text.

            If you fail, the response will be rejected.

            IMPORTANT RULES:
            - Output must be valid JSON (json.loads compatible)
            - No trailing commas
            - No comments
            - No units in numbers
            - total_calories MUST be within ±5% of target
            - If not, regenerate internally before responding

            DIET RULES:
            {diet_rules}

            OUTPUT FORMAT (STRICT JSON):

            {{
            "meal_name": "string",
            "diet_type": "{dietary_type}",
            "total_calories": {calories},
            "macronutrients": {{
                "protein": 0,
                "carbs": 0,
                "fat": 0
            }},
            "micronutrients": {{
                "iron_mg": 0,
                "calcium_mg": 0,
                "vitamin_b12_mcg": 0,
                "fiber_g": 0,
                "vitamin_d_mcg": 0
            }},
            "ingredients": [
                {{
                "name": "string",
                "quantity": "string",
                "calories": 0
                }}
            ],
            "benefits": ["string"],
            "warnings": ["string"],
            "meal_tags": ["string"]
            }}

            Return ONLY JSON.
            
        """
    def build_meal_plan_prompt(
        self,
        dietary_type: str,
        calories: int,
        goal: str,
    ):
        return f"""
            You are a STRICT JSON API.

            Return ONLY valid JSON.

            Generate a complete one-day meal plan.

            Goal: {goal}
            Diet Type: {dietary_type}
            Daily Calories: {calories}

            The sum of all meal calories should approximately equal the daily calories.

            Each meal MUST include:
            - calories
            - protein (grams)
            - carbs (grams)
            - fat (grams)
            - ingredients

            Return exactly this JSON format:

            {{
            "plan_name": "string",
            "goal": "{goal}",
            "diet_type": "{dietary_type}",
            "daily_calories": {calories},

            "breakfast": {{
                "meal_name": "string",
                "calories": 0,
                "protein": 0,
                "carbs": 0,
                "fat": 0,
                "ingredients": [
                {{
                    "name": "string",
                    "quantity": "string"
                }}
                ]
            }},

            "lunch": {{
                "meal_name": "string",
                "calories": 0,
                "protein": 0,
                "carbs": 0,
                "fat": 0,
                "ingredients": [
                {{
                    "name": "string",
                    "quantity": "string"
                }}
                ]
            }},

            "dinner": {{
                "meal_name": "string",
                "calories": 0,
                "protein": 0,
                "carbs": 0,
                "fat": 0,
                "ingredients": [
                {{
                    "name": "string",
                    "quantity": "string"
                }}
                ]
            }},

            "snacks": {{
                "meal_name": "string",
                "calories": 0,
                "protein": 0,
                "carbs": 0,
                "fat": 0,
                "ingredients": [
                {{
                    "name": "string",
                    "quantity": "string"
                }}
                ]
            }},

            "macronutrients": {{
                "protein": 0,
                "carbs": 0,
                "fat": 0
            }}
            }}

            Return ONLY valid JSON.
        """

    def _build_analysis_prompt(self, food_description):
        return f"""
            You are a STRICT JSON API.
            Return ONLY valid JSON.
            {{
            "food": "{food_description}",
            "calories": number,
            "macronutrients": {{
                "protein": number,
                "carbs": number,
                "fat": number
            }},
            "micronutrients": {{
                "iron_mg": number,
                "calcium_mg": number,
                "fiber_g": number
            }},
            "benefits": ["string"]
            }}
        """
    # Validation 
    def _validate_inputs(self, dietary_needs, calories):
        dietary_needs = dietary_needs.lower().strip()
        mapping = {
            "veg": "vegetarian",
            "vegetarian": "vegetarian",
            "vegan": "vegan",

            "nonveg": "non_vegetarian",
            "non-veg": "non_vegetarian",
            "non vegetarian": "non_vegetarian",
            "non_vegetarian": "non_vegetarian",

            "high-protein": "high_protein",
            "high protein": "high_protein",

            "keto": "keto",
        }

        dietary_needs = mapping.get(dietary_needs)

        if not dietary_needs:
            raise ValueError("Unsupported dietary type")
        if not dietary_needs or len(dietary_needs.strip()) < 3:
            raise ValueError("Invalid dietary needs input")
        
        if not isinstance(calories,int) or calories<=0:
            raise ValueError("Calories must be a positive integer")
        
        return dietary_needs, calories
        
    # Fallback Handling
    def _handle_fallback(self, error, dietary_needs, calories):
        print(f"Gemini fallback triggered: {error}")

        return {
            "success": True,
            "source": "demo",
            "meal": self._demo_recommendation(
                dietary_needs,
                calories
            )
        }
    
    def get_daily_meal_plan(self, dietary_needs: str, calories: int, goal: str):
        dietary_needs, calories = self._validate_inputs(
            dietary_needs,
            calories
        )
        if self.demo_mode:
            return self._demo_meal_plan(
                dietary_needs,
                calories,
                goal
            )
        prompt = self.build_meal_plan_prompt(
            dietary_needs,
            calories,
            goal
        )
        try:
            # print(prompt)
            response = self._call_llm(prompt)
            return self._parse_response(response)
        except Exception as e:
            print(f"Meal AI failed: {e}")
            return self._demo_meal_plan(
                dietary_needs,
                calories,
                goal
            )
    
    def _demo_meal_plan(self, dietary_needs: str, calories: int, goal: str):
        if dietary_needs == "vegetarian":
            lunch = {
                "meal_name": "Paneer Rice Bowl",
                "calories": int(calories * 0.35),
                "protein": 45,
                "carbs": 80,
                "fat": 22,
                "ingredients": [
                    {"name": "Paneer", "quantity": "200g"},
                    {"name": "Rice", "quantity": "250g"}
                ]
            }
            dinner = {
                "meal_name": "Dal with Rice",
                "calories": int(calories * 0.30),
                "protein": 30,
                "carbs": 75,
                "fat": 10,
                "ingredients": [
                    {"name": "Dal", "quantity": "2 bowls"},
                    {"name": "Rice", "quantity": "200g"}
                ]
            }
        elif dietary_needs == "vegan":
            lunch = {
                "meal_name": "Tofu Rice Bowl",
                "calories": int(calories * 0.35),
                "protein": 38,
                "carbs": 82,
                "fat": 18,
                "ingredients": [
                    {"name": "Tofu", "quantity": "200g"},
                    {"name": "Brown Rice", "quantity": "250g"}
                ]
            }

            dinner = {
                "meal_name": "Lentil Quinoa Bowl",
                "calories": int(calories * 0.30),
                "protein": 34,
                "carbs": 68,
                "fat": 9,
                "ingredients": [
                    {"name": "Lentils", "quantity": "200g"},
                    {"name": "Quinoa", "quantity": "200g"}
                ]
            }
        else:  # non_vegetarian
            lunch = {
                "meal_name": "Chicken Rice Bowl",
                "calories": int(calories * 0.35),
                "protein": 55,
                "carbs": 75,
                "fat": 12,
                "ingredients": [
                    {"name": "Chicken Breast", "quantity": "200g"},
                    {"name": "Rice", "quantity": "250g"}
                ]
            }
            dinner = {
                "meal_name": "Fish and Sweet Potato",
                "calories": int(calories * 0.30),
                "protein": 45,
                "carbs": 50,
                "fat": 14,
                "ingredients": [
                    {"name": "Fish", "quantity": "200g"},
                    {"name": "Sweet Potato", "quantity": "250g"}
                ]
            }
        return {
            "plan_name": f"{goal.replace('_', ' ').title()} Meal Plan",
            "goal": goal,
            "diet_type": dietary_needs,
            "daily_calories": calories,

            "breakfast": {
                "meal_name": "Protein Oats Bowl",
                "calories": int(calories * 0.25),
                "protein": 35,
                "carbs": 75,
                "fat": 12,
                "ingredients": [
                    {"name": "Oats", "quantity": "100g"},
                    {"name": "Milk", "quantity": "300ml"},
                    {"name": "Banana", "quantity": "1"}
                ]
            },

            "lunch": lunch,

            "dinner": dinner,

            "snacks": {
                "meal_name": "Greek Yogurt Snack",
                "calories": int(calories * 0.10),
                "protein": 20,
                "carbs": 15,
                "fat": 8,
                "ingredients": [
                    {"name": "Greek Yogurt", "quantity": "200g"},
                    {"name": "Almonds", "quantity": "30g"}
                ]
            },

            "macronutrients": {
                "protein": int(calories * 0.30 / 4),
                "carbs": int(calories * 0.45 / 4),
                "fat": int(calories * 0.25 / 9)
            }
        }
    
    def _demo_workout(self):
        return {
            "program_name": "Hypertrophy Beginner Program",
            "summary": "A balanced workout plan focused on muscle gain.",
            "estimated_duration": "60 minutes",
            "rest_between_sets": "60-90 seconds",
            "days": [
                {
                    "name": "Push",
                    "exercises": [
                        {"name": "Bench Press", "sets": 4, "reps": "8-10"},
                        {"name": "Shoulder Press", "sets": 3, "reps": "10-12"},
                        {"name": "Tricep Pushdown", "sets": 3, "reps": "12-15"}
                    ]
                },
                {
                    "name": "Pull",
                    "exercises": [
                        {"name": "Lat Pulldown", "sets": 4, "reps": "8-10"},
                        {"name": "Seated Row", "sets": 3, "reps": "10-12"},
                        {"name": "Hammer Curl", "sets": 3, "reps": "12-15"}
                    ]
                },
                {
                    "name": "Legs",
                    "exercises": [
                        {"name": "Squat", "sets": 4, "reps": "8-10"},
                        {"name": "Leg Press", "sets": 3, "reps": "10-12"},
                        {"name": "Standing Calf Raise", "sets": 4, "reps": "15"}
                    ]
                }
            ]
        }
    # Demo Data
    def _demo_recommendation(self, dietary_needs: str, calories: int):
        diet = (
            dietary_needs.lower()
            if dietary_needs
            else "veg"
        )

        meals = {
            "veg": {
                "meal_name":
                    "Mediterranean Power Bowl",

                "ingredients": [
                    {
                        "name": "Quinoa",
                        "quantity": "1 cup",
                        "calories": 220
                    },
                    {
                        "name": "Chickpeas",
                        "quantity": "1 cup",
                        "calories": 270
                    },
                    {
                        "name": "Mixed Vegetables",
                        "quantity": "1 cup",
                        "calories": 150
                    },
                    {
                        "name": "Olive Oil",
                        "quantity": "1 tbsp",
                        "calories": 120
                    }
                ],

                "tags": [
                    "Vegetarian",
                    "Balanced",
                    "High-Fiber"
                ]
            },

            "high_protein": {
                "meal_name":
                    "Protein Recovery Plate",

                "ingredients": [
                    {
                        "name": "Paneer",
                        "quantity": "200g",
                        "calories": 320
                    },
                    {
                        "name": "Brown Rice",
                        "quantity": "1 cup",
                        "calories": 210
                    },
                    {
                        "name": "Greek Yogurt",
                        "quantity": "1 bowl",
                        "calories": 140
                    }
                ],

                "tags": [
                    "High-Protein",
                    "Muscle Gain",
                    "Recovery"
                ]
            },

            "vegan": {
                "meal_name":
                    "Vegan Energy Bowl",

                "ingredients": [
                    {
                        "name": "Tofu",
                        "quantity": "200g",
                        "calories": 180
                    },
                    {
                        "name": "Sweet Potato",
                        "quantity": "1 medium",
                        "calories": 160
                    },
                    {
                        "name": "Spinach",
                        "quantity": "1 cup",
                        "calories": 40
                    }
                ],

                "tags": [
                    "Vegan",
                    "Plant-Based",
                    "Clean Eating"
                ]
            }
        }
        selected = meals.get(diet, meals["veg"])
        protein = int(calories * 0.2 / 4)
        carbs = int(calories * 0.5 / 4)
        fat = int(calories * 0.3 / 9)
        return {
            "meal_name": selected["meal_name"],
            "diet_type": diet,
            "total_calories": calories,
            "macronutrients": {
                "protein": protein,
                "carbs": carbs,
                "fat": fat
            },
            "micronutrients": {
                "iron_mg": 18,
                "calcium_mg": 800,
                "vitamin_b12_mcg": 2.4,
                "fiber_g": 30,
                "vitamin_d_mcg": 10
            },
            "ingredients": selected["ingredients"],
            "benefits": [
                "Balanced macro distribution",
                "Supports sustained energy",
                "Rich in essential nutrients"
            ],
            "warnings": [
                "Adjust portions based on activity level"
            ],
            "meal_tags": selected["tags"]
        }
    
    def _demo_analysis(self, food_description: str):
        return {
            "food": food_description,
            "calories": 400,
            "macronutrients": {
                "protein": 20,
                "carbs": 45,
                "fat": 12
            },
            "micronutrients": {
                "iron_mg": 4,
                "calcium_mg": 150,
                "fiber_g": 5
            },
            "benefits": [
                "Provides sustained energy",
                "Supports muscle recovery",
                "Contains essential vitamins"
            ]
        }

    def get_workout(self,goal,experience,workout_days,workout_location,body_type):
        if self.demo_mode:
            return {
                "success": False,
                "source": "demo",
                "workout": self._demo_workout()
            }
        prompt = f"""
            You are an expert certified fitness coach.
            Generate a personalized workout plan.
            User Profile:
            - Goal: {goal}
            - Experience: {experience}
            - Workout Days: {workout_days}
            - Workout Location: {workout_location}
            - Body Type: {body_type}
            Rules:
            1. Return EXACTLY {workout_days} workout days.
            2. Adapt the workout to the body type:
            - Ectomorph → higher volume, muscle gain focus.
            - Mesomorph → balanced hypertrophy and strength.
            - Endomorph → fat loss, compound movements, higher calorie burn.
            3. Adapt to experience:
            - Beginner → simple exercises and moderate volume.
            - Intermediate → progressive overload and split routines.
            - Advanced → advanced volume and intensity.
            4. Workout location:
                - home → Use ONLY bodyweight, resistance bands and dumbbells.
                - gym → Use gym equipment and machines.
                - both → Create a hybrid workout.
                For every exercise, if there is a good home alternative, write it like:
                - "Push-ups (Home) / Bench Press (Gym)"
                - "Resistance Band Row (Home) / Cable Row (Gym)"
                - "Goblet Squat (Home) / Barbell Squat (Gym)"
                Do not generate gym-only workouts when workout_location is "both". variation and a gym variation.
            5. Every exercise must contain:
            - name
            - sets
            - reps
            6. Also include:
            - program_name
            - summary (2-3 short sentences)
            - estimated_duration (minutes)
            - rest_between_sets
            Return ONLY valid JSON.
            Schema:
            {{
            "program_name": "",
            "summary": "",
            "estimated_duration": "",
            "rest_between_sets": "",
            "days": [
                {{
                "name": "",
                "exercises": [
                    {{
                    "name": "",
                    "sets": 0,
                    "reps": ""
                    }}
                ]
                }}
            ]
            }}
        """
        response = self._call_llm(prompt)
        # print("========== RAW GEMINI RESPONSE ==========")
        # print(response)
        # print("=========================================")
        parsed = self._parse_response(response)
        return {
            "success": True,
            "source": "gemini",
            "workout": parsed
        }