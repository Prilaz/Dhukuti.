// backend/routes/about.js
const express = require("express");
const router = express.Router();
const AboutTeam = require("../models/AboutTeam");
const AboutGallery = require("../models/AboutGallery");

// GET team members
router.get("/team", async (req, res) => {
  try {
    const team = await AboutTeam.find();
    res.json(team);
  } catch (err) {
    res.status(500).json({ message: "Server error while fetching team data" });
  }
});

// POST team member
router.post("/team", async (req, res) => {
  try {
    const { name, role, image } = req.body;
    const newMember = new AboutTeam({ name, role, image });
    await newMember.save();
    res.status(201).json(newMember);
  } catch (err) {
    res.status(400).json({ message: "Error creating team member" });
  }
});

// GET gallery images
router.get("/gallery", async (req, res) => {
  try {
    const gallery = await AboutGallery.find();
    res.json(gallery.map((g) => g.image));
  } catch (err) {
    res.status(500).json({ message: "Server error while fetching gallery" });
  }
});

// POST gallery image
router.post("/gallery", async (req, res) => {
  try {
    const { image } = req.body;
    const newImage = new AboutGallery({ image });
    await newImage.save();
    res.status(201).json(newImage);
  } catch (err) {
    res.status(400).json({ message: "Error uploading gallery image" });
  }
});

module.exports = router;
