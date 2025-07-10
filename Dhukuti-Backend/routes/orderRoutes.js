const express = require("express");
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const verifyToken = require("../middleware/authMiddleware");
const sendOrderEmail = require("../utils/sendOrderEmail"); // Make sure this exists

const router = express.Router();

router.post("/", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { paymentMethod } = req.body;

    console.log("➡️ Order Attempt from:", req.user.email);
    console.log("➡️ Payment Method:", paymentMethod);

    if (!["cod", "online"].includes(paymentMethod)) {
      return res.status(400).json({ message: "Invalid payment method" });
    }

    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    console.log("🧾 CART FOUND:", JSON.stringify(cart, null, 2));

    // Filter out any cart items with missing/deleted products
    const validItems = cart.items.filter((item) => item.productId);

    if (validItems.length === 0) {
      return res
        .status(400)
        .json({ message: "All items in your cart are invalid or removed" });
    }

    const total = validItems.reduce((sum, item) => {
      const price = item.productId?.price || 0;
      return sum + item.quantity * price;
    }, 0);

    const order = new Order({
      userId,
      items: validItems,
      total,
      paymentMethod,
    });

    await order.save();

    // Clear the cart
    cart.items = [];
    await cart.save();

    // Optional email
    try {
      await sendOrderEmail(req.user.email, order);
    } catch (emailErr) {
      console.warn("📧 Email send failed:", emailErr.message);
    }

    console.log("✅ Order placed successfully");
    res.status(201).json({ message: "Order placed", order });
  } catch (error) {
    console.error("🔥 Order route crashed:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
