const express = require("express");
const cors = require("cors");
const path = require("path");
const aboutRoutes = require("./routes/aboutRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use("/api/about", aboutRoutes); // This now handles all /api/about routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
