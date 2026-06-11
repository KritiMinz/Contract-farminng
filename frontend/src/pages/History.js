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
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold text-lg">{c.cropId?.cropName}</h3>
      <p>Quantity: {c.quantity}</p>
      <p>Status: {c.status}</p>
      <p>Payment: {c.paymentStatus}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold mb-6">Contract History</h2>

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
    </div>
  );
}

export default History;