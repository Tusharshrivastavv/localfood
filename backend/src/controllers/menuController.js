const MenuItem = require("../models/MenuItem");
const Shop = require("../models/Shop");

const getShopMenu = async (req, res) => {
  try {
    const shop = await Shop.findOne({
      _id: req.params.shopId,
      status: "approved"
    });

    if (!shop) {
      return res.status(404).json({
        message: "Shop not found"
      });
    }

    const menu = await MenuItem.find({
      shop: shop._id,
      available: true
    }).sort({
      category: 1,
      createdAt: -1
    });

    res.json(menu);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch menu"
    });
  }
};

const getMyMenu = async (req, res) => {
  try {
    const shop = await Shop.findOne({
      owner: req.user._id
    });

    if (!shop) {
      return res.status(404).json({
        message: "Shop not found"
      });
    }

    const menu = await MenuItem.find({
      shop: shop._id
    }).sort({
      createdAt: -1
    });

    res.json(menu);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch menu"
    });
  }
};

const createMyMenuItem = async (req, res) => {
  try {
    const shop = await Shop.findOne({
      owner: req.user._id
    });

    if (!shop) {
      return res.status(404).json({
        message: "Shop not found"
      });
    }

    if (shop.status !== "approved") {
      return res.status(403).json({
        message:
          "Your shop must be approved before adding menu items"
      });
    }

    const {
      name,
      description,
      price,
      category,
      image,
      isVeg,
      available
    } = req.body;

    if (!name || price === undefined) {
      return res.status(400).json({
        message: "Name and price are required"
      });
    }

    const item = await MenuItem.create({
      shop: shop._id,
      name,
      description,
      price,
      category,
      image,
      isVeg,
      available
    });

    res.status(201).json(item);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create menu item"
    });
  }
};

const updateMyMenuItem = async (req, res) => {
  try {
    const shop = await Shop.findOne({
      owner: req.user._id
    });

    if (!shop) {
      return res.status(404).json({
        message: "Shop not found"
      });
    }

    const item = await MenuItem.findOne({
      _id: req.params.id,
      shop: shop._id
    });

    if (!item) {
      return res.status(404).json({
        message: "Menu item not found"
      });
    }

    const allowedFields = [
      "name",
      "description",
      "price",
      "category",
      "image",
      "isVeg",
      "available"
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        item[field] = req.body[field];
      }
    });

    await item.save();

    res.json(item);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update menu item"
    });
  }
};

const deleteMyMenuItem = async (req, res) => {
  try {
    const shop = await Shop.findOne({
      owner: req.user._id
    });

    if (!shop) {
      return res.status(404).json({
        message: "Shop not found"
      });
    }

    const item = await MenuItem.findOneAndDelete({
      _id: req.params.id,
      shop: shop._id
    });

    if (!item) {
      return res.status(404).json({
        message: "Menu item not found"
      });
    }

    res.json({
      message: "Menu item deleted"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete menu item"
    });
  }
};

module.exports = {
  getShopMenu,
  getMyMenu,
  createMyMenuItem,
  updateMyMenuItem,
  deleteMyMenuItem
};