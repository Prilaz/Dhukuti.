const mongoose = require("mongoose");

const AboutGallerySchema = new mongoose.Schema({
  image: String, // Image URL or path
});

module.exports = mongoose.model("AboutGallery", AboutGallerySchema);
