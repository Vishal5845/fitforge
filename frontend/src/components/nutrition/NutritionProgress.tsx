"use client";

interface NutritionProgressProps {
  title: string;
  consumed: number;
  target: number;
  unit: string;
}

export default function NutritionProgress({
  title,
  consumed,
  target,
  unit,
}: NutritionProgressProps) {
  const percentage =
    target === 0
      ? 0
      : Math.min(
          Math.round((consumed / target) * 100),
          100
        );

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold text-slate-900">
          {title}
        </h3>
        <span className="text-sm font-medium text-slate-500">
          {consumed} / {target} {unit}
        </span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-blue-600 transition-all duration-700"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
      <p className="mt-2 text-right text-sm font-semibold text-blue-600">
        {percentage}%
      </p>
    </div>
  );
}