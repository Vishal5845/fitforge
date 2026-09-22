"use client";

import {
  Flame,
  Beef,
  Wheat,
  Droplets,
  Sparkles,
} from "lucide-react";

import { NutritionSummary } from "@/lib/api/nutritionSummary";
import { WaterSummary } from "@/lib/api/water";

interface NutritionCardProps {
  summary: NutritionSummary | null;
  water: WaterSummary | null;
}

export default function NutritionCard({
  summary,
  water,
}: NutritionCardProps) {
  const calorieProgress = summary
    ? Math.min(
        Math.round(
          (summary.consumed_calories /
            summary.target_calories) *
            100
        ),
        100
      )
    : 0;

  const proteinProgress = summary
    ? Math.min(
        Math.round(
          (summary.consumed_protein /
            summary.target_protein) *
            100
        ),
        100
      )
    : 0;

  const carbProgress = summary
    ? Math.min(
        Math.round(
          (summary.consumed_carbs /
            summary.target_carbs) *
            100
        ),
        100
      )
    : 0;

  const waterProgress = water
    ? Math.min(
        Math.round(
          (water.current_ml /
            water.target_ml) *
            100
        ),
        100
      )
    : 0;

  const macros = [
    {
      title: "Calories",
      value: summary
        ? `${summary.consumed_calories}`
        : "0",
      goal: summary
        ? `${summary.target_calories} kcal`
        : "0 kcal",
      icon: (
        <Flame className="h-5 w-5 text-orange-500" />
      ),
      progress: calorieProgress,
      color: "bg-orange-500",
    },
    {
      title: "Protein",
      value: summary
        ? `${summary.consumed_protein} g`
        : "0 g",
      goal: summary
        ? `${summary.target_protein} g`
        : "0 g",
      icon: (
        <Beef className="h-5 w-5 text-red-500" />
      ),
      progress: proteinProgress,
      color: "bg-blue-600",
    },
    {
      title: "Carbs",
      value: summary
        ? `${summary.consumed_carbs} g`
        : "0 g",
      goal: summary
        ? `${summary.target_carbs} g`
        : "0 g",
      icon: (
        <Wheat className="h-5 w-5 text-amber-500" />
      ),
      progress: carbProgress,
      color: "bg-emerald-500",
    },
    {
      title: "Water",
      value: water
        ? `${(water.current_ml / 1000).toFixed(1)} L`
        : "0 L",
      goal: water
        ? `${(water.target_ml / 1000).toFixed(1)} L`
        : "0 L",
      icon: (
        <Droplets className="h-5 w-5 text-blue-500" />
      ),
      progress: waterProgress,
      color: "bg-cyan-500",
    },
  ];

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
      <div className="mb-8 flex items-center gap-3">
        <div className="rounded-2xl bg-orange-50 p-3">
          <Flame className="h-6 w-6 text-orange-500" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Nutrition
          </h2>
          <p className="text-sm text-slate-500">
            Daily Summary
          </p>
        </div>
      </div>
      <div className="space-y-6">
        {macros.map((macro) => (
          <div
            key={macro.title}
            className="rounded-2xl p-2 transition-colors duration-300 hover:bg-slate-50"
          >
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {macro.icon}
                <span className="font-medium text-slate-800">
                  {macro.title}
                </span>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-500">
                  {macro.value} / {macro.goal}
                </p>
                <p className="text-xs font-medium text-slate-400">
                  {macro.progress}%
                </p>
              </div>
            </div>
            <div className="h-2 rounded-full bg-slate-100">
              <div
                className={`h-2 rounded-full transition-all duration-700 ease-out ${macro.color}`}
                style={{
                  width: `${macro.progress}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 rounded-2xl bg-orange-50 p-4">
        <div className="mb-2 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-orange-500" />
          <p className="text-sm font-semibold text-slate-900">
            AI Recommendation
          </p>
        </div>
        <p className="text-sm leading-6 text-slate-600">
          {summary &&
          summary.target_protein >
            summary.consumed_protein ? (
            <>
              You are{" "}
              {summary.target_protein -
                summary.consumed_protein}
              g short of your protein target today.
            </>
          ) : (
            "Great job! You have reached your protein target for today."
          )}
        </p>
      </div>
    </section>
  );
}