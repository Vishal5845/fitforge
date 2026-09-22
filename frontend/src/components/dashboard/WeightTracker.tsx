  "use client";

  import { Scale, Plus, Target } from "lucide-react";

  interface WeightTrackerProps {
    weight: number | null;
    targetWeight: number | null;
    startingWeight: number | null;
    onAdd: () => void;
    onSetGoal: () => void;
  }

  export default function WeightTracker({
  weight,
  targetWeight,
  startingWeight,
  onAdd,
  onSetGoal,
}: WeightTrackerProps) {
    let progress = 0;
    let remaining = 0;

    if (
      weight !== null &&
      targetWeight !== null &&
      startingWeight !== null
    ) {
      const totalDistance = Math.abs(
        startingWeight - targetWeight
      );
      const completedDistance = Math.abs(
        startingWeight - weight
      );
      if (totalDistance > 0) {
        progress =
          (completedDistance / totalDistance) * 100;
      }
      progress = Math.max(
        0,
        Math.min(progress, 100)
      );  
      remaining = Math.abs(
        weight - targetWeight
      );
    }


    return (
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-blue-50 p-3">
              <Scale className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Weight
              </h2>
              <p className="text-sm text-slate-500">
                Track your progress
              </p>
            </div>
          </div>
          <button
            onClick={onAdd}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            Add
          </button>
        </div>
        {/* Current Weight */}
        <div className="mt-6">
          {weight !== null ? (
            <>
              <p className="text-4xl font-bold text-slate-900">
                {weight.toFixed(1)}
                <span className="ml-1 text-lg font-medium text-slate-500">
                  kg
                </span>
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Current weight
              </p>
            </>
          ) : (
            <>
              <p className="text-xl font-semibold text-slate-900">
                No weight recorded
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Add your first measurement.
              </p>
            </>
          )}
        </div>
        {/* Goal */}
        <div className="mt-6 rounded-2xl bg-slate-50 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-slate-700">
                Target Weight
              </span>
            </div>
            {targetWeight !== null ? (
              <span className="font-semibold text-slate-900">
                {targetWeight.toFixed(1)} kg
              </span>
            ) : (
              <button
                onClick={onSetGoal}
                className="text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                Set Goal
              </button>
            )}
          </div>
        </div>
        {/* Goal Action */}
        {targetWeight !== null && (
          <button
            onClick={onSetGoal}
            className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Change target
          </button>
        )}
        {/* Goal Progress */}
        {targetWeight !== null &&
          startingWeight !== null &&
          weight !== null && (
            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-slate-600">
                  Goal Progress
                </span>
                <span className="text-sm font-semibold text-blue-600">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-blue-600 transition-all duration-700"
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>
              <p className="mt-2 text-xs text-slate-500">
                {remaining.toFixed(1)} kg remaining
              </p>
            </div>
          )}
      </section>
    );
  }