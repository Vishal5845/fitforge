"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/lib/api/config";
import { FormData } from "@/components/onboarding/types";
import StepPersonal from "@/components/onboarding/StepPersonal";
import StepTraining from "@/components/onboarding/StepTraining";
import StepNutrition from "@/components/onboarding/StepNutrition";
import ProgressBar from "@/components/onboarding/ProgressBar";
import { AnimatePresence, motion } from "framer-motion";
import AIThinking from "@/components/loading/AIThinking";
import {
    generateMeal
} from "@/lib/api/meals";
import { generateWorkout } from "@/lib/api/workouts";

export default function OnboardingPage() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    setValue,
    trigger,
    formState: { errors }, 
  } = useForm<FormData>();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  const { data: session } = useSession();
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setProgress(0);
    setIsSubmitting(true);
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 95 ? prev : prev + 5));
    }, 150);
    if (!session?.user?.userId) {
      alert("Please sign in again.");
      return;
    }
    const userId = session.user.userId;
    try {
      const response = await fetch(`${API_BASE_URL}/users/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          ...data,
        }),
      });
      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(errorBody);
      }
      clearInterval(timer);
      setProgress(100);
      await new Promise((resolve) =>
        setTimeout(resolve, 600)
      );
      const workoutRes = await generateWorkout({
        user_id: userId,
        goal: data.goal,
        experience: data.experience,
        workout_days: Number(data.workout_days),
        workout_location: data.workout_location,
        body_type: data.body_type,
      });
      if (!workoutRes.ok) {
        console.error(await workoutRes.text());
        throw new Error("Workout generation failed");
      }
      const mealRes = await generateMeal({
        user_id: userId,
        goal: data.goal,
        diet_type: data.diet_type,
        body_type: data.body_type,
      });
      if (!mealRes.ok) {
        console.error(await mealRes.text());
        throw new Error("Meal generation failed");
      }
      router.replace("/dashboard");
    } 
    catch (error) {
      console.error(error);
      alert(
        "Something went wrong while generating your plan."
      );
    }
    finally {
      clearInterval(timer);
      setLoading(false);
      setIsSubmitting(false);
    }
  };
  const inputClass =
  "w-full h-16 border border-gray-300 rounded-2xl px-5 text-lg text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500";
  const weight = Number(watch("weight")) || 0;
  const goal = watch("goal");
  const workoutDays = Number(watch("workout_days")) || 0;

  const calories =
    goal === "fat_loss"
      ? weight * 22
      : goal === "muscle_gain"
      ? weight * 35
      : weight * 30;

  const protein =
    goal === "fat_loss"
      ? weight * 2.2
      : goal === "muscle_gain"
      ? weight * 2
      : weight * 1.6;

  const workoutSplit =
    workoutDays <= 3
      ? "Full Body"
      : workoutDays === 4
      ? "Upper / Lower"
      : workoutDays === 5
      ? "Push • Pull • Legs"
      : "Push • Pull • Legs + Cardio";
    
  const validateStep1 = async () => {
    const valid = await trigger([
      "name",
      "age",
      "height",
      "weight",
      "gender",
      "body_type",
    ]);
    console.log(valid);
    if (valid) {
      setStep(2);
    }
  };
  const validateStep2 = async () => {
    const valid = await trigger([
      "goal",
      "experience",
      "workout_days",
      "workout_location",
    ]);
    if (valid) {
      setStep(3);
    }
  };
  return (
    <>
      {loading && <AIThinking progress={progress} />}
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-white">
        {/* Background Effects */}
        <div className="absolute -top-40 -left-40 w-[450px] h-[450px] bg-blue-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-violet-400/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-200/20 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-[1700px] mx-auto min-h-screen flex items-center px-8">
          <div className="grid lg:grid-cols-[1fr_1.25fr] gap-20 items-start w-full">
            {/* LEFT SIDE */}
            <div className="hidden lg:block max-w-xl">
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-100 text-blue-700 font-medium mb-8">
                🤖 AI Powered Assessment
              </div>
              <h1 className="text-6xl font-black leading-tight text-slate-900 mt-8">
                Your AI Coach
                <br />
                Starts Here.
              </h1>
              <p className="mt-6 text-xl leading-9 text-slate-600 max-w-lg">
                Tell us about yourself and we'll build
                a personalized workout and nutrition plan
                designed specifically for your goals.
              </p>
              <motion.div
                layout
                className="mt-10 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/40 shadow-xl p-8"
              >
                <h3 className="text-xl font-bold text-slate-900 mb-6">
                  AI Preview
                </h3>
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <span>👤 Name</span>
                    <span className="font-semibold">
                      {watch("name") || "Your Name"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>🎯 Goal</span>
                    <span className="font-semibold">
                      {watch("goal")
                        ?.replace("_", " ")
                        .replace(/\b\w/g, c => c.toUpperCase()) || "--"
                      }
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>🏋 Workout</span>
                    <span className="font-semibold">
                      {watch("workout_days")
                        ? `${watch("workout_days")} Days`
                        : "--"
                      }
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>🥗 Diet</span>
                    <span className="font-semibold">
                      {watch("diet_type")
                        ?.replace("_", " ")
                        .replace(/\b\w/g, c => c.toUpperCase()) || "--"
                      }
                    </span>
                  </div>
                  <div className="mt-8 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
                    <h3 className="font-bold text-xl">
                      🤖 AI Live Preview
                    </h3>
                    <div className="mt-6 space-y-4">
                      <div className="flex justify-between">
                        <span>Calories</span>
                        <span className="font-bold">
                          {weight ? Math.round(calories) : "--"} kcal
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Protein</span>
                        <span className="font-bold">
                          {weight ? Math.round(protein) : "--"} g
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Workout</span>
                        <span className="font-bold">
                          {workoutDays ? workoutSplit : "--"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div> {/* <-- Added this missing closing div for LEFT SIDE */}
            {/* RIGHT SIDE */}
            <div className="w-full bg-white/90 backdrop-blur-xl rounded-[32px] border border-slate-200 shadow-2xl p-12 xl:p-16">
              <div className="text-center mb-10">
                <div className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full mb-4">
                  AI Powered Fitness Assessment
                </div>
                <h2 className="text-4xl font-black text-slate-900 mb-4">
                  Build Your Personalized Plan
                </h2>
                <p className="text-slate-500">
                  Answer a few questions and we'll generate your custom AI fitness plan.
                </p>
              </div>
              {/* Step Indicators */}
              <ProgressBar
                step={step}
                totalSteps={3}
              />
              {/* Form */}
              <motion.form
                layout
                onSubmit={handleSubmit(onSubmit)}
                className="grid md:grid-cols-2 gap-8 w-full"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{
                      opacity: 0,
                      x: 60,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    exit={{
                      opacity: 0,
                      x: -60,
                    }}
                    transition={{
                      duration: 0.35,
                    }}
                    className="contents"
                  >
                    {step === 1 && (
                      <StepPersonal
                        register={register}
                        control={control}
                        setValue={setValue}
                        inputClass={inputClass}
                        errors={errors}
                      />
                    )}

                    {step === 2 && (
                      <StepTraining
                        register={register}
                        control={control}
                        setValue={setValue}
                        inputClass={inputClass}
                        errors={errors}
                      />
                    )}

                    {step === 3 && (
                      <StepNutrition
                        register={register}
                        control={control}
                        setValue={setValue}
                        inputClass={inputClass}
                        errors={errors}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
                
                {/* Navigation Actions */}
                {step === 1 && (
                  <button
                    type="button"
                    disabled={loading}
                    onClick={validateStep1}
                    className="md:col-span-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-lg font-semibold transition"
                  >
                    Next →
                  </button>
                )}
                {step === 2 && (
                  <div className="md:col-span-2 flex gap-4">
                    <button
                      type="button"
                      disabled={loading}
                      onClick={() => setStep(1)}
                      className="flex-1 bg-gray-300 hover:bg-gray-400 text-black py-4 rounded-xl text-lg font-semibold transition"
                    >
                      ← Previous
                    </button>

                    <button
                      type="button"
                      disabled={loading}
                      onClick={validateStep2}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] duration-200 shadow-lg hover:shadow-xl text-white py-4 rounded-xl font-semibold"
                    >
                      Next →
                    </button>
                  </div>
                )}
                {step === 3 && (
                  <div className="md:col-span-2 flex gap-4">
                    <button
                      type="button"
                      disabled={loading}
                      onClick={() => setStep(2)}
                      className="flex-1 bg-gray-300 hover:bg-gray-400 text-black py-4 rounded-xl text-lg font-semibold transition"
                    >
                      ← Previous
                    </button>
                    <button
                      disabled={isSubmitting}
                      type="submit"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] duration-200 shadow-lg hover:shadow-xl text-white py-4 rounded-xl font-semibold"
                    >
                      {isSubmitting ? "Generating Plan..." : "Generate Plan"}
                    </button>
                  </div>
                )}
                {!isSubmitting && (
                  <div className="md:col-span-2 flex justify-center mt-2">
                    <button
                      type="button"
                      disabled={loading}
                      onClick={() => {
                        if (confirm("Clear all entered values?")) {
                          reset();
                          setStep(1);
                        }
                      }}
                      className="px-8 py-3 rounded-xl bg-gray-300 hover:bg-gray-400 text-black font-semibold transition"
                    >
                      Reset
                    </button>
                  </div>
                )}
              </motion.form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}