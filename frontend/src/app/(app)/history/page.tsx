"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import {
  getWorkoutHistory,
  WorkoutHistoryItem,
} from "@/lib/api/history";
import HistoryHero from "@/components/history/HistoryHero";
import HistoryStats from "@/components/history/HistoryStats";
import HistoryCard from "@/components/history/HistoryCard";
import EmptyHistory from "@/components/history/EmptyHistory";

export default function HistoryPage() {
  const { data: session } = useSession();

  const [history, setHistory] = useState<
    WorkoutHistoryItem[]
  >([]);

  useEffect(() => {
    async function loadHistory() {
      if (!session?.user?.userId) return;

      const data = await getWorkoutHistory(
        session.user.userId
      );

      setHistory(data);
    }

    loadHistory();
  }, [session]);
 
  const totalMinutes = history.reduce(
    (sum, item) => sum + item.estimated_duration,
    0
  );
  const totalExercises = history.reduce(
    (sum, item) => sum + item.total_exercises,
    0
  );
  const streak = (() => {
    if (history.length === 0) return 0;

    const dates = new Set(
      history.map((item) =>
        new Date(item.completed_at)
          .toISOString()
          .split("T")[0]
      )
    );
    let currentDate = new Date();
    let currentStreak = 0;
    while (true) {
      const dateKey = currentDate
        .toISOString()
        .split("T")[0];
      if (!dates.has(dateKey)) {
        break;
      }
      currentStreak++;
      currentDate.setDate(
        currentDate.getDate() - 1
      );
    }
    return currentStreak;
  })();
  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-5xl space-y-8 text-black">
        <HistoryHero
          totalWorkouts={history.length}
        />
        <HistoryStats
          totalWorkouts={history.length}
          totalMinutes={totalMinutes}
          totalExercises={totalExercises}
          streak={streak}
        />
        {history.length === 0 ? (
          <EmptyHistory />
        ) : (
          <div className="space-y-5">
            {history.map((item, index) => (
              <HistoryCard
                key={index}
                workoutName={item.workout_name}
                dayName={item.day_name}
                exercises={item.total_exercises}
                duration={item.estimated_duration}
                completedAt={item.completed_at}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}