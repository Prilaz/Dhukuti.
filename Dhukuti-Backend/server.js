const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Serve static files
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use("/uploads", express.static("uploads"));

// Routes
const cartRoutes = require("./routes/cartRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

app.use("/api/cart", cartRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/auth", authRoutes); // ✅ Clean path: /api/auth/login or /api/auth/register
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/dhukuti", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(process.env.PORT || 5000, () =>
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });
