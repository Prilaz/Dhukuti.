const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");

// POST /api/cart - Add item to cart
router.post("/", async (req, res) => {
  try {
    const { productId, quantity, title, image, price, userId } = req.body;
    if (!productId || !quantity || !userId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const cartItem = new Cart({
      productId,
      quantity,
      title,
      image,
      price,
      userId,
    });
    await cartItem.save();
    res.status(201).json(cartItem);
  } catch (err) {
    res.status(500).json({ error: "Failed to add to cart" });
  }
});

module.exports = router;
