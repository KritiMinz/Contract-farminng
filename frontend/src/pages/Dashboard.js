import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {
  const role = localStorage.getItem("role");

  const [stats, setStats] = useState({
  totalCrops: 0,
totalContracts: 0,
  earnings: 0,
  rating: 0,

  orders: 0,
  totalSpent: 0,
  reviewsGiven: 0,

  users: 0,
  revenue: 0,
});

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
  try {

    // 🔥 ADMIN DASHBOARD
    if (role === "admin") {

      const res = await API.get("/admin/stats");

      setStats({
        crops: res.data.totalCrops,
        contracts: res.data.totalContracts,
        accepted: res.data.acceptedContracts,
        users: res.data.totalUsers,
        revenue: res.data.totalRevenue,
      });

      return;
    }

    // 👨‍🌾 FARMER / BUYER DASHBOARD
if (
  role === "farmer" ||
  role === "buyer"
) {
  const res = await API.get(
    "/contracts/dashboard/stats"
  );

  setStats(res.data);

  return;
}

  } catch (err) {

    console.error("Dashboard Error:", err);

  }
};

  // Chart data
  const data =
  role === "admin"
    ? [
        { name: "Users", value: stats.users },
        { name: "Crops", value: stats.crops },
        { name: "Contracts", value: stats.contracts },
        { name: "Revenue", value: stats.revenue },
      ]
    : role === "farmer"
? [
    {
      name: "Crops",
      value: stats.totalCrops || 0,
    },
    {
      name: "Contracts",
      value: stats.totalContracts || 0,
    },
    {
      name: "Rating",
      value: stats.rating || 0,
    },
  ]
