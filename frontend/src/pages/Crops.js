import React, { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Crops() {
  const [crops, setCrops] = useState([]);

  // 🔍 Filters
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem("userId");

  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  // ✅ Auto fetch when filters change
  useEffect(() => {
    fetchCrops();
  }, [search, location, minPrice, maxPrice]);

  const fetchCrops = async () => {
    try {
      setLoading(true);

      // ✅ Build clean query params
      const query = new URLSearchParams();

      if (search) query.append("search", search);
      if (location) query.append("location", location);
      if (minPrice) query.append("minPrice", minPrice);
      if (maxPrice) query.append("maxPrice", maxPrice);

      const res = await API.get(`/crops?${query.toString()}`);

      setCrops(res.data);

    } catch (err) {
      console.error(err);
      toast.error("Failed to load crops ❌");
    } finally {
      setLoading(false);
    }
  };

  // 🛒 Buyer: request contract
  const requestContract = async (cropId) => {
    const input = prompt("Enter quantity:");
    const quantity = Number(input);

    // ✅ Validation
    if (!quantity || quantity <= 0) {
      toast.error("Enter valid quantity ❌");
      return;
    }

    try {
      await API.post("/contracts", {
        cropId,
        quantity,
      });

      toast.success("Contract requested ✅");

    } catch (err) {
      console.error(err);
      toast.error("Error requesting contract ❌");
    }
  };
  const deleteCrop = async (id) => {

  const ok = window.confirm(
    "Delete this crop?"
  );

  if (!ok) return;

  try {

    await API.delete(`/crops/${id}`);

    toast.success("Crop deleted ✅");

    fetchCrops();

  } catch (err) {

    console.error(err);

    toast.error("Delete failed ❌");

  }
};
const editCrop = async (crop) => {

  const cropName = prompt(
    "Crop Name",
    crop.cropName
  );

  const quantity = prompt(
    "Quantity",
    crop.quantity
  );

  const pricePerUnit = prompt(
    "Price",
    crop.pricePerUnit
  );

  if (!cropName) return;

  try {

    await API.put(`/crops/${crop._id}`, {
      cropName,
      quantity,
      pricePerUnit,
      location: crop.location,
      description: crop.description,
    });

    toast.success("Crop updated ✅");

    fetchCrops();

  } catch (err) {

    console.error(err);

    toast.error("Update failed ❌");

  }
};
  return (
  <div className="min-h-screen bg-gray-100 p-6">

    <h2 className="text-3xl font-bold mb-6 text-gray-800">
      Available Crops
    </h2>

    {/* 🔍 FILTER UI START */}
    <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">

      <input
        placeholder="Search crop..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-2 border rounded"
      />

      <input
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="p-2 border rounded"
      />

      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        className="p-2 border rounded"
      />

      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        className="p-2 border rounded"
      />

    </div>

    <button
      onClick={fetchCrops}
      className="mb-6 bg-blue-500 text-white px-4 py-2 rounded"
    >
      Apply Filters
    </button>
    {/* 🔍 FILTER UI END */}

    {/* No crops case */}
    {crops.length === 0 ? (
      <p className="text-gray-600">No crops available</p>
    ) : (

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {crops.map((crop) => (
  <div
    key={crop._id}
    className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
  >
    {crop.imageUrl && (
      <img
        src={crop.imageUrl}
        alt={crop.cropName}
        className="w-full h-40 object-cover rounded mb-3"
      />
    )}

    <h3 className="text-xl font-semibold mb-2">
      {crop.cropName}
    </h3>

    <p className="text-gray-600">
      📍 {crop.location}
    </p>

    <p className="text-gray-600">
      Quantity: {crop.quantity}
    </p>

    <p className="text-green-600 font-bold text-lg">
      ₹{crop.pricePerUnit} / unit
    </p>

    {/* Buyer Actions */}
    {role === "buyer" && (
      <button
        onClick={() => requestContract(crop._id)}
        className="mt-4 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
      >
        Request Contract
      </button>
    )}

    {/* Farmer Actions */}
    {role === "farmer" && (
      <div className="mt-4 flex gap-2">

        <button
          onClick={() => navigate(`/edit-crop/${crop._id}`)}
          className="flex-1 bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600"
        >
          ✏️ Edit
        </button>

        <button
          onClick={() => deleteCrop(crop._id)}
          className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600"
        >
          🗑 Delete
        </button>

      </div>
    )}
  </div>
))}
      </div>
    )}
  </div>
);
}

export default Crops;