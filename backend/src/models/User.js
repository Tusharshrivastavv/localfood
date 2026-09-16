const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true
    },

    phone: {
      type: String,
      default: ""
    },

    role: {
      type: String,
      enum: ["customer", "shop_owner", "admin"],
      default: "customer"
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "suspended"],
      default: "approved"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);