import React, { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

function AdminContracts() {
  const [contracts, setContracts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchContracts();
  }, []);

  const fetchContracts = async () => {
    try {
      const res = await API.get("/admin/contracts");

      setContracts(res.data);

    } catch (err) {
      console.error(err);
      toast.error("Failed to load contracts ❌");
    }
  };
  const filteredContracts = contracts.filter(
  (contract) =>
    contract.cropId?.cropName
      ?.toLowerCase()
      .includes(search.toLowerCase())
);

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-2xl shadow-lg mb-8">

  <h2 className="text-4xl font-bold">
    📄 Contract Management
  </h2>

  <p className="mt-2">
    Monitor all platform contracts
  </p>

</div>
<div className="grid md:grid-cols-3 gap-6 mb-8">

  <div className="bg-white p-5 rounded-2xl shadow">

    <p className="text-gray-500">
      Total Contracts
    </p>

    <p className="text-4xl font-bold text-purple-600">
      {contracts.length}
    </p>

  </div>

  <div className="bg-white p-5 rounded-2xl shadow">

    <p className="text-gray-500">
      Accepted
    </p>

    <p className="text-4xl font-bold text-green-600">
      {
        contracts.filter(
          c => c.status === "accepted"
        ).length
      }
    </p>

  </div>

  <div className="bg-white p-5 rounded-2xl shadow">

    <p className="text-gray-500">
      Paid
    </p>

    <p className="text-4xl font-bold text-blue-600">
      {
        contracts.filter(
          c => c.paymentStatus === "paid"
        ).length
      }
    </p>

  </div>

</div>
<input
  type="text"
  placeholder="Search crop..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full mb-8 p-3 border rounded-xl"
/>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {filteredContracts.map((contract) => (
          <div
            key={contract._id}
            className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
          >

            <h3 className="text-xl font-semibold">
              {contract.cropId?.cropName}
            </h3>

            <p>
              Buyer: {contract.buyerId?.name}
            </p>

            <p>
              Farmer: {contract.farmerId?.name}
            </p>

            <p>
              Quantity: {contract.quantity}
            </p>

            <p className="mt-3">

  {contract.status === "accepted" && (
    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
      ✅ Accepted
    </span>
  )}

  {contract.status === "pending" && (
    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
      ⏳ Pending
    </span>
  )}

  {contract.status === "rejected" && (
    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full">
      ❌ Rejected
    </span>
  )}

</p>

            <p className="mt-3">

  {contract.paymentStatus === "paid" ? (
    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
      💳 Paid
    </span>
  ) : (
    <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
      ⏳ Unpaid
    </span>
  )}

</p>
<div className="mt-4 border-t pt-3">

  <p className="font-semibold mb-2">
    🚚 Delivery
  </p>

  <p className="text-green-600">
    📦 Processing
  </p>

</div>

          </div>
        ))}

      </div>
      <div className="mt-10 text-center text-gray-500">
  AgriConnect Admin Portal © 2026
</div>
    </div>
  );
}

export default AdminContracts;