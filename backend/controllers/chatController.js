const Message = require("../models/Message");

// Get chat history
exports.getMessages = async (req, res) => {
  try {

    const myId = req.user.id;
    const otherUserId = req.params.userId;

    const messages = await Message.find({
      $or: [
        {
          senderId: myId,
          receiverId: otherUserId,
        },
        {
          senderId: otherUserId,
          receiverId: myId,
        },
      ],
    }).sort({ createdAt: 1 });

    res.json(messages);

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};