import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

function EditCrop() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [crop, setCrop] = useState({
    cropName: "",
    quantity: "",
    pricePerUnit: "",
    location: "",
    description: "",
  });

  useEffect(() => {
    fetchCrop();
  }, []);

  const fetchCrop = async () => {
    try {
      const res = await API.get("/crops");

      const selectedCrop = res.data.find(
        (c) => c._id === id
      );

      if (selectedCrop) {
        setCrop(selectedCrop);
      }

    } catch (err) {
      console.error(err);
    }
  };

  const updateCrop = async () => {
    try {
      await API.put(`/crops/${id}`, crop);

      toast.success("Crop updated ✅");

      navigate("/crops");

    } catch (err) {

      console.error(err);

      toast.error("Update failed ❌");

    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">

        <h2 className="text-3xl font-bold mb-6">
          Edit Crop
        </h2>

        <input
          type="text"
          value={crop.cropName}
          onChange={(e) =>
            setCrop({
              ...crop,
              cropName: e.target.value,
            })
          }
          className="w-full border p-2 mb-3 rounded"
          placeholder="Crop Name"
        />

        <input
          type="number"
          value={crop.quantity}
          onChange={(e) =>
            setCrop({
              ...crop,
              quantity: e.target.value,
            })
          }
          className="w-full border p-2 mb-3 rounded"
          placeholder="Quantity"
        />

        <input
          type="number"
          value={crop.pricePerUnit}
          onChange={(e) =>
            setCrop({
              ...crop,
              pricePerUnit: e.target.value,
            })
          }
          className="w-full border p-2 mb-3 rounded"
          placeholder="Price"
        />

        <input
          type="text"
          value={crop.location}
          onChange={(e) =>
            setCrop({
              ...crop,
              location: e.target.value,
            })
          }
          className="w-full border p-2 mb-3 rounded"
          placeholder="Location"
        />

        <textarea
          value={crop.description}
          onChange={(e) =>
            setCrop({
              ...crop,
              description: e.target.value,
            })
          }
          className="w-full border p-2 mb-3 rounded"
          placeholder="Description"
        />

        <button
          onClick={updateCrop}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>

      </div>

    </div>
  );
}

export default EditCrop;