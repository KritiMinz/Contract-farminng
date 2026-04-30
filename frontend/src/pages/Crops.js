import React, { useEffect, useState } from "react";
import API from "../services/api";

function Crops() {
  const [crops, setCrops] = useState([]);
  const role = localStorage.getItem("role"); // 👈 get role

  useEffect(() => {
    fetchCrops();
  }, []);

  const fetchCrops = async () => {
    try {
      const res = await API.get("/crops");
      setCrops(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 👇 NEW FUNCTION (important)
  const handleRequest = async (cropId) => {
    try {
      const quantity = prompt("Enter quantity:");

      if (!quantity) return;

      await API.post("/contracts", {
        cropId,
        quantity
      });

      alert("Contract request sent!");

    } catch (err) {
      console.error(err);
      alert("Error sending request");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Available Crops</h2>

      {crops.map((crop) => (
        <div
          key={crop._id}
          style={{
            border: "1px solid gray",
            margin: "10px",
            padding: "10px"
          }}
        >
          <h3>{crop.cropName}</h3>
          <p>Quantity: {crop.quantity}</p>
          <p>Price: {crop.pricePerUnit}</p>
          <p>Location: {crop.location}</p>

          {/* 👇 SHOW BUTTON ONLY FOR BUYER */}
          {role === "buyer" && (
            <button onClick={() => handleRequest(crop._id)}>
              Request Contract
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Crops;