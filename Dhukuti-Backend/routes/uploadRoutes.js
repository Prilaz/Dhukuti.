import express from "express";
import multer from "multer";
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

router.post("/", upload.single("image"), (req, res) => {
  res
    .status(200)
    .json({ url: `http://localhost:5000/uploads/${req.file.filename}` });
});

export default router;
