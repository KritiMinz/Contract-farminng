const Review = require("../models/Review");


// ✅ ADD REVIEW
exports.addReview = async (req, res) => {
  try {

    const { farmerId, rating, comment } = req.body;

    const review = new Review({
      farmerId,
      buyerId: req.user.id,
      rating,
      comment,
    });

    await review.save();

    res.status(201).json({
      message: "Review added successfully",
    });

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });

  }
};


// ✅ GET FARMER REVIEWS
exports.getFarmerReviews = async (req, res) => {
  try {

    const reviews = await Review.find({
      farmerId: req.params.id,
    }).populate("buyerId", "name");

    res.json(reviews);

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });

  }
};

// ✅ GET FARMER RATING STATS
exports.getFarmerStats = async (req, res) => {
  try {

    const reviews = await Review.find({
      farmerId: req.params.id,
    });

    const totalReviews = reviews.length;

    const averageRating =
      totalReviews === 0
        ? 0
        : reviews.reduce(
            (sum, review) => sum + review.rating,
            0
          ) / totalReviews;

    res.json({
      averageRating:
        averageRating.toFixed(1),
      totalReviews,
    });

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });

  }
};