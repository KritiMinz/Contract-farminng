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
      description,

      // 🔥 ADD THIS LINE (IMPORTANT)
      imageUrl: req.file ? req.file.path : null,
    });

    await crop.save();

    res.status(201).json({
      message: "Crop added successfully",
      crop
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
// Get all crops
exports.getCrops = async (req, res) => {
  try {
    const { search, location, minPrice, maxPrice } = req.query;

    let filter = {};

    // 🔍 Search by crop name
    if (search) {
      filter.cropName = { $regex: search, $options: "i" };
    }

    // 📍 Filter by location
    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }

    // 💰 Price range filter
    if (minPrice || maxPrice) {
      filter.pricePerUnit = {};

      if (minPrice) filter.pricePerUnit.$gte = Number(minPrice);
      if (maxPrice) filter.pricePerUnit.$lte = Number(maxPrice);
    }

    const crops = await Crop.find(filter);

    res.json(crops);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Crop
exports.updateCrop = async (req, res) => {
  try {

    const crop = await Crop.findById(req.params.id);

    if (!crop) {
      return res.status(404).json({
        message: "Crop not found",
      });
    }

    if (crop.farmerId.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    const updatedCrop = await Crop.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedCrop);

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });

  }
};

// Delete Crop
exports.deleteCrop = async (req, res) => {
  try {

    const crop = await Crop.findById(req.params.id);

    if (!crop) {
      return res.status(404).json({
        message: "Crop not found",
      });
    }

    if (crop.farmerId.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

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