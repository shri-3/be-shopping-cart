const express = require("express");
const {
  updateProfileById,
  createProfile,
  getProfileById,
} = require("../controllers/profile.controller");
const router = express.Router();

// Define the GET route matching the parameter destructured in the controller
router.get("/profile/:id", getProfileById);

// Define the PUT or PATCH route with the dynamic :id parameter
router.put("/profile/:id", updateProfileById);

// create profile
router.post("/profile", createProfile);

module.exports = router;
