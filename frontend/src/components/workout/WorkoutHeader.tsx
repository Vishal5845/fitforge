"use client";

import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock3 } from "lucide-react";

interface WorkoutHeaderProps {
  dayNumber: number;
  dayName: string;
  estimatedDuration: number;
}

export default function WorkoutHeader({
  dayNumber,
  dayName,
  estimatedDuration,
}: WorkoutHeaderProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <Link
            href="/dashboard"
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-blue-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-slate-900">
            Workout Session
          </h1>
          <p className="mt-2 text-slate-500">
            Complete today's workout one exercise at a time.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-2 text-blue-700">
            <CalendarDays className="h-5 w-5" />
            <span className="font-semibold">
              Day {dayNumber} • {dayName}
            </span>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2 text-slate-700">
            <Clock3 className="h-5 w-5" />
            <span>{estimatedDuration} min</span>
          </div>
        </div>
      </div>
    </div>
  );
}