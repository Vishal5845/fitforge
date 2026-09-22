"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import DashboardHero from "@/components/dashboard/DashboardHero";
import {
  getDashboardStats,
  DashboardStats,
} from "@/lib/api/dashboard";
import {
  getNutritionSummary,
  NutritionSummary,
} from "@/lib/api/nutritionSummary";
import {
  getWater,
  WaterSummary,
} from "@/lib/api/water";
import { getWorkout } from "@/lib/api/workouts";
import {
  getLatestWeight,
  getWeightHistory,
  addWeight,
  getWeightGoal,
  setWeightGoal,
  WeightEntry,
  WeightGoal,
} from "@/lib/api/weight";

import { WorkoutProgram } from "@/types/workout";
import {
  Clock3,
  Dumbbell,
  Flame,
  Target,
} from "lucide-react";

import MetricCard from "@/components/dashboard/MetricCard";
import TodaysWorkout from "@/components/dashboard/TodaysWorkout";
import AICoachCard from "@/components/dashboard/AICoachCard";
import NutritionCard from "@/components/dashboard/NutritionCard";
import WeightTracker from "@/components/dashboard/WeightTracker";
import WeightChart from "@/components/dashboard/WeightChart";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  const [workout, setWorkout] = useState<WorkoutProgram | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [nutrition, setNutrition] = useState<NutritionSummary | null>(null);
  const [weight, setWeight] = useState<WeightEntry | null>(null);
  const [water, setWater] = useState<WaterSummary | null>(null);
  const [weightHistory, setWeightHistory] = useState<WeightEntry[]>([]);
  const [weightGoal, setWeightGoalState] = useState<WeightGoal | null>(null);
  

  useEffect(() => {
    async function loadWorkout() {
      if (!session?.user?.userId) return;

      try {
        const workoutData = await getWorkout(session.user.userId);
        setWorkout(workoutData);

        const statsData = await getDashboardStats(
          session.user.userId
        );

        setStats(statsData);
        const nutritionData =
          await getNutritionSummary(
            session.user.userId
          );

        setNutrition(nutritionData);

        const waterData =
          await getWater(
            session.user.userId
          );

        setWater(waterData);
        const weightData =
          await getLatestWeight(
            session.user.userId
          );

        setWeight(weightData);
        const weightHistoryData =
          await getWeightHistory(
            session.user.userId
          );

        setWeightHistory(weightHistoryData);
        const goalData =
          await getWeightGoal(
            session.user.userId
          );

        setWeightGoalState(goalData);
      } catch (err) {
        console.error(err);
        setError(
          "Unable to load your dashboard. Please check your connection and try again."
        );
      } finally {
        setLoading(false);
      }
    }

    if (status === "authenticated") {
      loadWorkout();
    }

    if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [session, status]);

  if (status === "loading") {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
          <p className="text-slate-500">
            Preparing your dashboard...
          </p>
        </div>
      </div>
    );
  }
  if (!loading && error) {
    return (
      <main className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto flex max-w-2xl flex-col items-center justify-center rounded-3xl border border-red-200 bg-white p-8 text-center shadow-sm sm:p-12">
          <Dumbbell className="mb-4 h-12 w-12 text-red-500" />
          <h2 className="text-2xl font-bold text-slate-900">
            Unable to Load Dashboard
          </h2>
          <p className="mt-2 text-slate-500">
            {error}
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-8 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }
  if (!loading && !workout) {
    return (
      <main className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto flex max-w-2xl flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12">
          <Dumbbell className="mb-4 h-12 w-12 text-blue-600" />
          <h2 className="text-2xl font-bold text-slate-900">
            No Workout Found
          </h2>
          <p className="mt-2 text-slate-500">
            Generate your first AI workout plan to get started.
          </p>
          <button
            type="button"
            className="mt-8 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Generate Workout
          </button>
        </div>
      </main>
    );
  }
  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl space-y-8">
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-600">
            {error}
          </div>
        )}
        <DashboardHero workout={workout} loading={loading} />
        {/* We'll replace these placeholders one by one */}
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
        <WeightTracker
          weight={weight?.weight ?? null}
          startingWeight={weightGoal?.starting_weight ?? null}
          targetWeight={weightGoal?.target_weight ?? null}
          onAdd={async () => {
            const value = window.prompt(
              "Enter your current weight in kg"
            );
            if (!value) return;
            const numericWeight = Number(value);
            if (
              Number.isNaN(numericWeight) ||
              numericWeight <= 0
            ) {
              alert("Please enter a valid weight.");
              return;
            }
            try {
              const savedWeight = await addWeight(
                session!.user.userId,
                numericWeight
              );
              setWeight(savedWeight);
              const updatedHistory =
                await getWeightHistory(
                  session!.user.userId
                );
              setWeightHistory(updatedHistory);
            } catch (error) {
              console.error(error);
              alert("Unable to save weight.");
            }
          }}
          onSetGoal={async () => {
            const value = window.prompt(
              "Enter your target weight in kg",
              weightGoal?.target_weight?.toString() ?? ""
            );
            if (!value) return;
            const numericTarget = Number(value);
            if (
              Number.isNaN(numericTarget) ||
              numericTarget <= 0
            ) {
              alert("Please enter a valid target weight.");
              return;
            }
            try {
              const savedGoal = await setWeightGoal(
                session!.user.userId,
                numericTarget
              );
              setWeightGoalState(savedGoal);
            } catch (error) {
              console.error(error);
              alert("Unable to save weight goal.");
            }
          }}
        />
        <WeightChart
          history={weightHistory}
        />
        <div className="grid gap-6 lg:grid-cols-3">
          <TodaysWorkout
            workout={workout}
            todayWorkoutCompleted={
              stats?.today_workout_completed ?? false
            }
            todayExercises={stats?.today_exercises ?? 0}
            todayMinutes={stats?.today_minutes ?? 0}
          />
          <AICoachCard
            stats={stats}
            water={water}
            nutrition={nutrition}
          />
          <NutritionCard
            summary={nutrition}
            water={water}
          />
        </div>
      </div>
    </main>
  );
}