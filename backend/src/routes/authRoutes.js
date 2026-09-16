const express = require("express");

const {
  registerShopOwner,
  login,
  me
} = require("../controllers/authController");

const {
  protect
} = require("../middleware/auth");

const router = express.Router();

router.post(
  "/register-shop",
  registerShopOwner
);

router.post(
  "/login",
  login
);

router.get(
  "/me",
  protect,
  me
);

module.exports = router;