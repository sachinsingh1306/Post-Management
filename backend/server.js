import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";

import routes from "./routes/routes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/", routes);

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully !!"))
  .catch((err) => console.log("MongoDB connection error:", err));

// ✅ Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
