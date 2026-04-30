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
  createdAt: {
    type: Date,
    default: Date.now
  },
  paymentStatus: {
  type: String,
  enum: ["pending", "paid"],
  default: "pending"
}
});

module.exports = mongoose.model("Contract", contractSchema);