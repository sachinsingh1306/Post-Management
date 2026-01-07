import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const register = async (req, res) => {
  try {
    const obj = await userModel.findById({ _id: req.body._id });
    if (obj) {
      res.json({ message: "Email already Exist" });
    } else {
      const hashcode = await bcrypt.hash(req.body.pwd, 10);
      const data = userModel({ ...req.body, pwd: hashcode });
      await data.save();
      res.json({ msg: "reg done" });
    }
  } catch (error) {
    res.json({ message: "Error in Registration" });
  }
};

const login = async (req, res) => {
  try {
    const obj = await userModel.findById({ _id: req.body._id });
    if (obj) {
      const f = await bcrypt.compare(req.body.pwd, obj.pwd);
      if (f) {
        res.json({
          token: jwt.sign({ _id: obj._id }, "post"),
          _id: obj._id,
          name: obj.name,
          role: obj.role,
        });
      } else {
        res.json({ message: "Check password" });
      }
    } else {
      res.json({ message: "Check your mail" });
    }
  } catch (error) {
    res.json({ message: "Error in login" });
  }
};

const islogin = async (req, res, next) => {
  try {
    jwt.verify(req.headers.authorization, "post");
    next();
  } catch (error) {
    res.json({ msg: "Please login first !!" });
  }
};

const isadmin = async (req, res, next) => {
  try {
    const obj = await userModel.findById({ _id: req.headers.uid });
    if (obj && obj.role == "admin") {
      next();
    } else {
      res.json({ message: "You are not admin" });
    }
  } catch (error) {
    res.json({ message: "Error in authorization" });
  }
};

export { register, login, islogin, isadmin };
