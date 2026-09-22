"use client";

import {
  Dumbbell,
  Target,
  Repeat,
  Trophy,
  Wrench,
  Lightbulb,
  TriangleAlert,
} from "lucide-react";

interface ExerciseCardProps {
  name: string;
  muscleGroup: string;
  difficulty: string;
  equipment: string;
  sets: number;
  reps: string;
  instructions: string[];
  tips: string[];
  mistakes: string[];
  animation_url?: string;
}

export default function ExerciseCard({
  name,
  muscleGroup,
  difficulty,
  equipment,
  sets,
  reps,
  instructions,
  tips,
  mistakes,
}: ExerciseCardProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      {/* Header */}
      <div className="mb-5 flex items-start justify-between">
        <div>
          <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
            Current Exercise
          </span>
          <h2 className="mt-4 text-3xl font-bold text-slate-900">
            {name}
          </h2>
        </div>
        <div className="rounded-2xl bg-blue-50 p-4">
          <Dumbbell className="h-8 w-8 text-blue-600" />
        </div>
      </div>
      {/* Stats */}
      <div className="mt-8 grid gap-4 md:grid-cols-5">
        {/* Muscle */}
        <div className="rounded-2xl bg-slate-50 p-4">
          <div className="mb-2 flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            <span className="text-sm text-slate-500">
              Muscle
            </span>
          </div>
          <p className="font-semibold text-slate-900">
            {muscleGroup}
          </p>
        </div>
        {/* Difficulty */}
        <div className="rounded-2xl bg-slate-50 p-4">
          <div className="mb-2 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-amber-500" />
            <span className="text-sm text-slate-500">
              Difficulty
            </span>
          </div>
          <p className="font-semibold text-slate-900">
            {difficulty}
          </p>
        </div>
        {/* Equipment */}
        <div className="rounded-2xl bg-slate-50 p-4">
          <div className="mb-2 flex items-center gap-2">
            <Wrench className="h-5 w-5 text-indigo-600" />
            <span className="text-sm text-slate-500">
              Equipment
            </span>
          </div>
          <p className="font-semibold text-slate-900">
            {equipment}
          </p>
        </div>
        {/* Sets */}
        <div className="rounded-2xl bg-slate-50 p-4">
          <div className="mb-2 flex items-center gap-2">
            <Repeat className="h-5 w-5 text-blue-600" />
            <span className="text-sm text-slate-500">
              Sets
            </span>
          </div>
          <p className="font-semibold text-slate-900">
            {sets}
          </p>
        </div>
        {/* Reps */}
        <div className="rounded-2xl bg-slate-50 p-4">
          <div className="mb-2 flex items-center gap-2">
            <Repeat className="h-5 w-5 text-blue-600" />
            <span className="text-sm text-slate-500">
              Reps
            </span>
          </div>
          <p className="font-semibold text-slate-900">
            {reps}
          </p>
        </div>
      </div>
      {/* Instructions */}
      <div className="mt-10">
        <h3 className="mb-4 text-xl font-semibold text-slate-900">
          Instructions
        </h3>
        <ul className="space-y-3">
          {instructions.map((step, index) => (
            <li
              key={index}
              className="flex items-start gap-3 rounded-xl bg-slate-50 p-4"
            >
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                {index + 1}
              </div>
              <p className="text-slate-600">
                {step}
              </p>
            </li>
          ))}
        </ul>
      </div>
      {/* Tips */}
      {tips.length > 0 && (
        <div className="mt-10 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
          <div className="mb-4 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-emerald-600" />
            <h3 className="text-lg font-semibold text-slate-900">
              Pro Tips
            </h3>
          </div>
          <ul className="space-y-2">
            {tips.map((tip, index) => (
              <li
                key={index}
                className="text-slate-700"
              >
                • {tip}
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Mistakes */}
      {mistakes.length > 0 && (
        <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-5">
          <div className="mb-4 flex items-center gap-2">
            <TriangleAlert className="h-5 w-5 text-red-600" />
            <h3 className="text-lg font-semibold text-slate-900">
              Common Mistakes
            </h3>
          </div>
          <ul className="space-y-2">
            {mistakes.map((mistake, index) => (
              <li
                key={index}
                className="text-slate-700"
              >
                • {mistake}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}