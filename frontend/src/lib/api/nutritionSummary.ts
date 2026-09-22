import { API_BASE_URL } from "./config";

export interface NutritionSummary {
  target_calories: number;
  consumed_calories: number;

  target_protein: number;
  consumed_protein: number;

  target_carbs: number;
  consumed_carbs: number;

  target_fat: number;
  consumed_fat: number;
}

export async function getNutritionSummary(
  userId: string
): Promise<NutritionSummary> {
  const response = await fetch(
    `${API_BASE_URL}/meal/summary/${userId}`
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch nutrition summary"
    );
  }

  return response.json();
}