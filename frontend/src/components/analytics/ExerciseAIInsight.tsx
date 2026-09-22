import type { ExerciseAnalytics } from "@/lib/exerciseAnalytics";

interface Props {
    exerciseName: string;
    analytics: ExerciseAnalytics;
}

export default function ExerciseAIInsight({
  exerciseName,
  analytics,
}: Props) {
  const {
    personalRecord,
    latestWeight,
    latestVolume,
    weightChange,
    volumeChange,
    confidence,
  } = analytics;
  const insights: string[] = [];
  if (weightChange > 0) {
    insights.push(
      `You've increased your working weight by ${weightChange} kg since your first recorded session.`
    );
  } else if (weightChange < 0) {
    insights.push(
      "Your working weight has decreased recently. Focus on rebuilding gradually while maintaining excellent form."
    );
  } else {
    insights.push(
      "Your working weight has remained stable. If your final set feels comfortable, consider increasing by 2.5 kg."
    );
  }

  if (volumeChange > 0) {
    insights.push(
      `Training volume has increased by ${volumeChange} kg, indicating consistent progression.`
    );
  } else if (volumeChange < 0) {
    insights.push(
      "Training volume has decreased recently. Make sure you're recovering well and staying consistent."
    );
  }

  insights.push(
    `Your current working weight is ${latestWeight} kg. Increase the load only if every rep is completed with proper technique.`
  );

  return (
    <div className="mt-8 rounded-3xl border border-orange-500/20 bg-orange-500/10 p-6">
      <h2 className="mb-6 text-xl font-bold text-white">
        🤖 AI Coach
      </h2>
      <div className="mb-6 grid grid-cols-3 gap-4">
        <div className="rounded-xl bg-slate-900/60 p-4 text-center">
          <p className="text-sm text-slate-400">🏆 PR</p>
          <p className="mt-2 text-xl font-bold text-white">
            {personalRecord} kg
          </p>
        </div>
        <div className="rounded-xl bg-slate-900/60 p-4 text-center">
          <p className="text-sm text-slate-400">📈 Volume</p>
          <p className="mt-2 text-xl font-bold text-white">
            {latestVolume} kg
          </p>
        </div>
        <div className="rounded-xl bg-slate-900/60 p-4 text-center">
          <p className="text-sm text-slate-400">🎯 Confidence</p>
          <p className="mt-2 text-xl font-bold text-white">
            {confidence}
          </p>
        </div>
      </div>
      <div className="space-y-3">
        {insights.map((insight, index) => (
          <div
            key={index}
            className="rounded-xl bg-slate-900/60 p-4 text-slate-300"
          >
            {insight}
          </div>
        ))}
      </div>
    </div>
  );
}