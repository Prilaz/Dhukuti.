const express = require("express");
const Cart = require("../models/Cart");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ GET /api/cart → Get current user's cart
router.get("/", verifyToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate(
      "items.productId"
    );

    if (!cart) return res.status(200).json({ items: [] }); // Empty cart

    res.status(200).json(cart);
  } catch (err) {
    console.error("Get cart error:", err);
    res.status(500).json({ message: "Failed to fetch cart" });
  }
});

// ✅ POST /api/cart/add → Add item to user's cart
router.post("/add", verifyToken, async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      cart = new Cart({
        userId: req.user.id,
        items: [{ productId, quantity }],
      });
    } else {
      const index = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (index >= 0) {
        cart.items[index].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    console.error("Add to cart error:", err);
    res.status(500).json({ message: "Failed to add to cart" });
  }
});

// ✅ DELETE /api/cart/remove/:productId → Remove item
router.delete("/remove/:productId", verifyToken, async (req, res) => {
  try {
    const { productId } = req.params;
    const cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    console.error("Remove cart item error:", err);
    res.status(500).json({ message: "Failed to remove item" });
  }
});

module.exports = router;
