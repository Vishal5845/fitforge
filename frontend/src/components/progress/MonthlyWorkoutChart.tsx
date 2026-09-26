"use client";

import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  YAxis,
} from "recharts";

import { useSession } from "next-auth/react";
import {
  getMonthlyProgress,
  MonthlyWorkout,
} from "@/lib/api/progress";

export default function MonthlyWorkoutChart() {
  const { data: session } = useSession();

  const [data, setData] = useState<MonthlyWorkout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!session?.user?.userId) return;
      try {
        const result = await getMonthlyProgress(
          session.user.userId
        );
        setData(result);
      } catch (error) {
        console.error(
          "Failed to load monthly activity:",
          error
        );
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [session]);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold text-slate-900">
        Monthly Activity
      </h2>
      <div className="h-72">
        {loading ? (
          <div className="flex h-full items-center justify-center text-slate-400">
            Loading activity...
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="week" />
              <YAxis allowDecimals={false} />
              <Tooltip />

              <Bar
                dataKey="workouts"
                radius={[8, 8, 0, 0]}
                fill="#2563eb"
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  );
}