export interface WorkoutHistoryItem {
  id: string;

  workoutName: string;
  workoutSlug: string;

  completedAt: string;

  duration: number;
  calories: number;

  exercises: number;
  totalSets: number;

  xp: number;

  aiFeedback: string[];
}