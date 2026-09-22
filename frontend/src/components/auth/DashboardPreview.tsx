"use client";

import {
  Dumbbell,
  Flame,
  Activity,
  Target,
  TrendingUp,
} from "lucide-react";

export default function DashboardPreview() {
  return (
    <div
      className="
        mt-16
        max-w-md
        rounded-[32px]
        bg-slate-800
        backdrop-blur-2xl
        border
        border-white/20
        shadow-[0_30px_60px_rgba(0,0,0,0.25)]
        p-8
        w-full
        hover:rotate-0
        hover:scale-[1.02]
        transition-all
        duration-500
      "
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-blue-100 text-sm">
            Today's Workout
          </p>
          <h3 className="text-2xl font-bold mt-2">
            Chest + Triceps
          </h3>
        </div>
        <div className="w-14 h-14 rounded-2xl bg-cyan-400 flex items-center justify-center">
          <Dumbbell size={26} className="text-slate-900" />
        </div>
      </div>
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mt-8">
        <div className="rounded-2xl bg-slate-800 p-5">
          <Activity className="mb-3" />
          <p className="text-sm text-blue-100">
            Calories
          </p>
          <h4 className="text-3xl font-black mt-2">
            2400
          </h4>
        </div>
        <div className="rounded-2xl bg-slate-800 p-5">
          <Target className="mb-3" />
          <p className="text-sm text-blue-100">
            Protein
          </p>
          <h4 className="text-3xl font-black mt-2">
            165 g
          </h4>
        </div>
      </div>
      {/* Progress */}
      <div className="mt-8">
        <div className="flex justify-between">
          <span className="text-blue-100">
            Weekly Goal
          </span>
          <span>82%</span>
        </div>
        <div className="mt-3 h-3 rounded-full bg-white/20 overflow-hidden">
          <div className="w-[82%] h-full rounded-full bg-cyan-400" />
        </div>
      </div>
      {/* Footer */}
      <div className="mt-8 flex items-center justify-between rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 p-5">
        <div>
          <p className="text-slate-900 text-sm">
            Workout Streak
          </p>
          <h3 className="text-2xl font-black text-slate-900">
            🔥 12 Days
          </h3>
        </div>
        <TrendingUp
          className="text-slate-900"
          size={30}
        />
      </div>
    </div>
  );
}