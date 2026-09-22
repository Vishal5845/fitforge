"use client";

import {
  User,
  Mail,
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

export default function ProfileHero({
  profile,
}: Props) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-8">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}
        <div className="flex min-w-0 items-center gap-4 sm:gap-6">
          <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-blue-100">
            <User className="h-14 w-14 text-blue-600" />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-4xl font-bold text-slate-900">
              {profile.name}
            </h1>
            <div className="mt-2 flex min-w-0 items-start gap-2 text-slate-500">
              <Mail className="mt-0.5 h-4 w-4 shrink-0" />
              <span className="min-w-0 break-all text-sm sm:text-base">
                {profile.email}
              </span>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <div className="rounded-xl bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
                Goal: {formatLabel(profile.goal)}
              </div>
              <div className="rounded-xl bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
                {formatLabel(profile.body_type)}
              </div>
            </div>
          </div>
        </div>
        {/* Right */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="mb-2 flex items-center gap-2">
              <Dumbbell className="h-5 w-5 text-blue-600" />
              <span className="text-sm text-slate-500">
                Experience
              </span>
            </div>
            <p className="font-semibold text-slate-900">
              {formatLabel(profile.experience)}
            </p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="mb-2 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <span className="text-sm text-slate-500">
                Workout Days
              </span>
            </div>
            <p className="font-semibold text-slate-900">
              {formatLabel(profile.workout_days)} Days / Week
            </p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="mb-2 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-600" />
              <span className="text-sm text-slate-500">
                Location
              </span>
            </div>
            <p className="font-semibold text-slate-900">
              {formatLabel(profile.workout_location)}
            </p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="mb-2 flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-600" />
              <span className="text-sm text-slate-500">
                Status
              </span>
            </div>
            <p className="font-semibold text-green-600">
              Active
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}