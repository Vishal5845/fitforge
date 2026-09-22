import { API_BASE_URL } from "./config";
import { WorkoutProgram } from "@/types/workout";

export async function getWorkout(
  userId: string
): Promise<WorkoutProgram> {
  const response = await fetch(`${API_BASE_URL}/workout/${userId}`);
  console.log(response)

  if (!response.ok) {
    throw new Error("Failed to fetch workout");
  }

  const data = await response.json();

  return {
    id: data.user_id,
    userId: data.user_id,
    programName: data.program_name,
    estimatedDuration: data.estimated_duration,
    restBetweenSets: data.rest_between_sets,
    summary: data.summary,
    updatedAt: data.updated_at,
    currentDay: 0,
    days: data.days.map((day: any, index: number) => ({
      id: String(index + 1),
      name: day.name,
      exercises: day.exercises.map((exercise: any, exerciseIndex: number) => ({
        id: String(exerciseIndex + 1),
        name: exercise.name,
        sets: exercise.sets,
        reps: exercise.reps,
        completed: false,
      })),
    })),
  };
}


export async function generateWorkout(payload: {
  user_id: string;
  goal: string;
  experience: string;
  workout_days: number;
  workout_location: string;
  body_type: string;
}) {
  return fetch(`${API_BASE_URL}/workout/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}

export async function completeWorkout(payload: {
  user_id: string;
  workout_name: string;
  day_name: string;
  total_exercises: number;
  estimated_duration: number;
}) {
  const response = await fetch(
    `${API_BASE_URL}/workout/complete`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to complete workout");
  }

  return response.json();
}