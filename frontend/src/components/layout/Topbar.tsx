"use client";

import {
  Bell,
  Search,
  CheckCircle2,
  Dumbbell,
  Apple,
  User,
  Settings,
  CreditCard,
  LogOut,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

export default function Topbar() {
  const router = useRouter();
  const { data: session } = useSession();

  const [showNotifications, setShowNotifications] = useState(false);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const notificationsRead = localStorage.getItem("fitforge_notifications_read") === "true";
    setHasUnreadNotifications(!notificationsRead);
  }, []);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "short",
  });

  const initials =
    session?.user?.name
      ?.split(" ")
      .filter(Boolean)
      .map((n) => n[0])
      .join("")
      .toUpperCase() ?? "U";

  const userName = session?.user?.name || "FitForge User";
  const userEmail = session?.user?.email || "Account";

  const notifications = [
    {
      id: 1,
      title: "Today's workout is ready",
      message: "Check your personalized workout for today.",
      icon: Dumbbell,
      action: () => router.push("/workout"),
    },
    {
      id: 2,
      title: "Nutrition plan available",
      message: "Review your meals and nutrition targets.",
      icon: Apple,
      action: () => router.push("/nutrition"),
    },
    {
      id: 3,
      title: "Keep your streak going",
      message: "Stay consistent and complete today's workout.",
      icon: CheckCircle2,
      action: () => router.push("/progress"),
    },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white px-8 py-5">
      <div className="flex items-center justify-between">
        {/* Left */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            FitForge Dashboard
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            {today} • Stay consistent 💪
          </p>
        </div>
        {/* Right */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div
            className="
              hidden
              w-72
              items-center
              gap-3
              rounded-2xl
              border
              border-slate-200
              bg-slate-50
              px-4
              py-3
              transition-all
              focus-within:border-blue-500
              focus-within:bg-white
              focus-within:shadow-sm
              md:flex
            "
          >
            <Search className="h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search workouts..."
              className="
                w-full
                bg-transparent
                text-sm
                text-slate-900
                caret-blue-600
                outline-none
                placeholder:text-slate-400
              "
            />
          </div>
          {/* Notifications */}
          <div className="relative">
            <button
              type="button"
              aria-label="Notifications"
              onClick={() => {
                setShowNotifications((prev) => !prev);
                setShowProfileMenu(false);
              }}
              className="
                relative
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-3
                transition
                hover:bg-slate-50
              "
            >
              <Bell className="h-5 w-5 text-slate-600" />
              {hasUnreadNotifications && (
                <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-red-500" />
              )}
            </button>
            {showNotifications && (
              <div
                className="
                  absolute
                  right-0
                  top-14
                  z-50
                  w-80
                  overflow-hidden
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  shadow-xl
                "
              >
                <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Notifications
                    </h3>
                    <p className="text-xs text-slate-500">
                      Stay up to date with FitForge
                    </p>
                  </div>
                  <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-600">
                    {notifications.length} new
                  </span>
                </div>
                <div>
                  {notifications.map((notification) => {
                    const Icon = notification.icon;
                    return (
                      <button
                        key={notification.id}
                        type="button"
                        onClick={() => {
                          notification.action();
                          setShowNotifications(false);
                        }}
                        className="
                          flex
                          w-full
                          gap-3
                          border-b
                          border-slate-100
                          px-5
                          py-4
                          text-left
                          transition
                          hover:bg-slate-50
                        "
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                          <Icon className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-slate-800">
                            {notification.title}
                          </p>
                          <p className="mt-1 text-xs leading-5 text-slate-500">
                            {notification.message}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
                <div className="px-5 py-3">
                  <button
                    type="button"
                    onClick={() => {
                      localStorage.setItem("fitforge_notifications_read", "true");
                      setHasUnreadNotifications(false);
                      setShowNotifications(false);
                    }}
                    className="w-full rounded-xl bg-slate-50 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
                  >
                    Mark all as read
                  </button>
                </div>
              </div>
            )}
          </div>
          {/* Profile Menu */}
          <div ref={profileMenuRef} className="relative">
            <button
              type="button"
              aria-label="Open account menu"
              aria-expanded={showProfileMenu}
              onClick={() => {
                setShowProfileMenu((prev) => !prev);
                setShowNotifications(false);
              }}
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                bg-blue-600
                font-semibold
                text-white
                transition
                hover:bg-blue-700
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                focus:ring-offset-2
              "
            >
              {initials}
            </button>
            {showProfileMenu && (
              <div
                className="
                  absolute
                  right-0
                  top-14
                  z-50
                  w-72
                  overflow-hidden
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  shadow-xl
                "
              >
                {/* User information */}
                <div className="border-b border-slate-100 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
                      {initials}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-900">
                        {userName}
                      </p>

                      <p className="truncate text-xs text-slate-500">
                        {userEmail}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5">
                    <span className="text-xs font-medium text-slate-500">
                      Current plan
                    </span>

                    <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-600">
                      Free Trial
                    </span>
                  </div>
                </div>

                {/* Menu */}
                <div className="p-2">
                  <button
                    type="button"
                    onClick={() => {
                      router.push("/profile");
                      setShowProfileMenu(false);
                    }}
                    className="
                      flex
                      w-full
                      items-center
                      gap-3
                      rounded-xl
                      px-3
                      py-2.5
                      text-left
                      text-sm
                      font-medium
                      text-slate-700
                      transition
                      hover:bg-slate-50
                    "
                  >
                    <User className="h-4 w-4 text-slate-500" />
                    Profile
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      router.push("/settings");
                      setShowProfileMenu(false);
                    }}
                    className="
                      flex
                      w-full
                      items-center
                      gap-3
                      rounded-xl
                      px-3
                      py-2.5
                      text-left
                      text-sm
                      font-medium
                      text-slate-700
                      transition
                      hover:bg-slate-50
                    "
                  >
                    <Settings className="h-4 w-4 text-slate-500" />
                    Settings
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      router.push("/pricing");
                      setShowProfileMenu(false);
                    }}
                    className="
                      flex
                      w-full
                      items-center
                      gap-3
                      rounded-xl
                      px-3
                      py-2.5
                      text-left
                      text-sm
                      font-medium
                      text-slate-700
                      transition
                      hover:bg-slate-50
                    "
                  >
                    <CreditCard className="h-4 w-4 text-slate-500" />
                    Manage Subscription
                  </button>
                </div>
                {/* Logout */}
                <div className="border-t border-slate-100 p-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowProfileMenu(false);
                      signOut({ callbackUrl: "/" });
                    }}
                    className="
                      flex
                      w-full
                      items-center
                      gap-3
                      rounded-xl
                      px-3
                      py-2.5
                      text-left
                      text-sm
                      font-medium
                      text-red-600
                      transition
                      hover:bg-red-50
                    "
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}