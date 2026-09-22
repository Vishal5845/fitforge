"use client";

import { Crown, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";


interface Props {
  workoutTrialsLeft: number;
  mealTrialsLeft: number;
  isPro: boolean;
}

export default function SubscriptionCard({
  workoutTrialsLeft,
  mealTrialsLeft,
  isPro,
}: Props) {
  const router = useRouter();
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-yellow-100 p-3">
          <Crown className="h-6 w-6 text-yellow-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Subscription
          </h2>
          <p className="text-slate-500">
            {isPro
              ? "Unlimited access"
              : "Free Plan"}
          </p>
        </div>
      </div>
      <div className="mt-8 space-y-4">
        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-sm text-slate-500">
            Workout AI Generations
          </p>
          <p className="mt-1 text-2xl font-bold text-slate-900">
            {isPro ? "Unlimited" : workoutTrialsLeft}
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-sm text-slate-500">
            Meal AI Generations
          </p>
          <p className="mt-1 text-2xl font-bold text-slate-900">
            {isPro ? "Unlimited" : mealTrialsLeft}
          </p>
        </div>
      </div>
      {!isPro && (
        <button
          type="button"
          onClick={() => router.push("/pricing")}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          <Sparkles className="h-5 w-5" />
          Upgrade to Pro
        </button>
      )}
    </section>
  );
}