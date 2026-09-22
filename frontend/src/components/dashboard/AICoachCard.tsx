"use client";

import {
  Brain,
  Droplets,
  Target,
  Sparkles,
} from "lucide-react";

import { WaterSummary } from "@/lib/api/water";
import { NutritionSummary } from "@/lib/api/nutritionSummary";

interface Props {
  stats: {
    total_workouts: number;
    total_minutes: number;
    total_exercises: number;
    current_streak: number;
    today_workout_completed: boolean;
    today_exercises: number;
    today_minutes: number;
  } | null;

  water: WaterSummary | null;
  nutrition: NutritionSummary | null;
}

export default function AICoachCard({
  stats,
  water,
  nutrition,
}: Props) {
  let title = "Welcome!";
  let message =
    "Complete today's workout and stay consistent with your nutrition.";

  let tip =
    "Focus on proper form and consistency rather than simply increasing weight.";

  /*
   * Calculate hydration progress
   */
  const waterProgress = water
    ? Math.min(
        Math.round(
          (water.current_ml / water.target_ml) * 100
        ),
        100
      )
    : 0;

  /*
   * Calculate nutrition progress
   */
  const proteinProgress = nutrition
    ? Math.min(
        Math.round(
          (nutrition.consumed_protein /
            nutrition.target_protein) *
            100
        ),
        100
      )
    : 0;

  const calorieProgress = nutrition
    ? Math.min(
        Math.round(
          (nutrition.consumed_calories /
            nutrition.target_calories) *
            100
        ),
        100
      )
    : 0;

  /*
   * AI Coach logic
   *
   * Priority:
   * 1. Workout status
   * 2. Hydration
   * 3. Protein
   * 4. Calories
   * 5. Streak
   */
  if (stats) {
    if (!stats.today_workout_completed) {
      title = "💪 Today's Workout";

      message =
        "You haven't completed today's workout yet. Get it done to keep building consistency.";

      if (water && waterProgress < 50) {
        tip =
          "Your hydration is low today. Drink some water and then get your workout started.";
      } else if (
        nutrition &&
        proteinProgress < 50
      ) {
        tip =
          "Your protein intake is still low today. Make sure your next meal contains a solid protein source.";
      } else {
        tip =
          "Focus on completing today's workout with controlled reps and proper form.";
      }
    } else if (
      nutrition &&
      proteinProgress < 70
    ) {
      title = "🥩 Protein Check";

      message =
        "Your workout is complete, but your protein intake is still below target.";

      tip = `You are ${
        nutrition.target_protein -
        nutrition.consumed_protein
      }g short of your protein target today.`;
    } else if (
      water &&
      waterProgress < 70
    ) {
      title = "💧 Hydration Check";

      message =
        "Good work getting your workout done. Your hydration could use some attention.";

      tip = `You still need approximately ${
        Math.max(
          water.target_ml - water.current_ml,
          0
        ) / 1000
      }L to reach your water target.`;
    } else if (
      nutrition &&
      calorieProgress < 70
    ) {
      title = "🔥 Fuel Your Progress";

      message =
        "Your workout is done, but your calorie intake is still relatively low.";

      tip =
        "Make sure your remaining meals provide enough energy to support recovery.";
    } else if (
      stats.current_streak >= 30
    ) {
      title = "🏆 Elite Consistency";

      message = `You're on a ${stats.current_streak}-day streak. That's serious consistency.`;

      tip =
        "Keep the streak sustainable. Prioritize recovery and good training quality.";
    } else if (
      stats.current_streak >= 7
    ) {
      title = "🔥 Amazing Streak";

      message = `You're on a ${stats.current_streak}-day streak. Keep it going.`;

      tip =
        "Consistency is paying off. Keep focusing on quality workouts rather than rushing progress.";
    } else if (
      stats.current_streak >= 3
    ) {
      title = "💪 Great Momentum";

      message = `You've built a ${stats.current_streak}-day streak. Keep showing up.`;

      tip =
        "The next goal is consistency. Focus on completing each planned workout.";
    } else {
      title = "🚀 Great Start";

      message = `You've completed ${stats.total_workouts} workout${
        stats.total_workouts === 1
          ? ""
          : "s"
      }. Keep building the habit.`;

      tip =
        "Don't chase perfect days. Build a routine you can actually maintain.";
    }
  }

  return (
    <section
      className="
        h-full
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-blue-300
        hover:shadow-lg
      "
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-blue-50 p-3">
          <Brain className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            AI Coach
          </h2>
          <p className="text-sm text-slate-500">
            Personalized insights
          </p>
        </div>
      </div>
      {/* AI Insight */}
      <div className="mt-8">
        <p className="font-semibold text-slate-900">
          {title}
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          {message}
        </p>
      </div>
      {/* Hydration */}
      <div className="mt-8">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Droplets className="h-4 w-4 text-blue-600" />
            <span className="font-medium text-slate-900">
              Hydration
            </span>
          </div>
          <span className="text-sm font-semibold text-blue-600">
            {water
              ? `${(
                  water.current_ml / 1000
                ).toFixed(1)}L / ${(
                  water.target_ml / 1000
                ).toFixed(1)}L`
              : "0L / 0L"}
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-blue-600 transition-all duration-700"
            style={{
              width: `${waterProgress}%`,
            }}
          />
        </div>
      </div>
      {/* Today's Activity */}
      <div className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-blue-600" />
            <span className="font-medium text-slate-900">
              Today's Activity
            </span>
          </div>
          <span
            className={`text-sm font-semibold ${
              stats?.today_workout_completed
                ? "text-emerald-600"
                : "text-slate-500"
            }`}
          >
            {stats?.today_workout_completed
              ? "Completed"
              : "Not completed"}
          </span>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">
              Exercises
            </span>
            <span className="font-semibold text-slate-900">
              {stats?.today_exercises ?? 0}
            </span>
          </div>

          <div className="mt-2 flex items-center justify-between">
            <span className="text-sm text-slate-500">
              Duration
            </span>
            <span className="font-semibold text-slate-900">
              {stats?.today_minutes ?? 0} min
            </span>
          </div>
        </div>
      </div>
      {/* Nutrition */}
      <div className="mt-8 rounded-2xl bg-slate-50 p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-slate-700">
            Protein
          </span>
          <span className="text-sm font-semibold text-slate-900">
            {nutrition
              ? `${nutrition.consumed_protein}g / ${nutrition.target_protein}g`
              : "0g / 0g"}
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-white">
          <div
            className="h-full rounded-full bg-red-500 transition-all duration-700"
            style={{
              width: `${proteinProgress}%`,
            }}
          />
        </div>
      </div>
      {/* Tip */}
      <div className="mt-8 rounded-2xl bg-blue-50 p-4">
        <div className="mb-2 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-blue-600" />

          <span className="font-semibold text-slate-900">
            AI Tip
          </span>
        </div>
        <p className="text-sm leading-6 text-slate-600">
          {tip}
        </p>
      </div>
    </section>
  );
}