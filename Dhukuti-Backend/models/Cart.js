const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: { type: Number, required: true },
});

const cartSchema = new mongoose.Schema({
  items: [cartItemSchema],
  userId: { type: String }, // optional for now
});

module.exports = mongoose.model("Cart", cartSchema);
