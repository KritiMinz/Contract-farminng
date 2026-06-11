const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
  getMessages,
} = require("../controllers/chatController");

router.get("/:userId", auth, getMessages);

module.exports = router;