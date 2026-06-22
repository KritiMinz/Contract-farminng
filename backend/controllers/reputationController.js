const Contract = require("../models/Contract");
const Review = require("../models/Review");

exports.getFarmerReputation = async (req, res) => {
  try {
    const farmerId = req.params.id;

    // Total contracts
    const totalContracts = await Contract.countDocuments({
      farmerId,
    });

    // Accepted contracts
    const completedContracts = await Contract.countDocuments({
      farmerId,
      status: "accepted",
    });

    // Success Rate
    const successRate =
      totalContracts === 0
        ? 0
        : (completedContracts / totalContracts) * 100;

    // Reviews
    const reviews = await Review.find({ farmerId });

    const averageRating =
      reviews.length === 0
        ? 0
        : reviews.reduce(
            (sum, r) => sum + r.rating,
            0
          ) / reviews.length;

    // Trust Score
    // Prevent contract score from growing indefinitely
const contractScore = Math.min(
  completedContracts,
  100
);

const trustScore = Math.round(
  contractScore * 0.4 +
  successRate * 0.4 +
  (averageRating * 20) * 0.2
);

    res.json({
      averageRating: averageRating.toFixed(1),
      completedContracts,
      successRate: successRate.toFixed(1),
      trustScore,
    });

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};