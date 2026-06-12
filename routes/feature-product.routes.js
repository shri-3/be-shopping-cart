const express = require("express");
const router = express.Router();

const {
  addFeaturedProduct,
  getFeaturedProducts,
  getFeaturedProductById,
  removeFeaturedProduct,
} = require("../controllers/feature-product.controller");

// Add a product to the featured products list
router.post("/feature-products", addFeaturedProduct);

// Get all featured products
router.get("/feature-products", getFeaturedProducts);

// Get a featured product by ID
// router.get("/feature-products/:id", getFeaturedProductById);

// Delete a featured product by ID
router.delete("/feature-products/:id", removeFeaturedProduct);

module.exports = router;
