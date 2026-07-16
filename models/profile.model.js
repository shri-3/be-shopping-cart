const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  dob: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },
  address: [
    {
      name: String,
      street: String,
      city: String,
      state: String,
      zipCode: String,
      phone: String,
      country: String,
    },
  ],
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
