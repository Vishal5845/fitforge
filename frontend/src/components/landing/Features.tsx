"use client";

import {
  Brain,
  Dumbbell,
  Utensils,
  BarChart3,
  RefreshCcw,
  Users,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Personal Coach",
    description:
      "Generate workout plans tailored to your goals, experience level, body and available equipment.",
  },
  {
    icon: Utensils,
    title: "Smart Nutrition",
    description:
      "Get personalised meal plans with calories, protein, carbs and fats aligned with your fitness goals.",
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description:
      "Track your weight, workouts and progress with clear analytics designed to keep you moving forward.",
  },
  {
    icon: Dumbbell,
    title: "Exercise Tutorials",
    description:
      "Understand each exercise with technique guidance, target muscles, instructions and demonstrations.",
  },
  {
    icon: RefreshCcw,
    title: "Easy Plan Regeneration",
    description:
      "Update your fitness profile and regenerate your workout or nutrition plan whenever your needs change.",
  },
  {
    icon: Users,
    title: "Coach Dashboard",
    description:
      "Give coaches one place to manage members, monitor progress and review personalised plans.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="bg-white py-24 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
            Everything in one place
          </span>
          <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
            Everything you need
            <br />
            <span className="text-blue-600">
              to reach your goals.
            </span>
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            FitForge combines personalised workouts, smart nutrition,
            progress tracking and AI-powered guidance into one simple
            fitness platform.
          </p>
        </div>
        {/* Feature Grid */}
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="
                  group
                  rounded-3xl
                  border
                  border-slate-200
                  bg-white
                  p-7
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-blue-200
                  hover:shadow-xl
                "
              >
                {/* Icon */}
                <div
                  className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    bg-blue-50
                    text-blue-600
                    transition-all
                    duration-300
                    group-hover:bg-blue-600
                    group-hover:text-white
                  "
                >
                  <Icon className="h-7 w-7" />
                </div>
                {/* Content */}
                <h3 className="mt-7 text-xl font-bold text-slate-900">
                  {feature.title}
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-slate-600">
                  {feature.description}
                </p>
                {/* Bottom accent */}
                <div className="mt-6 h-1 w-8 rounded-full bg-blue-600 transition-all duration-300 group-hover:w-14" />
              </div>
            );
          })}
        </div>
        {/* Bottom statement */}
        <div className="mt-16 rounded-3xl border border-blue-100 bg-blue-50/60 p-8 text-center">
          <p className="text-lg font-semibold text-slate-900">
            One platform for your entire fitness journey.
          </p>
          <p className="mt-2 text-sm text-slate-600">
            From your first workout to long-term progress,
            FitForge keeps everything connected.
          </p>
        </div>
      </div>
    </section>
  );
}