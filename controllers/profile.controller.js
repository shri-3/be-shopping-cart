const mongoose = require("mongoose");
const profileModel = require("../models/profile.model");

exports.createProfile = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      dob,
      gender,
      primaryAddress,
      address,
    } = req.body;

    let processedAddress = [];
    if (Array.isArray(address)) {
      processedAddress = address;
    } else if (address !== undefined && address !== null) {
      processedAddress = [address]; // Wrap single entries (string or object) into an array
    }

    // Model.create() runs a single round-trip command to MongoDB
    const newUser = await profileModel.create({
      firstName,
      lastName,
      email,
      phone,
      dob,
      gender,
      primaryAddress,
      address: processedAddress,
    });

    return res.status(201).json({
      success: true,
      message: "User and multi-type address array saved successfully.",
      data: newUser,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Duplicate entry detected. userId or email already exists.",
      });
    }

    // General fallback error
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

exports.updateProfileById = async (req, res) => {
  try {
    // 1. Extract the unique _id from the request URL parameters (e.g., /api/profile/6a0d9f6349...)
    const { id } = req.params;

    // 2. Fail-Fast: Instantly check if the incoming ID string is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID format provided.",
      });
    }
    // 3. Destructure dynamic profile updates from request body
    const {
      firstName,
      lastName,
      email,
      phone,
      dob,
      gender,
      primaryAddress,
      address,
    } = req.body;

    // 4. Build a clean update payload dynamically to avoid wiping out omissions
    const updateFields = {};
    if (firstName !== undefined) updateFields.firstName = firstName;
    if (lastName !== undefined) updateFields.lastName = lastName;
    if (email !== undefined) updateFields.email = email;
    if (phone !== undefined) updateFields.phone = phone;
    if (dob !== undefined) updateFields.dob = dob;
    if (gender !== undefined) updateFields.gender = gender;
    if (primaryAddress !== undefined)
      updateFields.primaryAddress = primaryAddress;

    if (address !== undefined) {
      // Handle polymorphic multi-type address array cleanly
      updateFields.address = Array.isArray(address)
        ? address
        : address
          ? [address]
          : [];
    }

    // 5. High-Velocity Atomic Database Execution
    const updatedProfile = await profileModel.findByIdAndUpdate(
      id, // Find target document directly via its standard binary _id index
      { $set: updateFields }, // Apply changes seamlessly using native MongoDB operators
      {
        new: true, // Force return of the new document payload
        runValidators: true, // Enforce strict schema constraints mid-flight
      },
    );

    // 6. Fail-Safe: If no profile exists for this userId yet
    if (!updatedProfile) {
      return res.status(404).json({
        success: false,
        message: "No profile document found with that specific database ID.",
      });
    }

    // 7. Return successful response
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      data: updatedProfile,
    });
  } catch (error) {
    // Handle unique constraint violations (e.g., trying to update to an email already in use)
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Conflict: This email is already claimed by another user.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

exports.getProfileById = async (req, res) => {
  try {
    // 1. Extract the unique _id from the request URL parameters (e.g., /api/profile/66f43e5c9b4e...)
    const { id } = req.params;

    // 2. Fail-Fast: Instantly reject invalid MongoDB ObjectIds in Node.js memory
    // This blocks malicious or broken strings from wasting database connection resources
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID format provided.",
      });
    }

    // 3. High-Velocity Database Read
    // .lean() strips heavy Mongoose virtuals and hooks, turning the response
    // into a plain JavaScript object. This runs up to 4x faster and saves RAM.
    const profile = await profileModel.findById(id).lean();

    // 4. Handle Missing Document
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "No profile found with that specific ID.",
      });
    }

    // 5. Return the retrieved data
    return res.status(200).json({
      success: true,
      message: "Profile retrieved successfully.",
      data: profile,
    });
  } catch (error) {
    // Fallback catch-all for system or connection failures
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};
