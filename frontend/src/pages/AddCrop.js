import React, { useState } from "react";
import API from "../services/api";

function AddCrop() {
  const [cropName, setCropName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [pricePerUnit, setPricePerUnit] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    try {
      await API.post("/crops", {
        cropName,
        quantity,
        pricePerUnit,
        location,
        description
      });

      alert("Crop added successfully!");
      window.location.href = "/crops";

    } catch (err) {
      console.error(err);
      alert("Error adding crop");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Crop</h2>

      <input placeholder="Crop Name" onChange={e => setCropName(e.target.value)} /><br /><br />
      <input placeholder="Quantity" type="number" onChange={e => setQuantity(e.target.value)} /><br /><br />
      <input placeholder="Price Per Unit" type="number" onChange={e => setPricePerUnit(e.target.value)} /><br /><br />
      <input placeholder="Location" onChange={e => setLocation(e.target.value)} /><br /><br />
      <input placeholder="Description" onChange={e => setDescription(e.target.value)} /><br /><br />

      <button onClick={handleSubmit}>Add Crop</button>
    </div>
  );
}

export default AddCrop;