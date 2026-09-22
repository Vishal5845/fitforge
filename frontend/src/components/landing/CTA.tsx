"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-28 bg-gradient-to-b from-white to-slate-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 p-10 md:p-16 text-center text-white shadow-2xl">
          {/* Background effects */}
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" />
          <div className="relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/20 px-5 py-2 text-sm font-medium backdrop-blur-sm">
              <Sparkles size={18} />
              AI Powered Fitness
            </div>
            {/* Heading */}
            <h2 className="mt-8 text-4xl md:text-6xl font-black leading-tight">
              Ready To Transform
              <br />
              Your Fitness Journey?
            </h2>
            {/* Description */}
            <p className="mx-auto mt-7 max-w-3xl text-lg md:text-xl leading-8 text-blue-100">
              Get personalized AI workout plans, smart nutrition guidance,
              exercise tutorials and progress tracking — all in one platform.
            </p>
            {/* Benefits */}
            <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-blue-100">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={17} />
                Personalized Plans
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={17} />
                AI Nutrition
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={17} />
                Progress Tracking
              </div>
            </div>
            {/* Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/register"
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  bg-white
                  px-8
                  py-4
                  font-semibold
                  text-blue-700
                  shadow-lg
                  transition
                  hover:-translate-y-1
                  hover:bg-slate-50
                "
              >
                Get Started
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/login"
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  border
                  border-white/30
                  bg-white/10
                  px-8
                  py-4
                  font-semibold
                  text-white
                  backdrop-blur-sm
                  transition
                  hover:-translate-y-1
                  hover:bg-white/20
                "
              >
                Login
                <ArrowRight size={18} />
              </Link>
            </div>
            <p className="mt-6 text-sm text-blue-100/80">
              Start building your personalized fitness plan today.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}