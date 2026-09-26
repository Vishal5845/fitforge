import { API_BASE_URL } from "./config";

export interface WeeklyActivityItem {
  day: string;
  completed: boolean;
}

export interface ProgressStats {
  current_streak: number;
  total_workouts: number;
  total_minutes: number;
  total_exercises: number;
  weekly_activity: WeeklyActivityItem[];
}

export interface MonthlyWorkout {
  week: string;
  workouts: number;
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

export async function getMonthlyProgress(
  userId: string
): Promise<MonthlyWorkout[]> {
  const response = await fetch(
    `${API_BASE_URL}/progress/${userId}/monthly`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch monthly progress");
  }
  return response.json();
}