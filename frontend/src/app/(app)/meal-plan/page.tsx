"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/lib/api/config";
import {
  MealPlan,
  MealType,
  Ingredient,
} from "@/types/meal";

export default function MealPlanPage() {
  const [meal, setMeal] = useState<MealPlan | null>(null);
  const mealTypes: MealType[] = [
    "breakfast",
    "lunch",
    "snacks",
    "dinner",
  ];
  const { data: session, status } = useSession();
  const [mealNotFound, setMealNotFound] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!session?.user?.userId) return;
    fetch(
      `${API_BASE_URL}/meal/${session.user.userId}`
    )
    .then(async (res) => {
      if (res.status === 404) {
        setMealNotFound(true);
        return null;
      }
      if (!res.ok) {
        throw new Error("Failed to fetch meal");
      }
      return res.json();
    })
    .then((data) => {
      if (data) {
        setMeal(data);
      }
    })
    .catch(console.error);
  }, [session]);
  useEffect(() => {
    if (status !== "loading" && !session) {
      router.push("/login");
    }
  }, [session, status, router]);
  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (!session) {
    return null;
  }
  if (mealNotFound) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        No Meal Plan Found
      </div>
      );
  }
  if (!meal) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        Loading Meal Plan...
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-8 py-10">
        <Link href="/dashboard" className="inline-flex items-center mb-6 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl transition">
          ← Back to Dashboard
        </Link>
        <h1 className="text-5xl font-bold mb-3">
          {meal.plan_name}
        </h1>
        <p className="text-slate-400 mb-8">
          {meal.daily_calories} Calories Daily Target
        </p>
        {/* Macros */}
        <div className="grid md:grid-cols-3 gap-5 mb-10">
          <div className="bg-slate-900 rounded-2xl p-6">
            <p className="text-slate-400">Protein</p>
            <h2 className="text-4xl font-bold">
              {meal?.macronutrients?.protein}g
            </h2>
          </div>
          <div className="bg-slate-900 rounded-2xl p-6">
            <p className="text-slate-400">Carbs</p>
            <h2 className="text-4xl font-bold">
              {meal?.macronutrients?.carbs}g
            </h2>
          </div>
          <div className="bg-slate-900 rounded-2xl p-6">
            <p className="text-slate-400">Fat</p>
            <h2 className="text-4xl font-bold">
              {meal?.macronutrients?.fat}g
            </h2>
          </div>
        </div>
        {/* Meals */}
        <div className="grid md:grid-cols-2 gap-6">
          {mealTypes.map(
            (mealType) => (
              <div
                key={mealType}
                className="bg-slate-900 rounded-2xl p-6"
              >
                <h2 className="text-2xl font-bold capitalize mb-2">
                  {mealType}
                </h2>
                <p className="text-blue-400 mb-4">
                  {meal[mealType].meal_name}
                </p>
                <p className="text-slate-400 mb-4">
                  {meal[mealType].calories} Calories
                </p>
                <div className="space-y-2">
                  {meal?.[mealType]?.ingredients?.map(
                    (ingredient: Ingredient, index: number) => (
                      <div
                        key={index}
                        className="flex justify-between border-b border-slate-800 pb-2"
                      >
                        <span>
                          {ingredient.name}
                        </span>
                        <span className="text-slate-400">
                          {ingredient.quantity}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}