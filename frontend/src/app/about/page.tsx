import Link from "next/link";
import {
  ArrowRight,
  Brain,
  Dumbbell,
  Target,
  TrendingUp,
  Sparkles,
} from "lucide-react";

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-blue-50 to-white px-6 pb-24 pt-36">
        {/* Background decoration */}
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-200 opacity-30 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-cyan-200 opacity-30 blur-3xl" />

        <div className="relative mx-auto max-w-5xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-5 py-2 text-sm font-medium text-blue-700">
            <Sparkles size={16} />
            About FitForge
          </span>

          <h1 className="mt-7 text-5xl font-black tracking-tight text-slate-900 md:text-6xl lg:text-7xl">
            Your Fitness Journey,
            <br />
            <span className="text-blue-600">
              Powered by AI
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-slate-600 md:text-xl">
            FitForge is an AI-powered fitness platform designed
            to bring personalized workouts, nutrition guidance
            and progress tracking together in one simple
            experience.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-8 py-4 font-semibold text-white shadow-lg transition hover:scale-105 hover:bg-blue-700"
            >
              Get Started
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/"
              className="rounded-full border border-slate-300 bg-white px-8 py-4 font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Explore FitForge
            </Link>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="overflow-hidden rounded-[36px] border border-slate-200 bg-white shadow-xl">
            <div className="grid md:grid-cols-2">
              {/* Text */}
              <div className="p-8 md:p-12 lg:p-14">
                <span className="text-sm font-bold uppercase tracking-wider text-blue-600">
                  Our Mission
                </span>

                <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-4xl">
                  Make personalized fitness simpler.
                </h2>

                <p className="mt-6 leading-8 text-slate-600">
                  Fitness plans often become complicated because
                  everyone's goals, experience, schedule and
                  lifestyle are different.
                </p>

                <p className="mt-4 leading-8 text-slate-600">
                  FitForge is built around the idea that your
                  fitness plan should adapt to you instead of
                  forcing you into a generic routine.
                </p>

                <p className="mt-4 leading-8 text-slate-600">
                  Your goals, experience, preferences and
                  available equipment can all be used to create
                  a more personalized fitness experience.
                </p>
              </div>

              {/* AI Card */}
              <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 p-8 text-white md:p-12">
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

                <div className="relative">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                    <Brain size={32} />
                  </div>

                  <h3 className="mt-8 text-3xl font-bold">
                    AI Personalization
                  </h3>

                  <p className="mt-5 leading-8 text-blue-100">
                    FitForge combines your fitness information
                    and preferences to help create workouts,
                    nutrition guidance and recommendations
                    designed around your goals.
                  </p>

                  <div className="mt-8 grid grid-cols-2 gap-3">
                    <MiniStat
                      value="AI"
                      label="Personalized"
                    />
                    <MiniStat
                      value="24/7"
                      label="Accessible"
                    />
                    <MiniStat
                      value="1"
                      label="Platform"
                    />
                    <MiniStat
                      value="∞"
                      label="Adaptable"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What FitForge Provides */}
      <section className="bg-gradient-to-b from-slate-50 to-blue-50 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full bg-blue-100 px-5 py-2 text-sm font-medium text-blue-700">
              What We Provide
            </span>

            <h2 className="mt-6 text-4xl font-black text-slate-900 md:text-5xl">
              Everything in one place
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              FitForge brings the key parts of your fitness
              journey together instead of making you manage
              multiple tools.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Feature
              icon={<Dumbbell />}
              title="Personalized Workouts"
              description="Workout routines tailored to your goals, experience and available equipment."
            />

            <Feature
              icon={<Target />}
              title="Smart Nutrition"
              description="Personalized meal guidance with calories and macronutrient targets."
            />

            <Feature
              icon={<TrendingUp />}
              title="Progress Tracking"
              description="Keep track of your workouts, weight and fitness progress over time."
            />

            <Feature
              icon={<Brain />}
              title="AI Guidance"
              description="Use AI-powered recommendations to adapt your fitness journey as your goals change."
            />
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-white px-6 py-28">
        <div className="mx-auto max-w-5xl text-center">
          <span className="inline-flex rounded-full bg-blue-100 px-5 py-2 text-sm font-medium text-blue-700">
            The FitForge Approach
          </span>

          <h2 className="mt-6 text-4xl font-black leading-tight text-slate-900 md:text-6xl">
            Train smarter.
            <br />
            Eat better.
            <br />
            <span className="text-blue-600">
              Track your progress.
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-slate-600">
            FitForge is designed to make consistency easier by
            combining training, nutrition and progress into one
            connected platform.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 p-10 text-center text-white shadow-2xl md:p-16">
            <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

            <div className="relative">
              <h2 className="text-4xl font-black md:text-5xl">
                Ready to get started?
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-blue-100">
                Create your FitForge profile and start building
                a fitness plan designed around you.
              </p>

              <Link
                href="/register"
                className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 font-semibold text-blue-700 shadow-lg transition hover:-translate-y-1 hover:bg-slate-50"
              >
                Get Started
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Feature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 transition group-hover:scale-110">
        {icon}
      </div>

      <h3 className="mt-6 text-xl font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-3 leading-7 text-slate-600">
        {description}
      </p>
    </div>
  );
}

function MiniStat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
      <p className="text-2xl font-black">
        {value}
      </p>
      <p className="mt-1 text-sm text-blue-100">
        {label}
      </p>
    </div>
  );
}