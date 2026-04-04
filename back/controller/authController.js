import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

/* REGISTER */
export const register = async (req, res) => {
  try {
    const { userId, name, pwd } = req.body;

    if (!userId || !name || !pwd) {
      return res.status(400).json({ message: "All fields required" });
    }

    const exists = await userModel.findOne({ userId });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await userModel.create({
      userId,
      name,
      pwd,
    });

    res.status(201).json({ message: "Registration Successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Registration Failed" });
  }
};

/* LOGIN */
export const login = async (req, res) => {
  try {
    const { userId, pwd } = req.body;

    if (!userId || !pwd) {
      return res.status(400).json({ message: "Credentials required" });
    }

    const user = await userModel.findOne({ userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const valid = await user.comparePassword(pwd);
    if (!valid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      name: user.name,
      role: user.role,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login Failed" });
  }
};
