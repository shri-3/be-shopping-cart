const categorModel = require("../models/category.mode");

/*
 * Create a new category
 */
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = new categorModel({ name });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: "Failed to create product" });
  }
};

/*
 * Get all category
 */
exports.getAllCategory = async (req, res) => {
  try {
    const category = await categorModel.find();
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch category" });
  }
};
