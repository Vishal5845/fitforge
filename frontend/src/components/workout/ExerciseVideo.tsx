"use client";

interface ExerciseVideoProps {
  animation_url?: string;
  exerciseName?: string;
}

export default function ExerciseVideo({
  animation_url,
  exerciseName,
}: ExerciseVideoProps) {
  if (!animation_url) {
    return null;
  }
  return (
    <div className="mb-8 overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm">
      <div className="relative flex aspect-video w-full items-center justify-center bg-slate-100">
        <img
          src={animation_url}
          alt={`${exerciseName ?? "Exercise"} demonstration`}
          className="h-full w-full object-contain"
        />
        <div className="absolute bottom-4 left-4 rounded-full bg-slate-900/80 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
          Exercise Demonstration
        </div>
      </div>
      <div className="border-t border-slate-200 px-4 py-3">
        <p className="text-sm font-medium text-slate-700">
          {exerciseName
            ? `${exerciseName} Demonstration`
            : "Exercise Demonstration"}
        </p>
      </div>
    </div>
  );
}