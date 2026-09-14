const express = require("express");

const {
  getRestaurant,
  createRestaurant,
} = require("../controllers/restaurantController");

const router = express.Router();

router.get("/", getRestaurant);

router.post("/", createRestaurant);

module.exports = router;