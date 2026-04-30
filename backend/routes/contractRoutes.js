const express = require("express");
const router = express.Router();

const {
  createContract,
  getContracts,
  updateStatus,
  makePayment   // ✅ ADD THIS
} = require("../controllers/contractController");

const auth = require("../middleware/authMiddleware");

// Buyer creates contract
router.post("/", auth, createContract);

// Farmer/Buyer view contracts
router.get("/", auth, getContracts);

// Farmer updates status
router.put("/:id", auth, updateStatus);
router.put("/pay/:id", auth, makePayment);

module.exports = router;