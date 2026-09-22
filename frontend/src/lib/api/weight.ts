import { API_BASE_URL } from "@/lib/api/config";

export interface WeightEntry {
  user_id: string;
  weight: number;
  recorded_at: string;
}
export interface WeightGoal {
  user_id: string;
  starting_weight: number;
  target_weight: number;
}

export async function addWeight(
  userId: string,
  weight: number
): Promise<WeightEntry> {
  const response = await fetch(
    `${API_BASE_URL}/weight/add`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        weight,
      }),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to save weight");
  }
  return response.json();
}

export async function getLatestWeight(
  userId: string
): Promise<WeightEntry | null> {
  const response = await fetch(
    `${API_BASE_URL}/weight/${userId}`
  );
  if (response.status === 404) {
    return null;
  }
  if (!response.ok) {
    throw new Error("Failed to fetch weight");
  }
  return response.json();
}

export async function getWeightHistory(
  userId: string
): Promise<WeightEntry[]> {
  const response = await fetch(
    `${API_BASE_URL}/weight/${userId}/history`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch weight history");
  }
  return response.json();
}

export async function setWeightGoal(
  userId: string,
  targetWeight: number
): Promise<WeightGoal> {
  const response = await fetch(
    `${API_BASE_URL}/weight/goal`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        target_weight: targetWeight,
      }),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to save weight goal");
  }
  return response.json();
}

export async function getWeightGoal(
  userId: string
): Promise<WeightGoal | null> {
  const response = await fetch(
    `${API_BASE_URL}/weight/goal/${userId}`
  );
  if (response.status === 404) {
    return null;
  }
  if (!response.ok) {
    throw new Error("Failed to fetch weight goal");
  }
  return response.json();
}