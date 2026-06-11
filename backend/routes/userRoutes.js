const express = require("express");
const router = express.Router();
const User = require("../models/User");

// GET My Profile
router.get("/me/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// UPDATE My Profile
router.put("/me/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(user);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;