const express = require("express");
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ POST /api/orders → Place order
router.post("/", verifyToken, async (req, res) => {
  try {
    const { shippingAddress } = req.body;

    // Get user's cart
    const cart = await Cart.findOne({ userId: req.user.id }).populate(
      "items.productId"
    );

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Your cart is empty" });
    }

    // Create order
    const newOrder = new Order({
      userId: req.user.id,
      items: cart.items,
      shippingAddress,
    });

    await newOrder.save();

    // Clear cart
    cart.items = [];
    await cart.save();

    res
      .status(201)
      .json({ message: "Order placed successfully", order: newOrder });
  } catch (err) {
    console.error("Order creation error:", err);
    res.status(500).json({ message: "Failed to place order" });
  }
});

// ✅ GET /api/orders → Get user's order history
router.get("/", verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).populate(
      "items.productId"
    );
    res.status(200).json(orders);
  } catch (err) {
    console.error("Order fetch error:", err);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

module.exports = router;
