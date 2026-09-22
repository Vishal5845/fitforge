"use client";

import { FormEvent, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Settings } from "lucide-react";


import { API_BASE_URL } from "@/lib/api/config";

type SettingsData = {
  name: string;
  age: number;
  height: number;
  gender: string;

  goal: string;
  experience: string;
  workout_days: number;
  workout_location: string;
  body_type: string;

  diet_type: string;
  nutrition_focus: string;

  weight: number;
};

const initialFormData: SettingsData = {
  name: "",
  age: 0,
  height: 0,
  gender: "",

  goal: "",
  experience: "",
  workout_days: 0,
  workout_location: "",
  body_type: "",

  diet_type: "",
  nutrition_focus: "",

  weight: 0,
};

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [formData, setFormData] =
    useState<SettingsData>(initialFormData);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // =========================
  // LOAD USER SETTINGS
  // =========================

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    if (status !== "authenticated") {
      setLoading(false);
      return;
    }

    const userId = session?.user?.userId;

    if (!userId) {
      console.error("User ID not found in session");
      setMessage("Unable to find user session.");
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        console.log("Fetching user:", userId);

        const response = await fetch(
          `${API_BASE_URL}/users/user-id/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to load user settings");
        }

        const user = await response.json();

        console.log("USER SETTINGS:", user);

        if (!user) {
          throw new Error("User not found");
        }

        setFormData({
          name: user.name ?? "",
          age: user.age ?? 0,
          height: user.height ?? 0,
          gender: user.gender ?? "",

          goal: user.goal ?? "",
          experience: user.experience ?? "",
          workout_days: user.workout_days ?? 0,
          workout_location: user.workout_location ?? "",
          body_type: user.body_type ?? "",

          diet_type: user.diet_type ?? "",
          nutrition_focus: user.nutrition_focus ?? "",

          weight: user.weight ?? 0,
        });
      } catch (error) {
        console.error("Failed to load settings:", error);

        setMessage(
          "Failed to load your settings. Please refresh and try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [session?.user?.userId, status]);

  // =========================
  // HANDLE INPUT CHANGE
  // =========================

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    const numberFields = [
      "age",
      "height",
      "weight",
      "workout_days",
    ];

    setFormData((prev) => ({
      ...prev,
      [name]: numberFields.includes(name)
        ? Number(value)
        : value,
    }));
  };

  // =========================
  // SAVE SETTINGS
  // =========================

  const handleSave = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!session?.user?.userId) {
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      const response = await fetch(
        `${API_BASE_URL}/users/${session.user.userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update settings");
      }

      setMessage("Settings updated successfully.");

      setTimeout(() => {
        router.push("/dashboard");
      }, 800);
    } catch (error) {
      console.error("Failed to update settings:", error);
      setMessage("Failed to update settings.");
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading || status === "loading") {
    return (
      <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm text-slate-500">
            Loading settings...
          </p>
        </div>
      </div>
    );
  }

  // =========================
  // PAGE
  // =========================

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-5xl px-6 py-8 lg:px-8 lg:py-10">
        {/* Header */}
        <div className="mb-10">
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="mb-6 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </button>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100">
              <Settings className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Settings
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Update your profile and fitness preferences.
              </p>
            </div>
          </div>
        </div>
        <form
          onSubmit={handleSave}
          className="space-y-6"
        >
          {/* ========================= */}
          {/* PERSONAL INFORMATION */}
          {/* ========================= */}
          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-slate-900">
                Personal Information
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Keep your basic information up to date.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
              {/* Age */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  min="1"
                  value={formData.age || ""}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
              {/* Height */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Height (cm)
                </label>
                <input
                  type="number"
                  name="height"
                  min="1"
                  value={formData.height || ""}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
              {/* Weight */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Current Weight (kg)
                </label>
                <input
                  type="number"
                  name="weight"
                  min="1"
                  step="0.1"
                  value={formData.weight || ""}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
              {/* Gender */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
          </section>
          {/* ========================= */}
          {/* TRAINING */}
          {/* ========================= */}
          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-slate-900">
                Training Preferences
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Tell FitForge how you prefer to train.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {/* Goal */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Fitness Goal
                </label>
                <select
                  name="goal"
                  value={formData.goal}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Select Goal</option>
                  <option value="fat_loss">
                    Fat Loss
                  </option>
                  <option value="muscle_gain">
                    Muscle Gain
                  </option>
                  <option value="maintenance">
                    Maintenance
                  </option>
                </select>
              </div>
              {/* Experience */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Experience Level
                </label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">
                    Select Experience
                  </option>
                  <option value="beginner">
                    Beginner
                  </option>
                  <option value="intermediate">
                    Intermediate
                  </option>
                  <option value="advanced">
                    Advanced
                  </option>
                </select>
              </div>
              {/* Workout Days */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Workout Days Per Week
                </label>
                <input
                  type="number"
                  name="workout_days"
                  min="1"
                  max="7"
                  value={formData.workout_days || ""}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
              {/* Workout Location */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Workout Location
                </label>
                <select
                  name="workout_location"
                  value={formData.workout_location}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">
                    Select Location
                  </option>
                  <option value="gym">
                    Gym
                  </option>
                  <option value="home">
                    Home
                  </option>
                </select>
              </div>
              {/* Body Type */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Body Type
                </label>

                <select
                  name="body_type"
                  value={formData.body_type}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">
                    Select Body Type
                  </option>
                  <option value="ectomorph">
                    Ectomorph
                  </option>
                  <option value="mesomorph">
                    Mesomorph
                  </option>
                  <option value="endomorph">
                    Endomorph
                  </option>
                </select>
              </div>
            </div>
          </section>
          {/* ========================= */}
          {/* NUTRITION */}
          {/* ========================= */}
          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-slate-900">
                Nutrition Preferences
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Customize your nutrition recommendations.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {/* Diet */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Diet Type
                </label>
                <select
                  name="diet_type"
                  value={formData.diet_type}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">
                    Select Diet
                  </option>
                  <option value="vegetarian">
                    Vegetarian
                  </option>
                  <option value="non_vegetarian">
                    Non-Vegetarian
                  </option>
                  <option value="vegan">
                    Vegan
                  </option>
                </select>
              </div>
              {/* Nutrition Focus */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Nutrition Focus
                </label>
                <select
                  name="nutrition_focus"
                  value={formData.nutrition_focus}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">
                    Select Focus
                  </option>
                  <option value="high_protein">
                    High Protein
                  </option>
                  <option value="balanced">
                    Balanced
                  </option>
                  <option value="low_carb">
                    Low Carb
                  </option>
                </select>
              </div>
            </div>
          </section>
          {/* ========================= */}
          {/* MESSAGE */}
          {/* ========================= */}
          {message && (
            <div
              className={`rounded-2xl border px-5 py-4 text-sm font-medium ${
                message.includes("success")
                  ? "border-green-200 bg-green-50 text-green-700"
                  : "border-red-200 bg-red-50 text-red-700"
              }`}
            >
              {message}
            </div>
          )}
          {/* ========================= */}
          {/* SAVE */}
          {/* ========================= */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}