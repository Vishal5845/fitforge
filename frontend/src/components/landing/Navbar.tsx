"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Dumbbell } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm"
          : "bg-white/70 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg">
            <Dumbbell size={22} />
          </div>
          <div>
            <h1 className="font-extrabold text-2xl text-slate-900 tracking-tight">
              FitForge
            </h1>
            <p className="text-xs text-slate-500 -mt-1">
              AI Fitness Platform
            </p>
          </div>
        </Link>
        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-10">
          {links.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-slate-600 hover:text-blue-600 font-medium transition"
            >
              {item.label}
            </a>
          ))}
        </nav>
        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className="text-slate-700 hover:text-blue-600 font-medium transition"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-semibold shadow-lg transition-all duration-300 hover:scale-105"
          >
            Get Started
          </Link>
        </div>
        {/* Mobile Button */}
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-xl p-2 text-slate-800 transition hover:bg-slate-100 md:hidden"
        >
          {mobileOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>
      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-slate-200">
          <div className="px-6 py-6 flex flex-col gap-5">
            {links.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-slate-700 font-medium"
              >
                {item.label}
              </a>
            ))}
            <hr />
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="text-slate-700"
            >
              Login
            </Link>
            <Link
              href="/register"
              onClick={() => setMobileOpen(false)}
              className="bg-blue-600 text-white rounded-xl py-3 text-center font-semibold"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}