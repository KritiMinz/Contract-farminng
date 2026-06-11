/*const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Crop = require("../models/Crop");
const Contract = require("../models/Contract");

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");


// ✅ GET ALL USERS
router.get("/users", auth, admin, async (req, res) => {
  try {

    const users = await User.find();

    res.json(users);

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});


// ✅ GET ALL CROPS
router.get("/crops", auth, admin, async (req, res) => {
  try {

    const crops = await Crop.find()
      .populate("farmerId", "name");

    res.json(crops);

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});


// ✅ DELETE CROP
router.delete("/crop/:id", auth, admin, async (req, res) => {
  try {

    await Crop.findByIdAndDelete(req.params.id);

    res.json({
      message: "Crop deleted successfully",
    });

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});


// ✅ GET ALL CONTRACTS
router.get("/contracts", auth, admin, async (req, res) => {
  try {

    const contracts = await Contract.find()
      .populate("cropId")
      .populate("buyerId", "name")
      .populate("farmerId", "name");

    res.json(contracts);

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

module.exports = router;*/
const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {
  getAllUsers,
  getAllCrops,
  deleteCrop,
  getAllContracts,
  getStats,
} = require("../controllers/adminController");


// ✅ USERS
router.get("/users", auth, admin, getAllUsers);

// ✅ CROPS
router.get("/crops", auth, admin, getAllCrops);

// ✅ DELETE CROP
router.delete("/crop/:id", auth, admin, deleteCrop);

// ✅ CONTRACTS
router.get("/contracts", auth, admin, getAllContracts);

// ✅ ADMIN STATS
router.get("/stats", auth, admin, getStats);

module.exports = router;