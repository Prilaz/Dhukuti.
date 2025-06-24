// backend/routes/about.js
const express = require("express");
const router = express.Router();

// Dummy data (you can replace this with MongoDB or any database later)
const team = [
  {
    name: "Prilaz Shrestha",
    role: "Founder & Developer",
    image: "/images/team1.jpg",
  },
  {
    name: "Yachu Shrestha",
    role: "Founder & Developer",
    image: "/images/team2.jpg",
  },
  {
    name: "Sujata Karki",
    role: "Contributing Artist",
    image: "/images/team3.jpg",
  },
];

const gallery = [
  "/images/gallery1.jpg",
  "/images/gallery2.jpg",
  "/images/gallery3.jpg",
  "/images/gallery4.jpg",
];

// Routes
router.get("/team", (req, res) => {
  res.json(team);
});

router.get("/gallery", (req, res) => {
  res.json(gallery);
});

module.exports = router;
