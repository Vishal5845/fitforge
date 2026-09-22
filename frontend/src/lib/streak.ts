import { WorkoutHistoryItem } from "@/types/history";

export function calculateWorkoutStreak(
  history: WorkoutHistoryItem[]
) {
  if (history.length === 0) {
    return {
      currentStreak: 0,
      longestStreak: 0,
    };
  }

  const workoutDates = [
    ...new Set(
      history.map((workout) =>
        new Date(workout.completedAt).toDateString()
      )
    ),
  ]
    .map((date) => new Date(date))
    .sort((a, b) => b.getTime() - a.getTime());

  let currentStreak = 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const latest = new Date(workoutDates[0]);
  latest.setHours(0, 0, 0, 0);

  if (
    latest.getTime() !== today.getTime() &&
    latest.getTime() !== yesterday.getTime()
  ) {
    currentStreak = 0;
  } else {
    currentStreak = 1;

    for (let i = 1; i < workoutDates.length; i++) {
      const previous = new Date(workoutDates[i - 1]);
      const current = new Date(workoutDates[i]);
      previous.setHours(0, 0, 0, 0);
      current.setHours(0, 0, 0, 0);
      const diff =
        (previous.getTime() - current.getTime()) /
        (1000 * 60 * 60 * 24);
      if (diff === 1) {
        currentStreak++;
      } else {
        break;
      }
    }
  }

  let longestStreak = 1;
  let running = 1;

  for (let i = 1; i < workoutDates.length; i++) {
    const previous = new Date(workoutDates[i - 1]);
    const current = new Date(workoutDates[i]);
    previous.setHours(0, 0, 0, 0);
    current.setHours(0, 0, 0, 0);
    const diff =
      (previous.getTime() - current.getTime()) /
      (1000 * 60 * 60 * 24);

    if (diff === 1) {
      running++;
      longestStreak = Math.max(longestStreak, running);
    } else {
      running = 1;
    }
  }
  return {
    currentStreak,
    longestStreak,
  };
}