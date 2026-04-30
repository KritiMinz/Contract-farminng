const Crop = require("../models/Crop");

// Add Crop
exports.addCrop = async (req, res) => {
  try {
    const { cropName, quantity, pricePerUnit, location, description } = req.body;

    const crop = new Crop({
      farmerId: req.user.id,
      cropName,
      quantity,
      pricePerUnit,
      location,
      description
    });

    await crop.save();

    res.status(201).json({ message: "Crop added successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Get all crops
exports.getCrops = async (req, res) => {
  try {
    const crops = await Crop.find().populate("farmerId", "name location");
    res.json(crops);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};