const express = require("express");
const router = express.Router();

const {
  addCrop,
  getCrops,
  updateCrop,
  deleteCrop,
} = require("../controllers/cropController");
const auth = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

// ✅ Add crop with image upload
router.post("/", auth, upload.single("image"), addCrop);

// 🔥 VERY IMPORTANT: put this BEFORE "/"
router.get("/farmer/:id", async (req, res) => {
  try {
    const Crop = require("../models/Crop");

    const crops = await Crop.find({
      farmerId: req.params.id,
    });

    res.json(crops);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get crops (with filters)
router.get("/", getCrops);
// Update Crop
router.put("/:id", auth, updateCrop);
// Delete Crop
router.delete("/:id", auth, deleteCrop);

module.exports = router;