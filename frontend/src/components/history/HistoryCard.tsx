import { CheckCircle2, Clock3, Dumbbell, Calendar } from "lucide-react";

interface Props {
  workoutName: string;
  dayName: string;
  exercises: number;
  duration: number;
  completedAt: string;
}

export default function HistoryCard({
  workoutName,
  dayName,
  exercises,
  duration,
  completedAt,
}: Props) {
  return (
    <div
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
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <h2 className="text-xl font-bold text-slate-900">
              {dayName}
            </h2>
          </div>
          <p className="mt-1 text-slate-500">
            {workoutName}
          </p>
        </div>
        <span className="rounded-full bg-green-50 px-3 py-1 text-sm font-semibold text-green-700">
          Completed
        </span>
      </div>
      <div className="mt-6 flex flex-wrap gap-6 text-sm text-slate-600">
        <div className="flex items-center gap-2">
          <Dumbbell className="h-4 w-4 text-blue-600" />
          {exercises} Exercises
        </div>
        <div className="flex items-center gap-2">
          <Clock3 className="h-4 w-4 text-blue-600" />
          {duration} min
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-blue-600" />
          {new Date(completedAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}