require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const connectDB = require("./config/db");

const User = require("./models/User");

const authRoutes = require("./routes/authRoutes");
const shopRoutes = require("./routes/shopRoutes");
const menuRoutes = require("./routes/menuRoutes");

const app = express();

connectDB();

app.use(
  cors({
    origin:
      process.env.CLIENT_URL ||
      "http://localhost:5173"
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "LocalBite API is running"
  });
});

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/shops",
  shopRoutes
);

app.use(
  "/api/menu",
  menuRoutes
);

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found"
  });
});

const PORT =
  process.env.PORT || 5000;

const seedAdmin = async () => {
  try {
    if (
      !process.env.ADMIN_EMAIL ||
      !process.env.ADMIN_PASSWORD
    ) {
      return;
    }

    const existingAdmin =
      await User.findOne({
        email: process.env.ADMIN_EMAIL.toLowerCase()
      });

    if (!existingAdmin) {
      const hashedPassword =
        await bcrypt.hash(
          process.env.ADMIN_PASSWORD,
          10
        );

      await User.create({
        name: "LocalBite Admin",
        email:
          process.env.ADMIN_EMAIL.toLowerCase(),
        password: hashedPassword,
        role: "admin",
        status: "approved"
      });

      console.log("Admin account created");
    }
  } catch (error) {
    console.error(
      "Admin seed error:",
      error.message
    );
  }
};

app.listen(PORT, async () => {
  console.log(
    `Server running on port ${PORT}`
  );

  await seedAdmin();
});