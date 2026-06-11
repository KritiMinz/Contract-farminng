/*const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dxoehxtol",
  api_key: "866118797572178",
  api_secret: "tmemDGeSXDybl1v7JSW_c8E8iYk",
});

module.exports = cloudinary;*/
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

module.exports = cloudinary;