"use client";

import {
  Settings,
  UserPen,
  LogOut,
} from "lucide-react";

type AccountCardProps = {
  onEditProfile: () => void;
  onLogout: () => void;
};

export default function AccountCard({
  onEditProfile,
  onLogout,
}: AccountCardProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-blue-100 p-3">
          <Settings className="h-6 w-6 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">
          Account
        </h2>
      </div>
      <div className="mt-8 space-y-4">
        <button
          type="button"
          onClick={onEditProfile}
          className="flex w-full items-center gap-3 rounded-xl border border-slate-200 p-4 text-left text-black transition hover:bg-slate-50"
        >
          <UserPen className="h-5 w-5 text-blue-600" />
          Edit Profile
        </button>
        <button
          type="button"
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-xl border border-red-200 p-4 text-left text-red-600 transition hover:bg-red-50"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </section>
  );
}