const mongoose = require("mongoose");
const productModel = require("../models/products.model");
const categoryModel = require("../models/category.mode");

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, imageUrl, rating, categoryId } = req.body;

    const newProduct = new productModel({
      name,
      description,
      price,
      imageUrl,
      rating,
      categoryId,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Failed to create product", details: error.message });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find().populate("categoryId");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await productModel
      .findById(req.params.id)
      .populate("categoryId");
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
  try {
    const { name, description, price, imageUrl } = req.body;
    const updatedProduct = await productModel
      .findByIdAndUpdate(
        req.params.id,
        { name, description, price, imageUrl },
        { new: true },
      )
      .populate("categoryId");
    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to update product" });
  }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await productModel.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
};

/* Get Search product by
 * product name, product price, product rating
 * Query parameters:
 * name: string (optional) - Search for products by name (case-insensitive)
 * price: number (optional) - Search for products sort by prices ascending order and descending order
 * price range minPrice and maxPrice (optional) - Search for products within a price range
 * rating: number (optional) - Search for products by exact rating match
 * categoryId: string (optional) - Search for products by category ID. category ID should be an array of category IDs.
 * Example request: POST /api/products/search
 * Data fields for search product: {name=phone, price=499.99, rating=4.5, minPrice=100, maxPrice=500}
 */

exports.searchProducts = async (req, res) => {
  try {
    const { name, priceShort, rating, categoryId, minPrice, maxPrice } =
      req.body;
    const query = {};
    const shortBy = {};

    if (name) {
      query.name = { $regex: name, $options: "i" }; // Case-insensitive search
    }

    if (categoryId && categoryId.length > 0) {
      const objectCategoryIds = categoryId.map(
        (id) => new mongoose.Types.ObjectId(id),
      );
      query.categoryId = { $in: objectCategoryIds };
    }

    if (priceShort) {
      shortBy.price = priceShort; // sort by prices
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) {
        query.price.$gte = parseFloat(minPrice);
      }
      if (maxPrice) {
        query.price.$lte = parseFloat(maxPrice);
      }
    }

    if (rating) {
      query.rating = rating; // Exact rating match
    }

    const products = await productModel
      .find(query)
      .sort(shortBy)
      .populate("categoryId");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to search products" });
  }
};
