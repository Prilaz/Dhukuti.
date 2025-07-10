// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Access denied: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = {
      id: user._id,
      email: user.email,
      role: user.role, // ✅ important
    };

    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = verifyToken;
