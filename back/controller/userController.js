import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

/* REGISTER USER */
export const register = async (req, res) => {
  try {
    const exists = await userModel.findById(req.body._id);
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hash = await bcrypt.hash(req.body.pwd, 10);

    const user = new userModel({
      ...req.body,
      pwd: hash,
    });

    await user.save();
    res.status(201).json({ message: "Registration Successful" });
  } catch (error) {
    res.status(500).json({ message: "Registration Failed" });
  }
};

/* LOGIN USER */
export const login = async (req, res) => {
  try {
    const user = await userModel.findById(req.body._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const valid = await bcrypt.compare(req.body.pwd, user.pwd);
    if (!valid) {
      return res.status(401).json({ message: "Wrong Password" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      name: user.name,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: "Login Failed" });
  }
};
