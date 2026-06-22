const express = require("express");
const router = express.Router();

const {
  createContract,
  getContracts,
  updateStatus,
  makePayment,
  createOrder,
  getDashboardStats,
  getFarmerStats,
  updateDeliveryStatus
} = require("../controllers/contractController");

const auth = require("../middleware/authMiddleware");

// 🟢 Buyer creates contract
router.post("/", auth, createContract);

// 🔵 Farmer/Buyer view contracts
router.get("/", auth, getContracts);

router.get(
  "/stats/:farmerId",
  auth,
  getFarmerStats
);

router.get("/dashboard/stats",auth,getDashboardStats);

// 🟡 Farmer updates status
router.put("/:id", auth, updateStatus);

// 💳 Buyer makes payment
router.put("/pay/:id", auth, makePayment);
router.put("/delivery/:id", auth, updateDeliveryStatus);

// 🔥 💳 Razorpay order creation (NEW)
router.post("/create-order", auth, createOrder);

module.exports = router;