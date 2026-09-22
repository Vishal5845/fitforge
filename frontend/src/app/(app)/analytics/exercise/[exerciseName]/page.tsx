"use client";

import Link from "next/link";
import { ArrowLeft, Trophy } from "lucide-react";
import { getExerciseAnalytics } from "@/lib/exerciseAnalytics";
import { useParams } from "next/navigation";
import ExerciseStatsGrid from "@/components/analytics/ExerciseStatsGrid";
import ExerciseHistoryTable from "@/components/analytics/ExerciseHistoryTable";
import ExerciseAIInsight from "@/components/analytics/ExerciseAIInsight";
import ExerciseProgressChart from "@/components/analytics/ExerciseProgressChart";


export default function ExerciseAnalyticsPage() {
    const params = useParams();
    const exerciseName = decodeURIComponent(params.exerciseName as string);
    const analytics = getExerciseAnalytics(exerciseName);
    if (!analytics) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-950 p-6">
                <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-10 text-center backdrop-blur-xl">
                    <Trophy className="mx-auto h-12 w-12 text-orange-400" />
                    <h2 className="mt-4 text-2xl font-bold text-white">
                        No Exercise History
                    </h2>
                    <p className="mt-2 text-slate-400">
                        Complete this exercise at least once to unlock analytics.
                    </p>
                    <Link
                        href="/progress"
                        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2 font-medium text-white transition hover:bg-orange-600"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Progress
                    </Link>
                </div>
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-slate-950">
            <div className="mx-auto max-w-6xl p-8">
                <Link
                    href="/progress"
                    className="mb-6 inline-flex items-center gap-2 text-slate-400 transition hover:text-white"
                    >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Progress
                </Link>
                <h1 className="mb-8 text-4xl font-bold text-white">
                    {exerciseName}
                </h1>
                <ExerciseStatsGrid
                    personalRecord={analytics.personalRecord}
                    sessions={analytics.sessions}
                    averageWeight={analytics.averageWeight}
                    totalVolume={analytics.totalVolume}
                />
                <ExerciseProgressChart
                    history={analytics.history}
                />
                <ExerciseHistoryTable history={analytics.history} />
                <ExerciseAIInsight
                    exerciseName={exerciseName}
                    analytics={analytics}
                />
            </div>
        </div>
    );
}