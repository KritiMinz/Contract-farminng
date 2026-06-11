import React, { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function Contracts() {
  const [contracts, setContracts] = useState([]);
  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchContracts();
  }, []);

  const fetchContracts = async () => {
    try {
      const res = await API.get("/contracts");
      setContracts(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load contracts ❌");
    }
  };

  // Accept / Reject
  const updateStatus = async (id, status) => {
    try {
      await API.put(`/contracts/${id}`, { status });

      toast.success(`Contract ${status} ✅`);

      fetchContracts();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update contract ❌");
    }
  };

  // Payment
  const makePayment = async (contract) => {
  try {
    console.log("CONTRACT:", contract);

    const { data: order } = await API.post("/contracts/create-order", {
      amount: contract.price,
    });

    console.log("ORDER RESPONSE:", order); // 🔥 IMPORTANT

    const options = {
      key: "rzp_test_Sk0VD4LoOGgas3",
      amount: order.amount,
      currency: "INR",
      name: "Contract Farming",
      description: "Payment for crops",
      order_id: order.id,

      handler: async function () {
        await API.put(`/contracts/pay/${contract._id}`);
        toast.success("Payment successful 💳");
        fetchContracts();
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

  } catch (err) {
    console.error("FULL ERROR:", err); // 🔥 VERY IMPORTANT
    toast.error("Payment failed ❌");
  }
};
  // Status color helper
  const getStatusColor = (status) => {
    if (status === "accepted") return "text-green-600";
    if (status === "rejected") return "text-red-600";
    return "text-yellow-600";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h2 className="text-3xl font-bold mb-6">Contracts</h2>

      {contracts.length === 0 ? (
        <p className="text-gray-600">No contracts found</p>
      ) : (
        <div className="grid gap-6">

          {contracts.map((c) => (
            <div
              key={c._id}
              className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-2">
                {c.cropId?.cropName}
              </h3>

              <p className="text-gray-600">
                Buyer: {c.buyerId?.name}
              </p>

              {role === "buyer" && (
  <p className="text-gray-600">
    Farmer:

    <Link
      to={`/profile/${
        typeof c.farmerId === "object"
          ? c.farmerId._id
          : c.farmerId
      }`}
      className="text-blue-500 ml-2 underline"
    >
      View Profile
    </Link>
  </p>
)}

              <p className="text-gray-600">
                Quantity: {c.quantity}
              </p>

              <p className="font-semibold">
                Status:
                <span className={`ml-2 ${getStatusColor(c.status)}`}>
                  {c.status}
                </span>
              </p>

              <p className="font-semibold">
  Payment:
  <span
    className={`ml-2 ${
      c.paymentStatus === "paid"
        ? "text-green-600"
        : "text-blue-600"
    }`}
  >
    {c.paymentStatus}
  </span>
</p>

{role === "farmer" && (
  <Link
    to={`/chat/${
      typeof c.buyerId === "object"
        ? c.buyerId._id
        : c.buyerId
    }`}
  >
    <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
      💬 Chat With Buyer
    </button>
  </Link>
)}

              {/* Farmer actions */}
              {role === "farmer" && c.status === "pending" && (
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => updateStatus(c._id, "accepted")}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => updateStatus(c._id, "rejected")}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                  >
                    Reject
                  </button>
                </div>
              )}

              {/* Buyer payment */}
              {role === "buyer" &&
                c.status === "accepted" &&
                c.paymentStatus !== "paid" && (
                  <button
                    onClick={() => makePayment(c)}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                  >
                    Pay Now
                  </button>
              )}

              {/* 📄 Download Invoice */}
{c.paymentStatus === "paid" && (
  <a
    href={`http://localhost:5000/api/invoice/${c._id}`}
    target="_blank"
    rel="noreferrer"
  >
    <button
      className="mt-4 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition"
    >
      Download Invoice
    </button>
  </a>
)}

            </div>
          ))}

        </div>
      )}
    </div>
  );
}

export default Contracts;