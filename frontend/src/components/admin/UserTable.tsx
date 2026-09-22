import { AdminUser } from "@/types/admin";


interface Props {
  users: AdminUser[];
  viewUser: (userId: string) => void;
  deleteUser: (userId: string, name: string) => void;
}

export default function UserTable({
  users,
  viewUser,
  deleteUser,
}: Props) {
  return (
    <>
        <div className="bg-slate-900 rounded-2xl overflow-hidden">
            <table className="w-full">
                <thead className="bg-slate-800">
                <tr>
                    <th className="text-left p-4">Name</th>
                    <th className="text-left p-4">Email</th>
                    <th className="text-left p-4">Role</th>
                    <th className="text-left p-4">Plan</th>
                    <th className="text-left p-4">Goal</th>
                    <th className="text-left p-4">Weight</th>
                    <th className="text-left p-4">Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.length === 0 ? (
                    <tr>
                    <td colSpan={7} className="p-10 text-center text-slate-500">
                        No users found.
                    </td>
                    </tr>
                ) : (
                    users.map((user) => (
                    <tr
                        key={user.user_id}
                        className="border-t border-slate-800 hover:bg-slate-800"
                    >
                        <td className="p-4">{user.name}</td>
                        <td className="p-4">{user.email}</td>
                        <td className="p-4">
                        <span
                            className={`px-3 py-1 rounded-full text-sm capitalize ${
                            user.role === "admin"
                                ? "bg-red-500/20 text-red-400"
                                : user.role === "coach"
                                ? "bg-purple-500/20 text-purple-400"
                                : "bg-blue-500/20 text-blue-400"
                            }`}
                        >
                            {user.role}
                        </span>
                        </td>
                        <td className="p-4">
                        <span
                            className={`px-3 py-1 rounded-full text-sm ${
                            user.plan === "pro"
                                ? "bg-green-500/20 text-green-400"
                                : "bg-yellow-500/20 text-yellow-400"
                            }`}
                        >
                            {user.plan === "pro" ? "Pro" : "Trial"}
                        </span>
                        </td>
                        <td className="p-4 capitalize">
                        {user.goal?.replace(/_/g, " ")}
                        </td>
                        <td className="p-4">
                        {user.weight} kg
                        </td>
                        <td className="p-4">
                        <div className="flex gap-3">
                            <button
                            onClick={() => viewUser(user.user_id)}
                            className="text-blue-400 hover:text-blue-300 cursor-pointer"
                            >
                            View
                            </button>
                            <button
                            onClick={() => deleteUser(user.user_id, user.name)}
                            className="text-red-400 hover:text-red-300 cursor-pointer"
                            >
                            Delete
                            </button>
                        </div>
                        </td>
                    </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    </>
  );
}