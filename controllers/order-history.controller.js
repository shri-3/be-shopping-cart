const mongoose = require("mongoose");
const orderHistoryModel = require("../models/order-history.model");

exports.createOrderHistory = async (req, res) => {
  try {
    const { userId, products } = req.body;
    console.log(req.body);

    // insert order history items, price, quantity, totalprice, product name, product id into an array.
    const orderHistoryItems = products.map((product) => ({
      productId: product._id,
      name: product.name,
      quantity: product.quantity,
      price: product.price,
      totalPrice: (product.price * product.quantity).toFixed(2), // Added totalPrice field
    }));

    const orderHistory = new orderHistoryModel({
      userId: "6a0d9f63492c3f5603b807ab", // hardcored userId for testing purposes
      products: orderHistoryItems,
    });

    const savedOrderHistory = await orderHistory.save();
    res.status(201).json(savedOrderHistory);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to create order history",
      details: error.message,
    });
  }
};

// Get all order history
exports.getAllOrderHistory = async (req, res) => {
  try {
    const orderHistory = await orderHistoryModel.find();
    res.status(200).json(orderHistory);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch order history",
      details: error.message,
    });
  }
};
