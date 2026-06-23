const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// 🔥 NEW IMPORTS
const http = require("http");
const { Server } = require("socket.io");

const app = express();

// ✅ 1. Middleware
app.use(cors());
app.use(express.json());

// ✅ 2. Routes
const authRoutes = require("./routes/authRoutes");
const cropRoutes = require("./routes/cropRoutes");
const contractRoutes = require("./routes/contractRoutes");
const adminRoutes = require("./routes/adminRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");
const chatRoutes = require("./routes/chatRoutes");
const Message = require("./models/Message");
const userRoutes = require("./routes/userRoutes");
const reputationRoutes = require("./routes/reputationRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/crops", cropRoutes);
app.use("/api/contracts", contractRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/invoice", invoiceRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reputation", reputationRoutes);
app.use("/api/prediction", require("./routes/predictionRoutes"));

// ✅ Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// 🔥 CREATE HTTP SERVER
const server = http.createServer(app);

// 🔥 SOCKET.IO SETUP
const io = new Server(server, {
  cors: {
    origin: [
      "https://contract-farminng-vyss.vercel.app"
    ],
    methods: ["GET", "POST"],
  },
});
// 🔥 MAKE GLOBAL (important)
global.io = io;

// 🔌 CONNECTION
io.on("connection", (socket) => {

  console.log("User connected:", socket.id);

  // Join user's room
  socket.on("join", (userId) => {

    socket.join(userId);

    console.log("User joined room:", userId);

  });

  // 🔥 Send Chat Message
  socket.on("sendMessage", async (data) => {

  console.log("================================");
  console.log("MESSAGE RECEIVED");
  console.log(data);
  console.log("================================");

  try {

    const message = await Message.create({
      senderId: data.senderId,
      receiverId: data.receiverId,
      text: data.text,
    });

    console.log("MESSAGE SAVED:", message);

    io.to(data.receiverId).emit(
      "newMessage",
      message
    );
    console.log(
  "SENDING TO ROOM:",
  data.receiverId
);

  } catch (err) {

    console.log("CHAT ERROR:", err);

  }

});

  socket.on("disconnect", () => {

    console.log("User disconnected:", socket.id);

  });

});

// ✅ DB CONNECTION
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// ❗ IMPORTANT: use server.listen NOT app.listen
server.listen(5000, () => {
  console.log("Server running on port 5000");
});