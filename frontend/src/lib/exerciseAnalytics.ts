import { getExerciseHistory } from "./exerciseHistory";

export interface ExerciseAnalytics {
  history: ReturnType<typeof getExerciseHistory>;
  sessions: number;
  personalRecord: number;
  averageWeight: number;
  averageReps: number;
  totalVolume: number;
  firstWeight: number;
  latestWeight: number;
  weightChange: number;

  firstVolume: number;
  latestVolume: number;
  volumeChange: number;

  averageVolume: number;

  confidence: "Low" | "Medium" | "High";
}

export function getExerciseAnalytics(
  exerciseName: string
): ExerciseAnalytics | null {
  const history = getExerciseHistory()
    .filter((item) => item.exerciseName === exerciseName)
    .sort(
      (a, b) =>
        new Date(a.completedAt).getTime() -
        new Date(b.completedAt).getTime()
    );

  if (history.length === 0) return null;

  const sessions = history.length;

  const personalRecord = Math.max(
    ...history.map((item) => item.weight)
  );

  const averageWeight =
    history.reduce((sum, item) => sum + item.weight, 0) / sessions;

  const averageReps =
    history.reduce((sum, item) => sum + item.reps, 0) / sessions;

  const totalVolume = history.reduce(
    (sum, item) => sum + item.weight * item.reps * item.sets,
    0
  );
  const firstWeight = history[0]?.weight ?? 0;
  const latestWeight = history[history.length - 1]?.weight ?? 0;
  const weightChange = latestWeight - firstWeight;
  const firstVolume =
    (history[0]?.weight ?? 0) *
    (history[0]?.reps ?? 0) *
    (history[0]?.sets ?? 0);

  const latestVolume =
      (history[history.length - 1]?.weight ?? 0) *
      (history[history.length - 1]?.reps ?? 0) *
      (history[history.length - 1]?.sets ?? 0);

  const volumeChange = latestVolume - firstVolume;
  const averageVolume = history.length === 0
        ? 0
        : history.reduce(
              (sum, item) =>
                  sum + item.weight * item.reps * item.sets,
              0
          ) / history.length;
  let confidence: "Low" | "Medium" | "High";
  if (history.length >= 8) {
      confidence = "High";
  } else if (history.length >= 4) {
      confidence = "Medium";
  } else {
      confidence = "Low";
  }
  return {
    history,
    sessions,
    personalRecord,
    averageWeight,
    averageReps,
    totalVolume,

    firstWeight,
    latestWeight,
    weightChange,

    firstVolume,
    latestVolume,
    volumeChange,

    averageVolume,

    confidence,
  };
}