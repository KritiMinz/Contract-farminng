const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
  addReview,
  getFarmerReviews,
  getFarmerStats,
} = require("../controllers/reviewController");


// ✅ Add review
router.post("/", auth, addReview);
router.get("/stats/:id", getFarmerStats);

// ✅ Get farmer reviews
router.get("/:id", getFarmerReviews);

module.exports = router;