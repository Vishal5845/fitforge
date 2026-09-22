import Link from "next/link";
import {
  Mail,
  MessageCircle,
  ArrowLeft,
  Dumbbell,
} from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 py-24 text-white">
        <div className="mx-auto max-w-5xl px-6">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-blue-100 transition hover:text-white"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
              <Dumbbell size={28} />
            </div>
            <div>
              <h1 className="text-5xl font-black">
                Contact Us
              </h1>
              <p className="mt-2 text-lg text-blue-100">
                We'd love to hear from you.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Content */}
      <section className="py-20">
        <div className="mx-auto grid max-w-5xl gap-8 px-6 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
              <Mail className="text-blue-600" size={26} />
            </div>
            <h2 className="text-2xl font-bold">
              Email Support
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Have a question, feedback, or need help with
              your FitForge account? Send us an email and
              we'll get back to you.
            </p>
            <a
              href="mailto:support@fitforge.ai"
              className="mt-6 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              support@fitforge.ai
            </a>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100">
              <MessageCircle
                className="text-indigo-600"
                size={26}
              />
            </div>
            <h2 className="text-2xl font-bold">
              Feedback & Suggestions
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Have an idea that could make FitForge better?
              We welcome feedback about workouts, nutrition,
              AI recommendations and the overall experience.
            </p>
            <a
              href="mailto:feedback@fitforge.ai"
              className="mt-6 inline-flex rounded-xl border border-slate-200 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Send Feedback
            </a>
          </div>

        </div>
      </section>
    </main>
  );
}