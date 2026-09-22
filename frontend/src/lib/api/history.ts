import { API_BASE_URL } from "./config";

export interface WorkoutHistoryItem {
  workout_name: string;
  day_name: string;
  total_exercises: number;
  estimated_duration: number;
  completed_at: string;
}

export async function getWorkoutHistory(userId: string) {
  const response = await fetch(
    `${API_BASE_URL}/workout/history/${userId}`
  );

  if (!response.ok) {
    throw new Error("Failed to load workout history");
  }

  return response.json() as Promise<WorkoutHistoryItem[]>;
}