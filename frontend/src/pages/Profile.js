import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

function Profile() {
  const { id } = useParams(); // 👈 farmerId from URL
  const myId = localStorage.getItem("userId");
  const [crops, setCrops] = useState([]);
  const [reviews, setReviews] = useState([]);
const [rating, setRating] = useState(5);
const [comment, setComment] = useState("");
const [farmer, setFarmer] = useState(null);
const [farmerStats, setFarmerStats] = useState({
  totalContracts: 0,
  completedContracts: 0,
  totalEarnings: 0,
  totalCrops: 0,
});


const averageRating =
  reviews.length > 0
    ? (
        reviews.reduce(
          (sum, review) => sum + review.rating,
          0
        ) / reviews.length
      ).toFixed(1)
    : 0;

 useEffect(() => {
  fetchFarmer();
  fetchFarmerCrops();
  fetchReviews();
  fetchFarmerStats();
}, []);

const fetchFarmer = async () => {
  try {

    const res = await API.get(`/users/me/${id}`);

    setFarmer(res.data);

  } catch (err) {

    console.error(err);

  }
};

const fetchFarmerStats = async () => {
  try {

    const res = await API.get(
      `/contracts/stats/${id}`
    );

    setFarmerStats(res.data);

  } catch (err) {

    console.error(err);

  }
};

  const fetchFarmerCrops = async () => {
    try {
      const res = await API.get(`/crops/farmer/${id}`);
      setCrops(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load farmer profile ❌");
    }
  };

  const fetchReviews = async () => {
  try {

    const res = await API.get(`/reviews/${id}`);

    setReviews(res.data);

  } catch (err) {

    console.error(err);

  }
};

const submitReview = async () => {
  try {

    await API.post("/reviews", {
      farmerId: id,
      rating,
      comment,
    });

    toast.success("Review added ✅");

    setComment("");

    fetchReviews();

  } catch (err) {

    console.error(err);

    toast.error("Failed to add review ❌");

  }
};

  return (
    <div className="min-h-screen bg-gray-100 p-6">

{farmer && (
  <div className="bg-white p-6 rounded-xl shadow mb-6">

    {farmer.profileImage && (
      <img
        src={farmer.profileImage}
        alt={farmer.name}
        className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border"
      />
    )}

    <h2 className="text-3xl font-bold text-center">
      {farmer.name}
    </h2>

    <p className="text-center text-gray-600">
      📍 {farmer.location}
    </p>

    {farmer.phone && (
      <p className="text-center text-gray-600">
        📞 {farmer.phone}
      </p>
    )}

    <div className="mt-4 text-center">

      <p className="text-yellow-600 text-lg">
        ⭐ {averageRating} Rating
      </p>

      <p>
        📝 {reviews.length} Reviews
      </p>

      <p>
        🌾 {farmerStats.totalCrops} Crops Listed
      </p>

      <p>
        📄 {farmerStats.totalContracts} Contracts
      </p>

      <p>
        ✅ {farmerStats.completedContracts} Completed
      </p>

      <p>
        💰 ₹{farmerStats.totalEarnings}
      </p>

      <hr className="my-3" />

      {averageRating >= 4.8 && (
        <p className="font-bold text-yellow-600">
          🏆 Elite Farmer
        </p>
      )}

      {averageRating >= 4.5 &&
        averageRating < 4.8 && (
          <p className="font-bold text-green-600">
            ⭐ Top Farmer
          </p>
      )}

      {averageRating >= 4.0 &&
        averageRating < 4.5 && (
          <p className="font-bold text-blue-600">
            🌱 Trusted Farmer
          </p>
      )}

    </div>

  </div>
)}

      {/* Crops Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {crops.map((crop) => (
          <div key={crop._id} className="bg-white p-4 rounded shadow">

            {/* 🔥 Image */}
            {crop.imageUrl && (
              <img
                src={crop.imageUrl}
                alt={crop.cropName}
                className="w-full h-40 object-cover rounded mb-2"
              />
            )}

            <h3 className="font-semibold text-lg">{crop.cropName}</h3>
            <p className="text-gray-600">₹{crop.pricePerUnit}</p>
            <p className="text-gray-600">📍 {crop.location}</p>

          </div>
        ))}
      </div>

      {crops.length === 0 && (
        <p className="text-gray-600">No crops found for this farmer</p>
      )}

      {/* ⭐ Reviews Section */}
<div className="bg-white p-6 rounded-xl shadow mt-8">

  <h2 className="text-2xl font-bold mb-4">
    Ratings & Reviews
  </h2>

  {/* Add Review */}
  {myId !== id && (
<div className="mb-6">

    <select
      value={rating}
      onChange={(e) => setRating(e.target.value)}
      className="border p-2 rounded mb-3"
    >
      <option value="5">⭐ 5</option>
      <option value="4">⭐ 4</option>
      <option value="3">⭐ 3</option>
      <option value="2">⭐ 2</option>
      <option value="1">⭐ 1</option>
    </select>

    <textarea
      placeholder="Write review..."
      value={comment}
      onChange={(e) => setComment(e.target.value)}
      className="w-full border p-3 rounded mb-3"
    />

    <button
      onClick={submitReview}
      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
    >
      Submit Review
    </button>

  </div>
)}

  {/* Reviews List */}
  <div className="space-y-4">

    {reviews.map((review) => (

      <div
        key={review._id}
        className="border p-4 rounded"
      >

        <p className="font-bold">
          {review.buyerId?.name}
        </p>

        <p>
          ⭐ {review.rating}
        </p>

        <p>
          {review.comment}
        </p>

      </div>

    ))}

  </div>

</div>

{/* 💬 Chat Button */}
{myId !== id && (
  <div className="mt-6">
    <Link to={`/chat/${id}`}>
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        💬 Chat With Farmer
      </button>
    </Link>
  </div>
)}

    </div>
  );
}

export default Profile;