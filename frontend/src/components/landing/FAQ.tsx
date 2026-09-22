"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How does FitForge AI generate workout plans?",
    answer:
      "FitForge analyzes your goal, body type, experience level, workout days and available equipment to generate a personalized workout plan.",
  },
  {
    question: "Can I regenerate my workout anytime?",
    answer:
      "Yes. You can update your profile and regenerate your workout and meal plans whenever your fitness goals change.",
  },
  {
    question: "Does FitForge support vegetarian diets?",
    answer:
      "Yes. FitForge supports vegetarian, non-vegetarian, vegan and keto meal plans.",
  },
  {
    question: "Will exercise tutorials be included?",
    answer:
      "Yes. FitForge provides exercise guidance including proper form, muscles worked, instructions and common mistakes.",
  },
  {
    question: "Can I cancel my subscription?",
    answer:
      "Yes. You can manage or cancel your subscription anytime from your account settings.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section
      id="faq"
      className="py-28 bg-white"
    >
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center">
          <span className="inline-flex rounded-full bg-blue-100 text-blue-700 px-5 py-2 font-medium">
            FAQ
          </span>
          <h2 className="mt-6 text-5xl font-black text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="mt-6 text-xl text-slate-600">
            Everything you need to know before starting.
          </p>
        </div>
        <div className="mt-16 space-y-5">
          {faqs.map((faq, index) => {
            const expanded = open === index;
            return (
              <div
                key={faq.question}
                className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50"
              >
                <button
                  onClick={() =>
                    setOpen(expanded ? null : index)
                  }
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-semibold text-lg text-slate-900">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`transition-transform ${
                      expanded ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {expanded && (
                  <div className="px-6 pb-6 text-slate-600 leading-7">
                    {faq.answer}
                  </div>

                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}