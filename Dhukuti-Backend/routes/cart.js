const express = require("express");
const Cart = require("../models/Cart");
const router = express.Router();

router.get("/", async (req, res) => {
  const cart = await Cart.findOne({});
  res.json(cart || { items: [] });
});

router.post("/add", async (req, res) => {
  const { productId, quantity } = req.body;
  let cart = await Cart.findOne({});
  if (!cart) cart = new Cart({ items: [] });

  const index = cart.items.findIndex(
    (i) => i.productId.toString() === productId
  );
  if (index >= 0) {
    cart.items[index].quantity += quantity;
  } else {
    cart.items.push({ productId, quantity });
  }

  await cart.save();
  res.json(cart);
});

router.delete("/remove/:productId", async (req, res) => {
  const { productId } = req.params;
  const cart = await Cart.findOne({});
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  cart.items = cart.items.filter(
    (item) => item.productId.toString() !== productId
  );
  await cart.save();
  res.json(cart);
});

module.exports = router;
