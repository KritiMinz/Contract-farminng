import React, { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

function MyProfile() {
  const userId = localStorage.getItem("userId");

 const [user, setUser] = useState({
  name: "",
  email: "",
  phone: "",
  location: "",
  profileImage: "",
});

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get(`/users/me/${userId}`);
      setUser(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const updateProfile = async () => {
    try {
      await API.put(`/users/me/${userId}`, user);

      toast.success("Profile updated ✅");
    } catch (err) {
      console.error(err);

      toast.error("Update failed ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">

        <h2 className="text-3xl font-bold mb-6">
          My Profile
        </h2>
        {user.profileImage && (
  <img
    src={user.profileImage}
    alt="Profile"
    className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border"
  />
)}

        <input
          type="text"
          value={user.name}
          onChange={(e) =>
            setUser({ ...user, name: e.target.value })
          }
          placeholder="Name"
          className="w-full border p-2 mb-3 rounded"
        />

        <input
          type="email"
          value={user.email}
          disabled
          className="w-full border p-2 mb-3 rounded bg-gray-100"
        />

        <input
          type="text"
          value={user.phone}
          onChange={(e) =>
            setUser({ ...user, phone: e.target.value })
          }
          placeholder="Phone"
          className="w-full border p-2 mb-3 rounded"
        />

        <input
          type="text"
          value={user.location}
          onChange={(e) =>
            setUser({
              ...user,
              location: e.target.value,
            })
          }
          placeholder="Location"
          className="w-full border p-2 mb-3 rounded"
        />

        <input
  type="text"
  value={user.profileImage}
  onChange={(e) =>
    setUser({
      ...user,
      profileImage: e.target.value,
    })
  }
  placeholder="Profile Image URL"
  className="w-full border p-2 mb-3 rounded"
/>

        <button
          onClick={updateProfile}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>

      </div>
    </div>
  );
}

export default MyProfile;