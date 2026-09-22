import { getExerciseHistory } from "./exerciseHistory";

export function getPersonalRecord(exerciseName: string): number {
  const history = getExerciseHistory().filter(
    (item) => item.exerciseName === exerciseName
  );
  if (history.length === 0) {
    return 0;
  }
  return Math.max(...history.map((item) => item.weight));
}

export function isNewPersonalRecord(
  exerciseName: string,
  currentWeight: number
): boolean {
  const previousBest = getPersonalRecord(exerciseName);
  return currentWeight > previousBest;
}