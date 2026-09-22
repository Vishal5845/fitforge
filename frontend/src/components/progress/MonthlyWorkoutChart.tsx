"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
} from "recharts";

const data = [
  { week: "W1", workouts: 3 },
  { week: "W2", workouts: 4 },
  { week: "W3", workouts: 2 },
  { week: "W4", workouts: 5 },
];

export default function MonthlyWorkoutChart() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold text-slate-900">
        Monthly Activity
      </h2>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="week" />
            <Tooltip />
            <Bar
              dataKey="workouts"
              radius={[8, 8, 0, 0]}
              fill="#2563eb"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}