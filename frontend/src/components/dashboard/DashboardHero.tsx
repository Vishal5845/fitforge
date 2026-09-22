"use client";

import { useSession } from "next-auth/react";
import { Clock3, Dumbbell, Timer } from "lucide-react";
import { WorkoutProgram } from "@/types/workout";
import Link from "next/link";

interface Props {
  workout: WorkoutProgram | null;
  loading: boolean;
}

export default function DashboardHero({
  workout,
  loading,
}: Props) {
  const { data: session } = useSession();

  if (loading) {
    return (
      <div className="h-48 animate-pulse rounded-3xl border border-slate-200 bg-white" />
    );
  }
  console.log(workout);
  console.log(workout?.currentDay);
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        {/* Left */}
        <div className="w-full max-w-2xl">
          <p className="text-sm font-medium text-slate-500">
            👋 Welcome back,
          </p>
          <h1 className="mt-1 text-4xl font-bold text-slate-900">
            {session?.user?.name?.split(" ")[0]}
          </h1>
          <h2 className="mt-6 text-2xl font-semibold text-slate-900">
            {workout?.programName}
          </h2>
          <p className="mt-2 text-slate-500">
            {workout?.summary}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <div className="rounded-xl w-full sm:w-auto bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
              <Clock3 className="h-5 w-5 text-black" /> {workout?.estimatedDuration} min
            </div>
            <div className="rounded-xl w-full sm:w-auto bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
              <Dumbbell className="h-5 w-5 text-black" /> {workout?.days?.[0]?.exercises?.length} Exercises
            </div>
            <div className="rounded-xl w-full sm:w-auto bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
              <Timer className="h-5 w-5 text-black" />  {workout?.restBetweenSets}
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/workout"
              className="w-full rounded-xl bg-blue-600 px-6 py-3 text-center font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-md sm:w-auto"
            >
              ▶ Start Workout
            </Link>
            <Link
              href="/workout"
              className="w-full rounded-xl border border-slate-200 px-6 py-3 text-center font-semibold text-slate-700 transition-all hover:bg-slate-50 sm:w-auto"
            >
              View Program
            </Link>
          </div>
        </div>
        {/* Right */}
        <div className="w-full shrink-0 rounded-2xl bg-blue-50 px-6 py-4 md:w-auto">
          <p className="text-sm font-medium text-slate-500">
            Current Day
          </p>
          <p className="mt-1 text-3xl font-bold text-blue-600">
            🔥 {workout ? workout.currentDay + 1 : "--"}
          </p>
        </div>
      </div>
    </section>
  );
}