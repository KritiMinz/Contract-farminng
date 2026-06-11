import React from "react";
import { Link } from "react-router-dom";

function Navbar() {

  const role = localStorage.getItem("role");
 return (
  <div className="bg-green-600 text-white px-6 py-4 flex justify-between items-center shadow">

    {/* Logo */}
    <h1 className="text-xl font-bold">
      🌾 AgriConnect
    </h1>

    {/* Navigation */}
    <div className="flex gap-6 items-center">

  {/* Farmer & Buyer */}
  {role !== "admin" && (
    <>
      <Link to="/dashboard" className="hover:text-gray-200">
        Dashboard
      </Link>

      <Link to="/crops" className="hover:text-gray-200">
        Crops
      </Link>

      <Link to="/contracts" className="hover:text-gray-200">
        Contracts
      </Link>

      <Link to="/history" className="hover:text-gray-200">
        History
      </Link>
    </>
  )}

  {/* Farmer only */}
  {role === "farmer" && (
    <Link to="/add-crop" className="hover:text-gray-200">
      Add Crop
    </Link>
  )}

  {/* Admin only */}
  {role === "admin" && (
    <Link to="/admin" className="hover:text-yellow-300 font-bold">
      Admin
    </Link>
  )}

  {/* Logout */}
  <button
    onClick={() => {
      localStorage.clear();
      window.location.href = "/";
    }}
    className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
  >
    Logout
  </button>

</div>
  </div>
);
}

export default Navbar;