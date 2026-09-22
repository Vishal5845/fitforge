import { Flame } from "lucide-react";

interface Props {
  current: number;
  longest: number;
}

export default function StreakCard({
  current,
  longest,
}: Props) {
  return (
    <div className="rounded-3xl border border-orange-500/20 bg-gradient-to-br from-orange-500/10 to-slate-900 p-8">
      <div className="flex items-center gap-3">
        <Flame className="h-8 w-8 text-orange-400" />
        <div>
          <h2 className="text-2xl font-bold text-white">
            Current Streak
          </h2>
          <p className="text-slate-400">
            Keep showing up every day.
          </p>
        </div>
      </div>
      <h1 className="mt-8 text-6xl font-black text-orange-400">
        {current}
      </h1>
      <p className="text-xl text-white">
        day{current !== 1 ? "s" : ""}
      </p>
      <div className="mt-8 border-t border-slate-700 pt-6">
        <p className="text-slate-400">
          Longest streak
        </p>
        <p className="mt-2 text-2xl font-bold text-white">
          {longest} day{longest !== 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
}