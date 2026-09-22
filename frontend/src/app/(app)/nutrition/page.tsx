"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import {
  getMeal,
  MealPlan,
  toggleMeal
} from "@/lib/api/meals";
import {
  getMealHistory,
} from "@/lib/api/mealHistory";
import {
  getNutritionSummary,
  NutritionSummary,
} from "@/lib/api/nutritionSummary";
import {
  getWater,
  updateWater,
  WaterSummary,
} from "@/lib/api/water";

import NutritionHero from "@/components/nutrition/NutritionHero";
import MealCard from "@/components/nutrition/MealCard";
import NutritionProgress from "@/components/nutrition/NutritionProgress";
import WaterTracker from "@/components/nutrition/WaterTracker";

export default function NutritionPage() {
  const { data: session, status } = useSession();
  const [completedMeals, setCompletedMeals] = useState({
    breakfast: false,
    lunch: false,
    dinner: false,
    snacks: false,
  });
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const [summary, setSummary] = useState<NutritionSummary | null>(null);
  const [water, setWater] = useState<WaterSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  useEffect(() => {
    async function loadMeal() {
      if (!session?.user?.userId) return;
      try {
        const data = await getMeal(
          session.user.userId
        );
        setMealPlan(data);
        const history = await getMealHistory(
          session.user.userId
        );

        setCompletedMeals(history);
        const nutritionSummary =
          await getNutritionSummary(
            session.user.userId
          );

        setSummary(nutritionSummary);
        const waterData = await getWater(
          session.user.userId
        );
        setWater(waterData);
      } catch (err) {
        console.error(err);
        setError("Unable to load meal plan.");
      } finally {
        setLoading(false);
      }
    }
    if (status === "authenticated") {
      loadMeal();
    }
    if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [session, status]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading nutrition...
      </div>
    );
  }

  if (!mealPlan) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        {error || "Meal plan not found."}
      </div>
    );
  }

  async function handleCompleteMeal(
    mealName: keyof typeof completedMeals
  ) {
    if (!session?.user?.userId) return;
    try {
      const history = await toggleMeal({
        user_id: session.user.userId,
        meal: mealName,
      });
      setCompletedMeals(history);
      console.log(history);
      const updatedSummary =
        await getNutritionSummary(
          session.user.userId
        );
      setSummary(updatedSummary);
    } catch (err) {
      console.error(err);
    }
  }
  async function handleWater(amount: number) {
    if (!session?.user?.userId) return;
      try {
        const updated = await updateWater({
          user_id: session.user.userId,
          amount,
        });

        setWater(updated);
      } catch (err) {
        console.error(err);
      }
    }
  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl space-y-8">
        <NutritionHero mealPlan={mealPlan} />
        {summary && (
          <section>
            <div className="mb-5">
              <h2 className="text-2xl font-bold text-slate-900">
                Today's Progress
              </h2>
              <p className="mt-1 text-slate-500">
                Track your daily nutrition goals.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <NutritionProgress
                title="Calories"
                consumed={summary.consumed_calories}
                target={summary.target_calories}
                unit="kcal"
              />
              <NutritionProgress
                title="Protein"
                consumed={summary.consumed_protein}
                target={summary.target_protein}
                unit="g"
              />
              <NutritionProgress
                title="Carbs"
                consumed={summary.consumed_carbs}
                target={summary.target_carbs}
                unit="g"
              />
              <NutritionProgress
                title="Fat"
                consumed={summary.consumed_fat}
                target={summary.target_fat}
                unit="g"
              />
            </div>
          </section>
        )}
        {water && (
          <WaterTracker
            current={water.current_ml}
            target={water.target_ml}
            onAdd={() => handleWater(250)}
            onRemove={() => handleWater(-250)}
          />
        )}
        <section>
          <div className="mb-5">
            <h2 className="text-2xl font-bold text-slate-900">
              Today's Meals
            </h2>
            <p className="mt-1 text-slate-500">
              Your AI-generated meal plan for today.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <MealCard
              title="Breakfast"
              meal={mealPlan.breakfast}
              completed={completedMeals.breakfast}
              onComplete={() =>
                handleCompleteMeal("breakfast")
              }
            />
            <MealCard
              title="Lunch"
              meal={mealPlan.lunch}
              completed={completedMeals.lunch}
              onComplete={() =>
                handleCompleteMeal("lunch")
              }
            />
            <MealCard
              title="Snacks"
              meal={mealPlan.snacks}
              completed={completedMeals.snacks}
              onComplete={() =>
                handleCompleteMeal("snacks")
              }
            />
            <MealCard
              title="Dinner"
              meal={mealPlan.dinner}
              completed={completedMeals.dinner}
              onComplete={() =>
                handleCompleteMeal("dinner")
              }
            />
          </div>
        </section>
      </div>
    </main>
  );
}