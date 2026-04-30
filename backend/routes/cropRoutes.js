const express = require("express");
const router = express.Router();
const { addCrop, getCrops } = require("../controllers/cropController");
const auth = require("../middleware/authMiddleware");

router.post("/", auth, addCrop);
router.get("/", getCrops);

module.exports = router;