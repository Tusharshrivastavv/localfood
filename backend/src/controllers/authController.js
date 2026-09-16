const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const Shop = require("../models/Shop");

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d"
    }
  );
};

const registerShopOwner = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      shopName,
      description,
      address,
      city,
      shopPhone,
      image,
      latitude,
      longitude,
      deliveryRadius
    } = req.body;

    if (
      !name ||
      !email ||
      !password ||
      !shopName ||
      !address ||
      !city
    ) {
      return res.status(400).json({
        message: "Please fill all required fields"
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters"
      });
    }

    if (
      latitude === undefined ||
      longitude === undefined
    ) {
      return res.status(400).json({
        message: "Shop location is required"
      });
    }

    const existingUser = await User.findOne({
      email: email.toLowerCase()
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      phone,
      role: "shop_owner",
      status: "pending"
    });

    try {
      await Shop.create({
        name: shopName,
        description,
        address,
        city,
        phone: shopPhone || phone,
        image,
        latitude,
        longitude,
        deliveryRadius: deliveryRadius || 10,
        owner: user._id,
        status: "pending"
      });
    } catch (error) {
      await User.findByIdAndDelete(user._id);
      throw error;
    }

    res.status(201).json({
      message:
        "Shop registration submitted. Wait for admin approval."
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Registration failed"
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email: email.toLowerCase()
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    if (user.status === "pending") {
      return res.status(403).json({
        message:
          "Your shop is waiting for admin approval"
      });
    }

    if (user.status === "rejected") {
      return res.status(403).json({
        message:
          "Your shop registration was rejected"
      });
    }

    if (user.status === "suspended") {
      return res.status(403).json({
        message:
          "Your account has been suspended"
      });
    }

    const token = generateToken(user._id);

    let shop = null;

    if (user.role === "shop_owner") {
      shop = await Shop.findOne({
        owner: user._id
      });
    }

    res.json({
      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        status: user.status
      },

      shop
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Login failed"
    });
  }
};

const me = async (req, res) => {
  try {
    let shop = null;

    if (req.user.role === "shop_owner") {
      shop = await Shop.findOne({
        owner: req.user._id
      });
    }

    res.json({
      user: req.user,
      shop
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get user"
    });
  }
};

module.exports = {
  registerShopOwner,
  login,
  me
};