const Review = require("../models/Review");
const Contract = require("../models/Contract");


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
    const farmerId = req.params.id;

    // Reviews
    const reviews = await Review.find({
      farmerId,
    });

    const totalReviews = reviews.length;

    const averageRating =
      totalReviews === 0
        ? 0
        : reviews.reduce(
            (sum, r) => sum + r.rating,
            0
          ) / totalReviews;

    // Contracts
    const contracts = await Contract.find({
      farmerId,
    });

    const completedContracts =
      contracts.filter(
        (c) => c.paymentStatus === "paid"
      ).length;

    const acceptedContracts =
      contracts.filter(
        (c) => c.status === "accepted"
      ).length;

    const successRate =
      contracts.length === 0
        ? 0
        : (
            (acceptedContracts /
              contracts.length) *
            100
          );

    // Trust Score
    const trustScore = Math.min(
      100,
      (
        completedContracts * 0.4 +
        successRate * 0.4 +
        averageRating * 20 * 0.2
      ).toFixed(0)
    );

    res.json({
      averageRating:
        averageRating.toFixed(1),

      totalReviews,

      completedContracts,

      successRate:
        successRate.toFixed(1),

      trustScore,
    });

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};