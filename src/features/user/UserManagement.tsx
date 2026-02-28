import { Search, SquarePen, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import Pagination from "../../components/Pagination";

// Data tạm
const names = [
  "Luna Green",
  "Oliver Woods",
  "Emma Stone",
  "Noah River",
  "Ava Bloom",
  "Ethan Moss",
  "Mia Forest",
  "Liam Lake",
  "Sophia Hill",
  "James Sky",
];
const subscriptions = ["Free", "Premium Monthly", "Premium Annually"];
const mockUsers = Array.from({ length: 10000 }, (_, i) => ({
  id: i + 1,
  image: "https://via.placeholder.com/32",
  username: names[i % names.length],
  subscription: subscriptions[i % 3],
  status: i % 10 === 0 ? false : true,
  bought: (i % 10) * 100,
  joinDate: "13/12/2025",
  feedback: i % 3,
}));

// Hết Data tạm

const PAGE_SIZE = 9;

export default function UserManagement() {
  const [users] = useState(mockUsers);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter search
  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.username.toLowerCase().includes(search.toLowerCase()),
    );
  }, [users, search]);

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / PAGE_SIZE);

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredUsers.slice(start, start + PAGE_SIZE);
  }, [filteredUsers, currentPage]);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>

        <div className="flex gap-3">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search users"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="border rounded-full pl-9 pr-4 py-2 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-black text-[#BDFF66] text-sm">
            <tr>
              <th className="p-4">IMAGE</th>
              <th>USERNAME</th>
              <th>SUBSCRIPTION</th>
              <th>STATUS</th>
              <th>BOUGHT TREE</th>
              <th>JOIN DATE</th>
              <th>FEEDBACK</th>
              <th>ACTION</th>
            </tr>
          </thead>

          <tbody>
            {paginatedUsers.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="p-4">
                  <img src={user.image} className="w-12 h-12 rounded-lg" />
                </td>
                <td>{user.username}</td>
                <td>
                  <span
                    className={`inline-flex items-center justify-center w-30 h-7 text-xs rounded-md font-medium ${
                      {
                        Free: "bg-black text-white",
                        "Premium Monthly": "bg-green-200 text-green-800",
                        "Premium Annually": "bg-lime-400 text-black",
                      }[user.subscription] || "bg-gray-200 text-gray-700"
                    }`}>
                    {user.subscription}
                  </span>
                </td>
                <td>
                  <span
                    className={`inline-flex items-center justify-center w-24 h-7 text-xs rounded-md font-medium ${user.status ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                    {user.status ? "active" : "suspended"}
                  </span>
                </td>
                <td>{user.bought}</td>
                <td>{user.joinDate}</td>
                <td>{user.feedback}</td>
                <td className="space-x-2">
                  <button className="px-2 py-1 border rounded hover:bg-gray-200 transition-all duration-200 hover:scale-105 active:scale-95">
                    <SquarePen size={20} />
                  </button>
                  <button className="px-2 py-1 border rounded hover:bg-red-200 transition-all duration-200 hover:scale-105 active:scale-95">
                    <Trash2 size={20} color="tomato" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer and Pagination */}
      <div className="flex justify-between items-center p-4 text-sm">
        <span>
          Showing {(currentPage - 1) * PAGE_SIZE + 1}–
          {Math.min(currentPage * PAGE_SIZE, filteredUsers.length)} of{" "}
          {filteredUsers.length}
        </span>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
