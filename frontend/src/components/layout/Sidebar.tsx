"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Dumbbell,
  TrendingUp,
  History,
  UtensilsCrossed,
  User,
  Settings,
  LogOut,
} from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Workout",
    href: "/workout",
    icon: Dumbbell,
  },
  {
    name: "Progress",
    href: "/progress",
    icon: TrendingUp,
  },
  {
    name: "History",
    href: "/history",
    icon: History,
  },
  {
    name: "Nutrition",
    href: "/nutrition",
    icon: UtensilsCrossed,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: User,
  },
];

const bottomNavigation = [
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
  {
    name: "Logout",
    href: "/",
    icon: LogOut,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden h-screen w-72 shrink-0 flex-col border-r border-slate-200 bg-white lg:flex">
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-slate-200 px-6 py-7">
        <div className="rounded-xl bg-blue-600 p-2">
            <Dumbbell className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            FitForge
          </h1>
          <p className="text-xs text-slate-500">
            AI Workout Coach
          </p>
        </div>
      </div>
      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4">
        {navigation.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                active
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
      {/* Bottom Navigation */}
      <div className="border-t border-slate-200 p-4 space-y-2">
        {bottomNavigation.map((item) => {
          const Icon = item.icon;
          if (item.name === "Logout") {
            return (
              <button
                key={item.name}
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-600 transition-all hover:bg-slate-100 hover:text-slate-900"
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.name}</span>
              </button>
            );
          }
          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-600 transition-all hover:bg-slate-100 hover:text-slate-900"
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}