"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";
import { API_BASE_URL } from "@/lib/api/config";

export default function RegisterForm() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [loading, setLoading] = useState(false);
    // const [otpStep, setOtpStep] = useState(false);
    // const [otp, setOtp] = useState("");
    
    // 
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (!acceptTerms) {
            setError("Please accept the Terms & Privacy Policy.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (!name.trim()) {
            setError("Please enter your full name.");
            return;
        }

        if (!email.trim()) {
            setError("Please enter your email.");
            return;
        }

        const phoneRegex = /^\+?[1-9]\d{9,14}$/;

        if (!phoneRegex.test(phoneNumber)) {
            setError("Please enter a valid phone number.");
            return;
        }

        if (
            !passwordChecks.length ||
            !passwordChecks.uppercase ||
            !passwordChecks.lowercase ||
            !passwordChecks.number ||
            !passwordChecks.special
        ) {
            setError("Password does not meet all requirements.");
            return;
        }
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                password,
                phone_number: phoneNumber,
                role: "user",
            }),
            });

            const data = await response.json();

            if (!response.ok) {
            setError(data.detail || "Failed to create account.");
            return;
            }

            setSuccess("Account created successfully! Redirecting to login...");

            setTimeout(() => {
            router.push("/login");
            }, 1200);
        } catch {
            setError("Something went wrong while creating your account.");
        } finally {
            setLoading(false);
        }
        };
    // const handleVerifyOtp = async (e: React.FormEvent) => {
    //     e.preventDefault();

    //     setError("");
    //     setSuccess("");

    //     if (!otp.trim() || otp.length !== 6) {
    //         setError("Please enter the 6-digit verification code.");
    //         return;
    //     }
    //     setLoading(true);
    //     try {
    //         const response = await fetch(
    //         `${API_BASE_URL}/auth/verify-otp`,
    //         {
    //             method: "POST",
    //             headers: {
    //             "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({
    //             email,
    //             otp,
    //             name,
    //             password,
    //             phone_number: phoneNumber,
    //             role: "user",
    //             }),
    //         }
    //         );
    //         const data = await response.json();
    //         if (!response.ok) {
    //         setError(data.detail || "Invalid verification code.");
    //         return;
    //         }
    //         setSuccess("Email verified! Account created successfully.");
    //         setTimeout(() => {
    //         router.push("/login");
    //         }, 1200);
    //     } catch {
    //         setError("Something went wrong while verifying your email.");
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    // if (otpStep) {
    //     return (
    //         <form
    //         onSubmit={handleVerifyOtp}
    //         className="w-full max-w-lg bg-white rounded-3xl border border-slate-200 shadow-2xl p-12"
    //         >
    //         <div className="text-center">
    //             <div className="mx-auto w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
    //             <Mail size={30} />
    //             </div>
    //             <h1 className="mt-6 text-4xl font-black text-slate-900">
    //             Verify Your Email
    //             </h1>
    //             <p className="mt-3 text-slate-500 leading-7">
    //             We sent a 6-digit verification code to
    //             </p>
    //             <p className="mt-1 font-semibold text-slate-900">
    //             {email}
    //             </p>
    //         </div>
    //         <div className="mt-10">
    //             <input
    //             type="text"
    //             inputMode="numeric"
    //             maxLength={6}
    //             placeholder="Enter 6-digit OTP"
    //             value={otp}
    //             onChange={(e) =>
    //                 setOtp(e.target.value.replace(/\D/g, ""))
    //             }
    //             className="w-full h-16 rounded-2xl border border-slate-300 text-center text-2xl font-bold tracking-[0.5em] focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-600 text-black"
    //             />
    //         </div>
    //         {error && (
    //             <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-600">
    //             {error}
    //             </div>
    //         )}
    //         {success && (
    //             <div className="mt-5 rounded-2xl border border-green-200 bg-green-50 p-4 text-green-700">
    //             {success}
    //             </div>
    //         )}
    //         <button
    //             type="submit"
    //             disabled={loading || otp.length !== 6}
    //             className="mt-6 w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all disabled:bg-slate-400"
    //         >
    //             {loading ? (
    //             <div className="flex justify-center items-center gap-2">
    //                 <Loader2 size={18} className="animate-spin" />
    //                 Verifying...
    //             </div>
    //             ) : (
    //             "Verify Email"
    //             )}
    //         </button>

    //         <button
    //             type="button"
    //             onClick={() => {
    //             setOtpStep(false);
    //             setOtp("");
    //             setError("");
    //             setSuccess("");
    //             }}
    //             className="mt-4 w-full text-slate-500 hover:text-slate-800 font-medium"
    //         >
    //             ← Back to registration
    //         </button>
    //         </form>
    //     );
    // }
    const handleReset = () => {
        setName("");
        setEmail("");
        setPhoneNumber("");
        setPassword("");
        setConfirmPassword("");
        setAcceptTerms(false);
        setShowPassword(false);
        setError("");
        setSuccess("");
        setShowConfirmPassword(false);
    };
    const isFormEmpty =
        !name &&
        !email &&
        !phoneNumber &&
        !password &&
        !confirmPassword &&
        !acceptTerms;

    const getPasswordStrength = (password: string) => {
        let score = 0;
        
        if (password.length >= 8) score++;
        if (password.length >= 12) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;
        if (score <= 2) {
            return {
            text: "Weak",
            color: "bg-red-500",
            width: "w-1/3",
            };
        }
        if (score <= 4) {
            return {
            text: "Medium",
            color: "bg-yellow-500",
            width: "w-2/3",
            };
        }
        return {
            text: "Strong",
            color: "bg-green-500",
            width: "w-full",
        };
    };
    const passwordStrength = getPasswordStrength(password);
    const passwordChecks = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[^A-Za-z0-9]/.test(password),
    };
    return (
        <form 
        onSubmit={handleRegister}
        className="w-full max-w-lg bg-white rounded-3xl border border-slate-200 shadow-2xl p-12"
        >
            <div className="mb-8">
                <h1 className="text-4xl font-black text-slate-900">
                Create Account
                </h1>
                <p className="mt-3 text-slate-500">
                Start your AI fitness journey today.
                </p>
            </div>
            {/* We'll add the input fields next */}
            <div className="space-y-5">
                {/* Name */}
                <div className="relative">
                    <User
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                    type="text"
                    placeholder="Full Name"
                    required
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-14 rounded-2xl border border-slate-300 pl-12 pr-4 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-600 text-black"
                    />
                </div>
                {/* Email */}
                <div className="relative">
                    <Mail
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                    type="email"
                    autoComplete="email"
                    placeholder="Email Address"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-14 rounded-2xl border border-slate-300 pl-12 pr-4 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-600 text-black"
                    />
                </div>
                {/* Phone */}
                <div className="relative">
                    <Phone
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                    type="tel"
                    placeholder="+91 9876543210"
                    required
                    autoComplete="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full h-14 rounded-2xl border border-slate-300 pl-12 pr-4 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-600 text-black"
                    />
                </div>
                {/* Password */}
                <div className="relative">
                    <Lock
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    required
                    value={password}
                    autoComplete="new-password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-14 rounded-2xl border border-slate-300 pl-12 pr-12 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-600 text-black"
                    />
                    <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                    >
                    {showPassword ? (
                        <EyeOff size={20} />
                    ) : (
                        <Eye size={20} />
                    )}
                    </button>
                </div>
                {/* Confirm Password */}
                <div className="relative">
                    <Lock
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    autoComplete="new-password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full h-14 rounded-2xl border border-slate-300 pl-12 pr-4 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-600 text-black"
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                        >
                        {showConfirmPassword ? (
                            <EyeOff size={20} />
                        ) : (
                            <Eye size={20} />
                        )}
                    </button>
                </div>
                {/* Password Strength */}
                <div className="mt-2">
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                        className={`h-full transition-all duration-300 ${passwordStrength.width} ${passwordStrength.color}`}
                        />
                    </div>
                    <p className="mt-2 text-sm text-slate-500">
                        Strength:
                        <span className="font-semibold ml-1">
                            {passwordStrength.text}
                        </span>
                    </p>
                    <div className="mt-4 space-y-2 text-sm">
                        <p className={passwordChecks.length ? "text-green-600" : "text-red-500"}>
                            {passwordChecks.length ? "✓" : "✗"} At least 8 characters
                        </p>
                        <p className={passwordChecks.uppercase ? "text-green-600" : "text-red-500"}>
                            {passwordChecks.uppercase ? "✓" : "✗"} One uppercase letter
                        </p>
                        <p className={passwordChecks.lowercase ? "text-green-600" : "text-red-500"}>
                            {passwordChecks.lowercase ? "✓" : "✗"} One lowercase letter
                        </p>
                        <p className={passwordChecks.number ? "text-green-600" : "text-red-500"}>
                            {passwordChecks.number ? "✓" : "✗"} One number
                        </p>
                        <p className={passwordChecks.special ? "text-green-600" : "text-red-500"}>
                            {passwordChecks.special ? "✓" : "✗"} One special character
                        </p>
                    </div>
                </div>
                {/* Terms */}
                <label className="flex items-start gap-3 text-sm text-slate-600">
                    <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="mt-1"
                    />
                    <span>
                    I agree to the{" "}
                    <Link
                        href="/terms"
                        className="text-blue-600 font-medium"
                    >
                        Terms
                    </Link>{" "}
                    &{" "}
                    <Link
                        href="/privacy"
                        className="text-blue-600 font-medium"
                    >
                        Privacy Policy
                    </Link>
                    </span>
                </label>
                {error && (
                    <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-600">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="rounded-2xl border border-green-200 bg-green-50 p-4 text-green-700">
                        {success}
                    </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                    <button
                        type="button"
                        onClick={handleReset}
                        disabled={loading || isFormEmpty}
                        className="
                            h-14
                            rounded-2xl
                            border
                            border-slate-300
                            bg-white
                            text-slate-700
                            font-semibold
                            hover:bg-slate-100
                            transition-all
                            disabled:opacity-50
                            disabled:cursor-not-allowed
                        "
                    >
                        Reset
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="
                        h-14
                        rounded-2xl
                        bg-blue-600
                        hover:bg-blue-700
                        hover:shadow-xl
                        active:scale-[0.98]
                        transition-all
                        text-white
                        font-semibold
                        disabled:bg-slate-400
                        "
                    >
                        {loading ? (
                        <div className="flex justify-center items-center gap-2">
                            <Loader2 size={18} className="animate-spin" />
                            Creating Account...
                        </div>
                        ) : (
                        "Create Account"
                        )}
                    </button>
                </div>
                <div className="text-center text-slate-500">
                    Already have an account?{" "}
                    <Link
                    href="/login"
                    className="text-blue-600 font-semibold hover:text-blue-700"
                    >
                    Sign In
                    </Link>
                </div>
            </div>
        </form>
    );
}