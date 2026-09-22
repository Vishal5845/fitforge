"use client";

import {
  UseFormRegister,
  UseFormSetValue,
  Control,
  useWatch,
  FieldErrors
} from "react-hook-form";
import { FormData } from "./types";

type Props = {
  register: UseFormRegister<FormData>;
  control: Control<FormData>;
  setValue: UseFormSetValue<FormData>;
  errors: FieldErrors<FormData>;
  inputClass: string;
};

export default function StepPersonal({
  register,
  control,
  setValue,
  inputClass,
  errors,
}: Props) {
  const selectedGender = useWatch({
    control,
    name: "gender",
  });
  const selectedBodyType = useWatch({
    control,
    name: "body_type",
  });
  console.log("watch:", selectedBodyType);
  return (
    <>
      <div className="md:col-span-2">
        <h2 className="text-3xl font-black text-slate-900">
          👤 Personal Information
        </h2>
        <p className="text-slate-500 mb-4">
          Tell us about yourself so your AI coach can build the perfect fitness plan.
        </p>
      </div>
      <div>
        <input
          {...register("name", {
            required: "Name is required",
          })}
          placeholder="Name"
          className={`${inputClass} ${
            errors.name ? "border-red-500" : ""
          }`}
        />

        {errors.name && (
          <p className="mt-1 text-sm text-red-500">
            {errors.name.message}
          </p>
        )}
      </div>
      <div>
        <input
          {...register("age", {
            required: "Age is required",
            valueAsNumber: true,
            min: {
              value: 16,
              message: "Age must be at least 16",
            },
            max: {
              value: 80,
              message: "Age cannot exceed 80",
            },
          })}
          type="number"
          placeholder="Age"
          className={`${inputClass} ${
            errors.name ? "border-red-500" : ""
          }`}
        />
        {errors.age && (
          <p className="text-red-500 text-sm">
            {errors.age.message}
          </p>
        )}
      </div>
      <div>
        <input
          {...register("height", {
            valueAsNumber: true,
            required: "Height is required",
            min: {
              value:100,
              message: "Height must be at least 100",
            },
            max:{
              value:250,
              message: "Height cannout exceed 250",
            }
          })}
          type="number"
          placeholder="Height (cm)"
          className={`${inputClass} ${
            errors.name ? "border-red-500" : ""
          }`}
        />
        {errors.height && (
          <p className="mt-1 text-sm text-red-500">
            {errors.height.message}
          </p>
        )}
      </div>
      <div>
        <input
          {...register("weight", {
            valueAsNumber: true,
            required: "Weight is required",
            min: {
              value:30,
              message: "Weight must be at least 30"
            },
            max: {
              value:300,
              message: "Weight cannot exceed 300"
            },
          })}
          type="number"
          placeholder="Weight (kg)"
          className={`${inputClass} ${
            errors.name ? "border-red-500" : ""
          }`}
        />
        {errors.weight && (
          <p className="mt-1 text-sm text-red-500">
            {errors.weight.message}
          </p>
        )}
      </div>

      {/* GENDER SECTION */}
      <div className="md:col-span-2">
        <input
          type="hidden"
          {...register("gender", {
            required: true,
          })}
        />
        <label className="block mb-4 text-lg font-bold text-slate-800">
          👤 Select Gender
        </label>
        <div className="grid grid-cols-2 gap-6">
          <button
            type="button"
            onClick={() =>
              setValue("gender", "male", {
                shouldValidate: true,
                shouldDirty: true,
                shouldTouch: true,
              })
            }
            className={`
              min-h-[200px]
              rounded-2xl
              border-2
              p-6
              flex
              flex-col
              items-center
              justify-center
              text-center
              transition-all
              duration-300
              hover:scale-[1.03]
              ${
                selectedGender === "male"
                ? "border-blue-600 bg-blue-50 shadow-lg"
                : errors.gender
                ? "border-red-500"
                : "border-slate-200 hover:border-blue-300"
              }
            `}
          >
            <div className="text-6xl mb-4">👨</div>
            <div className="font-bold text-xl text-black">
              Male
            </div>
            <p className="text-slate-500 mt-2">
              Recommended for men
            </p>
          </button>
          <button
            type="button"
            onClick={() =>
              setValue("gender", "female", {
                shouldValidate: true,
                shouldDirty: true,
                shouldTouch: true,
              })
            }
            className={`
              min-h-[200px]
              rounded-2xl
              border-2
              p-6
              flex
              flex-col
              items-center
              justify-center
              text-center
              transition-all
              duration-300
              hover:scale-[1.03]
              ${
                selectedGender === "female"
                ? "border-blue-600 bg-blue-50 shadow-lg"
                : errors.gender
                ? "border-red-500"
                : "border-slate-200 hover:border-blue-300"
              }
            `}
          >
            <div className="text-6xl mb-4">👩</div>
            <div className="font-bold text-xl text-black">
              Female
            </div>
            <p className="text-slate-500 mt-2">
              Recommended for women
            </p>
          </button>
        </div>
        {errors.gender && (
          <p className="mt-3 text-sm text-red-500">
            Please select your gender
          </p>
        )}
      </div>

      {/* BODY TYPE SECTION */}
      <div className="md:col-span-2">
        {/* CHANGED: Replaced the broken hidden radio tag with a working hidden registration wrapper */}
        <input
          type="hidden"
          {...register("body_type", {
            required: true,
          })}
        />
        <label className="block mb-4 text-lg font-bold text-slate-800">
          🧬 Select Your Body Type
        </label>
        <div className="grid md:grid-cols-3 gap-5 text-black">
          {[
            {
              value: "ectomorph",
              icon: "⚡",
              title: "Ectomorph",
              desc: "Lean build with a fast metabolism."
            },
            {
              value: "mesomorph",
              icon: "💪",
              title: "Mesomorph",
              desc: "Athletic build with balanced metabolism."
            },
            {
              value: "endomorph",
              icon: "🏋️",
              title: "Endomorph",
              desc: "Broader frame with easier weight gain."
            }
          ].map((body) => (
            <button
              key={body.value}
              type="button"
              onClick={() => {
                setValue("body_type", body.value, {
                  shouldDirty: true,
                  shouldTouch: true,
                  shouldValidate: true,
                });
                console.log("clicked", body.value);
              }}
              className={`
                min-h-[210px]
                rounded-3xl
                border-2
                p-6
                flex
                flex-col
                items-center
                justify-center
                text-center
                transition-all
                duration-300
                hover:scale-[1.03]
                ${
                  selectedBodyType === body.value
                  ? "border-blue-600 bg-blue-50 shadow-xl"
                  : errors.body_type
                  ? "border-red-500"
                  : "border-slate-200 hover:border-blue-300"
                }
              `}
            >
              <div className="text-6xl mb-4">
                {body.icon}
              </div>
              <h3 className="font-bold text-xl">
                {body.title}
              </h3>
              <p className="mt-3 text-sm text-slate-500 leading-6">
                {body.desc}
              </p>
            </button>
          ))}
        </div>
        {errors.body_type && (
          <p className="mt-3 text-sm text-red-500">
            Please select your body type
          </p>
        )}
      </div>
    </>
  );
}