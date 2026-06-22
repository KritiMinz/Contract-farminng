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

      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg">

        <div className="text-center mb-6">
  <h2 className="text-4xl font-bold text-green-700">
    👤 My Profile
  </h2>

  <p className="text-gray-500 mt-2">
    Manage your personal information
  </p>
</div>
        {user.profileImage && (
  <img
    src={user.profileImage}
    alt="Profile"
    className="
      w-36 h-36
      rounded-full
      object-cover
      mx-auto
      mb-6
      border-4
      border-green-500
      shadow-lg
    "
  />
)}
<div className="grid grid-cols-2 gap-4 mb-6">

  <div className="bg-green-50 p-4 rounded-xl text-center">
    <p className="text-gray-500">
      Status
    </p>

    <p className="font-bold text-green-600">
      Active
    </p>
  </div>

  <div className="bg-blue-50 p-4 rounded-xl text-center">
    <p className="text-gray-500">
      Role
    </p>

    <p className="font-bold text-blue-600 capitalize">
      {localStorage.getItem("role")}
    </p>
  </div>

</div>

        <input
          type="text"
          value={user.name}
          onChange={(e) =>
            setUser({ ...user, name: e.target.value })
          }
          placeholder="Name"
          className="
w-full
border
border-gray-300
p-3
mb-4
rounded-xl
focus:outline-none
focus:ring-2
focus:ring-green-500
"
        />

        <input
          type="email"
          value={user.email}
          disabled
          className="
w-full
border
border-gray-300
p-3
mb-4
rounded-xl
bg-gray-100
"
        />

        <input
          type="text"
          value={user.phone}
          onChange={(e) =>
            setUser({ ...user, phone: e.target.value })
          }
          placeholder="Phone"
          className="
w-full
border
border-gray-300
p-3
mb-4
rounded-xl
focus:outline-none
focus:ring-2
focus:ring-green-500
"
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
          className="
w-full
border
border-gray-300
p-3
mb-4
rounded-xl
focus:outline-none
focus:ring-2
focus:ring-green-500
"
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
  className="
w-full
border
border-gray-300
p-3
mb-4
rounded-xl
focus:outline-none
focus:ring-2
focus:ring-green-500
"
/>

        <button
  onClick={updateProfile}
  className="
    w-full
    bg-green-500
    text-white
    py-3
    rounded-xl
    shadow-md
    hover:bg-green-600
    hover:scale-105
    transition
  "
>
  💾 Save Changes
</button>

<div className="mt-8 text-center text-gray-500">
  Contract Farming Platform © 2026
</div>

      </div>
    </div>
  );
}

export default MyProfile;