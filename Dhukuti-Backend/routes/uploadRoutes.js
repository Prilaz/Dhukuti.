const express = require("express");
const multer = require("multer");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

router.post("/", upload.single("image"), (req, res) => {
  res.status(200).json({
    url: `http://localhost:5000/uploads/${req.file.filename}`,
  });
});

module.exports = router; // ✅ export in CommonJS
