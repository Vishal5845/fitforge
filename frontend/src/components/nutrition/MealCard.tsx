"use client";

import {
  Apple,
  Flame,
  Utensils,
} from "lucide-react";

import { Meal } from "@/lib/api/meals";

interface MealCardProps {
  title: string;
  meal: Meal;
  completed: boolean;
  onComplete: () => void;
}

export default function MealCard({
  title,
  meal,
  completed,
  onComplete,
}: MealCardProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-blue-50 p-3">
            <Utensils className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">
              {title}
            </p>
            <h2 className="mt-1 text-xl font-bold text-slate-900">
              {meal.meal_name}
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-orange-50 px-3 py-2">
          <Flame className="h-4 w-4 text-orange-500" />
          <span className="text-sm font-semibold text-orange-700">
            {meal.calories} kcal
          </span>
        </div>
      </div>
      {/* Ingredients */}
      <div className="mt-6">
        <div className="mb-4 flex items-center gap-2">
          <Apple className="h-5 w-5 text-green-600" />
          <h3 className="font-semibold text-slate-900">
            Ingredients
          </h3>
        </div>
        <div className="space-y-3">
          {meal.ingredients.map((ingredient, index) => (
            <div
              key={`${ingredient.name}-${index}`}
              className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3"
            >
              <span className="font-medium text-slate-700">
                {ingredient.name}
              </span>
              <span className="text-sm text-slate-500">
                {ingredient.quantity}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6">
        <button
          onClick={onComplete}
          className={`w-full rounded-xl py-3 font-semibold transition-all ${
            completed
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {completed ? "✓ Marked as Eaten" : "Mark as Eaten"}
        </button>
      </div>
    </section>
  );
}