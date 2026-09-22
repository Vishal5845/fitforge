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

export default function StepNutrition({
  register,
  control,
  setValue,
  errors,
}: Props) {
  const selectedDiet = useWatch({
    control,
    name: "diet_type",
  });
  const selectedNutrition = useWatch({
    control,
    name: "nutrition_focus",
  });
  return (
    <>
      <div className="md:col-span-2">
        <h2 className="text-3xl font-black text-slate-900">
          🥗 Nutrition Preferences
        </h2>

        <p className="text-slate-500 mt-2">
          Tell your AI coach how you'd like your nutrition plan.
        </p>
      </div>
      <input
        type="hidden"
        {...register("diet_type", {
          required: "Please select your diet type",
        })}
      />
      <div className="md:col-span-2">
        <label className="block mb-4 text-lg font-bold text-slate-800">
          🥗 Diet Type
        </label>
        <div className="grid grid-cols-2 gap-5">
          {[
            {
              value: "vegetarian",
              icon: "🥦",
              title: "Vegetarian",
              desc: "Plant-based meals",
            },
            {
              value: "non_vegetarian",
              icon: "🍗",
              title: "Non Vegetarian",
              desc: "Chicken, Fish & Meat",
            },
            {
              value: "vegan",
              icon: "🌱",
              title: "Vegan",
              desc: "100% Plant Based",
            },
            {
              value: "eggetarian",
              icon: "🥚",
              title: "Eggetarian",
              desc: "Eggs Included",
            },
          ].map((diet) => (
            <button
              key={diet.value}
              type="button"
              onClick={() =>
                setValue("diet_type", diet.value, {
                  shouldValidate: true,
                  shouldDirty: true,
                  shouldTouch: true,
                })
              }
              className={`
                min-h-[190px]
                rounded-3xl
                border-2
                p-6
                flex
                flex-col
                justify-center
                items-center
                text-center
                transition-all
                duration-300
                hover:scale-[1.03]
                ${
                  selectedDiet === diet.value
                    ? "border-green-600 bg-green-50 shadow-xl"
                    : errors.diet_type
                    ? "border-red-500 bg-red-50"
                    : "border-slate-200 hover:border-green-300"
                }
              `}
            >
              <div className="text-6xl mb-4">{diet.icon}</div>
              <div className="font-bold text-xl text-black">
                {diet.title}
              </div>
              <div className="text-slate-500 mt-2">
                {diet.desc}
              </div>
            </button>
          ))}
        </div>
        {errors.diet_type && (
          <p className="mt-3 text-sm text-red-500">
            {errors.diet_type.message}
          </p>
        )}
      </div>
      <input
        type="hidden"
        {...register("nutrition_focus", {
          required: "Please select a nutrition focus",
        })}
      />
      <div className="md:col-span-2 mt-10">
        <label className="block mb-4 text-lg font-bold text-slate-800">
          💪 Nutrition Focus
        </label>
        <div className="grid grid-cols-2 gap-5">
          {[
            {
              value: "high_protein",
              icon: "💪",
              title: "High Protein",
            },
            {
              value: "balanced",
              icon: "⚖️",
              title: "Balanced",
            },
            {
              value: "weight_loss",
              icon: "🔥",
              title: "Weight Loss",
            },
            {
              value: "low_carb",
              icon: "🥑",
              title: "Low Carb",
            },
            {
              value: "performance",
              icon: "⚡",
              title: "Performance",
            },
          ].map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() =>
                setValue("nutrition_focus", item.value, {
                  shouldValidate: true,
                  shouldDirty: true,
                  shouldTouch: true,
                })
              }
              className={`
                ${
                  item.value === "performance"
                    ? "col-span-2"
                    : ""
                }

                min-h-[170px]
                rounded-3xl
                border-2
                p-6
                transition-all
                duration-300
                hover:scale-[1.03]

                ${
                  selectedNutrition === item.value
                    ? "border-blue-600 bg-blue-50 shadow-xl"
                    : errors.nutrition_focus
                    ? "border-red-500 bg-red-50"
                    : "border-slate-200 hover:border-blue-300"
                }
              `}
            >
              <div className="text-5xl mb-3">
                {item.icon}
              </div>
              <div className="font-bold text-lg text-black">
                {item.title}
              </div>
            </button>
          ))}
        </div>
        {errors.nutrition_focus && (
          <p className="mt-3 text-sm text-red-500">
            {errors.nutrition_focus.message}
          </p>
        )}
      </div>
    </>
  );
}