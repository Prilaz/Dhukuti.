const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// POST /api/products/filter
router.post("/filter", async (req, res) => {
  try {
    const { categories = [], price = [0, 100000] } = req.body;

    const filter = {
      price: { $gte: price[0], $lte: price[1] },
    };

    if (categories.length > 0) {
      filter.category = { $in: categories };
    }

    const products = await Product.find(filter);

    res.status(200).json(products);
  } catch (error) {
    console.error("Filter error:", error);
    res.status(500).json({ message: "Server error while filtering products" });
  }
});

module.exports = router;
