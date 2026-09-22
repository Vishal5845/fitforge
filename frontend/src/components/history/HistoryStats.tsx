import {
  Dumbbell,
  Flame,
  Clock3,
  Trophy,
} from "lucide-react";

interface Props {
  totalWorkouts: number;
  totalMinutes: number;
  totalExercises: number;
  streak: number;
}

export default function HistoryStats({
  totalWorkouts,
  totalMinutes,
  totalExercises,
  streak,
}: Props) {
  const stats = [
    {
      title: "Workouts",
      value: totalWorkouts,
      icon: <Dumbbell className="h-6 w-6" />,
    },
    {
      title: "Current Streak",
      value: `${streak} Days`,
      icon: <Flame className="h-6 w-6" />,
    },
    {
      title: "Minutes",
      value: totalMinutes,
      icon: <Clock3 className="h-6 w-6" />,
    },
    {
      title: "Exercises",
      value: totalExercises,
      icon: <Trophy className="h-6 w-6" />,
    },
  ];
  return (
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="
            rounded-3xl
            border
            border-slate-200
            bg-white
            p-6
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-1
            hover:border-blue-300
            hover:shadow-lg
          "
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            {stat.icon}
          </div>
          <p className="text-3xl font-bold text-slate-900">
            {stat.value}
          </p>
          <p className="mt-1 text-sm text-slate-500">
            {stat.title}
          </p>
        </div>
      ))}
    </section>
  );
}