import { API_BASE_URL } from "@/lib/api/config";

export interface DashboardStats {
  total_workouts: number;
  total_minutes: number;
  total_exercises: number;
  current_streak: number;

  today_workout_completed: boolean;
  today_exercises: number;
  today_minutes: number;
}

export async function getUser(userId: string) {
  const res = await fetch(`${API_BASE_URL}/users/user-id/${userId}`);
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
}



export async function getDashboardStats(
  userId: string
): Promise<DashboardStats> {
  const res = await fetch(
    `${API_BASE_URL}/dashboard/stats/${userId}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch dashboard stats");
  }

  return res.json();
}