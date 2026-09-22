"use client";

import {
  Ruler,
  Weight,
  Cake,
  UserRound,
  Activity,
} from "lucide-react";

import { UserProfile } from "@/lib/api/profile";

interface Props {
  profile: UserProfile;
}

export default function BodyStatsCard({
  profile,
}: Props) {
  const bmi =
    profile.height && profile.weight
      ? (
          profile.weight /
          Math.pow(profile.height / 100, 2)
        ).toFixed(1)
      : "--";

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold text-slate-900">
        Body Statistics
      </h2>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-5">
          <div className="mb-3 flex items-center gap-2">
            <Ruler className="h-5 w-5 text-blue-600" />
            <span className="text-sm text-slate-500">
              Height
            </span>
          </div>
          <p className="text-2xl font-bold text-slate-900">
            {profile.height} cm
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-5">
          <div className="mb-3 flex items-center gap-2">
            <Weight className="h-5 w-5 text-blue-600" />
            <span className="text-sm text-slate-500">
              Weight
            </span>
          </div>
          <p className="text-2xl font-bold text-slate-900">
            {profile.weight} kg
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-5">
          <div className="mb-3 flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-600" />
            <span className="text-sm text-slate-500">
              BMI
            </span>
          </div>
          <p className="text-2xl font-bold text-slate-900">
            {bmi}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-5">
          <div className="mb-3 flex items-center gap-2">
            <Cake className="h-5 w-5 text-blue-600" />
            <span className="text-sm text-slate-500">
              Age
            </span>
          </div>
          <p className="text-2xl font-bold text-slate-900">
            {profile.age}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-5">
          <div className="mb-3 flex items-center gap-2">
            <UserRound className="h-5 w-5 text-blue-600" />
            <span className="text-sm text-slate-500">
              Gender
            </span>
          </div>
          <p className="text-2xl font-bold capitalize text-slate-900">
            {profile.gender}
          </p>
        </div>
      </div>
    </section>
  );
}