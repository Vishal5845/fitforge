"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import {
  getProfile,
  UserProfile,
} from "@/lib/api/profile";

import {
  getSubscription,
  Subscription,
} from "@/lib/api/subscriptions";

import ProfileHero from "@/components/profile/ProfileHero";
import BodyStatsCard from "@/components/profile/BodyStatsCard";
import FitnessProfileCard from "@/components/profile/FitnessProfileCard";
import SubscriptionCard from "@/components/profile/SubscriptionCard";
import AccountCard from "@/components/profile/AccountCard";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProfile() {
      if (!session?.user?.userId) return;
      try {
        const data = await getProfile(session.user.userId);
        setProfile(data);
        const subscriptionData = await getSubscription(session.user.userId);
        setSubscription(subscriptionData);
      } catch (err) {
        console.error(err);
        setError("Unable to load profile.");
      } finally {
        setLoading(false);
      }
    }
    if (status === "authenticated") {
      loadProfile();
    }
    if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [session, status]);
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading profile...
      </div>
    );
  }
  if (!profile) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        {error || "Profile not found."}
      </div>
    );
  }
  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl space-y-8">
        <ProfileHero profile={profile} />
        <div className="grid gap-6 lg:grid-cols-2">
          <BodyStatsCard profile={profile} />
          <FitnessProfileCard profile={profile} />
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <SubscriptionCard
          workoutTrialsLeft={
            subscription?.workout_trial_used ? 0 : 1
          }
          mealTrialsLeft={
            subscription?.meal_trial_used ? 0 : 1
          }
          isPro={subscription?.plan === "pro"}
        />
        <AccountCard
          onEditProfile={() => router.push("/settings")}
          onLogout={() => signOut({ callbackUrl: "/" })}
        />
      </div>
    </main>
  );
}