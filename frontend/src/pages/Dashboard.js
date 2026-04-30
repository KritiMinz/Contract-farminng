import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const role = localStorage.getItem("role");

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>

      {/* Show role */}
      <p><strong>Role:</strong> {role}</p>

      {/* Farmer UI */}
      {role === "farmer" && (
        <div>
          <h3>Farmer Panel</h3>

          <Link to="/crops">
            <button>View My Crops</button>
          </Link>

          <br /><br />

          <Link to="/add-crop">
            <button>Add Crop</button>
          </Link>

          <br /><br />

          {/* ✅ ADD THIS */}
          <Link to="/contracts">
            <button>View Contract Requests</button>
          </Link>
        </div>
      )}

      {/* Buyer UI */}
      {role === "buyer" && (
        <div>
          <h3>Buyer Panel</h3>

          <Link to="/crops">
            <button>View Available Crops</button>
          </Link>

          <br /><br />

          <Link to="/contracts">
            <button>My Contracts</button>
          </Link>
        </div>
      )}

      {/* Logout */}
      <br /><br />
      <button onClick={() => {
        localStorage.clear();
        window.location.href = "/";
      }}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;