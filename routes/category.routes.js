const express = require("express");
const router = express.Router();
const {
  createCategory,
  getAllCategory,
} = require("../controllers/category.controller");

// Create a new product
router.post("/category", createCategory);
// Get all category
router.get("/category", getAllCategory);

module.exports = router;
