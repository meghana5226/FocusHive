const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");

dotenv.config(); // Load .env variables

const app = express();

// 🔧 Middleware
app.use(cors());
app.use(express.json());

// ✅ Root route for health check
app.get("/", (req, res) => {
  res.send("🚀 Backend server is up and running!");
});

// 📦 API Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// 🌐 MongoDB Connection & Server Start
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
  });
