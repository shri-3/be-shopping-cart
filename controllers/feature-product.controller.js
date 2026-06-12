const featureProductModel = require("../models/feature-product.model");
const productModel = require("../models/products.model");

// Add a product to the featured products list
exports.addFeaturedProduct = async (req, res) => {
  try {
    const { productId } = req.body;

    // Check if the product exists
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Check if the product is already featured
    const existingFeature = await featureProductModel.findOne({ productId });
    if (existingFeature) {
      return res.status(400).json({ error: "Product is already featured" });
    }

    // Create a new featured product entry
    const newFeatureProduct = new featureProductModel({ productId });
    await newFeatureProduct.save();

    res.status(201).json(newFeatureProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to add featured product" });
  }
};

// Get all featured products
exports.getFeaturedProducts = async (req, res) => {
  try {
    const featuredProducts = await featureProductModel
      .find()
      .populate("productId");
    res.status(200).json(featuredProducts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch featured products" });
  }
};

// Remove a product from the featured products list
exports.removeFeaturedProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the featured product entry exists
    const existingFeature = await featureProductModel.findById(id);
    if (!existingFeature) {
      return res.status(404).json({ error: "Featured product not found" });
    }

    // Delete the featured product entry
    await featureProductModel.findByIdAndDelete(id);

    res.status(200).json({ message: "Featured product removed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove featured product" });
  }
};
