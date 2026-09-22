"use client";

import Link from "next/link";
import {
  Dumbbell,
  Globe,
  Mail,
  ExternalLink,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="flex items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                <Dumbbell size={21} />
              </div>
              <h2 className="text-2xl font-bold text-white">
                FitForge
              </h2>
            </Link>
            <p className="mt-5 max-w-sm leading-7 text-slate-400">
              AI-powered fitness platform delivering
              personalized workouts, nutrition plans,
              exercise tutorials and progress tracking.
            </p>
          </div>
          {/* Product */}
          <div>
            <h3 className="mb-5 font-bold text-white">
              Product
            </h3>
            <div className="space-y-3">
              <a
                href="#features"
                className="block transition hover:text-white"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="block transition hover:text-white"
              >
                How It Works
              </a>
              <a
                href="#pricing"
                className="block transition hover:text-white"
              >
                Pricing
              </a>
              <Link
                href="/register"
                className="block transition hover:text-white"
              >
                Get Started
              </Link>
            </div>
          </div>
          {/* Company */}
          <div>
            <h3 className="mb-5 font-bold text-white">
              Company
            </h3>
            <div className="space-y-3">
              <Link
                href="/about"
                className="block hover:text-white"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="block hover:text-white"
              >
                Contact
              </Link>
              <Link
                href="/privacy"
                className="block hover:text-white"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
          {/* Connect */}
          <div>
            <h3 className="mb-5 font-bold text-white">
              Connect
            </h3>
            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="Website"
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-slate-800
                  transition
                  hover:border-blue-500
                  hover:bg-slate-900
                  hover:text-white
                "
              >
                <Globe size={19} />
              </a>
              <a
                href="mailto:support@fitforge.ai"
                aria-label="Email"
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-slate-800
                  transition
                  hover:border-blue-500
                  hover:bg-slate-900
                  hover:text-white
                "
              >
                <Mail size={19} />
              </a>
              <a
                href="#"
                aria-label="External link"
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-slate-800
                  transition
                  hover:border-blue-500
                  hover:bg-slate-900
                  hover:text-white
                "
              >
                <ExternalLink size={19} />
              </a>
            </div>
          </div>
        </div>
        {/* Bottom */}
        <div className="mt-16 border-t border-slate-800 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-slate-500 md:flex-row">
            <p>
              © 2026 FitForge. All rights reserved.
            </p>
            <p>
              Built with AI • Train smarter. Eat better. Get results.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}