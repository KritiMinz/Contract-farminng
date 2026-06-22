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
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-2xl shadow-lg mb-8">
  <h2 className="text-4xl font-bold">
    🌾 Add New Crop
  </h2>

  <p className="mt-2">
    List your crop for buyers across the platform
  </p>
</div>

      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-2xl mx-auto">
        {image && (
  <div className="mb-6">
    <img
      src={URL.createObjectURL(image)}
      alt="Preview"
      className="w-full h-60 object-cover rounded-xl border"
    />
  </div>
)}

        <input
          placeholder="Crop Name"
          onChange={(e) => setCropName(e.target.value)}
          className="w-full mb-4 p-3 border rounded-xl focus:ring-2 focus:ring-green-400 outline-none"/>

        <input
          type="number"
          placeholder="Quantity"
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full mb-4 p-3 border rounded-xl focus:ring-2 focus:ring-green-400 outline-none"
        />

        <input
          type="number"
          placeholder="Price Per Unit"
          onChange={(e) => setPricePerUnit(e.target.value)}
          className="w-full mb-4 p-3 border rounded-xl focus:ring-2 focus:ring-green-400 outline-none"
        />

        <input
          placeholder="Location"
          onChange={(e) => setLocation(e.target.value)}
          className="w-full mb-4 p-3 border rounded-xl focus:ring-2 focus:ring-green-400 outline-none"
        />

        <textarea
  placeholder="Describe your crop..."
  rows="4"
  onChange={(e) => setDescription(e.target.value)}
  className="w-full mb-4 p-3 border rounded-xl focus:ring-2 focus:ring-green-400 outline-none"
/>

        {/* 🔥 Image Upload */}
        <div className="mb-6">
  <label className="block mb-2 font-semibold">
    📷 Crop Image
  </label>

  <input
    type="file"
    onChange={(e) => setImage(e.target.files[0])}
    className="w-full border p-3 rounded-xl"
  />
</div>

        <button
          onClick={handleSubmit}
          className="w-full bg-green-500 text-white py-3 rounded-xl shadow-lg hover:bg-green-600 hover:scale-105 transition duration-300"
        >
          Add Crop
        </button>

      </div>
      <div className="mt-10 text-center text-gray-500">
  Contract Farming Platform © 2026
</div>
    </div>
  );
}

export default AddCrop;