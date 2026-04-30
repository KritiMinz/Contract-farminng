const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ 1. Middleware FIRST
app.use(cors());
app.use(express.json());

// ✅ 2. Routes AFTER middleware
const authRoutes = require("./routes/authRoutes");
const cropRoutes = require("./routes/cropRoutes");
const contractRoutes = require("./routes/contractRoutes");

app.use("/api/contracts", contractRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/crops", cropRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Connect DB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Start server
app.listen(5000, () => console.log("Server running on port 5000"));