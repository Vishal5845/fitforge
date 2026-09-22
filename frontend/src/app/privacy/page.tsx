"use client";

import Link from "next/link";
import { ArrowLeft, Dumbbell } from "lucide-react";


export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <button
            onClick={() => window.history.back()}
            className="group mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:-translate-x-0.5 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 hover:shadow-md"
          >
            <ArrowLeft
              size={17}
              className="transition-transform duration-200 group-hover:-translate-x-0.5"
            />
            Back
          </button>
          <h1 className="text-5xl font-black">
            Privacy Policy
          </h1>
          <p className="mt-4 text-slate-400">
            Last updated: September 2026
          </p>
        </div>
      </section>
      {/* Policy */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-12">
            <PolicySection title="1. Introduction">
              <p>
                FitForge is an AI-powered fitness platform that
                provides personalized workout plans, nutrition
                guidance, exercise information and progress
                tracking.
              </p>
              <p>
                This Privacy Policy explains what information
                may be collected when you use FitForge and how
                that information may be used.
              </p>
            </PolicySection>
            <PolicySection title="2. Information We Collect">
              <p>
                Depending on how you use FitForge, we may collect
                information such as:
              </p>
              <ul>
                <li>Name and account information</li>
                <li>Email address</li>
                <li>Age, height and weight</li>
                <li>Fitness goals and experience</li>
                <li>Workout preferences</li>
                <li>Dietary preferences</li>
                <li>Workout and progress information</li>
              </ul>
            </PolicySection>
            <PolicySection title="3. How We Use Information">
              <p>
                Information may be used to provide and improve
                FitForge services, including generating
                personalized workout and nutrition recommendations,
                maintaining your account and tracking your progress.
              </p>
            </PolicySection>
            <PolicySection title="4. AI-Powered Recommendations">
              <p>
                FitForge may use artificial intelligence to generate
                workout and nutrition recommendations based on the
                information you provide.
              </p>
              <p>
                These recommendations are intended for general
                fitness and informational purposes and are not a
                substitute for professional medical advice.
              </p>
            </PolicySection>
            <PolicySection title="5. Data Security">
              <p>
                We take reasonable measures to protect information
                associated with your FitForge account. However, no
                online service can guarantee absolute security.
              </p>
            </PolicySection>
            <PolicySection title="6. Third-Party Services">
              <p>
                FitForge may rely on third-party services for
                authentication, hosting, analytics, payments,
                artificial intelligence and other functionality.
              </p>
            </PolicySection>
            <PolicySection title="7. Your Choices">
              <p>
                You may review or update information associated with
                your account through available account settings.
                You may also contact us regarding questions about
                your information.
              </p>
            </PolicySection>
            <PolicySection title="8. Changes to This Policy">
              <p>
                This Privacy Policy may be updated as FitForge
                evolves. When changes are made, the updated policy
                will be posted on this page.
              </p>
            </PolicySection>
            <PolicySection title="9. Contact">
              <p>
                If you have questions about this Privacy Policy,
                please contact the FitForge team.
              </p>
              <a
                href="mailto:support@fitforge.ai"
                className="font-semibold text-blue-600 hover:text-blue-700"
              >
                support@fitforge.ai
              </a>
            </PolicySection>
          </div>
        </div>
      </section>
    </main>
  );
}

function PolicySection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10 last:mb-0">
      <h2 className="mb-4 text-2xl font-bold text-slate-900">
        {title}
      </h2>
      <div className="space-y-4 leading-7 text-slate-600">
        {children}
      </div>
    </section>
  );
}