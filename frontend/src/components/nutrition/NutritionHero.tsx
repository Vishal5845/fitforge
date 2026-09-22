"use client";

import {
  Flame,
  Beef,
  Wheat,
  Droplets,
} from "lucide-react";

import { MealPlan } from "@/lib/api/meals";

interface Props {
  mealPlan: MealPlan;
}

export default function NutritionHero({
  mealPlan,
}: Props) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex items-start justify-between">
            <div>
            <p className="text-sm font-medium text-slate-500">
                🍽 Today's Nutrition
            </p>
            <h1 className="mt-2 text-4xl font-bold text-slate-900">
                {mealPlan.plan_name}
            </h1>
            <p className="mt-3 text-slate-500">
                Goal: {mealPlan.goal.replaceAll("_", " ")}
            </p>
            </div>
            <div className="rounded-2xl bg-orange-50 px-6 py-4">
            <p className="text-sm text-slate-500">
                Daily Calories
            </p>
            <p className="mt-1 text-3xl font-bold text-orange-600">
                {mealPlan.daily_calories}
            </p>
            </div>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-4 text-black">
            <div className="rounded-2xl bg-slate-50 p-5">
            <div className="mb-2 flex items-center gap-2">
                <Flame className="h-5 w-5 text-orange-600" />
                <span className="text-sm text-slate-500">
                Calories
                </span>
            </div>
            <p className="text-2xl font-bold">
                {mealPlan.daily_calories}
            </p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-5">
                <div className="mb-2 flex items-center gap-2">
                    <Beef className="h-5 w-5 text-red-500" />
                    <span className="text-sm text-slate-500">
                    Protein
                    </span>
                </div>
                <p className="text-2xl font-bold">
                    {mealPlan.macronutrients.protein} g
                </p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-5">
                <div className="mb-2 flex items-center gap-2">
                    <Wheat className="h-5 w-5 text-yellow-600" />
                    <span className="text-sm text-slate-500">
                    Carbs
                    </span>
                </div>
                <p className="text-2xl font-bold">
                    {mealPlan.macronutrients.carbs} g
                </p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-5">
                <div className="mb-2 flex items-center gap-2">
                    <Droplets className="h-5 w-5 text-blue-600" />
                    <span className="text-sm text-slate-500">
                    Fat
                    </span>
                </div>
                <p className="text-2xl font-bold">
                    {mealPlan.macronutrients.fat} g
                </p>
            </div>
        </div>
    </section>
  );
}