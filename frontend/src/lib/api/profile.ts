import { API_BASE_URL } from "./config";

export interface UserProfile {
  user_id: string;
  name: string;
  email: string;

  age: number;
  gender: string;

  height: number;
  weight: number;

  goal: string;
  experience: string;

  workout_days: number;
  workout_location: string;

  body_type: string;

  is_onboarding_completed: boolean;
  profile_updated: boolean;
}

export async function getProfile(
  userId: string
): Promise<UserProfile> {
  const response = await fetch(
    `${API_BASE_URL}/users/user-id/${userId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch profile");
  }

  return response.json();
}