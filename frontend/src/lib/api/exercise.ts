import { API_BASE_URL } from "./config";

export interface ExerciseDetail {
  name: string;
  muscle_group: string;
  difficulty: string;
  equipment: string;
  instructions: string[];
  tips: string[];
  mistakes: string[];
  animation_url?: string;
}

export async function getExercise(
  exerciseName: string
): Promise<ExerciseDetail> {
  const response = await fetch(
    `${API_BASE_URL}/exercise/${encodeURIComponent(exerciseName)}`
  );
  console.log(response)
  if (!response.ok) {
    console.error("Status:", response.status);
    console.error("URL:", response.url);
    console.error("Body:", await response.text());

    throw new Error("Failed to fetch exercise");
  }

  return response.json();
}