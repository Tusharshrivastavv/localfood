const Restaurant = require("../models/Restaurant");

// GET restaurant
const getRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne();

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    res.status(200).json({
      success: true,
      restaurant,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch restaurant",
      error: error.message,
    });
  }
};


// CREATE restaurant
const createRestaurant = async (req, res) => {
  try {
    const existingRestaurant = await Restaurant.findOne();

    if (existingRestaurant) {
      return res.status(400).json({
        success: false,
        message: "Restaurant already exists",
      });
    }

    const restaurant = await Restaurant.create(req.body);

    res.status(201).json({
      success: true,
      restaurant,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create restaurant",
      error: error.message,
    });
  }
};


module.exports = {
  getRestaurant,
  createRestaurant,
};