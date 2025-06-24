const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "public/images")));

app.get("/api/about", (req, res) => {
  res.json({
    message: "Dhukuti backend is working!",
  });
});
app.use("/api/about", aboutRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
