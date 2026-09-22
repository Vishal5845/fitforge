"use client";

import {
  Target,
  Dumbbell,
  Calendar,
  MapPin,
} from "lucide-react";

import { UserProfile } from "@/lib/api/profile";
import { formatLabel } from "@/lib/utils/formatLabel";

interface Props {
  profile: UserProfile;
}

export default function FitnessProfileCard({
  profile,
}: Props) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold text-slate-900">
        Fitness Profile
      </h2>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl bg-slate-50 p-5">
          <div className="mb-3 flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            <span className="text-sm text-slate-500">
              Goal
            </span>
          </div>
          <p className="text-xl font-semibold text-slate-900">
            {formatLabel(profile.goal)}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-5">
          <div className="mb-3 flex items-center gap-2">
            <Dumbbell className="h-5 w-5 text-blue-600" />
            <span className="text-sm text-slate-500">
              Experience
            </span>
          </div>
          <p className="text-xl font-semibold text-slate-900">
            {formatLabel(profile.experience)}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-5">
          <div className="mb-3 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            <span className="text-sm text-slate-500">
              Workout Days
            </span>
          </div>
          <p className="text-xl font-semibold text-slate-900">
            {formatLabel(profile.workout_days)} Days / Week
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-5">
          <div className="mb-3 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-600" />
            <span className="text-sm text-slate-500">
              Workout Location
            </span>
          </div>
          <p className="text-xl font-semibold text-slate-900">
            {formatLabel(profile.workout_location)}
          </p>
        </div>
      </div>
    </section>
  );
}