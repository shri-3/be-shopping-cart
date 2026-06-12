const mongoose = require("mongoose");

const wishlistProductSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", // Reference to the Product model
    required: true, // Makes productId mandatory
  },
});

const WishlistProduct = mongoose.model(
  "WishlistProduct",
  wishlistProductSchema,
);

module.exports = WishlistProduct;
