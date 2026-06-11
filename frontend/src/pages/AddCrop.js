/*import React, { useState } from "react";
import API from "../services/api";

function AddCrop() {
  const [cropName, setCropName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [pricePerUnit, setPricePerUnit] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
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

export default AddCrop;*/
import React, { useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

function AddCrop() {
  const [cropName, setCropName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [pricePerUnit, setPricePerUnit] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async () => {
    try {
      // ✅ Create FormData
      const formData = new FormData();

      formData.append("cropName", cropName);
      formData.append("quantity", quantity);
      formData.append("pricePerUnit", pricePerUnit);
      formData.append("location", location);
      formData.append("description", description);

      // 🔥 Image upload
      formData.append("image", image);

      await API.post("/crops", formData);

      toast.success("Crop added successfully 🌱");

      // Redirect
      window.location.href = "/crops";

    } catch (err) {
      console.error(err);
      toast.error("Error adding crop ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold mb-6">Add Crop</h2>

      <div className="bg-white p-6 rounded shadow max-w-md">

        <input
          placeholder="Crop Name"
          onChange={(e) => setCropName(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="number"
          placeholder="Quantity"
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="number"
          placeholder="Price Per Unit"
          onChange={(e) => setPricePerUnit(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          placeholder="Location"
          onChange={(e) => setLocation(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />

        {/* 🔥 Image Upload */}
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full mb-4"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
        >
          Add Crop
        </button>

      </div>
    </div>
  );
}

export default AddCrop;