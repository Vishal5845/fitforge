import { getLatestExerciseHistory } from "@/lib/exerciseHistory";

export function recommendWeight(
  exerciseName: string,
  defaultWeight: number
) {
  const previous = getLatestExerciseHistory(exerciseName);
  if (!previous) {
    return {
      recommendedWeight: defaultWeight,
      confidence: "medium" as const,
      reason: "First time performing this exercise.",
      previous,
    };
  }
  return {
    recommendedWeight: previous.weight + 2.5,
    confidence: "high" as const,
    reason: `You completed ${previous.weight} kg × ${previous.reps} last session. Increase by 2.5 kg.`,
    previous,
    };
}