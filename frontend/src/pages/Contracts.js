/*import React, { useEffect, useState } from "react";
import API from "../services/api";

function Contracts() {
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    fetchContracts();
  }, []);

  const fetchContracts = async () => {
    try {
      const res = await API.get("/contracts");

      console.log("Contracts:", res.data); // 🔍 DEBUG

      setContracts(res.data);
    } catch (err) {
      console.error("Error fetching contracts:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Contracts</h2>

      {contracts.length === 0 ? (
        <p>No contracts found</p>
      ) : (
        contracts.map((contract) => (
          <div
            key={contract._id}
            style={{
              border: "1px solid gray",
              margin: "10px",
              padding: "10px"
            }}
          >
            <h3>{contract.cropId?.cropName}</h3>

            <p>Buyer: {contract.buyerId?.name}</p>
            <p>Quantity: {contract.quantity}</p>
            <p>Status: {contract.status}</p>
            <p>Payment: {contract.paymentStatus}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Contracts;*/
import React, { useEffect, useState } from "react";
import API from "../services/api";

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
    }
  };

  // ✅ Accept / Reject
  const updateStatus = async (id, status) => {
    try {
      await API.put(`/contracts/${id}`, { status });
      alert(`Contract ${status}`);
      fetchContracts();
    } catch (err) {
      console.error(err);
      alert("Error updating contract");
    }
  };

  // 💳 Payment
  const makePayment = async (id) => {
    try {
      await API.put(`/contracts/pay/${id}`);
      alert("Payment successful");
      fetchContracts();
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Contracts</h2>

      {contracts.map((contract) => (
        <div key={contract._id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
          <h3>{contract.cropId?.cropName}</h3>

          <p>Buyer: {contract.buyerId?.name}</p>
          <p>Quantity: {contract.quantity}</p>
          <p>Status: {contract.status}</p>
          <p>Payment: {contract.paymentStatus}</p>

          {/* 🟢 Farmer Actions */}
          {role === "farmer" && contract.status === "pending" && (
            <>
              <button onClick={() => updateStatus(contract._id, "accepted")}>
                Accept
              </button>

              <button onClick={() => updateStatus(contract._id, "rejected")}>
                Reject
              </button>
            </>
          )}

          {/* 💳 Buyer Payment */}
          {role === "buyer" &&
            contract.status === "accepted" &&
            contract.paymentStatus !== "paid" && (
              <button onClick={() => makePayment(contract._id)}>
                Pay Now
              </button>
            )}
        </div>
      ))}
    </div>
  );
}

export default Contracts;