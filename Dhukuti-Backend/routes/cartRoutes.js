const express = require("express");
const Cart = require("../models/Cart");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", verifyToken, async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id }).populate(
    "items.productId"
  );
  res.json(cart || { items: [] });
});

router.post("/add", verifyToken, async (req, res) => {
  const { productId, quantity } = req.body;

  let cart = await Cart.findOne({ userId: req.user.id });
  if (!cart) {
    cart = new Cart({ userId: req.user.id, items: [] });
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
  res.json(cart);
});

router.post("/remove", verifyToken, async (req, res) => {
  const { productId } = req.body;
  const cart = await Cart.findOne({ userId: req.user.id });
  if (cart) {
    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );
    await cart.save();
    res.json(cart);
  } else {
    res.status(404).json({ message: "Cart not found" });
  }
});

module.exports = router;
