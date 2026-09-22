"use client";

import {
  UserRound,
  Sparkles,
  Dumbbell,
  TrendingUp,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: UserRound,
    title: "Create Your Profile",
    description:
      "Tell FitForge about your goals, experience, body metrics, diet and workout preferences.",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "Get Your AI Plan",
    description:
      "FitForge generates a personalised workout and nutrition plan based on your profile.",
  },
  {
    number: "03",
    icon: Dumbbell,
    title: "Train & Follow Your Plan",
    description:
      "Complete your workouts, follow your nutrition targets and use exercise guidance to train correctly.",
  },
  {
    number: "04",
    icon: TrendingUp,
    title: "Track & Improve",
    description:
      "Track your progress and update your plans as your body, goals and fitness level change.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="bg-slate-50 py-24 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
            How FitForge works
          </span>
          <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
            From your profile
            <br />
            <span className="text-blue-600">
              to your progress.
            </span>
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Getting started is simple. Tell us about yourself,
            let FitForge build your plan, then focus on showing up
            consistently.
          </p>
        </div>
        {/* Steps */}
        <div className="relative mt-16">
          {/* Desktop connecting line */}
          <div className="absolute left-[12.5%] right-[12.5%] top-8 hidden h-px bg-blue-100 lg:block" />
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="group relative"
                >
                  {/* Number / Icon */}
                  <div className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-100 bg-white text-blue-600 shadow-sm transition-all duration-300 group-hover:border-blue-200 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-lg">
                    <Icon className="h-7 w-7" />
                  </div>
                  {/* Card */}
                  <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-7 text-center shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-blue-200 group-hover:shadow-xl">
                    <span className="text-sm font-bold tracking-widest text-blue-600">
                      STEP {step.number}
                    </span>
                    <h3 className="mt-4 text-xl font-bold text-slate-900">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-7 text-slate-600">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-sm text-slate-500">
            Ready to get started?
          </p>
          <a
            href="/register"
            className="mt-3 inline-flex items-center rounded-full bg-blue-600 px-7 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
          >
            Create Your Free Account
          </a>
        </div>
      </div>
    </section>
  );
}