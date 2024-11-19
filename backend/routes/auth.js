const express = require("express");
const bcrypt = require("bcrypt");
const User = require("D:\\Web App Projects\\PyWebDev_MiniProject\\forum-app\\backend\\models\\User.js"); // Import the User model

const router = express.Router();

// Register User
router.post("/register", async (req, res) => {
  console.log("Request body:", req.body); // Debugging: Log the request body
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    console.error("Error during registration:", err.message); // Log any errors
    res.status(400).json({ error: err.message });
  }
});


const jwt = require("jsonwebtoken");

// Login User
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found!" });

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ error: "Invalid password!" });

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
