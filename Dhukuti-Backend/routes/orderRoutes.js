const express = require("express");
const Order = require("../models/Order");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

// Place order
router.post("/", verifyToken, async (req, res) => {
  const { items, totalPrice } = req.body;

  const order = new Order({
    userId: req.user.id,
    items,
    totalPrice,
  });

  await order.save();
  res.status(201).json({ message: "Order placed", order });
});

// Get order history
router.get("/history", verifyToken, async (req, res) => {
  const orders = await Order.find({ userId: req.user.id }).sort({
    createdAt: -1,
  });
  res.json(orders);
});

module.exports = router;
