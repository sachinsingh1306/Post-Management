import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    _id: String,
    name: String,
    phone_no: String,
    pwd: String,
    role: { type: String, default: "user" },
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);

export default userModel;
