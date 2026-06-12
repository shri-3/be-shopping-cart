const mongoose = require("mongoose");
require("dotenv").config();

const mongoDBURI = process.env.MONGO_DB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoDBURI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
