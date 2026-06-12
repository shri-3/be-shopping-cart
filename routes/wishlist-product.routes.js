const express = require("express");
const router = express.Router();

const {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} = require("../controllers/wishlist-product.controller");

// Add a product to the wishlist
router.post("/wishlist", addToWishlist);

// Get all products in the wishlist
router.get("/wishlist", getWishlist);

// Remove a product from the wishlist
router.delete("/wishlist/:id", removeFromWishlist);

module.exports = router;
