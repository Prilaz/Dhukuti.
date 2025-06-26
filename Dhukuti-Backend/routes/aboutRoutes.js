// routes/aboutRoutes.js
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "About route from router works!" });
});

module.exports = router;
