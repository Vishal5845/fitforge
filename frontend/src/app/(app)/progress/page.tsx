"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import {
  getProgress,
  ProgressStats,
} from "@/lib/api/progress";

import {
  Flame,
  Dumbbell,
  Clock3,
  Target,
} from "lucide-react";

import MetricCard from "@/components/dashboard/MetricCard";
import WeeklyActivity from "@/components/progress/WeeklyActivity";
import Achievements from "@/components/progress/Achievements";
import MonthlyWorkoutChart from "@/components/progress/MonthlyWorkoutChart";

export default function ProgressPage() {
  const { data: session } = useSession();

  const [stats, setStats] =
    useState<ProgressStats | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function load() {
      if (!session?.user?.userId) return;

      try {
        const data = await getProgress(
          session.user.userId
        );

        setStats(data);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [session]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading Progress...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">
            Progress
          </h1>
          <p className="mt-2 text-slate-500">
            Track your fitness journey.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            title="Current Streak"
            value={`${stats?.current_streak ?? 0} Days`}
            icon={<Flame className="h-6 w-6" />}
          />
          <MetricCard
            title="Workouts"
            value={stats?.total_workouts ?? 0}
            icon={<Dumbbell className="h-6 w-6" />}
          />
          <MetricCard
            title="Minutes"
            value={stats?.total_minutes ?? 0}
            icon={<Clock3 className="h-6 w-6" />}
          />
          <MetricCard
            title="Exercises"
            value={stats?.total_exercises ?? 0}
            icon={<Target className="h-6 w-6" />}
          />
        </div>
        <WeeklyActivity />
        <Achievements
          totalWorkouts={stats?.total_workouts ?? 0}
          currentStreak={stats?.current_streak ?? 0}
          totalExercises={stats?.total_exercises ?? 0}
        />
        <MonthlyWorkoutChart />
      </div>
    </main>
  );
}