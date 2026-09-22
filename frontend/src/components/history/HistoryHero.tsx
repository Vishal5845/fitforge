interface Props {
  totalWorkouts: number;
}

export default function HistoryHero({
  totalWorkouts,
}: Props) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
        Workout History
      </span>
      <h1 className="mt-5 text-4xl font-bold text-slate-900">
        Track Every Workout
      </h1>
      <p className="mt-3 max-w-2xl text-slate-500">
        View your completed workouts, monitor your
        consistency, and stay motivated.
      </p>
      <div className="mt-8 flex items-center gap-8">
        <div>
          <p className="text-4xl font-bold text-blue-600">
            {totalWorkouts}
          </p>

          <p className="text-slate-500">
            Total Workouts
          </p>
        </div>
      </div>
    </section>
  );
}