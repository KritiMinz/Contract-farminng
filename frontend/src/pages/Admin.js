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

      <h1 className="text-3xl font-bold mb-8">
        Admin Dashboard
      </h1>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold">Users</h2>
          <p className="text-3xl font-bold mt-2">
            {users.length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold">Crops</h2>
          <p className="text-3xl font-bold mt-2">
            {crops.length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold">Contracts</h2>
          <p className="text-3xl font-bold mt-2">
            {contracts.length}
          </p>
        </div>

      </div>

      {/* Users */}
      <div className="bg-white p-6 rounded-xl shadow mb-10">

        <h2 className="text-2xl font-bold mb-4">
          Users
        </h2>

        <div className="space-y-3">

          {users.map((user) => (
            <div
              key={user._id}
              className="border p-3 rounded flex justify-between"
            >
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
              className="border p-3 rounded flex justify-between items-center"
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
                className="bg-red-500 text-white px-4 py-2 rounded"
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
              className="border p-3 rounded"
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
                <span className="font-bold ml-2">
                  {contract.status}
                </span>
              </p>

              <p>
                Payment:
                <span className="font-bold ml-2">
                  {contract.paymentStatus}
                </span>
              </p>
            </div>
          ))}

        </div>
      </div>

    </div>
  );
}

export default Admin;