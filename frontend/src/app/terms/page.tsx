import Link from "next/link";
import { ArrowLeft, Dumbbell } from "lucide-react";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-blue-50 to-white text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg">
              <Dumbbell size={22} />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight">
                FitForge
              </h1>
              <p className="text-xs text-slate-500">
                AI Fitness Platform
              </p>
            </div>
          </Link>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            <ArrowLeft size={17} />
            Back to Register
          </Link>
        </div>
      </header>

      {/* Content */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm md:p-12">
            <span className="inline-flex rounded-full bg-blue-100 px-5 py-2 text-sm font-medium text-blue-700">
              Legal
            </span>
            <h1 className="mt-6 text-4xl font-black text-slate-900 md:text-5xl">
              Terms & Conditions
            </h1>
            <p className="mt-4 text-sm text-slate-500">
              Last updated: September 2026
            </p>
            <div className="mt-10 space-y-10 text-slate-600 leading-8">
              <section>
                <h2 className="text-2xl font-bold text-slate-900">
                  1. Acceptance of Terms
                </h2>
                <p className="mt-4">
                  By creating an account or using FitForge, you agree to
                  these Terms & Conditions. If you do not agree with these
                  terms, please do not use the FitForge platform.
                </p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-slate-900">
                  2. About FitForge
                </h2>
                <p className="mt-4">
                  FitForge is an AI-powered fitness platform that provides
                  personalized workout plans, nutrition guidance, exercise
                  information and progress tracking based on information
                  provided by users.
                </p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-slate-900">
                  3. Fitness and Health Disclaimer
                </h2>
                <p className="mt-4">
                  FitForge provides general fitness and nutrition information
                  and is not a substitute for professional medical,
                  nutritional or fitness advice.
                </p>
                <p className="mt-4">
                  You should consult a qualified healthcare professional before
                  starting a new exercise program or making significant
                  changes to your diet, particularly if you have an existing
                  medical condition.
                </p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-slate-900">
                  4. AI-Generated Content
                </h2>
                <p className="mt-4">
                  FitForge uses artificial intelligence to generate workout
                  and nutrition recommendations. AI-generated recommendations
                  may not always be accurate, complete or appropriate for
                  every individual.
                </p>
                <p className="mt-4">
                  You are responsible for reviewing recommendations and
                  deciding whether they are appropriate for your circumstances.
                </p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-slate-900">
                  5. User Accounts
                </h2>
                <p className="mt-4">
                  You are responsible for providing accurate information and
                  keeping your account credentials secure. You are also
                  responsible for activity performed through your account.
                </p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-slate-900">
                  6. Subscriptions and Payments
                </h2>
                <p className="mt-4">
                  Certain FitForge features may require a paid subscription.
                  Pricing, billing periods and available features will be
                  displayed before purchase.
                </p>
                <p className="mt-4">
                  Subscription cancellation and refund conditions may depend
                  on the applicable payment provider and plan.
                </p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-slate-900">
                  7. Acceptable Use
                </h2>
                <p className="mt-4">
                  You agree not to misuse the platform, attempt to gain
                  unauthorized access, interfere with its operation or use
                  FitForge for unlawful purposes.
                </p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-slate-900">
                  8. Intellectual Property
                </h2>
                <p className="mt-4">
                  The FitForge name, branding, software, interface and
                  platform content are owned by or licensed to FitForge unless
                  otherwise stated.
                </p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-slate-900">
                  9. Limitation of Liability
                </h2>
                <p className="mt-4">
                  To the extent permitted by applicable law, FitForge is not
                  responsible for injuries, losses or damages resulting from
                  reliance on AI-generated fitness or nutrition
                  recommendations or misuse of the platform.
                </p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-slate-900">
                  10. Changes to These Terms
                </h2>
                <p className="mt-4">
                  We may update these Terms & Conditions from time to time.
                  Updated terms will be published on this page with a revised
                  update date.
                </p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-slate-900">
                  11. Contact
                </h2>
                <p className="mt-4">
                  If you have questions about these Terms & Conditions,
                  please contact FitForge through the contact page.
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white px-6 py-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between text-sm text-slate-500">
          <p>© 2026 FitForge. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-slate-900">
              Privacy Policy
            </Link>
            <Link href="/contact" className="hover:text-slate-900">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}