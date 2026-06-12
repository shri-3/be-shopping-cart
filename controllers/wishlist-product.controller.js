const wishlistProductModel = require("../models/wishlist-product.model");
const productModel = require("../models/products.model");

// Add a product to the wishlist
exports.addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    // Check if the product exists
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Check if the product is already in the wishlist
    const existingWishlistItem = await wishlistProductModel.findOne({
      productId,
    });
    if (existingWishlistItem) {
      return res
        .status(400)
        .json({ error: "Product is already in the wishlist" });
    }

    // Create a new wishlist item
    const newWishlistItem = new wishlistProductModel({ productId });
    await newWishlistItem.save();

    res.status(201).json(newWishlistItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to add product to wishlist" });
  }
};

// Get all products in the wishlist
exports.getWishlist = async (req, res) => {
  try {
    const wishlistItems = await wishlistProductModel
      .find()
      .populate("productId");
    res.status(200).json(wishlistItems);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch wishlist" });
  }
};

// Remove a product from the wishlist
exports.removeFromWishlist = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the wishlist item exists
    const existingWishlistItem = await wishlistProductModel.findById(id);
    if (!existingWishlistItem) {
      return res.status(404).json({ error: "Wishlist item not found" });
    }

    // Delete the wishlist item
    await wishlistProductModel.findByIdAndDelete(id);

    res
      .status(200)
      .json({ message: "Product removed from wishlist successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove product from wishlist" });
  }
};
