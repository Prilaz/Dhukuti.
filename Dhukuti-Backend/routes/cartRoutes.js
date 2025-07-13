const express = require("express");
const Cart = require("../models/Cart");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Get Cart
router.get("/", verifyToken, async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id }).populate(
    "items.productId"
  );
  res.json(cart || { items: [] });
});

// ✅ Add to Cart
router.post("/add", verifyToken, async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.json({ message: "Item added to cart", cart });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/remove", verifyToken, async (req, res) => {
  const { productId } = req.body;
  const cart = await Cart.findOne({ user: req.user.id });

  if (cart) {
    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );
    await cart.save();
    res.json({ message: "Item removed", cart });
  } else {
    res.status(404).json({ message: "Cart not found" });
  }
});

router.delete("/clear", verifyToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = [];
    await cart.save();

    res.status(200).json({ message: "Cart cleared" });
  } catch (err) {
    console.error("Error clearing cart:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = router;
