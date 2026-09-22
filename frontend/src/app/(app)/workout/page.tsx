"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import {
  getWorkout,
  completeWorkout,
} from "@/lib/api/workouts";
import { WorkoutProgram } from "@/types/workout";
import {
  getExercise,
  ExerciseDetail,
} from "@/lib/api/exercise";

import WorkoutHeader from "@/components/workout/WorkoutHeader";
import WorkoutProgress from "@/components/workout/WorkoutProgress";
import ExerciseCard from "@/components/workout/ExerciseCard";
import SetTracker from "@/components/workout/SetTracker";
import RestTimer from "@/components/workout/RestTimer";
import WorkoutComplete from "@/components/workout/WorkoutComplete";

export default function WorkoutPage() {
  const { data: session, status } = useSession();

  const [workout, setWorkout] = useState<WorkoutProgram | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [completedSets, setCompletedSets] = useState(0);
  const [showRest, setShowRest] = useState(false);
  const [workoutCompleted, setWorkoutCompleted] = useState(false);
  const [exerciseDetail, setExerciseDetail] = useState<ExerciseDetail | null>(null);

  useEffect(() => {
    async function loadWorkout() {
      if (!session?.user?.userId) return;

      try {
        const data = await getWorkout(session.user.userId);
        setWorkout(data);
        setExerciseDetail(null);
      } catch (err) {
        console.error(err);
        setError("Unable to load workout.");
      } finally {
        setLoading(false);
      }
    }

    if (status === "authenticated") {
      loadWorkout();
    }

    if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [session, status]);

  useEffect(() => {
    async function loadExercise() {
      if (!workout) return;

      const currentDay = workout.days[workout.currentDay];
      const exercise = currentDay.exercises[exerciseIndex];

      if (!exercise) return;

      try {
        const data = await getExercise(exercise.name);
        setExerciseDetail(data);
      } catch (err) {
        console.error(err);

        setExerciseDetail({
          name: exercise.name,
          muscle_group: "Unknown",
          difficulty: "Unknown",
          equipment: "Unknown",
          instructions: [
            "Exercise information not available.",
          ],
          tips: [],
          mistakes: [],
          animation_url: "",
        });
      }
    }

    loadExercise()
  }, [workout, exerciseIndex]);

  // Loading
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading workout...
      </div>
    );
  }

  // Error / No workout
  if (!workout) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        {error || "No workout found"}
      </div>
    );
  }

  const currentDay = workout.days[workout.currentDay];
  const exercises = currentDay.exercises;
  const exercise = exercises[exerciseIndex];

  if (!exercise) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        No exercise found.
      </div>
    );
  }

  const totalSets = exercise.sets;
  const restDuration =
    Number.parseInt(workout.restBetweenSets, 10) || 60;

  const handleCompleteSet = () => {
    if (completedSets + 1 >= totalSets) {
      setCompletedSets(totalSets);
      setShowRest(true);
    } else {
      setCompletedSets((prev) => prev + 1);
    }
  };

  const handlePreviousExercise = () => {
    if (exerciseIndex === 0) return;
    setShowRest(false);
    setCompletedSets(0);
    setExerciseDetail(null);
    setExerciseIndex((prev) => prev - 1);
  };

  const handleNextExercise = () => {
    if (exerciseIndex >= exercises.length - 1) return;

    setShowRest(false);
    setCompletedSets(0);
    setExerciseDetail(null);
    setExerciseIndex((prev) => prev + 1);
  };

  const handleRestComplete = async () => {
    if (!session?.user?.userId) return;

    setShowRest(false);
    setCompletedSets(0);

    if (exerciseIndex < exercises.length - 1) {
      setExerciseDetail(null);
      setExerciseIndex((prev) => prev + 1);
    } else {
      try {
        await completeWorkout({
          user_id: session.user.userId,
          workout_name: workout.programName,
          day_name: currentDay.name,
          total_exercises: exercises.length,
          estimated_duration: workout.estimatedDuration,
        });

        setWorkoutCompleted(true);
      } catch (error) {
        console.error(error);
        alert("Unable to save workout.");
      }
    }
  };

  // Workout Finished
  if (workoutCompleted) {
    return (
      <main className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto max-w-3xl text-black">
          <WorkoutComplete
            totalExercises={exercises.length}
            duration={workout.estimatedDuration}
          />
        </div>
      </main>
    );
  }
  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        <WorkoutHeader
          dayNumber={workout.currentDay + 1}
          dayName={currentDay.name}
          estimatedDuration={workout.estimatedDuration}
        />
        <WorkoutProgress
          completed={exerciseIndex}
          total={exercises.length}
        />
        <ExerciseCard
          name={exercise.name}
          muscleGroup={exerciseDetail?.muscle_group ?? "Unknown"}
          difficulty={exerciseDetail?.difficulty ?? "Unknown"}
          equipment={exerciseDetail?.equipment ?? "Unknown"}
          sets={exercise.sets}
          reps={exercise.reps}
          instructions={
            exerciseDetail?.instructions ?? ["Loading instructions..."]
          }
          tips={exerciseDetail?.tips ?? []}
          mistakes={exerciseDetail?.mistakes ?? []}
          animation_url={exerciseDetail?.animation_url}
        />
        {showRest ? (
          <RestTimer
            duration={restDuration}
            onComplete={handleRestComplete}
          />
        ) : (
          <SetTracker
            totalSets={totalSets}
            completedSets={completedSets}
            onCompleteSet={handleCompleteSet}
          />
        )}
      </div>
    </main>
  );
}