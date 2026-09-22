import { API_BASE_URL } from "./config";

export interface WaterSummary {
  current_ml: number;
  target_ml: number;
}

export async function getWater(
  userId: string
): Promise<WaterSummary> {
  const response = await fetch(
    `${API_BASE_URL}/water/${userId}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch water");
  }
  return response.json();
}

export async function updateWater(payload: {
  user_id: string;
  amount: number;
}): Promise<WaterSummary> {
  const response = await fetch(
    `${API_BASE_URL}/water/update`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to update water");
  }
  return response.json();
}