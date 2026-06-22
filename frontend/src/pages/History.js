import React, { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

function History() {
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await API.get("/contracts");
      setContracts(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load history ❌");
    }
  };

  // 🔥 Filters
  const paid = contracts.filter(
    (c) => c.status === "accepted" && c.paymentStatus === "paid"
  );

  const rejected = contracts.filter((c) => c.status === "rejected");

  const pendingPayment = contracts.filter(
    (c) => c.status === "accepted" && c.paymentStatus !== "paid"
  );

  const Card = ({ c }) => (
  <div className="bg-white p-5 rounded-2xl shadow hover:shadow-xl transition">

    <h3 className="font-bold text-xl mb-2">
      🌾 {c.cropId?.cropName}
    </h3>

    <p>
      Quantity: {c.quantity}
    </p>

    <p>
      Status:
      <span className="ml-2 font-semibold">
        {c.status}
      </span>
    </p>

    <p>
      Payment:
      <span className="ml-2 font-semibold">
        {c.paymentStatus}
      </span>
    </p>

    <p className="text-gray-500 mt-2">
      {new Date(c.createdAt).toLocaleDateString()}
    </p>

  </div>
);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-6 rounded-2xl shadow-lg mb-8">

  <h2 className="text-4xl font-bold">
    📜 Contract History
  </h2>

  <p className="mt-2">
    Track all your farming transactions
  </p>

</div>

{/*Add here*/}
<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

  <div className="bg-green-50 p-5 rounded-2xl shadow">
    <p className="text-gray-500">
      Paid Contracts
    </p>

    <p className="text-3xl font-bold text-green-600">
      {paid.length}
    </p>
  </div>

  <div className="bg-blue-50 p-5 rounded-2xl shadow">
    <p className="text-gray-500">
      Pending Payments
    </p>

    <p className="text-3xl font-bold text-blue-600">
      {pendingPayment.length}
    </p>
  </div>

  <div className="bg-red-50 p-5 rounded-2xl shadow">
    <p className="text-gray-500">
      Rejected
    </p>

    <p className="text-3xl font-bold text-red-600">
      {rejected.length}
    </p>
  </div>

</div>

      {/* Paid */}
      <h3 className="text-xl font-semibold mb-3 text-green-600">
        Paid Contracts
      </h3>
      <div className="grid gap-4 mb-6">
        {paid.length === 0 ? <p>No paid contracts</p> : paid.map(c => <Card key={c._id} c={c} />)}
      </div>

      {/* Pending Payment */}
      <h3 className="text-xl font-semibold mb-3 text-blue-600">
        Accepted (Unpaid)
      </h3>
      <div className="grid gap-4 mb-6">
        {pendingPayment.length === 0 ? <p>No pending payments</p> : pendingPayment.map(c => <Card key={c._id} c={c} />)}
      </div>

      {/* Rejected */}
      <h3 className="text-xl font-semibold mb-3 text-red-600">
        Rejected Contracts
      </h3>
      <div className="grid gap-4">
        {rejected.length === 0 ? <p>No rejected contracts</p> : rejected.map(c => <Card key={c._id} c={c} />)}
      </div>
      <div className="mt-10 text-center text-gray-500">
  Contract Farming Platform © 2026
</div>
    </div>
  );
}

export default History;