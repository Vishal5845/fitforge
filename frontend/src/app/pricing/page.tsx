"use client";

import { useRouter } from "next/navigation";
import {
  Check,
  Crown,
  Sparkles,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";

export default function PricingPage() {
  const router = useRouter();

  const plans = [
    {
      name: "Free Trial",
      description: "Try FitForge and build your first plan.",
      price: "£0",
      duration: "for 7 days",
      button: "Start Free Trial",
      icon: Sparkles,
      features: [
        "1 AI Workout Plan",
        "1 AI Meal Plan",
        "Progress Tracking",
        "Edit Fitness Profile",
        "Daily Progress Logging",
      ],
    },
    {
      name: "Pro Monthly",
      description: "Everything you need to stay consistent.",
      price: "£9.99",
      duration: "per month",
      button: "Choose Monthly",
      popular: true,
      icon: Crown,
      features: [
        "Unlimited AI Workout Plans",
        "Unlimited AI Meal Plans",
        "Unlimited Regeneration",
        "Progress Analytics",
        "Priority Support",
        "Access to New Features",
      ],
    },
    {
      name: "Pro Yearly",
      description: "Get the full Pro experience for less.",
      price: "£99",
      duration: "per year",
      button: "Choose Yearly",
      badge: "Save 17%",
      icon: Crown,
      features: [
        "Everything in Monthly",
        "2 Months Free",
        "Priority AI",
        "Early Feature Access",
        "Premium Support",
        "Best Value",
      ],
    },
    {
      name: "Coach",
      description: "Tools for professional coaches.",
      price: "£29.99",
      duration: "Coming Soon",
      button: "Coming Soon",
      disabled: true,
      icon: ShieldCheck,
      features: [
        "Manage Clients",
        "Assign Workouts",
        "Nutrition Monitoring",
        "Client Progress",
        "Messaging",
        "Coach Dashboard",
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </button>

          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold text-slate-900">
              FitForge
            </span>
          </div>

          <button
            type="button"
            onClick={() => router.push("/profile")}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            My Profile
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="px-6 pb-12 pt-16 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600">
            <Sparkles className="h-4 w-4" />
            FitForge Premium
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Choose the plan that fits you
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-500">
            Get personalised AI-powered workout and nutrition plans designed
            around your goals, training and lifestyle.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="px-6 pb-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-4">
          {plans.map((plan) => {
            const Icon = plan.icon;

            return (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-3xl border bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md ${
                  plan.popular
                    ? "border-blue-500 ring-2 ring-blue-100"
                    : "border-slate-200"
                }`}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white shadow-sm">
                    Most Popular
                  </div>
                )}

                {/* Plan icon */}
                <div
                  className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl ${
                    plan.popular
                      ? "bg-blue-50 text-blue-600"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  <Icon className="h-6 w-6" />
                </div>

                {/* Plan name */}
                <h2 className="text-xl font-bold text-slate-900">
                  {plan.name}
                </h2>

                <p className="mt-2 min-h-[48px] text-sm leading-6 text-slate-500">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mt-6">
                  <span className="text-4xl font-bold tracking-tight text-slate-900">
                    {plan.price}
                  </span>

                  <span className="ml-2 text-sm text-slate-500">
                    {plan.duration}
                  </span>
                </div>

                {/* Badge */}
                {plan.badge && (
                  <div className="mt-4 w-fit rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                    {plan.badge}
                  </div>
                )}

                {/* Features */}
                <div className="mt-7 flex-1">
                  <p className="mb-4 text-sm font-semibold text-slate-900">
                    What's included
                  </p>

                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm text-slate-600"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50">
                          <Check className="h-3 w-3 text-blue-600" />
                        </span>

                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Button */}
                <button
                  type="button"
                  disabled={plan.disabled}
                  onClick={() => {
                    if (!plan.disabled) {
                      router.push("/profile");
                    }
                  }}
                  className={`mt-8 w-full rounded-xl py-3.5 text-sm font-semibold transition ${
                    plan.disabled
                      ? "cursor-not-allowed bg-slate-100 text-slate-400"
                      : plan.popular
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {plan.button}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Trust section */}
      <section className="border-t border-slate-200 bg-white px-6 py-10 lg:px-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <ShieldCheck className="h-5 w-5 text-emerald-600" />
            Simple, transparent pricing
          </div>

          <p className="mt-2 text-sm text-slate-500">
            Choose the plan that works for you. You can manage your
            subscription from your FitForge profile.
          </p>
        </div>
      </section>
    </main>
  );
}