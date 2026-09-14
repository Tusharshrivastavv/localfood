const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const restaurantRoutes = require("./routes/restaurantRoutes");
const menuRoutes = require("./routes/menuRoutes");

dotenv.config();

const app = express();


// Connect database
connectDB();


// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());


// API routes
app.use("/api/restaurant", restaurantRoutes);
app.use("/api/menu", menuRoutes);


// Health check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Local Food API is running",
  });
});


// 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});