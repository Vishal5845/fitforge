"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/landing/Navbar";
// import MemberDetailsModal from "@/components/layout/MemberDetailsModal";
import UserTable from "@/components/admin/UserTable";
import {
  AdminUser,
  AdminUserDetails,
} from "@/types/admin";
import {
  getUsers,
  getUserDetails,
  deleteUser as deleteUserApi,
} from "@/lib/api/admin";

export default function AdminPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<AdminUserDetails | null>(null);
  const [loadingUser, setLoadingUser] = useState(false);
  const totalUsers = users.length;
  const trialUsers = users.filter((u) => u.plan === "trial").length;
  const proUsers = users.filter((u) => u.plan === "pro").length;
  const coaches = users.filter((u) => u.role === "coach").length;

  useEffect(() => {
    getUsers()
    .then((data) => {
      setUsers(data);
      setLoading(false);
    })
    .catch(console.error);
  }, []);
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        Loading Admin Dashboard...
      </div>
    );
  }
  const deleteUser = async (userId: string, name: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${name}?`
    );
    if (!confirmed) return;
    try {
      const result = await deleteUserApi(userId);
      if (!result.success) {
        alert(result.message || "Failed to delete user.");
        return;
      }
      setUsers((prev) =>
        prev.filter((user) => user.user_id !== userId)
      );
      alert("User deleted successfully.");
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  };
  const viewUser = async (userId: string) => {
    try {
      setLoadingUser(true);
      const result = await getUserDetails(userId);
      setSelectedUser(result);
    } catch (error) {
      console.error(error);
      alert("Failed to load user.");
    } finally {
      setLoadingUser(false);
    }
  };

  const filteredUsers = users.filter((user) => {
    const value = search.toLowerCase();
    return (
      user.name?.toLowerCase().includes(value) ||
      user.email?.toLowerCase().includes(value) ||
      user.role?.toLowerCase().includes(value)
    );
  });
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-950 text-white px-8 py-10">
        <h1 className="text-5xl font-bold mb-8">
          Admin Dashboard
        </h1>
        <p className="text-slate-400 mb-10">
          Manage users, subscriptions, and platform activity.
        </p>
        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">
          <div className="bg-slate-900 rounded-2xl p-6">
            <p className="text-slate-400">Total Users</p>
            <h2 className="text-4xl font-bold mt-3">
              {totalUsers}
            </h2>
          </div>
          <div className="bg-slate-900 rounded-2xl p-6">
            <p className="text-slate-400">Trial Users</p>
            <h2 className="text-4xl font-bold mt-3">
              {trialUsers}
            </h2>
          </div>
          <div className="bg-slate-900 rounded-2xl p-6">
            <p className="text-slate-400">Pro Users</p>
            <h2 className="text-4xl font-bold mt-3">
              {proUsers}
            </h2>
          </div>
          <div className="bg-slate-900 rounded-2xl p-6">
            <p className="text-slate-400">Coaches</p>
            <h2 className="text-4xl font-bold mt-3">
              {coaches}
            </h2>
          </div>
        </div>
        <div className="mb-6 capitalize">
          <input
            type="text"
            placeholder="Search by name, email or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              max-w-xl
              rounded-xl
              border
              border-slate-700
              bg-slate-900
              px-4
              py-3
              text-white
              placeholder:text-slate-500
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />
        </div>
        {/* User Table */}
        <UserTable
          users={filteredUsers}
          viewUser={viewUser}
          deleteUser={deleteUser}
        />
      </div>
      {/* <MemberDetailsModal
        open={!!selectedUser}
        member={selectedUser}
        onClose={() => setSelectedUser(null)}
      /> */}
    </>
  );
}