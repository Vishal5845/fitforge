"use client";

import { Trophy, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface WorkoutCompleteProps {
  totalExercises: number;
  duration: number;
}

export default function WorkoutComplete({
  totalExercises,
  duration,
}: WorkoutCompleteProps) {
  const router = useRouter();

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
        <Trophy className="h-10 w-10 text-green-600" />
      </div>
      <h1 className="mt-6 text-4xl font-bold text-slate-900">
        Workout Complete!
      </h1>
      <p className="mt-3 text-slate-500">
        Excellent work! You completed today's workout.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-slate-50 p-5">
          <CheckCircle2 className="mx-auto mb-2 h-7 w-7 text-green-600" />
          <p className="text-sm text-slate-500">
            Exercises Completed
          </p>
          <p className="text-2xl font-bold">
            {totalExercises}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-5">
          <p className="text-sm text-slate-500">
            Estimated Duration
          </p>
          <p className="text-2xl font-bold">
            {duration} min
          </p>
        </div>
      </div>
      <button
        onClick={() => router.push("/dashboard")}
        className="mt-8 rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        Back to Dashboard
      </button>
    </div>
  );
}