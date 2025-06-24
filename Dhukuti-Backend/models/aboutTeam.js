const mongoose = require("mongoose");

const AboutTeamSchema = new mongoose.Schema({
  name: String,
  role: String,
  image: String, // Image URL or path
});

module.exports = mongoose.model("AboutTeam", AboutTeamSchema);
