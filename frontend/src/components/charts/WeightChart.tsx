"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Progress } from "@/types/progress";

interface Props {
  history: Progress[];
}

export default function WeightChart({ history }: Props) {
  const data = [...history]
    .reverse()
    .map((item) => ({
      date: new Date(item.created_at).toLocaleString("en-IN", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      weight: item.weight,
    }));
  return (
    <div className="bg-slate-900 rounded-2xl p-6 mt-10">
      <h2 className="text-2xl font-bold mb-6">
        Weight Progress
      </h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid stroke="#334155" />
            <XAxis
              dataKey="date"
              stroke="#94A3B8"
            />
            <YAxis
              stroke="#94A3B8"
              domain={[
                (dataMin: number) => dataMin - 2,
                (dataMax: number) => dataMax + 2,
              ]}
            />
            <Tooltip formatter={(value) => [`${value} kg`, "Weight"]}/>
            <Line
              type="monotone"
              dataKey="weight"
              stroke="#3B82F6"
              strokeWidth={4}
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}