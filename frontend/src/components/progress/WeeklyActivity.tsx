"use client";

import { WeeklyActivityItem } from "@/lib/api/progress";

interface WeeklyActivityProps {
  days: WeeklyActivityItem[];
}

export default function WeeklyActivity({
  days,
}: WeeklyActivityProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <h2 className="mb-5 text-xl font-bold text-slate-900 sm:mb-6 sm:text-2xl">
        Weekly Activity
      </h2>
      <div className="grid grid-cols-7 gap-1 sm:gap-4">
        {days.map((item) => (
          <div
            key={item.day}
            className="flex min-w-0 flex-col items-center"
          >
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-xl border text-base transition-all sm:h-14 sm:w-14 sm:rounded-2xl sm:text-xl ${
                item.completed
                  ? "border-emerald-200 bg-emerald-100"
                  : "border-slate-200 bg-slate-100"
              }`}
            >
              {item.completed ? "✅" : "○"}
            </div>
            <span className="mt-2 text-xs font-medium text-slate-600 sm:text-sm">
              {item.day}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}