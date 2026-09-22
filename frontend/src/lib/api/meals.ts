import { API_BASE_URL } from "./config";

export interface Ingredient {
  name: string;
  quantity: string;
}

export interface Meal {
  meal_name: string;
  calories: number;
  ingredients: Ingredient[];
}

export interface MealPlan {
  user_id: string;

  plan_name: string;
  goal: string;
  diet_type: string;

  daily_calories: number;

  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
  snacks: Meal;

  macronutrients: {
    protein: number;
    carbs: number;
    fat: number;
  };
}

export async function getMeal(
  userId: string
): Promise<MealPlan> {
  const response = await fetch(
    `${API_BASE_URL}/meal/${userId}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch meal plan");
  }
  return response.json();
}

export async function generateMeal(payload: {
  user_id: string;
  goal: string;
  diet_type: string;
  body_type: string;
}) {
  const response = await fetch(
    `${API_BASE_URL}/meal/generate`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );
  return response;
}

export async function toggleMeal(payload: {
  user_id: string;
  meal: string;
}) {
  const response = await fetch(
    `${API_BASE_URL}/meal/toggle`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to toggle meal");
  }
  return response.json();
}