"use client";

import { useEffect, useState } from "react";
import { Timer } from "lucide-react";

interface RestTimerProps {
  duration: number;
  onComplete: () => void;
}

export default function RestTimer({
  duration,
  onComplete,
}: RestTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, onComplete]);

  const progress = (timeLeft / duration) * 100;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col items-center">
        <div className="rounded-full bg-blue-50 p-4">
          <Timer className="h-8 w-8 text-blue-600" />
        </div>
        <h2 className="mt-4 text-2xl font-bold">
          Rest Time
        </h2>
        <p className="mt-2 text-slate-500">
          Prepare for your next set.
        </p>
        <div className="mt-6 text-5xl font-bold text-blue-600">
          {timeLeft}s
        </div>
        <div className="mt-6 h-3 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-blue-600 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <button
          onClick={onComplete}
          className="mt-8 rounded-xl border border-slate-200 px-6 py-3 font-semibold transition hover:bg-slate-50 text-black"
        >
          Skip Rest
        </button>
      </div>
    </div>
  );
}