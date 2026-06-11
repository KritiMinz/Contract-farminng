const mongoose = require("mongoose");

const contractSchema = new mongoose.Schema({
  cropId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Crop"
  },
  farmerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  quantity: Number,
  price: Number,

  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending"
  },

  paymentStatus: {
    type: String,
    enum: ["pending", "paid"],
    default: "pending"
  },

  // 🔥 NEW FIELDS (IMPORTANT)
  razorpayOrderId: String,
  razorpayPaymentId: String,
  paidAt: Date,

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Contract", contractSchema);