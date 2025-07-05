const express = require("express");
const Product = require("../models/Product");
const { upload } = require("../middleware/upload");
const verifyToken = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");

const router = express.Router();

// ADD PRODUCT — Only admin
router.post(
  "/",
  verifyToken,
  isAdmin,
  upload.single("image"),
  async (req, res) => {
    const { title, price, category } = req.body;
    const image = `/uploads/${req.file.filename}`;
    const product = new Product({ title, price, category, image });
    await product.save();
    res.status(201).json({ product });
  }
);

// GET ALL PRODUCTS — Public
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// DELETE PRODUCT — Only admin
router.delete("/:id", verifyToken, isAdmin, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
