import React, { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

function AdminCrops() {
  const [crops, setCrops] = useState([]);

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

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h2 className="text-3xl font-bold mb-6">
        Manage Crops
      </h2>

      <div className="grid gap-4">

        {crops.map((crop) => (
          <div
            key={crop._id}
            className="bg-white p-4 rounded shadow"
          >

            {crop.imageUrl && (
              <img
                src={crop.imageUrl}
                alt={crop.cropName}
                className="w-full h-40 object-cover rounded mb-3"
              />
            )}

            <h3 className="text-xl font-semibold">
              {crop.cropName}
            </h3>

            <p>
              Farmer: {crop.farmerId?.name}
            </p>

            <p>
              Price: ₹{crop.pricePerUnit}
            </p>

            <p>
              Quantity: {crop.quantity}
            </p>

            <button
              onClick={() => deleteCrop(crop._id)}
              className="mt-3 bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete Crop
            </button>

          </div>
        ))}

      </div>
    </div>
  );
}

export default AdminCrops;