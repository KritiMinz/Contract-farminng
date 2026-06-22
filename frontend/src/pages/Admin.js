import React, { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

function Admin() {

  const [users, setUsers] = useState([]);
  const [crops, setCrops] = useState([]);
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {

      const usersRes = await API.get("/admin/users");
      const cropsRes = await API.get("/admin/crops");
      const contractsRes = await API.get("/admin/contracts");

      setUsers(usersRes.data);
      setCrops(cropsRes.data);
      setContracts(contractsRes.data);

    } catch (err) {
      console.error(err);
      toast.error("Failed to load admin data ❌");
    }
  };

  // ✅ Delete Crop
  const deleteCrop = async (id) => {
    try {

      await API.delete(`/admin/crop/${id}`);

      toast.success("Crop deleted ✅");

      fetchAdminData();

    } catch (err) {
      console.error(err);
      toast.error("Delete failed ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-8 rounded-2xl shadow-lg mb-8">

  <h1 className="text-4xl font-bold">
    👨‍💼 Admin Control Center
  </h1>

  <p className="mt-2 text-lg">
    Monitor users, crops, contracts and platform activity
  </p>

</div>

      {/* Dashboard Cards */}
      
<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

  <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all">
    <h2 className="text-xl font-semibold">
      👥 Users
    </h2>

    <p className="text-3xl font-bold mt-2 text-blue-600">
      {users.length}
    </p>
  </div>

  <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all">
    <h2 className="text-xl font-semibold">
      🌾 Crops
    </h2>

    <p className="text-3xl font-bold mt-2 text-green-600">
      {crops.length}
    </p>
  </div>

  <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all">
    <h2 className="text-xl font-semibold">
      📄 Contracts
    </h2>

    <p className="text-3xl font-bold mt-2 text-purple-600">
      {contracts.length}
    </p>
  </div>

  <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all">

    <h2 className="text-xl font-semibold">
      💰 Revenue
    </h2>

    <p className="text-3xl font-bold mt-2 text-green-600">
      ₹
      {
        contracts
  .filter(c => c.paymentStatus === "paid")
  .reduce((sum, c) => sum + (c.price || 0), 0)
      }
    </p>

  </div>

</div>
<div className="bg-white p-6 rounded-2xl shadow-lg mb-10">

  <h2 className="text-2xl font-bold mb-4">
    📈 Platform Health
  </h2>

  <div className="grid md:grid-cols-3 gap-4">

    <div className="bg-green-50 p-4 rounded-xl">
      <p className="text-gray-500">
        System Status
      </p>

      <p className="font-bold text-green-600">
        🟢 Online
      </p>
    </div>

    <div className="bg-blue-50 p-4 rounded-xl">
      <p className="text-gray-500">
        Active Users
      </p>

      <p className="font-bold text-blue-600">
        {users.length}
      </p>
    </div>

    <div className="bg-purple-50 p-4 rounded-xl">
      <p className="text-gray-500">
        Running Contracts
      </p>

      <p className="font-bold text-purple-600">
        {
          contracts.filter(
            c => c.status === "accepted"
          ).length
        }
      </p>
    </div>

  </div>

</div>
{/* Recent Activity */}
<div className="bg-white p-6 rounded-2xl shadow-lg mb-10">

  <h2 className="text-2xl font-bold mb-4">
    🔔 Recent Activity
  </h2>

  <ul className="space-y-3">

    <li className="border-b pb-2">
      ✅ New farmer registered
    </li>

    <li className="border-b pb-2">
      🌾 Crop listed successfully
    </li>

    <li className="border-b pb-2">
      📄 Contract accepted
    </li>

    <li className="border-b pb-2">
      💳 Payment completed
    </li>

    <li>
      ⭐ New review added
    </li>

  </ul>

</div>
<div className="grid md:grid-cols-4 gap-4 mb-10">

  <div className="bg-green-100 p-4 rounded-xl">
    🌾 Total Crops: {crops.length}
  </div>

  <div className="bg-blue-100 p-4 rounded-xl">
    👥 Total Users: {users.length}
  </div>

  <div className="bg-purple-100 p-4 rounded-xl">
    📄 Total Contracts: {contracts.length}
  </div>

  <div className="bg-yellow-100 p-4 rounded-xl">
    💰 Paid Contracts:
    {
      contracts.filter(
        c => c.paymentStatus === "paid"
      ).length
    }
  </div>

</div>


      {/* Users */}
      <div className="bg-white p-6 rounded-2xl shadow-lg mb-10">

        <h2 className="text-2xl font-bold mb-4">
          Users
        </h2>

        <div className="space-y-3">

          {users.map((user) => (
           <div key={user._id} className="border p-4 rounded-xl flex justify-between hover:bg-gray-50 transition" >
              <div>
                <p className="font-semibold">{user.name}</p>
                <p>{user.email}</p>
              </div>

              <span className="font-bold text-blue-600">
                {user.role}
              </span>
            </div>
          ))}

        </div>
      </div>

      {/* Crops */}
      <div className="bg-white p-6 rounded-xl shadow mb-10">

        <h2 className="text-2xl font-bold mb-4">
          Crops
        </h2>

        <div className="space-y-3">

          {crops.map((crop) => (
            <div
  key={crop._id}
  className="border p-4 rounded-xl flex justify-between items-center hover:bg-gray-50 transition"
>
              <div>
                <p className="font-semibold">
                  {crop.cropName}
                </p>

                <p>
                  Farmer: {crop.farmerId?.name}
                </p>
              </div>

              <button
                onClick={() => deleteCrop(crop._id)}
                className="bg-red-500 text-white px-5 py-2 rounded-xl shadow hover:scale-105 transition"
              >
                Delete
              </button>
            </div>
          ))}

        </div>
      </div>

      {/* Contracts */}
      <div className="bg-white p-6 rounded-xl shadow">

        <h2 className="text-2xl font-bold mb-4">
          Contracts
        </h2>

        <div className="space-y-3">

          {contracts.map((contract) => (
            <div
              key={contract._id}
              className="border p-4 rounded-xl hover:bg-gray-50 transition"
            >
              <p>
                Crop: {contract.cropId?.cropName}
              </p>

              <p>
                Buyer: {contract.buyerId?.name}
              </p>

              <p>
                Farmer: {contract.farmerId?.name}
              </p>

              <p>
  Status:

  <span
    className={`ml-2 px-3 py-1 rounded-full text-sm font-bold ${
      contract.status === "accepted"
        ? "bg-green-100 text-green-700"
        : contract.status === "rejected"
        ? "bg-red-100 text-red-700"
        : "bg-yellow-100 text-yellow-700"
    }`}
  >
    {contract.status}
  </span>
</p>

              <p>
  Payment:

  <span
    className={`ml-2 px-3 py-1 rounded-full text-sm font-bold ${
      contract.paymentStatus === "paid"
        ? "bg-green-100 text-green-700"
        : "bg-blue-100 text-blue-700"
    }`}
  >
    {contract.paymentStatus}
  </span>
</p>
            </div>
          ))}

        </div>
      </div>
      <div className="mt-10 text-center text-gray-500">
  AgriConnect Admin Portal © 2026
</div>

    </div>
  );
}

export default Admin;