import { ExerciseHistoryItem } from "@/types/exerciseHistory";

const STORAGE_KEY = "fitforge-exercise-history";

export function getExerciseHistory(): ExerciseHistoryItem[] {
  if (typeof window === "undefined") {
    return [];
  }
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveExerciseHistory(
  item: ExerciseHistoryItem
) {
  const history = getExerciseHistory();
  history.unshift(item);
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(history)
  );
}

export function getLatestExerciseHistory(
  exerciseName: string
): ExerciseHistoryItem | null {
  const history = getExerciseHistory();
  return (
    history.find(
      (exercise) => exercise.exerciseName === exerciseName
    ) ?? null
  );
}