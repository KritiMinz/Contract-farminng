import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Crops from "./pages/Crops";
import AddCrop from "./pages/AddCrop";
import Contracts from "./pages/Contracts";
import History from "./pages/History";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import Register from "./pages/Register";
import { useEffect } from "react";
import socket from "./socket";
import { toast } from "react-toastify";
import AdminUsers from "./pages/AdminUsers";
import AdminCrops from "./pages/AdminCrops";
import AdminContracts from "./pages/AdminContracts";
import Chat from "./pages/Chat";
import MyProfile from "./pages/MyProfile";
import EditCrop from "./pages/EditCrop";



// 🔹 Wrapper to control Navbar visibility
function Layout() {
  const location = useLocation();

  // ✅ ADD THIS HERE
  useEffect(() => {

     // 🔥 Join personal socket room
  const userId = localStorage.getItem("userId");

  if (userId) {
    socket.emit("join", userId);
  }

    // Contract accepted
    socket.on("contractAccepted", (data) => {
      toast.success(data.message);
    });

    // Payment done
    socket.on("paymentDone", (data) => {
      toast.info(data.message);
    });

    // Cleanup
   return () => {
  socket.off("contractAccepted");
  socket.off("paymentDone");
  socket.off("newMessage");
};

  }, []);

  return (
    <>
      {/* Hide Navbar on login page */}
      {location.pathname !== "/" &&
 location.pathname !== "/register" && (
  <Navbar />
)}

      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={2000} />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/crops" element={<Crops />} />
        <Route path="/add-crop" element={<AddCrop />} />
        <Route path="/contracts" element={<Contracts />} />
        <Route path="/history" element={<History />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/chat/:id" element={<Chat />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/users" element={<AdminUsers />} />
<Route path="/admin/crops" element={<AdminCrops />} />
<Route path="/admin/contracts" element={<AdminContracts />} />
<Route
  path="/my-profile"
  element={<MyProfile />}
/>
<Route
  path="/edit-crop/:id"
  element={<EditCrop />}
/>
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;