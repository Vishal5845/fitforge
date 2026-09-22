import { Dumbbell } from "lucide-react";
import Link from "next/link";

export default function EmptyHistory() {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-50">
        <Dumbbell className="h-10 w-10 text-blue-600" />
      </div>
      <h2 className="mt-6 text-3xl font-bold text-slate-900">
        No Workouts Yet
      </h2>
      <p className="mx-auto mt-3 max-w-md text-slate-500">
        Complete your first AI workout to build your fitness history and track your progress over time.
      </p>
      <Link
        href="/dashboard"
        className="mt-8 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        Generate Workout
      </Link>
    </div>
  );
}