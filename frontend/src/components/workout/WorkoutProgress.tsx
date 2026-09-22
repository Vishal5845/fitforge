"use client";

interface WorkoutProgressProps {
  completed: number;
  total: number;
}

export default function WorkoutProgress({
  completed,
  total,
}: WorkoutProgressProps) {
  const progress =
    total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Workout Progress
          </h2>
          <p className="text-sm text-slate-500">
            {completed} of {total} exercises completed
          </p>
        </div>
        <span className="rounded-xl bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
          {progress}%
        </span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-blue-600 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}