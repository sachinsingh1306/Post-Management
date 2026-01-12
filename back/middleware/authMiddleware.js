import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

/* CHECK LOGIN */
export const isLogin = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    res.status(401).json({ message: "Please login first" });
  }
};

/* CHECK ADMIN */
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.headers.uid);
    if (user && user.role === "admin") {
      next();
    } else {
      res.status(403).json({ message: "Admin access only" });
    }
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
