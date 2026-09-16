const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema(
  {
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
      index: true
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      default: ""
    },

    price: {
      type: Number,
      required: true
    },

    category: {
      type: String,
      default: "Other"
    },

    image: {
      type: String,
      default: ""
    },

    isVeg: {
      type: Boolean,
      default: true
    },

    available: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("MenuItem", menuItemSchema);