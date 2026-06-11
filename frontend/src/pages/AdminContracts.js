import React, { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

function AdminContracts() {
  const [contracts, setContracts] = useState([]);

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

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h2 className="text-3xl font-bold mb-6">
        All Contracts
      </h2>

      <div className="grid gap-4">

        {contracts.map((contract) => (
          <div
            key={contract._id}
            className="bg-white p-4 rounded shadow"
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

            <p>
              Status:
              <span className="ml-2 font-semibold">
                {contract.status}
              </span>
            </p>

            <p>
              Payment:
              <span className="ml-2 font-semibold">
                {contract.paymentStatus}
              </span>
            </p>

          </div>
        ))}

      </div>
    </div>
  );
}

export default AdminContracts;