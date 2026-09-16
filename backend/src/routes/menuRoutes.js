const express = require("express");

const {
  getShopMenu,
  getMyMenu,
  createMyMenuItem,
  updateMyMenuItem,
  deleteMyMenuItem
} = require("../controllers/menuController");

const {
  protect,
  authorize
} = require("../middleware/auth");

const router = express.Router();

router.get(
  "/shop/:shopId",
  getShopMenu
);

router.get(
  "/owner/me",
  protect,
  authorize("shop_owner"),
  getMyMenu
);

router.post(
  "/owner/me",
  protect,
  authorize("shop_owner"),
  createMyMenuItem
);

router.put(
  "/owner/me/:id",
  protect,
  authorize("shop_owner"),
  updateMyMenuItem
);

router.delete(
  "/owner/me/:id",
  protect,
  authorize("shop_owner"),
  deleteMyMenuItem
);

module.exports = router;