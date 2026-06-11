/*const mongoose = require("mongoose");

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

  // 🔥 ADD THIS
  imageUrl: String,

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Crop", cropSchema);*/
const mongoose = require("mongoose");

const cropSchema = new mongoose.Schema({
  cropName: String,
  quantity: Number,
  pricePerUnit: Number,
  location: String,
  description: String,

  // 🔥 ADD THIS LINE
  imageUrl: String,

  farmerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Crop", cropSchema);