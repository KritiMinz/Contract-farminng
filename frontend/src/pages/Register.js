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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow w-full max-w-md">

        <h2 className="text-3xl font-bold mb-6 text-center">
          Register
        </h2>

        <input
          type="text"
          placeholder="Name"
          className="w-full border p-3 rounded mb-4"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded mb-4"
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          className="w-full border p-3 rounded mb-4"
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="buyer">Buyer</option>
          <option value="farmer">Farmer</option>
        </select>

        <input
          type="text"
          placeholder="Location"
          className="w-full border p-3 rounded mb-4"
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          type="text"
          placeholder="Phone"
          className="w-full border p-3 rounded mb-4"
          onChange={(e) => setPhone(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-green-500 text-white py-3 rounded hover:bg-green-600"
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
  );
}

export default Register;