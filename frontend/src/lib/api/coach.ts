import { API_BASE_URL } from "./config";

export async function getMembers() {
  const res = await fetch(`${API_BASE_URL}/coach/members`);
  if (!res.ok) {
    throw new Error("Failed to fetch members");
  }
  return res.json();
}

export async function getMemberDetails(userId: string) {
  const res = await fetch(`${API_BASE_URL}/coach/members/${userId}`);

  if (!res.ok) {
    throw new Error("Failed to fetch member");
  }

  return res.json();
}

export async function getMemberWorkout(userId: string) {
  const res = await fetch(
    `${API_BASE_URL}/coach/members/${userId}/workout`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch workout");
  }
  return res.json();
}

export async function getMemberMeal(userId: string) {
  const res = await fetch(
    `${API_BASE_URL}/coach/members/${userId}/meal`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch meal");
  }
  return res.json();
}