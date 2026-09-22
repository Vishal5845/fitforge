"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/landing/Navbar";
// import MemberDetailsModal from "@/components/layout/MemberDetailsModal";
import {
  AdminUser,
  AdminUserDetails,
} from "@/types/admin";
import {
  getMembers,
  getMemberDetails,
} from "@/lib/api/coach";

export default function CoachPage() {
  const [members, setMembers] = useState<AdminUser[]>([]);
  const [selectedMember, setSelectedMember] = useState<AdminUserDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [loadingMember, setLoadingMember] = useState(false);
  useEffect(() => {
    getMembers()
    .then((data) => {
      setMembers(data);
      setLoading(false);
    })
    .catch(console.error);
  }, []);
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        Loading Coach Dashboard...
      </div>
    );
  }
  const viewMember = async (userId: string) => {
    try {
      setLoadingMember(true);
      const result = await getMemberDetails(userId);
      setSelectedMember(result);
    } catch (error) {
      console.error(error);
      alert("Failed to load member.");
    } finally {
      setLoadingMember(false);
    }
  };
  const filteredMembers = members.filter((member) => {
    const value = search.toLowerCase();
    return (
      member.name?.toLowerCase().includes(value) ||
      member.email?.toLowerCase().includes(value) ||
      member.goal?.toLowerCase().includes(value)
    );
  });
  const totalMembers = members.length;
  const trialMembers = members.filter((m) => m.plan === "trial").length;
  const proMembers = members.filter((m) => m.plan === "pro").length;
  const muscleGainMembers = members.filter(
    (m) => m.goal === "muscle_gain"
  ).length;
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-950 text-white px-8 py-10">
        <h1 className="text-5xl font-bold mb-2">
          Coach Dashboard
        </h1>
        <p className="text-slate-400 mb-10">
          View and manage your fitness members.
        </p>
        {/* Stats go here */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">
          <div className="bg-slate-900 rounded-2xl p-6">
            <p className="text-slate-400">Total Members</p>
            <h2 className="text-4xl font-bold mt-3">
              {totalMembers}
            </h2>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6">
            <p className="text-slate-400">Trial Members</p>
            <h2 className="text-4xl font-bold mt-3">
              {trialMembers}
            </h2>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6">
            <p className="text-slate-400">Pro Members</p>
            <h2 className="text-4xl font-bold mt-3">
              {proMembers}
            </h2>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6">
            <p className="text-slate-400">Muscle Gain</p>
            <h2 className="text-4xl font-bold mt-3">
              {muscleGainMembers}
            </h2>
          </div>
        </div>
        {/* Search goes here */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search members..."
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
        {/* Members table goes here */}
        <div className="bg-slate-900 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-800">
              <tr>
                <th className="text-left p-4">Name</th>
                <th className="text-left p-4">Goal</th>
                <th className="text-left p-4">Weight</th>
                <th className="text-left p-4">Plan</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredMembers.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="p-10 text-center text-slate-500"
                  >
                    No members found.
                  </td>
                </tr>
              ) : (
                filteredMembers.map((member) => (
                  <tr
                    key={member.user_id}
                    className="border-t border-slate-800 hover:bg-slate-800"
                  >
                    <td className="p-4">{member.name}</td>

                    <td className="p-4">
                      {member.goal
                        ?.replace(/_/g, " ")
                        .replace(/\b\w/g, (c: string) => c.toUpperCase())}
                    </td>

                    <td className="p-4">
                      {member.weight} kg
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          member.plan === "pro"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {member.plan === "pro" ? "Pro" : "Trial"}
                      </span>
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => viewMember(member.user_id)}
                        className="text-blue-400 hover:text-blue-300 cursor-pointer"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* <MemberDetailsModal
        open={!!selectedMember}
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
      /> */}
    </>
  );
}