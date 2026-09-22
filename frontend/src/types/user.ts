export interface User {
  user_id: string;
  name: string;
  email: string;
  phone?: string;

  role: "user" | "coach" | "admin";

  goal: string;
  experience: string;
  body_type: string;
  diet_type: string;

  weight: number;
  height: number;
  age: number;
  gender: string;

  workout_days: number;
  workout_location: string;

  nutrition_focus: string;
  profile_updated: boolean;
}