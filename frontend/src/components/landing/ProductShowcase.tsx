"use client";

import { useState } from "react";
import {
  Dumbbell,
  Utensils,
  BarChart3,
  PlayCircle,
  CheckCircle2,
  Flame,
  Clock3,
} from "lucide-react";

const tabs = [
  {
    id: "workout",
    label: "Workout",
    icon: Dumbbell,
  },
  {
    id: "meal",
    label: "Nutrition",
    icon: Utensils,
  },
  {
    id: "dashboard",
    label: "Dashboard",
    icon: BarChart3,
  },
  {
    id: "tutorial",
    label: "Tutorials",
    icon: PlayCircle,
  },
];

export default function ProductShowcase() {
  const [activeTab, setActiveTab] = useState("workout");

  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <span className="px-5 py-2 rounded-full bg-blue-100 text-blue-700 font-medium">
            Product Preview
          </span>
          <h2 className="text-5xl font-black mt-6 text-slate-900">
            See FitForge In Action
          </h2>
          <p className="mt-6 text-xl text-slate-600">
            Everything you need for your fitness journey
            in one intelligent platform.
          </p>
        </div>
        <div className="flex justify-center flex-wrap gap-4 mt-14">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-6 py-3 rounded-2xl transition font-semibold
                ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                <Icon size={20} />
                {tab.label}
              </button>
            );
          })}
        </div>
        <div className="mt-14 rounded-3xl border border-slate-200 shadow-xl bg-slate-50 p-8">
          {activeTab === "workout" && <WorkoutTab />}
          {activeTab === "meal" && <MealTab />}
          {activeTab === "dashboard" && <DashboardTab />}
          {activeTab === "tutorial" && <TutorialTab />}
        </div>
      </div>
    </section>
  );
}

function WorkoutTab() {
  return (
    <div className="grid lg:grid-cols-2 gap-10">
      <div>
        <h3 className="text-3xl font-bold mb-2">
          Monday • Push Day
        </h3>
        <p className="text-slate-500 mb-8">
          AI Generated Workout
        </p>
        {[
          "Bench Press",
          "Incline Dumbbell Press",
          "Shoulder Press",
          "Lateral Raise",
          "Triceps Pushdown",
        ].map((exercise) => (
          <div
            key={exercise}
            className="flex items-center justify-between bg-white rounded-xl p-4 mb-3"
          >
            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-green-500" size={20} />
              {exercise}
            </div>
            <span className="text-slate-500">
              4 × 10
            </span>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-3xl p-8">
        <div className="flex justify-between mb-6">
          <div>
            <Clock3 className="text-blue-600 mb-2" />
            <h4 className="font-bold">
              Duration
            </h4>
            <p>60 min</p>
          </div>
          <div>
            <Flame className="text-orange-500 mb-2" />
            <h4 className="font-bold">
              Calories
            </h4>
            <p>480 kcal</p>
          </div>
        </div>
        <button className="w-full bg-blue-600 text-white rounded-xl py-4 font-semibold">
          Start Workout
        </button>
      </div>
    </div>
  );
}
function MealTab() {
  return (
    <div className="space-y-4">
      <MealCard
        meal="Breakfast"
        food="Oats + Milk + Banana"
        calories="520 kcal"
      />
      <MealCard
        meal="Lunch"
        food="Rice + Chickpeas + Salad"
        calories="690 kcal"
      />
      <MealCard
        meal="Snack"
        food="Milk + Peanut Butter"
        calories="320 kcal"
      />
      <MealCard
        meal="Dinner"
        food="Paneer + Roti + Vegetables"
        calories="760 kcal"
      />
    </div>
  );
}
function MealCard({
  meal,
  food,
  calories,
}: {
  meal: string;
  food: string;
  calories: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-5 flex justify-between">
      <div>
        <p className="text-slate-500">
          {meal}
        </p>
        <h4 className="font-semibold mt-1">
          {food}
        </h4>
      </div>
      <div className="font-bold text-green-600">
        {calories}
      </div>

    </div>
  );
}
function DashboardTab() {
  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">
            FitForge Dashboard
          </p>
          <h3 className="mt-1 text-3xl font-bold text-slate-900">
            Your Fitness Journey
          </h3>
        </div>
        <div className="h-11 w-11 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
          V
        </div>
      </div>
      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        {[
          ["Workout", "Today's Plan"],
          ["Nutrition", "Meal Plan"],
          ["Progress", "Track Results"],
          ["AI Coach", "Personalised"],
        ].map(([title, value]) => (
          <div
            key={title}
            className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm"
          >
            <p className="text-sm text-slate-500">
              {title}
            </p>
            <h4 className="mt-2 text-lg font-bold text-slate-900">
              {value}
            </h4>
          </div>
        ))}
      </div>
      {/* Today's Workout */}
      <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">
              Today's Workout
            </p>
            <h4 className="mt-1 text-2xl font-bold text-slate-900">
              Push Day
            </h4>
            <p className="mt-1 text-slate-500">
              Chest • Shoulders • Triceps
            </p>
          </div>
          <div className="rounded-xl bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
            Day 1
          </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <span className="rounded-xl bg-slate-100 px-4 py-2 text-sm text-slate-600">
            75 min
          </span>
          <span className="rounded-xl bg-slate-100 px-4 py-2 text-sm text-slate-600">
            5 Exercises
          </span>
          <span className="rounded-xl bg-slate-100 px-4 py-2 text-sm text-slate-600">
            AI Generated
          </span>
        </div>
      </div>
    </div>
  );
}
function TutorialTab() {
  return (
    <div className="grid lg:grid-cols-2 gap-10">
      <div className="aspect-video rounded-3xl bg-slate-200 flex items-center justify-center">
        <PlayCircle
          size={70}
          className="text-blue-600"
        />
      </div>
      <div>
        <h3 className="text-3xl font-bold">
          Bench Press
        </h3>
        <p className="mt-5 text-slate-600">
          Learn correct form through animations,
          muscles worked, common mistakes,
          equipment and expert tips.
        </p>
        <ul className="mt-8 space-y-3">
          <li>✓ Proper Technique</li>
          <li>✓ Muscles Worked</li>
          <li>✓ Common Mistakes</li>
          <li>✓ Step-by-Step Guide</li>
        </ul>
      </div>
    </div>
  );
}