: [
    {
      name: "Orders",
      value: stats.orders || 0,
    },
    {
      name: "Spent",
      value: stats.totalSpent || 0,
    },
    {
      name: "Reviews",
      value: stats.reviewsGiven || 0,
    },
  ];

  return (
  <div className="min-h-screen bg-gray-100 p-6">

    <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-2xl shadow-lg mb-8">
  <h2 className="text-4xl font-bold">
    Welcome Back 👋
  </h2>

  <p className="mt-2 text-lg capitalize">
    {role} Dashboard
  </p>
</div>

    {/* Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

      {role === "farmer" && (
  <>
    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all">
  <p className="text-gray-500">
    🌾 Total Crops
  </p>

  <p className="text-3xl font-bold text-green-600">
    {stats.totalCrops}
  </p>
</div>

    <div className="bg-white p-4 rounded shadow">
      <h3>Contracts</h3>
      <p className="text-2xl font-bold">
        {stats.totalContracts}
      </p>
    </div>

    <div className="bg-white p-4 rounded shadow">
      <h3>Earnings</h3>
      <p className="text-2xl font-bold">
        ₹{stats.earnings}
      </p>
    </div>

    <div className="bg-white p-4 rounded shadow">
      <h3>Rating</h3>
      <p className="text-2xl font-bold">
        ⭐ {stats.rating}
      </p>
    </div>
  </>
)}

{role === "buyer" && (
  <>
    <div className="bg-white p-4 rounded shadow">
      <h3>Orders</h3>
      <p className="text-2xl font-bold">
        {stats.orders}
      </p>
    </div>

    <div className="bg-white p-4 rounded shadow">
      <h3>Total Spent</h3>
      <p className="text-2xl font-bold">
        ₹{stats.totalSpent}
      </p>
    </div>

    <div className="bg-white p-4 rounded shadow">
      <h3>Reviews Given</h3>
      <p className="text-2xl font-bold">
        {stats.reviewsGiven}
      </p>
    </div>
  </>
)}

      {role === "admin" && (
  <div className="bg-white p-4 rounded shadow">
    <h3 className="text-gray-500">Users</h3>
    <p className="text-2xl font-bold">
      {stats.users}
    </p>
  </div>
)}

{role === "admin" && (
  <div className="bg-white p-4 rounded shadow">
    <h3 className="text-gray-500">Revenue</h3>
    <p className="text-2xl font-bold">
      ₹{stats.revenue}
    </p>
  </div>
)}

    </div>

    {/* Chart */}
    <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
      <h3 className="text-2xl font-bold mb-4">📊 Performance Overview</h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" />
        </BarChart>
      </ResponsiveContainer>
    </div>

    <div className="bg-white p-6 rounded-2xl shadow-md">
  <h3 className="text-xl font-bold mb-3">
    🏆 Reputation
  </h3>

  <p>
    Rating: ⭐ {stats.rating}
  </p>

  <p>
    Contracts: {stats.totalContracts}
  </p>

  <p className="mt-3">

{stats.rating >= 4.8 && (
  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
    🏆 Elite Farmer
  </span>
)}

{stats.rating >= 4.5 &&
 stats.rating < 4.8 && (
  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
    ⭐ Top Farmer
  </span>
)}

{stats.rating >= 4.0 &&
 stats.rating < 4.5 && (
  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
    🌱 Trusted Farmer
  </span>
)}

{stats.rating < 4.0 && (
  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
    🌾 New Farmer
  </span>
)}

</p>
</div>

{/* 🔔 Recent Activity */}
<div className="bg-white p-6 rounded-2xl shadow-lg mb-8 mt-6">

  <h3 className="text-xl font-bold mb-4">
    🔔 Recent Activity
  </h3>

  <ul className="space-y-3">

    <li className="border-b pb-2">
      ✅ Contract accepted
    </li>

    <li className="border-b pb-2">
      💳 Payment received
    </li>

    <li>
      ⭐ New review added
    </li>

  </ul>

</div>

    {/* Quick Actions Heading */}
<h3 className="text-2xl font-bold mb-4">
  ⚡ Quick Actions
</h3>

{/* 🔥 ROLE-BASED ACTIONS */}
<div className="flex gap-4 flex-wrap">

      {/* Farmer */}
      {role === "farmer" && (
        <>

        <Link to="/my-profile">
  <button className="bg-indigo-500 text-white px-5 py-3 rounded-xl shadow hover:scale-105 hover:-translate-y-1 duration-300">
    My Profile
  </button>
</Link>

          <Link to="/crops">
            <button className="bg-green-500 text-white px-5 py-3 rounded-xl shadow hover:scale-105 hover:-translate-y-1 duration-300">
  My Crops
</button>
          </Link>

          <Link to="/add-crop">
            <button className="bg-yellow-500 text-white px-5 py-3 rounded-xl shadow hover:scale-105 hover:-translate-y-1 duration-300">
  Add Crop
</button>
          </Link>

          <Link to="/contracts">
            <button className="bg-blue-500 text-white px-5 py-3 rounded-xl shadow hover:scale-105 hover:-translate-y-1 duration-300">
              Contract Requests
            </button>
          </Link>
        </>
      )}

      {/* Buyer */}
      {role === "buyer" && (
        <>
          <Link to="/crops">
            <button className="bg-green-500 text-white px-4 py-2 rounded">
              Browse Crops
            </button>
          </Link>

          <Link to="/contracts">
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              My Contracts
            </button>
          </Link>

          <Link to="/history">
  <button className="bg-purple-500 text-white px-4 py-2 rounded">
    History
  </button>
</Link>
        </>
      )}

      {role === "admin" && (
  <>
    <Link to="/admin/users">
      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Manage Users
      </button>
    </Link>

    <Link to="/admin/crops">
      <button className="bg-green-500 text-white px-4 py-2 rounded">
        Manage Crops
      </button>
    </Link>

    <Link to="/admin/contracts">
      <button className="bg-purple-500 text-white px-4 py-2 rounded">
        View Contracts
      </button>
    </Link>
  </>
)}

    </div>
    {/* Footer */}
<div className="mt-12 border-t pt-6 text-center text-gray-500">
  <p className="font-semibold">
    🌾 Contract Farming Platform
  </p>

  <p className="text-sm mt-1">
    Connecting Farmers & Buyers through Smart Agriculture
  </p>

  <p className="text-xs mt-2">
    © 2026 All Rights Reserved
  </p>
</div>

  </div>
);
}

export default Dashboard;