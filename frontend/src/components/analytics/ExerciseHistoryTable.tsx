interface HistoryItem {
  completedAt: string;
  weight: number;
  reps: number;
  sets: number;
}

interface Props {
  history: HistoryItem[];
}

export default function ExerciseHistoryTable({
  history,
}: Props) {
  return (
    <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">
          📋 Recent Sessions
        </h2>
        <span className="text-sm text-slate-400">
          {history.length} Session{history.length > 1 ? "s" : ""}
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-800 text-left">
              <th className="pb-3 text-sm font-medium text-slate-400">
                Date
              </th>
              <th className="pb-3 text-sm font-medium text-slate-400">
                Weight
              </th>
              <th className="pb-3 text-sm font-medium text-slate-400">
                Reps
              </th>
              <th className="pb-3 text-sm font-medium text-slate-400">
                Sets
              </th>
              <th className="pb-3 text-sm font-medium text-slate-400">
                Volume
              </th>
            </tr>
          </thead>
          <tbody>
            {history
              .slice()
              .reverse()
              .slice(0, 10)
              .map((session) => (
                <tr
                  key={session.completedAt}
                  className="border-b border-slate-800/50 transition hover:bg-slate-800/40"
                >
                  <td className="py-4 text-slate-300">
                    {new Date(
                      session.completedAt
                    ).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="py-4 font-semibold text-white">
                    {session.weight} kg
                  </td>
                  <td className="py-4 text-slate-300">
                    {session.reps}
                  </td>
                  <td className="py-4 text-slate-300">
                    {session.sets}
                  </td>
                  <td className="py-4 font-medium text-orange-400">
                    {(
                      session.weight *
                      session.reps *
                      session.sets
                    ).toLocaleString()} kg
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}