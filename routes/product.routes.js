const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  searchProducts,
} = require("../controllers/product.controller");

// Create a new product
router.post("/products", createProduct);

// Get all products
router.get("/products", getAllProducts);

// Search products (must come before /:id route)
router.get("/products/search", searchProducts);

// Get a product by ID
router.get("/products/:id", getProductById);

// Update a product by ID
router.put("/products/:id", updateProduct);

// Delete a product by ID
router.delete("/products/:id", deleteProduct);

module.exports = router;
