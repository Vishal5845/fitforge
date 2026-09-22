"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Loader2,
} from "lucide-react";
import { API_BASE_URL } from "@/lib/api/config";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (result?.error) {
        setError("Invalid email or password.");
        return;
      }
      const sessionResponse = await fetch(
        "/api/auth/session"
      );
      if (!sessionResponse.ok) {
        throw new Error("Failed to fetch session");
      }
      const sessionData = await sessionResponse.json();
      const userResponse = await fetch(
        `${API_BASE_URL}/users/user-id/${sessionData.user.userId}`
      );
      if (!userResponse.ok) {
        throw new Error("Failed to fetch user");
      }
      const user = await userResponse.json();
      if (user.is_onboarding_completed) {
        router.push("/dashboard");
      } else {
        router.push("/onboarding");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      onSubmit={handleLogin}
      className="w-full max-w-lg bg-white rounded-3xl border border-slate-200 shadow-2xl p-12"
    >
      <div className="mb-8">
        <h1 className="text-4xl font-black text-slate-900">
          Welcome Back
        </h1>
        <p className="mt-3 text-slate-500 text-lg">
          Sign in to continue your fitness journey.
        </p>
      </div>
      <div className="space-y-6">
        {/* Email */}
        <div>
            <label className="block mb-2 font-medium text-slate-700">
                Email Address
            </label>
            <div className="relative">
                <Mail
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="
                    w-full
                    h-14
                    rounded-2xl
                    border
                    border-slate-300
                    pl-12
                    pr-4
                    text-slate-900
                    placeholder:text-slate-400
                    focus:outline-none
                    focus:ring-4
                    focus:ring-blue-100
                    focus:border-blue-600
                    transition
                "
                />
            </div>
        </div>
        {/* Password */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="font-medium text-slate-700">
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="relative">
            <Lock
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              required
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Enter your password"
              className="
                w-full
                h-14
                rounded-2xl
                border
                border-slate-300
                pl-12
                pr-12
                text-slate-900
                placeholder:text-slate-400
                focus:outline-none
                focus:ring-4
                focus:ring-blue-100
                focus:border-blue-600
                transition
              "
            />
            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                text-slate-500
                hover:text-slate-700
              "
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>
        </div>
        {/* Remember */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-slate-600">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) =>
                setRememberMe(
                  e.target.checked
                )
              }
              className="rounded"
            />
            Remember me
          </label>
        </div>
        {/* Error */}
        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-600">
            {error}
          </div>
        )}
        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="
            w-full
            h-14
            rounded-2xl
            bg-blue-600
            hover:bg-blue-700
            text-white
            font-semibold
            transition
            disabled:bg-slate-400
            disabled:cursor-not-allowed
            shadow-lg
            hover:shadow-xl
            active:scale-[0.98]
            hover:scale-[1.01]
            active:scale-[0.98]
            duration-300
          "
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
                <Loader2
                className="animate-spin"
                size={18}
                />
                Signing In...
            </div>
            ) : (
            "Sign In"
          )}
        </button>
        <div className="flex justify-center gap-6 mt-6 text-sm text-slate-500">
            <span>🔒 Secure Login</span>
            <span>⚡ AI Powered</span>
            <span>🛡️ Encrypted</span>
        </div>
        <div className="text-center text-slate-500">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-blue-600 hover:text-blue-700"
          >
            Create Account
          </Link>
        </div>
      </div>
    </form>
  );
}