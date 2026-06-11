const User = require("../models/User");
const Crop = require("../models/Crop");
const Contract = require("../models/Contract");


// ✅ Get All Users
exports.getAllUsers = async (req, res) => {
  try {

    const users = await User.find();

    res.json(users);

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });

  }
};


// ✅ Get All Crops
exports.getAllCrops = async (req, res) => {
  try {

    const crops = await Crop.find()
      .populate("farmerId", "name");

    res.json(crops);

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });

  }
};


// ✅ Delete Crop
exports.deleteCrop = async (req, res) => {
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
};


// ✅ Get All Contracts
exports.getAllContracts = async (req, res) => {
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
};

// ✅ ADMIN STATS
exports.getStats = async (req, res) => {
  try {

    const totalUsers = await User.countDocuments();

    const totalCrops = await Crop.countDocuments();

    const totalContracts = await Contract.countDocuments();

    const acceptedContracts = await Contract.countDocuments({
      status: "accepted",
    });

    const paidContracts = await Contract.find({
      paymentStatus: "paid",
    });

    let totalRevenue = 0;

    paidContracts.forEach((contract) => {
      totalRevenue += contract.price || 0;
    });

    res.json({
      totalUsers,
      totalCrops,
      totalContracts,
      acceptedContracts,
      totalRevenue,
    });

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};