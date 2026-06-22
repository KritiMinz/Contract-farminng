const express = require("express");

const router = express.Router();

router.post("/", (req, res) => {

  const currentPrice =
    Number(req.body.currentPrice);

  const growth =
    Math.floor(Math.random() * 25);

  const predictedPrice =
    currentPrice +
    (currentPrice * growth / 100);

  res.json({
    currentPrice,
    predictedPrice:
      predictedPrice.toFixed(2),
    growth,
  });

});

module.exports = router;