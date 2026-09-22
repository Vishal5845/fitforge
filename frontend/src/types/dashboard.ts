import { User } from "./user";

export interface Dashboard {
  success: boolean;

  user: {
    name: string;
    goal: string;
  };

  subscription: {
    plan: string;
    status: string;
  };

  latest_progress: {
    weight: number;
    body_fat?: number;
    created_at: string;
  };

  latest_workout: {
    program_name: string;
    days: number;
    updated_at: string;
  };

  latest_meal: {
    plan_name: string;
    daily_calories: number;
    updated_at: string;
  };
}