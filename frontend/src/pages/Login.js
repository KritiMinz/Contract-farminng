import React, { useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("userId", res.data.userId);

      toast.success("Login successful 🎉");

      window.location.href = "/dashboard";

    } catch {
      toast.error("Login failed ❌");
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
    Smart Contract Farming Platform connecting
    farmers and buyers directly.
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

</div>
<div className="bg-white/90 backdrop-blur-lg p-10 rounded-3xl shadow-2xl max-w-md w-full">      
        <h2 className="text-3xl font-bold text-center mb-2">
  Welcome Back
</h2>

<p className="text-center text-gray-500 mb-8">
  Login to continue farming smarter
</p>

        <input
          className="w-full border p-3 mb-4 rounded-xl focus:ring-2 focus:ring-green-400 outline-none"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          className="w-full border p-3 mb-4 rounded-xl focus:ring-2 focus:ring-green-400 outline-none"
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:bg-green-700 hover:scale-105 transition-all"
        >
          Login
        </button>
        <p className="mt-4 text-center text-sm">
  Don’t have an account?
  
  <Link
    to="/register"
    className="text-blue-500 ml-2 hover:underline"
  >
    Register
  </Link>
</p>
<div className="mt-8 border-t pt-6">

  <p className="font-semibold mb-3">
    Platform Features
  </p>

  <ul className="space-y-2 text-gray-600">

    <li>✅ Direct Farmer-Buyer Contracts</li>

    <li>✅ Secure Payments</li>

    <li>✅ Crop Management</li>

    <li>✅ Real-Time Notifications</li>

    <li>✅ Contract History Tracking</li>

  </ul>
  </div>

</div>

      </div>
      <div className="text-center text-white text-sm mt-8">
  AgriConnect © 2026
</div>
    </div>
  );
}

export default Login;