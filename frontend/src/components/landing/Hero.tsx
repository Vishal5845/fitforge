"use client";

import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Dumbbell,
  Salad,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-blue-50/60 to-white pt-32 pb-24">
      {/* Background effects */}
      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-200/40 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 h-[450px] w-[450px] rounded-full bg-cyan-200/30 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* LEFT */}
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
              <Sparkles size={16} />
              AI-powered personal fitness
            </div>
            <h1 className="max-w-3xl text-5xl font-black leading-[1.05] tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
              Your fitness.
              <br />
              <span className="text-blue-600">
                Built around you.
              </span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600 sm:text-xl">
              FitForge creates personalised workout and nutrition
              plans based on your goals, body, experience and lifestyle.
              Track your progress and stay consistent in one place.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-8 py-4 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
              >
                Start 7-Day Free Trial
                <ArrowRight size={18} />
              </Link>
              <a
                href="#features"
                className="inline-flex items-center rounded-full border border-slate-300 bg-white px-8 py-4 font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Explore FitForge
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Personalised plans
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                AI-powered recommendations
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Progress tracking
              </div>
            </div>
          </div>
          {/* RIGHT */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-[40px] bg-blue-100/40 blur-2xl" />
            <div className="relative rounded-[32px] border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-900/10 sm:p-8">
              {/* Header */}
              <div className="mb-7 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Today's Plan
                  </p>
                  <h2 className="mt-1 text-2xl font-bold text-slate-900">
                    Push Day
                  </h2>
                </div>
                <div className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
                  Day 1
                </div>
              </div>
              <div className="space-y-4">
                <PlanCard
                  icon={<Dumbbell size={21} />}
                  title="Workout"
                  subtitle="Chest • Shoulders • Triceps"
                  value="75 min"
                />
                <PlanCard
                  icon={<Salad size={21} />}
                  title="Nutrition"
                  subtitle="Personalised meal plan"
                  value="2,400 kcal"
                />
                <PlanCard
                  icon={<TrendingUp size={21} />}
                  title="Progress"
                  subtitle="Weekly progress"
                  value="On track"
                />
              </div>
              {/* AI recommendation */}
              <div className="mt-6 flex items-start gap-4 rounded-2xl bg-emerald-50 p-5">
                <div className="rounded-xl bg-white p-2 shadow-sm">
                  <CheckCircle2
                    className="text-emerald-600"
                    size={22}
                  />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">
                    AI Recommendation
                  </p>
                  <p className="mt-1 text-sm leading-5 text-slate-600">
                    Your plan is ready. Complete today's workout
                    and stay on track with your nutrition goals.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PlanCard({
  icon,
  title,
  subtitle,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200 p-4 transition hover:border-blue-200 hover:shadow-md sm:p-5">
      <div className="flex min-w-0 items-center gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          {icon}
        </div>
        <div className="min-w-0">
          <h4 className="font-bold text-slate-900">
            {title}
          </h4>
          <p className="truncate text-sm text-slate-500">
            {subtitle}
          </p>
        </div>
      </div>
      <div className="ml-4 shrink-0 text-sm font-bold text-blue-600">
        {value}
      </div>
    </div>
  );
}