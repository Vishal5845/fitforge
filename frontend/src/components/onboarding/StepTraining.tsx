"use client";

import {
  UseFormRegister,
  UseFormSetValue,
  Control,
  useWatch,
  FieldErrors,
} from "react-hook-form";
import { FormData } from "./types";

type Props = {
  register: UseFormRegister<FormData>;
  control: Control<FormData>;
  setValue: UseFormSetValue<FormData>;
  errors: FieldErrors<FormData>;
  inputClass: string;
};

export default function StepTraining({
  register,
  control,
  setValue,
  inputClass,
  errors,
}: Props) {
  const selectedGoal = useWatch({
    control,
    name: "goal",
  });
  return (
    <>
      <div className="md:col-span-2">
        <h2 className="md:col-span-2 text-3xl font-black text-slate-900 mb-2">
          Training Preferences
        </h2>
        <p className="md:col-span-2 text-slate-500 mb-6">
          Choose the training goal you want your AI coach to optimize for.
        </p>
      </div>
      {/* Hidden input to keep React Hook Form tracking the custom buttons */}
      <input type="hidden" {...register("goal", {
        required: "Please select your goal",
      })} />
      {/* Goal Selector */}
      <div className="md:col-span-2 mb-4">
        <label className="block mb-4 text-lg font-bold text-slate-800">
          🎯 What's your goal?
        </label>
        <div className="grid grid-cols-2 gap-4">
          {[
            { value: "fat_loss", title: "Fat Loss", icon: "🔥" },
            { value: "muscle_gain", title: "Muscle Gain", icon: "💪" },
            { value: "strength", title: "Strength", icon: "🏋️" },
            { value: "endurance", title: "Endurance", icon: "🏃" },
            { value: "fitness", title: "General Fitness", icon: "❤️" },
          ].map((goal) => (
            <button
              key={goal.value}
              type="button"
              onClick={() =>
                setValue("goal", goal.value, {
                  shouldValidate: true,
                  shouldDirty: true,
                  shouldTouch: true,
                })
              }
              className={`
                rounded-2xl
                border-2
                p-5
                text-left
                transition-all
                duration-300
                hover:scale-[1.03]
                ${goal.value === "fitness" ? "col-span-2" : ""}
                ${
                  selectedGoal === goal.value
                  ? "border-blue-600 bg-blue-50 shadow-xl"
                  : errors.goal
                  ? "border-red-500 bg-red-50"
                  : "border-slate-200 hover:border-blue-300"
                }
              `}
            >
              <div className="text-3xl mb-2">{goal.icon}</div>
              <div className="font-bold text-slate-900">{goal.title}</div>
            </button>
          ))}
        </div>
        {errors.goal && (
          <p className="mt-3 text-sm text-red-500">
            Please select your goal.
          </p>
        )}
      </div>
      {/* Experience Level Dropdown */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-slate-700">
          Experience Level
        </label>

        <select
          {...register("experience", {
            required: "Experience is required",
          })}
          className={`${inputClass} ${
            errors.experience ? "border-red-500" : ""
          }`}
        >
          <option value="">Select Level</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>

        {errors.experience && (
          <p className="text-sm text-red-500">
            {errors.experience.message}
          </p>
        )}
      </div>
      {/* Workout Days Dropdown */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-slate-700">
          Workout Days
        </label>

        <select
          {...register("workout_days", {
            required: "Workout days are required",
            valueAsNumber: true,
          })}
          className={`${inputClass} ${
            errors.workout_days ? "border-red-500" : ""
          }`}
        >
          <option value="">Select Days</option>
          <option value={3}>3 Days</option>
          <option value={4}>4 Days</option>
          <option value={5}>5 Days</option>
          <option value={6}>6 Days</option>
        </select>

        {errors.workout_days && (
          <p className="text-sm text-red-500">
            {errors.workout_days.message}
          </p>
        )}
      </div>
      {/* Workout Location Dropdown */}
      <div className="md:col-span-2 flex flex-col gap-2">
        <label className="text-sm font-semibold text-slate-700">
          Workout Location
        </label>

        <select
          {...register("workout_location", {
            required: "Workout location is required",
          })}
          className={`${inputClass} ${
            errors.workout_location ? "border-red-500" : ""
          }`}
        >
          <option value="">Select Location</option>
          <option value="gym">Gym</option>
          <option value="home">Home</option>
          <option value="both">Both</option>
        </select>

        {errors.workout_location && (
          <p className="text-sm text-red-500">
            {errors.workout_location.message}
          </p>
        )}
      </div>
    </>
  );
}