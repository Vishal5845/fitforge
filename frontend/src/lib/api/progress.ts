import { API_BASE_URL } from "./config";

export interface ProgressStats {
  current_streak: number;
  total_workouts: number;
  total_minutes: number;
  total_exercises: number;
}

export async function getProgress(
  userId: string
): Promise<ProgressStats> {
  const response = await fetch(
    `${API_BASE_URL}/progress/${userId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch progress");
  }

  return response.json();
}