"use client";

import LoginForm from "@/components/auth/LoginForm";
import DashboardPreview from "@/components/auth/DashboardPreview";
import { Dumbbell, Sparkles } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white">
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* LEFT */}
        <div className="hidden lg:flex relative overflow-hidden flex-col justify-center px-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 text-white">
          {/* Background Glow */}
          <div className="absolute -top-32 -left-24 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl" />
          {/* Content */}
          <div className="relative z-10">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-8">
              <Dumbbell size={36} />
              <div>
                <h1 className="text-4xl font-black">
                  FitForge
                </h1>

                <p className="text-blue-100">
                  AI Fitness Platform
                </p>
              </div>
            </div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-slate-800 backdrop-blur-xl border border-white/20 px-5 py-2 rounded-full mb-8">
              <Sparkles size={18} />
              AI Powered Personal Coach
            </div>
            {/* Heading */}
            <h2 className="text-6xl xl:text-7xl font-black leading-[1.15]">
              Train Smarter.
              <br />
              Eat Better.
              <br />
              <span className="text-cyan-300">
                Get Results.
              </span>
            </h2>
            {/* Paragraph */}
            <p className="mt-8 text-xl text-blue-100 leading-9 max-w-xl">
              Personalized AI workout plans,
              smart nutrition,
              progress tracking,
              and exercise tutorials —
              all in one platform.
            </p>
            {/* Dashboard */}
            <DashboardPreview />
          </div>
        </div>
        {/* RIGHT */}
        <div className="flex items-center justify-center p-6 lg:p-12">
          <LoginForm />
        </div>
      </div>
    </div>
  )
};