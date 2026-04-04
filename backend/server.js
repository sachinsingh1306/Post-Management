const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load env variables FIRST
dotenv.config();

// Connect to database
connectDB();

const app = express();

// ================= MIDDLEWARE =================

// Body parser
app.use(express.json());

// CORS (fix for frontend connection)
app.use(
  cors({
    origin: "http://localhost:5173", // Vite frontend
    credentials: true,
  })
);

// ================= ROUTES =================

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));

// Health check
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ================= ERROR HANDLING =================

// Handle 404
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("ERROR:", err.message);
  res.status(500).json({
    message: "Server Error",
    error: err.message,
  });
});

// ================= SERVER =================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});