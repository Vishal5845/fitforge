"use client";

import { useMemo } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { WeightEntry } from "@/lib/api/weight";

interface WeightChartProps {
  history: WeightEntry[];
}

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload || !payload.length) {
    return null;
  }

  // payload[0].payload gives you the exact data object for the hovered point
  const dataPoint = payload[0].payload;

  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-lg">
      <p className="text-xs font-medium text-slate-500">{dataPoint.date}</p>
      <p className="mt-1 text-lg font-bold text-slate-900">
        {dataPoint.weight.toFixed(1)} kg
      </p>
    </div>
  );
}

export default function WeightChart({ history }: WeightChartProps) {
  // Memoize data to prevent Recharts from resetting hover state on re-render
  const data = history.map((entry) => ({
    timestamp: new Date(
        entry.recorded_at
    ).getTime(),
    date: new Date(
        entry.recorded_at
    ).toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
    }),
    weight: Number(entry.weight),
    }));
  if (history.length < 2) {
    return (
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">Weight Progress</h2>
        <p className="mt-1 text-sm text-slate-500">
          Your weight trend will appear here.
        </p>
        <div className="mt-8 flex min-h-[220px] items-center justify-center rounded-2xl bg-slate-50">
          <p className="text-sm text-slate-500">
            Add at least two weight measurements to see your trend.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">Weight Progress</h2>
        <p className="mt-1 text-sm text-slate-500">
          Track how your weight changes over time.
        </p>
      </div>
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
                dataKey="timestamp"
                type="number"
                domain={["dataMin", "dataMax"]}
                tick={{ fontSize: 12 }}
                tickFormatter={(value) =>
                    new Date(value).toLocaleDateString(
                    "en-IN",
                    {
                        day: "numeric",
                        month: "short",
                    }
                    )
                }
            />
            <YAxis
              domain={["auto", "auto"]}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `${value} kg`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="weight"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}