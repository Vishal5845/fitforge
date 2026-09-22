export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  completed?: boolean;
  animation_url?: string;
}

export interface WorkoutDay {
  id: string;
  name: string;
  exercises: Exercise[];
}

export interface WorkoutProgram {
  id: string;
  userId: string;
  programName: string;
  estimatedDuration: number;
  restBetweenSets: string;
  summary: string;
  updatedAt: string;
  currentDay: number;
  days: WorkoutDay[];
}