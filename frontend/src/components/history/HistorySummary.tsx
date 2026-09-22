"use client";

import {
  Dumbbell,
  Flame,
  Trophy,
  FlameKindling,
} from "lucide-react";
import { WorkoutHistoryItem } from "@/types/history";

interface Props {
  history: WorkoutHistoryItem[];
}

export default function HistorySummary({ history }: Props) {
  const totalWorkouts = history.length;

  const totalCalories = history.reduce(
    (sum, workout) => sum + workout.calories,
    0
  );

  const totalXP = history.reduce(
    (sum, workout) => sum + workout.xp,
    0
  );

  // Temporary until we calculate a real streak
  const currentStreak =
    history.length > 0 ? Math.min(history.length, 7) : 0;

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <SummaryCard
        icon={<Dumbbell className="h-6 w-6" />}
        title="Total Workouts"
        value={totalWorkouts}
      />

      <SummaryCard
        icon={<Flame className="h-6 w-6" />}
        title="Calories Burned"
        value={totalCalories}
      />

      <SummaryCard
        icon={<Trophy className="h-6 w-6" />}
        title="XP Earned"
        value={totalXP}
      />

      <SummaryCard
        icon={<FlameKindling className="h-6 w-6" />}
        title="Current Streak"
        value={`${currentStreak} Days`}
      />
    </div>
  );
}

function SummaryCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string | number;
}) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl">
      <div className="mb-4 text-orange-400">
        {icon}
      </div>

      <p className="text-sm text-slate-400">
        {title}
      </p>

      <h2 className="mt-2 text-3xl font-black text-white">
        {value}
      </h2>
    </div>
  );
}