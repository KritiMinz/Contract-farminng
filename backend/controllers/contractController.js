const Contract = require("../models/Contract");
const Crop = require("../models/Crop");

// 🟢 Create Contract (Buyer)
exports.createContract = async (req, res) => {
  try {
    const { cropId, quantity, price } = req.body;

    const crop = await Crop.findById(cropId);
    if (!crop) return res.status(404).json({ message: "Crop not found" });

    const contract = new Contract({
      cropId,
      farmerId: crop.farmerId,
      buyerId: req.user.id,
      quantity,
      price
    });

    await contract.save();

    res.status(201).json({ message: "Contract request sent" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// 🔵 Get Contracts (Farmer or Buyer)
exports.getContracts = async (req, res) => {
  try {
    const userId = req.user.id;
    const role = req.user.role;

    let contracts;

    if (role === "farmer") {
      // Farmer sees only contracts for their crops
      contracts = await Contract.find({ farmerId: userId })
        .populate("cropId")
        .populate("buyerId", "name");
    } else if (role === "buyer") {
      // Buyer sees only their requests
      contracts = await Contract.find({ buyerId: userId })
        .populate("cropId")
        .populate("farmerId", "name");
    }

    res.json(contracts);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// 🟡 Update Contract Status (Farmer only)
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const contract = await Contract.findById(req.params.id);

    if (!contract) return res.status(404).json({ message: "Contract not found" });

    // Only farmer can update
    if (contract.farmerId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    contract.status = status;
    await contract.save();

    res.json({ message: "Contract updated" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 💳 Mark as Paid (Buyer)
exports.makePayment = async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id);

    if (!contract) {
      return res.status(404).json({ message: "Contract not found" });
    }

    // Only buyer can pay
    if (contract.buyerId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    contract.paymentStatus = "paid";
    await contract.save();

    res.json({ message: "Payment successful" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};