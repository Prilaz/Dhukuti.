const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cartRoutes = require("./routes/cart");

dotenv.config();

const authRoutes = require("./routes/auth");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(5173, () => console.log("Server running on port 5173"));
  })
  .catch((err) => console.error(err));

mongoose.connect("mongodb://localhost:27017/shop", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/api/cart", cartRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
