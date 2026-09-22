import { WorkoutHistoryItem } from "@/types/history";

const STORAGE_KEY = "fitforge-workout-history";

export function getWorkoutHistory(): WorkoutHistoryItem[] {
  if (typeof window === "undefined") return [];

  const history = localStorage.getItem(STORAGE_KEY);

  return history ? JSON.parse(history) : [];
}

export function saveWorkoutHistory(item: WorkoutHistoryItem) {
  const history = getWorkoutHistory();

  history.unshift(item);

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(history)
  );
}

export function deleteWorkoutHistory(id: string) {
  const history = getWorkoutHistory().filter(
    (workout) => workout.id !== id
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(history)
  );
}