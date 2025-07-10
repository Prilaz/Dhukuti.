const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const verifyToken = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");
const upload = require("../middleware/upload");

// @route   POST /api/products
// @desc    Add new product (Admin only)
// @access  Private
router.post(
  "/",
  verifyToken,
  isAdmin,
  upload.single("image"),
  async (req, res) => {
    try {
      const { title, price, category } = req.body;

      // Validate required fields
      if (!title || !price || !category || !req.file) {
        return res
          .status(400)
          .json({ message: "All fields and image are required." });
      }

      const image = `/uploads/${req.file.filename}`;
      const product = new Product({ title, price, category, image });
      await product.save();

      res.status(201).json({ message: "Product added successfully", product });
    } catch (error) {
      console.error("Add Product Error:", error);
      res.status(500).json({ message: "Server error while adding product." });
    }
  }
);

// @route   GET /api/products
// @desc    Get all products (Public)
// @access  Public
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    console.error("Get Products Error:", error);
    res.status(500).json({ message: "Failed to fetch products." });
  }
});

// @route   DELETE /api/products/:id
// @desc    Delete a product (Admin only)
// @access  Private
router.delete("/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting product", error: err });
  }
});

// PUT /api/products/:id
router.put("/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body, // updates the title, price, category
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err });
  }
});

module.exports = router;
