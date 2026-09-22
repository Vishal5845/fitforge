"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface Props {
  history: {
    completedAt: string;
    weight: number;
  }[];
}

export default function ExerciseProgressChart({
  history,
}: Props) {
  const data = history.map((item) => ({
    date: new Date(item.completedAt).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    }),
    weight: item.weight,
  }));
  const maxWeight = Math.max(
    ...data.map((item) => item.weight)
  );
  return (
    <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl">
      <div className="mb-6 flex items-center gap-2">
        <span className="text-2xl">📈</span>
        <h2 className="text-xl font-bold text-white">
          Weight Progress
        </h2>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid
              stroke="#334155"
              strokeDasharray="3 3"
            />
            <XAxis
              dataKey="date"
              stroke="#94a3b8"
            />
            <YAxis
              stroke="#94a3b8"
              domain={["dataMin - 2.5", "dataMax + 2.5"]}
            />
            <Tooltip
              contentStyle={{
                background: "#0f172a",
                border: "1px solid #334155",
                borderRadius: "12px",
              }}
              labelStyle={{ color: "#fff" }}
            />
            <Line
              type="monotone"
              dataKey="weight"
              stroke="#f97316"
              strokeWidth={3}
              dot={({ cx, cy, payload }) => {
                const isPR = payload.weight === maxWeight;

                return (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isPR ? 8 : 5}
                    fill={isPR ? "#facc15" : "#f97316"}
                    stroke="#fff"
                    strokeWidth={2}
                  />
                );
              }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}