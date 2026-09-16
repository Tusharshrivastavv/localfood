const express = require("express");

const {
  getPublicShops,
  getPublicShop,
  getMyShop,
  updateMyShop,
  adminListShops,
  verifyShop,
  adminUpdateShop
} = require("../controllers/shopController");

const {
  protect,
  authorize
} = require("../middleware/auth");

const router = express.Router();

router.get(
  "/",
  getPublicShops
);

router.get(
  "/owner/me",
  protect,
  authorize("shop_owner"),
  getMyShop
);

router.put(
  "/owner/me",
  protect,
  authorize("shop_owner"),
  updateMyShop
);

router.get(
  "/admin/all",
  protect,
  authorize("admin"),
  adminListShops
);

router.patch(
  "/admin/:id/status",
  protect,
  authorize("admin"),
  verifyShop
);

router.put(
  "/admin/:id",
  protect,
  authorize("admin"),
  adminUpdateShop
);

router.get(
  "/:id",
  getPublicShop
);

module.exports = router;