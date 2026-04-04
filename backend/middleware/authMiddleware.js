const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ================= PROTECT ROUTES =================

exports.protect = async (req, res, next) => {
  let token;

  try {
    // 🔍 Check for Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      // 🔐 Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 👤 Get user (exclude password safely)
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = user;
      return next(); // ✅ IMPORTANT: stop execution here
    }

    // ❌ No token
    return res.status(401).json({ message: "No token, not authorized" });

  } catch (error) {
    console.error("AUTH ERROR:", error.message);
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};

// ================= ADMIN =================

exports.admin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authorized" });
  }

  if (req.user.role === "admin") {
    return next();
  }

  return res.status(403).json({ message: "Admin access only" });
};