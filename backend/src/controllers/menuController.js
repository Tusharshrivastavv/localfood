const MenuItem = require("../models/MenuItem");

// GET all menu items
const getMenu = async (req, res) => {
  try {
    const menu = await MenuItem.find().sort({
      category: 1,
      name: 1,
    });

    res.status(200).json({
      success: true,
      count: menu.length,
      menu,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch menu",
      error: error.message,
    });
  }
};


// GET single menu item
const getMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found",
      });
    }

    res.status(200).json({
      success: true,
      item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch menu item",
      error: error.message,
    });
  }
};


// CREATE menu item
const createMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.create(req.body);

    res.status(201).json({
      success: true,
      item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create menu item",
      error: error.message,
    });
  }
};


// UPDATE menu item
const updateMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found",
      });
    }

    res.status(200).json({
      success: true,
      item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update menu item",
      error: error.message,
    });
  }
};


// DELETE menu item
const deleteMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Menu item deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete menu item",
      error: error.message,
    });
  }
};


module.exports = {
  getMenu,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
};