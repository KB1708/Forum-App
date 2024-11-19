// Import required packages
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// Load environment variables from .env
dotenv.config();

// Initialize Express app
const app = express();

// Middleware to parse JSON
app.use(express.json());

const authRoutes = require("D:\\Web App Projects\\PyWebDev_MiniProject\\forum-app\\backend\\routes\\auth.js");

app.use("/auth", authRoutes);

const postRoutes = require("D:\\Web App Projects\\PyWebDev_MiniProject\\forum-app\\backend\\routes\\posts.js");

app.use("/posts", postRoutes);


// MongoDB connection setup
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1);
  });

// Define a test route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the Forum App API!" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start the server on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
