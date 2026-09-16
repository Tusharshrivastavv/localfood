const express = require("express");

const {
  getRestaurant,
  createRestaurant,
  updateRestaurant,
} = require("../controllers/restaurantController");

const router = express.Router();

router.get("/", getRestaurant);

router.post("/", createRestaurant);

router.put("/", updateRestaurant);

module.exports = router;