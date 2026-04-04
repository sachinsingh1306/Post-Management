import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import routes from "./routes/routes.js";

dotenv.config();

const startServer = async () => {
  try {
    await connectDB();

    const app = express();

    app.use(cors({
      origin: "http://localhost:5173",
      credentials: true
    }));

    app.use(express.json());

    app.get("/", (req, res) => res.send("API running"));

    app.use("/api", routes);

    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).json({ message: "Server Error" });
    });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

startServer();
