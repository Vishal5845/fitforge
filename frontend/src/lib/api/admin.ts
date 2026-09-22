import { API_BASE_URL } from "./config";

export async function getUsers() {
  const res = await fetch(`${API_BASE_URL}/admin/users`);
  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }
  return res.json();
}

export async function getUserDetails(userId: string) {
  const res = await fetch(`${API_BASE_URL}/admin/users/${userId}`);
  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }
  return res.json();
}

export async function deleteUser(userId: string) {
  const res = await fetch(`${API_BASE_URL}/admin/users/${userId}`, {
    method: "DELETE",
  });
  return res.json();
}