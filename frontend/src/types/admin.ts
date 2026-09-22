import { User } from "./user";

export interface AdminUser extends User {
  plan: string;
  subscription_status: string;
  is_onboarding_completed: boolean;
  nutrition_focus: string;
}

export interface AdminSubscription {
  user_id: string;
  plan: string;
  status: string;
  workout_trial_used: boolean;
  meal_trial_used: boolean;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
}

export interface AdminUserDetails {
  success: boolean;
  user: User;
  subscription: AdminSubscription;
}