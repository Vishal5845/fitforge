"use client";

import { CheckCircle2, Circle } from "lucide-react";

interface SetTrackerProps {
  totalSets: number;
  completedSets: number;
  onCompleteSet: () => void;
}

export default function SetTracker({
  totalSets,
  completedSets,
  onCompleteSet,
}: SetTrackerProps) {
  const allCompleted = completedSets >= totalSets;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">
          Set Progress
        </h2>
        <p className="mt-1 text-slate-500">
          Complete each set before moving to the next exercise.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 text-black">
        {Array.from({ length: totalSets }).map((_, index) => {
          const done = index < completedSets;
          return (
            <div
              key={index}
              className={`rounded-2xl border p-4 transition-all duration-300 ${
                done
                    ? "scale-[1.02] border-green-200 bg-green-50"
                    : "border-slate-200 bg-slate-50"
                }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">
                  Set {index + 1}
                </span>
                {done ? (
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                ) : (
                  <Circle className="h-6 w-6 text-slate-400" />
                )}
              </div>
            </div>
          );
        })}
      </div>
      <button
        onClick={onCompleteSet}
        disabled={allCompleted}
        className="mt-6 w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        {allCompleted ? "All Sets Completed" : "Complete Current Set"}
      </button>
    </div>
  );
}