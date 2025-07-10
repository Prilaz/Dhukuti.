// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const verifyToken = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");

// POST - Create product
router.post("/", verifyToken, isAdmin, async (req, res) => {
  try {
    const { title, price, category } = req.body;
    const product = new Product({ title, price, category });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: "Failed to add product" });
  }
});

// GET - Public
router.get("/", async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
});

// DELETE - Admin Only
router.delete("/:id", verifyToken, isAdmin, async (req, res) => {
  const deleted = await Product.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Not found" });
  res.json({ message: "Product deleted" });
});

// PUT - Admin Only
router.put("/:id", verifyToken, isAdmin, async (req, res) => {
  const updated = await Product.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );

  if (!updated) return res.status(404).json({ message: "Not found" });
  res.json(updated);
});

module.exports = router;
