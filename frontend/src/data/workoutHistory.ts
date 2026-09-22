export interface WorkoutExercise {
  name: string;
  muscle: string;
  equipment: string;
  weight: string;
  sets: number;
  reps: string;
  rest: number;
}

export interface WorkoutHistory {
  id: string;
  workoutName: string;

  category: "Push" | "Pull" | "Legs" | "Upper" | "Lower" | "Full Body";
  completedAt: string;
  duration: number;
  calories: number;
  exercises: number;
  totalSets: number;
  aiFeedback: string[];

  exerciseDetails: WorkoutExercise[];
}

export const workoutHistory: WorkoutHistory[] = [
  {
    id: "1",
    workoutName: "Upper Body Strength",
    category: "Upper",
    completedAt: "2026-07-19",
    duration: 58,
    calories: 420,
    exercises: 8,
    totalSets: 24,
    aiFeedback: [
      "Excellent consistency throughout the workout.",
      "Increase Bench Press by 2.5 kg next session.",
      "Rest periods were well managed.",
    ],
    exerciseDetails: [
      {
        name: "Bench Press",
        muscle: "Chest",
        equipment: "Barbell",
        weight: "60 kg",
        sets: 3,
        reps: "10",
        rest: 90,
      },
      {
        name: "Incline Dumbbell Press",
        muscle: "Upper Chest",
        equipment: "Dumbbells",
        weight: "22.5 kg",
        sets: 3,
        reps: "12",
        rest: 90,
      },
    ]
  },
  {
    id: "2",
    workoutName: "Push Day",
    category: "Push",
    completedAt: "2026-07-17",
    duration: 62,
    calories: 455,
    exercises: 7,
    totalSets: 21,
    aiFeedback: [
      "Strong shoulder stability.",
      "Maintain current incline press weight.",
    ],
    exerciseDetails: [
      {
        name: "Bench Press",
        muscle: "Chest",
        equipment: "Barbell",
        weight: "60 kg",
        sets: 3,
        reps: "10",
        rest: 90,
      },
      {
        name: "Incline Dumbbell Press",
        muscle: "Upper Chest",
        equipment: "Dumbbells",
        weight: "22.5 kg",
        sets: 3,
        reps: "12",
        rest: 90,
      },
    ]
  },
];