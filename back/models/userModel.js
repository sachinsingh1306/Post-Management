import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true},
    phone_no: { type: String },
    pwd: { type: String, required: true },
    role: { type: String, default: "user" },
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);
export default userModel;
