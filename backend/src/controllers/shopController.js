const Shop = require("../models/Shop");
const User = require("../models/User");

const getPublicShops = async (req, res) => {
  try {
    const { city } = req.query;

    const filter = {
      status: "approved"
    };

    if (city) {
      filter.city = new RegExp(city, "i");
    }

    const shops = await Shop.find(filter)
      .sort({
        rating: -1,
        createdAt: -1
      })
      .populate(
        "owner",
        "name email phone"
      );

    res.json(shops);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch shops"
    });
  }
};

const getPublicShop = async (req, res) => {
  try {
    const shop = await Shop.findOne({
      _id: req.params.id,
      status: "approved"
    }).populate(
      "owner",
      "name email phone"
    );

    if (!shop) {
      return res.status(404).json({
        message: "Shop not found"
      });
    }

    res.json(shop);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch shop"
    });
  }
};

const getMyShop = async (req, res) => {
  try {
    const shop = await Shop.findOne({
      owner: req.user._id
    });

    if (!shop) {
      return res.status(404).json({
        message: "Shop not found"
      });
    }

    res.json(shop);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch your shop"
    });
  }
};

const updateMyShop = async (req, res) => {
  try {
    const allowedFields = [
      "name",
      "description",
      "address",
      "city",
      "phone",
      "image",
      "latitude",
      "longitude",
      "deliveryRadius",
      "isOpen"
    ];

    const updates = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const shop = await Shop.findOneAndUpdate(
      {
        owner: req.user._id
      },
      updates,
      {
        new: true,
        runValidators: true
      }
    );

    if (!shop) {
      return res.status(404).json({
        message: "Shop not found"
      });
    }

    res.json(shop);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update shop"
    });
  }
};

const adminListShops = async (req, res) => {
  try {
    const { status } = req.query;

    const filter = {};

    if (status) {
      filter.status = status;
    }

    const shops = await Shop.find(filter)
      .sort({
        createdAt: -1
      })
      .populate(
        "owner",
        "name email phone status"
      );

    res.json(shops);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch shops"
    });
  }
};

const verifyShop = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "approved",
      "rejected",
      "suspended"
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid status"
      });
    }

    const shop = await Shop.findById(
      req.params.id
    );

    if (!shop) {
      return res.status(404).json({
        message: "Shop not found"
      });
    }

    shop.status = status;

    await shop.save();

    let userStatus = status;

    await User.findByIdAndUpdate(
      shop.owner,
      {
        status: userStatus
      }
    );

    res.json({
      message: `Shop ${status}`,
      shop
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update shop status"
    });
  }
};

const adminUpdateShop = async (req, res) => {
  try {
    const allowedFields = [
      "name",
      "description",
      "address",
      "city",
      "phone",
      "image",
      "latitude",
      "longitude",
      "deliveryRadius",
      "rating",
      "isOpen"
    ];

    const updates = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const shop = await Shop.findByIdAndUpdate(
      req.params.id,
      updates,
      {
        new: true,
        runValidators: true
      }
    );

    if (!shop) {
      return res.status(404).json({
        message: "Shop not found"
      });
    }

    res.json(shop);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update shop"
    });
  }
};

module.exports = {
  getPublicShops,
  getPublicShop,
  getMyShop,
  updateMyShop,
  adminListShops,
  verifyShop,
  adminUpdateShop
};