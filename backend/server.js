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
app.get('/api/pharmacies', (req, res) => {
  res.json([
    { 
      id: 1, 
      name: "24/7 Pharmacy", 
      location: { coordinates: [-0.2, 5.6] } 
    },
    { 
      id: 2, 
      name: "HealthPlus", 
      location: { coordinates: [-0.19, 5.59] } 
    }
  ]);
});
const Pharmacy = require('./models/Pharmacy');

// Get all pharmacies
app.get('/api/pharmacies', async (req, res) => {
  try {
    const pharmacies = await Pharmacy.find();
    res.json(pharmacies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new pharmacy (for testing)
app.post('/api/pharmacies', async (req, res) => {
  const { name, lat, lng } = req.body;
  const newPharmacy = new Pharmacy({
    name,
    location: { coordinates: [lng, lat] },
  });
  await newPharmacy.save();
  res.status(201).json(newPharmacy);
});