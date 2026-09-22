"use client";

import { ChevronRight, CheckCircle2 } from "lucide-react";
import { WorkoutProgram } from "@/types/workout";
import Link from "next/link";

interface Props {
  workout: WorkoutProgram | null;

  todayWorkoutCompleted?: boolean;
  todayExercises?: number;
  todayMinutes?: number;
}

export default function TodaysWorkout({
  workout,
  todayWorkoutCompleted = false,
  todayExercises = 0,
  todayMinutes = 0,
}: Props) {
  const currentDay =
    workout?.days?.[workout.currentDay];

  const totalExercises =
    currentDay?.exercises.length ?? 0;

  const progress = todayWorkoutCompleted
    ? 100
    : 0;

  return (
    <section className="h-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Today's Workout
          </h2>
          <p className="mt-1 text-slate-500">
            Day {(workout?.currentDay ?? 0) + 1}
            {" • "}
            {currentDay?.name ?? "Workout"}
          </p>
        </div>
        <Link
          href="/workout"
          className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-black hover:bg-slate-50"
        >
          View Program
        </Link>
      </div>
      {/* Progress */}
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-slate-600">
            Today's Progress
          </span>
          <span
            className={`text-sm font-semibold ${
              todayWorkoutCompleted
                ? "text-emerald-600"
                : "text-blue-600"
            }`}
          >
            {todayWorkoutCompleted
              ? "100% Complete"
              : "Not Started"}
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className={`h-full rounded-full transition-all duration-700 ${
              todayWorkoutCompleted
                ? "bg-emerald-500"
                : "bg-blue-600"
            }`}
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>
      {/* Exercises */}
      <div className="space-y-4">
        {currentDay?.exercises.map(
          (exercise, index) => (
            <div
              key={exercise.id}
              className="
                group
                flex
                items-center
                justify-between
                rounded-2xl
                border
                border-slate-200
                p-5
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-blue-300
                hover:bg-slate-50
                hover:shadow-md
              "
            >
              <div className="flex items-center gap-4">
                <div
                  className={`
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    transition-transform
                    duration-300
                    group-hover:scale-110
                    ${
                      todayWorkoutCompleted
                        ? "bg-emerald-100 text-emerald-600"
                        : "bg-blue-50 text-blue-600"
                    }
                  `}
                >
                  {todayWorkoutCompleted ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    index + 1
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">
                    {exercise.name}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {exercise.sets} Sets •{" "}
                    {exercise.reps} Reps
                  </p>
                </div>
              </div>
              {todayWorkoutCompleted ? (
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                  ✓ Completed
                </span>
              ) : (
                <ChevronRight
                  className="
                    text-slate-400
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              )}
            </div>
          )
        )}
      </div>
      {/* Today's Summary */}
      {todayWorkoutCompleted && (
        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-emerald-50 p-4">
            <p className="text-xs font-medium text-slate-500">
              Exercises
            </p>
            <p className="mt-1 text-lg font-bold text-slate-900">
              {todayExercises}
            </p>
          </div>
          <div className="rounded-2xl bg-blue-50 p-4">
            <p className="text-xs font-medium text-slate-500">
              Duration
            </p>
            <p className="mt-1 text-lg font-bold text-slate-900">
              {todayMinutes} min
            </p>
          </div>
        </div>
      )}
      {/* Action */}
      <div className="mt-6 border-t border-slate-100 pt-5">
        <Link
          href="/workout"
          className="block w-full rounded-2xl bg-blue-600 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
        >
          {todayWorkoutCompleted
            ? "View Workout"
            : "Start Workout"}
        </Link>
      </div>
    </section>
  );
}