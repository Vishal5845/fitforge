export interface Ingredient {
  name: string;
  quantity: string;
}

export interface Meal {
  meal_name: string;
  calories: number;
  ingredients: Ingredient[];
}

export interface Macronutrients {
  protein: number;
  carbs: number;
  fat: number;
}

export interface MealPlan {
  plan_name: string;
  goal: string;
  diet_type: string;
  daily_calories: number;

  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
  snacks: Meal;

  macronutrients: Macronutrients;
}
export type MealType =
| "breakfast"
| "lunch"
| "snacks"
| "dinner";