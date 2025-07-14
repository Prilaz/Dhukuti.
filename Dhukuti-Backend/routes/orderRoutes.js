const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware"); // your JWT auth middleware
const isAdmin = require("../middleware/isAdmin");
const Order = require("../models/Order");

// POST create order
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { items, total, address, contactNumber, paymentMethod } = req.body;
    const userId = req.user._id;

    if (
      !items ||
      !items.length ||
      !total ||
      !address ||
      !contactNumber ||
      !paymentMethod
    ) {
      return res.status(400).json({ message: "Missing order data" });
    }

    const newOrder = new Order({
      userId,
      items,
      total,
      address,
      contactNumber,
      paymentMethod,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error placing order" });
  }
});

// GET all orders (admin only)
router.get("/admin", authMiddleware, isAdmin, async (req, res) => {
  try {
    // Get all orders, populate product and user info
    const orders = await Order.find()
      .populate("items.productId", "title price image")
      .populate("userId", "email name");

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching orders" });
  }
});

router.put("/:id/mark-on-way", authMiddleware, isAdmin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = "on its way";
    await order.save();

    res.json({ message: "Order updated to 'on its way'" });
  } catch (err) {
    res.status(500).json({ message: "Failed to update order status" });
  }
});

// DELETE /api/orders/:id (admin only)
router.delete("/:id", authMiddleware, isAdmin, async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Failed to delete order" });
  }
});

module.exports = router;
