import { API_BASE_URL } from "./config";

export interface Subscription {
  user_id: string;
  plan: string;
  status: string;

  workout_trial_used: boolean;
  meal_trial_used: boolean;

  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
}

export async function getSubscription(
  userId: string
): Promise<Subscription> {
  const response = await fetch(
    `${API_BASE_URL}/subscriptions/${userId}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch subscription");
  }
  return response.json();
}