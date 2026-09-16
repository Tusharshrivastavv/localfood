const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      default: ""
    },

    address: {
      type: String,
      required: true
    },

    city: {
      type: String,
      required: true
    },

    phone: {
      type: String,
      default: ""
    },

    image: {
      type: String,
      default: ""
    },

    latitude: {
      type: Number,
      required: true
    },

    longitude: {
      type: Number,
      required: true
    },

    deliveryRadius: {
      type: Number,
      default: 10
    },

    rating: {
      type: Number,
      default: 4.5
    },

    isOpen: {
      type: Boolean,
      default: true
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "suspended"],
      default: "pending"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Shop", shopSchema);