import React, { useEffect, useState } from "react";
import API from "../services/api";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    API.get("/admin/users")
      .then(res => setUsers(res.data))
      .catch(console.error);
  }, []);

  const filteredUsers = users.filter(
  (user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
);

  return (
    <div className="min-h-screen bg-gray-100 p-6">

  {/* Header */}
  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-2xl shadow-lg mb-8">
    <h2 className="text-4xl font-bold">
      👥 User Management
    </h2>

    <p className="mt-2">
      Manage all registered users
    </p>
  </div>

  {/* Stats */}
  <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
    <p className="text-gray-500">
      Total Registered Users
    </p>

    <p className="text-4xl font-bold text-blue-600">
      {users.length}
    </p>
  </div>

  {/* Search */}
  <input
    type="text"
    placeholder="Search users..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full mb-6 p-3 border rounded-xl"
  />

  {/* Users Grid */}
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

    {filteredUsers.map((user) => (

      <div
        key={user._id}
        className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
      >

        <div className="flex justify-between items-center mb-3">

          <h3 className="font-bold text-lg">
            {user.name}
          </h3>

          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              user.role === "admin"
                ? "bg-red-100 text-red-700"
                : user.role === "farmer"
                ? "bg-green-100 text-green-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {user.role}
          </span>

        </div>

        <p className="text-gray-600">
          📧 {user.email}
        </p>

      </div>

    ))}

  </div>

  {/* Footer */}
  <div className="mt-10 text-center text-gray-500">
    AgriConnect Admin Portal © 2026
  </div>

</div>
  );
}

export default AdminUsers;