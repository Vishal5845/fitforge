"use client";

import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Beta Tester",
    role: "FitForge Early Access",
    text: "The personalised workout experience made it easier to understand what I should focus on during each session.",
  },
  {
    name: "Beta Tester",
    role: "FitForge Early Access",
    text: "Having workout planning and nutrition guidance together made the overall experience much simpler.",
  },
  {
    name: "Beta Tester",
    role: "FitForge Early Access",
    text: "The interface is clean and easy to navigate, especially when checking workouts and progress.",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-28 bg-gradient-to-b from-slate-100 to-white"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex rounded-full bg-blue-100 text-blue-700 px-5 py-2 font-medium">
            Testimonials
          </span>
          <h2 className="mt-6 text-5xl font-black text-slate-900">
            Early Feedback
          </h2>
          <p className="mt-6 text-xl text-slate-600">
            See what early users are saying about the FitForge experience.
          </p>
        </div>
        <div className="grid lg:grid-cols-3 gap-8 mt-20">
          {testimonials.map((user) => (
            <div
              key={user.name}
              className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="flex mb-6">
                {[1,2,3,4,5].map((star)=>(
                  <Star
                    key={star}
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-slate-600 leading-8 italic">
                "{user.text}"
              </p>
              <div className="flex items-center gap-4 mt-8">
                <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">
                    {user.name}
                  </h4>
                  <p className="text-slate-500 text-sm">
                    {user.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}