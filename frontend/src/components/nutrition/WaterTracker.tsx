"use client";

import { Droplets, Minus, Plus } from "lucide-react";

interface WaterTrackerProps {
  current: number;
  target: number;
  onAdd: () => void;
  onRemove: () => void;
}

export default function WaterTracker({
  current,
  target,
  onAdd,
  onRemove,
}: WaterTrackerProps) {
  const percentage = Math.min(
    Math.round((current / target) * 100),
    100
  );

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-2xl bg-blue-50 p-3">
          <Droplets className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Water Intake
          </h2>
          <p className="text-sm text-slate-500">
            Stay hydrated
          </p>
        </div>
      </div>
      <div className="mb-4 flex items-center justify-between">
        <span className="text-lg font-semibold text-slate-900">
          {(current / 1000).toFixed(1)}L /{" "}
          {(target / 1000).toFixed(1)}L
        </span>
        <span className="font-semibold text-blue-600">
          {percentage}%
        </span>
      </div>
      <div className="mb-6 h-3 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-blue-600 transition-all duration-500"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
      <div className="flex gap-4">
        <button
          onClick={onRemove}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 font-semibold hover:bg-slate-50"
        >
          <Minus className="h-5 w-5" />
          250 ml
        </button>
        <button
          onClick={onAdd}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          250 ml
        </button>
      </div>
    </div>
  );
}