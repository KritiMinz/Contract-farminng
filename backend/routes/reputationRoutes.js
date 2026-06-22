const express = require("express");
const router = express.Router();

const {
  getFarmerReputation,
} = require("../controllers/reputationController");

router.get("/:id", getFarmerReputation);

module.exports = router;