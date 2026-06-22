import React from "react";
import { Link } from "react-router-dom";

function Navbar() {

  const role = localStorage.getItem("role");
 return (
  <nav className="bg-white shadow-lg sticky top-0 z-50">

    <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

      {/* Logo */}
      <Link to="/dashboard">
        <h1 className="text-3xl font-bold text-green-600">
          🌾 AgriConnect
        </h1>
      </Link>

      {/* Navigation */}
      <div className="flex items-center gap-6">

        {role !== "admin" && (
          <>
            <Link
              to="/dashboard"
              className="font-medium text-gray-700 hover:text-green-600 transition"
            >
              Dashboard
            </Link>

            <Link
              to="/crops"
              className="font-medium text-gray-700 hover:text-green-600 transition"
            >
              Crops
            </Link>

            <Link
              to="/contracts"
              className="font-medium text-gray-700 hover:text-green-600 transition"
            >
              Contracts
            </Link>

            <Link
              to="/history"
              className="font-medium text-gray-700 hover:text-green-600 transition"
            >
              History
            </Link>
          </>
        )}

        {role === "farmer" && (
          <Link
            to="/add-crop"
            className="bg-green-500 text-white px-4 py-2 rounded-xl shadow hover:bg-green-600 transition"
          >
            + Add Crop
          </Link>
        )}

        {role === "admin" && (
          <Link
            to="/admin"
            className="bg-purple-500 text-white px-4 py-2 rounded-xl shadow hover:bg-purple-600 transition"
          >
            Admin Panel
          </Link>
        )}

        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
          className="bg-red-500 text-white px-4 py-2 rounded-xl shadow hover:bg-red-600 transition"
        >
          Logout
        </button>

      </div>
    </div>

  </nav>
);
}

export default Navbar;