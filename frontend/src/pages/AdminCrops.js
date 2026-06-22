import React, { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

function AdminCrops() {
  const [crops, setCrops] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCrops();
  }, []);

  const fetchCrops = async () => {
    try {
      const res = await API.get("/admin/crops");
      setCrops(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load crops ❌");
    }
  };

  const deleteCrop = async (id) => {
    try {
      await API.delete(`/admin/crop/${id}`);

      toast.success("Crop deleted ✅");

      fetchCrops();
    } catch (err) {
      console.error(err);
      toast.error("Delete failed ❌");
    }
  };

  const filteredCrops = crops.filter(
  (crop) =>
    crop.cropName
      ?.toLowerCase()
      .includes(search.toLowerCase())
);

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-2xl shadow-lg mb-8">

  <h2 className="text-4xl font-bold">
    🌾 Crop Management
  </h2>

  <p className="mt-2">
    Monitor and manage all listed crops
  </p>

</div>
<div className="bg-white p-6 rounded-2xl shadow-lg mb-6">

  <p className="text-gray-500">
    Total Listed Crops
  </p>

  <p className="text-4xl font-bold text-green-600">
    {crops.length}
  </p>

</div>
<input
  type="text"
  placeholder="Search crop..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full mb-6 p-3 border rounded-xl"
/>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {filteredCrops.map((crop) => (
          <div
            key={crop._id}
            className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
          >

            {crop.imageUrl && (
              <img
                src={crop.imageUrl}
                alt={crop.cropName}
                className="w-full h-40 object-cover rounded mb-3"
              />
            )}

            <div className="p-5">

            <h3 className="text-2xl font-bold mb-2">
              {crop.cropName}
            </h3>

            <p className="mb-2">

  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">

    👨‍🌾 {crop.farmerId?.name}

  </span>

</p>

            <p className="text-green-600 font-bold text-xl">

  ₹{crop.pricePerUnit}

</p>

            <p>
              Quantity: {crop.quantity}
            </p>

            <button
              onClick={() => deleteCrop(crop._id)}
              className="mt-4 w-full bg-red-500 text-white py-3 rounded-xl shadow hover:scale-105 hover:bg-red-600 transition"
            >
              Delete Crop
            </button>
            </div>

          </div>
        ))}

      </div>
      <div className="mt-10 text-center text-gray-500">
  AgriConnect Admin Portal © 2026
</div>
    </div>
  );
}

export default AdminCrops;