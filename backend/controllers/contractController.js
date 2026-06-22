const Contract = require("../models/Contract");
const Crop = require("../models/Crop");
const { createOrder } = require("../controllers/contractController");


// 🔥 Razorpay import
const Razorpay = require("razorpay");

// 🔥 Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
const Review = require("../models/Review");



// 🟢 Create Contract (Buyer)
exports.createContract = async (req, res) => {
  try {
    const { cropId, quantity } = req.body;

    const crop = await Crop.findById(cropId);
    if (!crop) return res.status(404).json({ message: "Crop not found" });

    const contract = new Contract({
      cropId,
      farmerId: crop.farmerId,
      buyerId: req.user.id,
      quantity,
      price: crop.pricePerUnit * quantity // 🔥 FIX
    });

    await contract.save();

    res.status(201).json({ message: "Contract request sent" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// 🔵 Get Contracts
exports.getContracts = async (req, res) => {
  try {
    const userId = req.user.id;
    const role = req.user.role;

    let contracts;

    if (role === "farmer") {
      contracts = await Contract.find({ farmerId: userId })
        .populate("cropId")
        .populate("buyerId", "name");

    } else if (role === "buyer") {
  contracts = await Contract.find({ buyerId: userId })
    .populate("cropId")
    .populate({
      path: "farmerId",
      model: "User",
      select: "_id name email"
    });

  console.log(
    "BUYER CONTRACTS:",
    JSON.stringify(contracts, null, 2)
  );
} else {
      return res.status(403).json({ message: "Invalid role" });
    }

    console.log("CONTRACTS DATA:");
console.log(JSON.stringify(contracts, null, 2));
    res.json(contracts);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🟡 Update Status (Farmer)
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const contract = await Contract.findById(req.params.id);

    if (!contract)
      return res.status(404).json({ message: "Contract not found" });

    if (contract.farmerId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    contract.status = status;
    await contract.save();

    // ✅ EMIT ONLY AFTER SUCCESS
    if (status === "accepted") {
      global.io.to(contract.buyerId.toString()).emit("contractAccepted", {
  message: "Your contract was accepted ✅",
});
    }

    res.json({ message: "Contract updated" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔥 💳 CREATE ORDER (NEW)
exports.createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // convert to paise
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    res.json(order);

  } catch (err) {
    console.error(err);
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

    if (contract.buyerId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // 🔥 Only allow if accepted
    if (contract.status !== "accepted") {
      return res.status(400).json({ message: "Contract not accepted yet" });
    }

    contract.paymentStatus = "paid";
    await contract.save();

    // ✅ EMIT ONLY AFTER SUCCESS
    global.io.to(contract.farmerId.toString()).emit("paymentDone", {
  message: "Payment received 💳",
});

    res.json({ message: "Payment successful" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🚚 Update Delivery Status
exports.updateDeliveryStatus = async (req, res) => {
  try {

    const { deliveryStatus } = req.body;

    const contract = await Contract.findById(
      req.params.id
    );

    if (!contract) {
      return res.status(404).json({
        message: "Contract not found",
      });
    }

    if (
      contract.farmerId.toString() !==
      req.user.id
    ) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    contract.deliveryStatus =
      deliveryStatus;

    await contract.save();

    global.io
      .to(contract.buyerId.toString())
      .emit("deliveryUpdate", {
        deliveryStatus,
      });

    res.json({
      message:
        "Delivery status updated",
    });

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });

  }
};

// 📊 Farmer Statistics
exports.getFarmerStats = async (req, res) => {
  try {

    const farmerId = req.params.farmerId;

    const totalContracts =
      await Contract.countDocuments({
        farmerId,
      });

    const completedContracts =
      await Contract.countDocuments({
        farmerId,
        paymentStatus: "paid",
      });

    const earningsData =
      await Contract.find({
        farmerId,
        paymentStatus: "paid",
      });

    const totalEarnings =
      earningsData.reduce(
        (sum, contract) => sum + contract.price,
        0
      );

    const totalCrops =
      await Crop.countDocuments({
        farmerId,
      });

    res.json({
      totalContracts,
      completedContracts,
      totalEarnings,
      totalCrops,
    });

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });

  }
};

exports.getDashboardStats = async (req, res) => {
  try {

    const userId = req.user.id;
    const role = req.user.role;

    // FARMER
    if (role === "farmer") {

      const Crop = require("../models/Crop");

      const totalCrops =
        await Crop.countDocuments({
          farmerId: userId,
        });

      const totalContracts =
        await Contract.countDocuments({
          farmerId: userId,
        });

      const paidContracts =
        await Contract.find({
          farmerId: userId,
          paymentStatus: "paid",
        });

        console.log("USER:", userId);
console.log("PAID CONTRACTS:", paidContracts);

      {/*const earnings =
        paidContracts.reduce(
          (sum, c) => sum + c.price,
          0
        );*/}
        const earnings =
  paidContracts.reduce(
    (sum, c) => sum + (c.price || 0),
    0
  );
        console.log("EARNINGS:", earnings);

      const reviews =
        await Review.find({
          farmerId: userId,
        });

      const rating =
        reviews.length > 0
          ? (
              reviews.reduce(
                (sum, r) => sum + r.rating,
                0
              ) / reviews.length
            ).toFixed(1)
          : 0;

      return res.json({
        totalCrops,
        totalContracts,
        earnings,
        rating,
      });
    }

    // BUYER
    if (role === "buyer") {

      const orders =
        await Contract.countDocuments({
          buyerId: userId,
        });

      const paidContracts =
        await Contract.find({
          buyerId: userId,
          paymentStatus: "paid",
        });

      {/*const totalSpent =
        paidContracts.reduce(
          (sum, c) => sum + c.price,
          0
        );*/}

        console.log("BUYER USER:", userId);

console.log("PAID CONTRACTS:", paidContracts);
        const totalSpent =
  paidContracts.reduce(
    (sum, c) => sum + (c.price || 0),
    0
  );

  console.log("TOTAL SPENT:",totalSpent);

      const reviewsGiven =
        await Review.countDocuments({
          buyerId: userId,
        });

      return res.json({
        orders,
        totalSpent,
        reviewsGiven,
      });
    }

    res.json({});

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });

  }
};