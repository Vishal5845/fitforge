import {
  Trophy,
  Dumbbell,
  Activity,
  BarChart3,
} from "lucide-react";
import ExerciseStatCard from "./ExerciseStatCard";

interface Props {
  personalRecord: number;
  sessions: number;
  averageWeight: number;
  totalVolume: number;
}

export default function ExerciseStatsGrid({
  personalRecord,
  sessions,
  averageWeight,
  totalVolume,
}: Props) {
  return (
    <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
      <ExerciseStatCard
        title="Personal Record"
        value={`${personalRecord} kg`}
        icon={<Trophy className="h-5 w-5 text-amber-400" />}
      />

      <ExerciseStatCard
        title="Sessions"
        value={sessions.toString()}
        icon={<Dumbbell className="h-5 w-5 text-orange-400" />}
      />

      <ExerciseStatCard
        title="Avg Weight"
        value={`${averageWeight.toFixed(1)} kg`}
        icon={<BarChart3 className="h-5 w-5 text-cyan-400" />}
      />

      <ExerciseStatCard
        title="Total Volume"
        value={`${totalVolume.toLocaleString()} kg`}
        icon={<Activity className="h-5 w-5 text-emerald-400" />}
      />
    </div>
  );
}