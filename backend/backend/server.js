const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/sleekpharmacy')
  .then(() => console.log("MongoDB Connected!"))
  .catch(err => console.log("MongoDB Error:", err));

// Test Route
app.get("/", (req, res) => res.send("Backend is running!"));

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));