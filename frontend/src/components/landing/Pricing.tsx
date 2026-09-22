"use client";

import Link from "next/link";
import { Check, Star } from "lucide-react";

const plans = [
  {
    name: "7-Day Free Trial",
    price: "Free",
    period: "7 days",
    description:
      "Try FitForge AI and experience personalised fitness planning.",
    popular: false,
    button: "Start Free Trial",
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
    price: "£9.99",
    period: "/month",
    description:
      "Unlimited access to FitForge's premium fitness features.",
    popular: true,
    button: "Choose Monthly",
    features: [
      "Unlimited AI Workout Plans",
      "Unlimited AI Meal Plans",
      "Unlimited Regeneration",
      "Exercise Tutorials",
      "Progress Analytics",
      "Workout History",
      "Nutrition History",
      "Priority Support",
    ],
  },
  {
    name: "Pro Yearly",
    price: "£99",
    period: "/year",
    description:
      "Get the full FitForge experience with two months effectively free.",
    popular: false,
    button: "Choose Yearly",
    badge: "Save 17%",
    features: [
      "Everything in Monthly",
      "2 Months Free",
      "Priority AI",
      "Early Feature Access",
      "Premium Support",
    ],
  },
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="bg-gradient-to-b from-white to-slate-100 py-28"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-blue-100 px-5 py-2 font-medium text-blue-700">
            Pricing
          </span>
          <h2 className="mt-6 text-5xl font-black text-slate-900">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-6 text-xl leading-8 text-slate-600">
            Start with a 7-day free trial and upgrade when you're ready.
          </p>
        </div>
        {/* Plans */}
        <div className="mx-auto mt-20 grid max-w-6xl gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl border p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                plan.popular
                  ? "border-blue-600 bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-xl"
                  : "border-slate-200 bg-white text-slate-900 shadow-sm"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-2 whitespace-nowrap rounded-full bg-yellow-400 px-5 py-2 font-semibold text-black shadow-md">
                    <Star size={16} />
                    Most Popular
                  </div>
                </div>
              )}
              {/* Save Badge */}
              {plan.badge && (
                <div className="mb-4 inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                  {plan.badge}
                </div>
              )}
              {/* Name */}
              <h3
                className={`text-2xl font-bold ${
                  plan.popular ? "text-white" : "text-slate-900"
                }`}
              >
                {plan.name}
              </h3>
              {/* Price */}
              <div className="mt-6 flex items-baseline gap-2">
                <span
                  className={`text-5xl font-black ${
                    plan.popular ? "text-white" : "text-slate-900"
                  }`}
                >
                  {plan.price}
                </span>
                <span
                  className={`text-sm ${
                    plan.popular ? "text-blue-100" : "text-slate-500"
                  }`}
                >
                  {plan.period}
                </span>
              </div>
              {/* Description */}
              <p
                className={`mt-5 min-h-[48px] leading-6 ${
                  plan.popular ? "text-blue-100" : "text-slate-500"
                }`}
              >
                {plan.description}
              </p>
              {/* Features */}
              <div className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-start gap-3"
                  >
                    <Check
                      size={20}
                      className={`mt-0.5 shrink-0 ${
                        plan.popular
                          ? "text-green-300"
                          : "text-green-600"
                      }`}
                    />
                    <span
                      className={
                        plan.popular
                          ? "text-white"
                          : "text-slate-700"
                      }
                    >
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
              {/* Button */}
              <Link
                href="/register"
                className={`mt-10 block rounded-xl py-4 text-center font-semibold transition ${
                  plan.popular
                    ? "bg-white text-blue-600 hover:bg-slate-100"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {plan.button}
              </Link>
            </div>
          ))}
        </div>
        {/* Footer note */}
        <p className="mt-8 text-center text-sm text-slate-500">
          Cancel anytime. No long-term commitment.
        </p>
      </div>
    </section>
  );
}