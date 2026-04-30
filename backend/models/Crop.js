const mongoose = require("mongoose");

const cropSchema = new mongoose.Schema({
  farmerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  cropName: String,
  quantity: Number,
  pricePerUnit: Number,
  location: String,
  description: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Crop", cropSchema);