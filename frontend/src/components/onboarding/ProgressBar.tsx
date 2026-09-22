"use client";
import { motion } from "framer-motion";

type Props = {
  step: number;
  totalSteps: number;
};

export default function ProgressBar({
  step,
  totalSteps,
}: Props) {
  const progress = ((step - 1) / (totalSteps - 1)) * 100;

  const steps = [
    {
      label: "Personal",
      icon: "👤",
    },
    {
      label: "Training",
      icon: "🏋️",
    },
    {
      label: "Nutrition",
      icon: "🥗",
    },
  ];

  return (
    <div className="mb-12">
      {/* Percentage */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-semibold text-slate-700">
          Progress
        </span>

        <motion.span
          key={progress}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm font-bold text-blue-600"
        >
          {Math.round(progress)}%
        </motion.span>
      </div>

      {/* Animated Progress Line */}
      <div className="relative h-2 rounded-full bg-slate-200 overflow-hidden">
        <motion.div
          initial={false}
          animate={{
            width: `${progress}%`,
          }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 20,
          }}
          className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"
        />
      </div>

      {/* Step Circles */}
      <div className="flex justify-between mt-8">
        {steps.map((stepItem, index) => {
          const current = index + 1;

          return (
            <div
              key={stepItem.label}
              className="flex flex-col items-center"
            >
              <motion.div
                layout
                animate={{
                  scale: step >= current ? 1.08 : 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className={`
                  w-12
                  h-12
                  rounded-full
                  flex
                  items-center
                  justify-center
                  font-bold
                  ${
                    step > current
                      ? "bg-green-500 text-white"
                      : step === current
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-slate-200 text-slate-500"
                  }
                `}
              >
                <motion.span
                  key={step > current ? "done" : current}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.25 }}
                >
                  {step > current ? "✓" : current}
                </motion.span>
              </motion.div>
              <div className="mt-3 flex flex-col items-center">
                <span className="text-lg">{stepItem.icon}</span>
                <motion.span
                  layout
                  className={`
                    mt-1
                    text-sm
                    font-medium
                    ${
                      step >= current
                        ? "text-slate-900"
                        : "text-slate-400"
                    }
                  `}
                >
                  {stepItem.label}
                </motion.span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}