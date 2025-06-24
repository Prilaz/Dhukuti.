// routes/productRoutes.js
import express from "express";
import Product from "../models/Product.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

// POST: Add Product
router.post("/", upload.single("image"), async (req, res) => {
  const { title, price, category } = req.body;
  const image = `/uploads/${req.file.filename}`;

  const product = new Product({ title, price, category, image });
  await product.save();

  res.status(201).json({ product });
});

// GET: All Products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// DELETE: Product
router.delete("/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;
