const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,

  email: {
    type: String,
    unique: true,
  },

  password: String,

  role: {
    type: String,
    enum: ["farmer", "buyer", "admin"],
  },

  location: {
    type: String,
    default: "",
  },

  phone: {
    type: String,
    default: "",
  },

  address: {
    type: String,
    default: "",
  },

  bio: {
    type: String,
    default: "",
  },

  profileImage: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("User", userSchema);