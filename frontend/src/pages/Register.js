import React, { useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [role, setRole] = useState("buyer");

  const [location, setLocation] = useState("");

  const [phone, setPhone] = useState("");


  const handleRegister = async () => {
    try {

      await API.post("/auth/register", {
        name,
        email,
        password,
        role,
        location,
        phone,
      });

      toast.success("Registration successful ✅");

      navigate("/");

    } catch (err) {

      console.error(err);

      toast.error("Registration failed ❌");

    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 via-emerald-500 to-green-800 flex items-center justify-center p-6">

      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center">
        <div className="text-white">

  <h1 className="text-5xl font-bold mb-6">
    🌾 AgriConnect
  </h1>

  <p className="text-xl mb-6">
    Join India's modern contract farming network.
  </p>

  <div className="grid grid-cols-3 gap-4">

    <div className="bg-white/20 backdrop-blur-md p-4 rounded-xl">
      <p className="text-3xl font-bold">500+</p>
      <p>Farmers</p>
    </div>

    <div className="bg-white/20 backdrop-blur-md p-4 rounded-xl">
      <p className="text-3xl font-bold">1200+</p>
      <p>Crops</p>
    </div>

    <div className="bg-white/20 backdrop-blur-md p-4 rounded-xl">
      <p className="text-3xl font-bold">300+</p>
      <p>Contracts</p>
    </div>

  </div>

  <div className="mt-8">

    <p className="font-semibold mb-3">
      Why Join?
    </p>

    <ul className="space-y-2">

      <li>🌾 Direct Farmer-Buyer Network</li>

      <li>💳 Secure Transactions</li>

      <li>📄 Smart Contracts</li>

      <li>🔔 Real-Time Notifications</li>

      <li>📊 Crop Management Tools</li>

    </ul>

  </div>

</div>
<div className="bg-white/90 backdrop-blur-lg p-10 rounded-3xl shadow-2xl max-w-md w-full">

        <h2 className="text-3xl font-bold text-center mb-2">
  Create Account
</h2>

<p className="text-center text-gray-500 mb-8">
  Start your farming journey today
</p>

        <input
          type="text"
          placeholder="Name"
          className="w-full border p-3 rounded-xl mb-4 focus:ring-2 focus:ring-green-400 outline-none"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-xl mb-4 focus:ring-2 focus:ring-green-400 outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-xl mb-4 focus:ring-2 focus:ring-green-400 outline-none"
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="grid grid-cols-2 gap-3 mb-4">

  <button
    type="button"
    onClick={() => setRole("buyer")}
    className={`p-3 rounded-xl border ${
      role === "buyer"
        ? "bg-blue-500 text-white"
        : "bg-white"
    }`}
  >
    🛒 Buyer
  </button>

  <button
    type="button"
    onClick={() => setRole("farmer")}
    className={`p-3 rounded-xl border ${
      role === "farmer"
        ? "bg-green-500 text-white"
        : "bg-white"
    }`}
  >
    🌾 Farmer
  </button>

</div>

        <input
          type="text"
          placeholder="Location"
          className="w-full border p-3 rounded-xl mb-4 focus:ring-2 focus:ring-green-400 outline-none"
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          type="text"
          placeholder="Phone"
          className="w-full border p-3 rounded-xl mb-4 focus:ring-2 focus:ring-green-400 outline-none"
          onChange={(e) => setPhone(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:bg-green-700 hover:scale-105 transition-all"
        >
          Register
        </button>

        <p className="mt-4 text-center">
          Already have an account?
          <Link
            to="/"
            className="text-blue-500 ml-2"
          >
            Login
          </Link>
        </p>
        </div>
      </div>
      <div className="mt-10 text-center text-white text-sm">
  AgriConnect © 2026
</div>
    </div>
  );
}

export default Register;