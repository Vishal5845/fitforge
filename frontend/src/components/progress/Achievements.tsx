import { Trophy, Flame, Dumbbell, Target } from "lucide-react";

interface Props {
  totalWorkouts: number;
  currentStreak: number;
  totalExercises: number;
}

export default function Achievements({
  totalWorkouts,
  currentStreak,
  totalExercises,
}: Props) {
  const achievements = [
    {
      title: "First Workout",
      unlocked: totalWorkouts >= 1,
      icon: <Dumbbell className="h-5 w-5" />,
    },
    {
      title: "7 Day Streak",
      unlocked: currentStreak >= 7,
      icon: <Flame className="h-5 w-5" />,
    },
    {
      title: "100 Exercises",
      unlocked: totalExercises >= 100,
      icon: <Target className="h-5 w-5" />,
    },
    {
      title: "Workout Master",
      unlocked: totalWorkouts >= 50,
      icon: <Trophy className="h-5 w-5" />,
    },
  ];

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold text-slate-900">
        Achievements
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {achievements.map((achievement) => (
          <div
            key={achievement.title}
            className={`rounded-2xl border p-5 transition-all ${
              achievement.unlocked
                ? "border-yellow-200 bg-yellow-50"
                : "border-slate-200 bg-slate-50 opacity-60"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`rounded-xl p-3 ${
                  achievement.unlocked
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-slate-200 text-slate-500"
                }`}
              >
                {achievement.icon}
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">
                  {achievement.title}
                </h3>
                <p className="text-sm text-slate-500">
                  {achievement.unlocked
                    ? "Unlocked"
                    : "Locked"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}