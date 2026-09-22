"use client";

import { motion } from "framer-motion";
import { Brain, Dumbbell, Salad, Sparkles } from "lucide-react";

const steps = [
  {
    icon: Brain,
    text: "Analyzing your body profile...",
  },
  {
    icon: Dumbbell,
    text: "Designing your workout plan...",
  },
  {
    icon: Salad,
    text: "Calculating calories & macros...",
  },
  {
    icon: Sparkles,
    text: "Finalizing your AI fitness coach...",
  },
];

export default function AIThinking({
  progress,
}: {
  progress: number;
}) {
    const activeStep =
    progress < 25
        ? 0
        : progress < 50
        ? 1
        : progress < 75
        ? 2
        : 3;
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex items-center justify-center z-50">
      <motion.div
        initial={{
            opacity: 0,
            scale: 0.95,
            y: 20,
        }}

        animate={{
            opacity: 1,
            scale: 1,
            y: 0,
        }}
        className="w-full max-w-xl rounded-3xl bg-slate-800 backdrop-blur-xl border border-white/20 p-10"
      >
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.08, 1],
            }}

            transition={{
            rotate: {
                repeat: Infinity,
                duration: 10,
                ease: "linear",
            },
            scale: {
                repeat: Infinity,
                duration: 1.5,
            },
            }}
          className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center mx-auto mb-8"
        >
          <Brain className="text-white" size={38} />
        </motion.div>
        <h1 className="text-3xl font-black text-white text-center">
          AI Coach is Building Your Plan
        </h1>
        <p className="text-slate-300 text-center mt-3">
            {progress >= 90
            ? "Almost there..."
            : "Please wait while AI prepares your personalized plan..."}
        </p>
        <div className="mt-10 space-y-4">
            {steps.map((step, index) => {
                const Icon = step.icon;
                const isCompleted = index < activeStep;
                const isActive = index === activeStep;

                return (
                    <motion.div
                    key={step.text}
                    animate={{
                        opacity: isCompleted || isActive ? 1 : 0.35,
                        scale: isActive ? 1.03 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                    className={`
                        flex items-center gap-4
                        rounded-xl
                        px-3
                        py-2
                        transition-all
                        ${
                            isActive
                            ? "bg-slate-900/60 border border-blue-500/30"
                            : ""
                        }
                    `}
                    >
                    <div className="w-8 flex justify-center">
                        {isCompleted ? (
                        <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.3 }}
                            className="text-green-400 text-xl"
                            >
                            ✓
                        </motion.span>
                        ) : (
                        <Icon
                            className={
                            isActive
                                ? "text-blue-400"
                                : "text-slate-500"
                            }
                        />
                        )}
                    </div>

                    <span
                        className={
                        isActive
                            ? "text-white font-semibold"
                            : isCompleted
                            ? "text-green-300"
                            : "text-slate-400"
                        }
                    >
                        {step.text}
                    </span>
                    </motion.div>
                );
            })}
        </div>
        <div className="mt-10">
          <div className="h-3 rounded-full bg-slate-800 overflow-hidden">
            <motion.div
                animate={{
                    width: `${progress}%`,
                }}
                transition={{
                    type: "spring",
                    stiffness: 80,
                    damping: 20,
                }}
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
            />
        </div>
        <motion.div
            key={progress}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-white font-bold mt-3"
        >
                {progress}%
        </motion.div>
        </div>
      </motion.div>
    </div>
  );
}