import { API_BASE_URL } from "./config";

export interface MealHistory {
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
  snacks: boolean;
}

export async function getMealHistory(
  userId: string
): Promise<MealHistory> {
  const response = await fetch(
    `${API_BASE_URL}/meal/history/${userId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch meal history");
  }

  return response.json();
}