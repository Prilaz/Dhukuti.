const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

// Route imports
const cartRoutes = require("./routes/cartRoutes");
const uploadRoute = require("./routes/uploadRoute"); // ✅ IMPORT THIS
const authRoutes = require("./routes/auth"); // ✅ OPTIONAL: For login/signup
const productRoutes = require("./routes/productRoutes"); // ✅ Optional for product API
const orderRoutes = require("./routes/orderRoutes");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Static files
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/cart", cartRoutes);
app.use("/api/upload", uploadRoute);
app.use("/api/auth", authRoutes); // ✅ Login/Register
app.use("/api/products", productRoutes); // ✅ Products
app.use("/api/orders", orderRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/dhukuti", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
