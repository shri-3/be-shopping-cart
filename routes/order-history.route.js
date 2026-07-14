const express = require("express");
const router = express.Router();

const {
  createOrderHistory,
  getAllOrderHistory,
} = require("../controllers/order-history.controller");

// create order history
router.post("/order-history", createOrderHistory);

// get all order history
router.get("/order-history", getAllOrderHistory);

module.exports = router;
