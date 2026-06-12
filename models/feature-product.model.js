const mongoose = require("mongoose");

const featureProductSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", // Reference to the Product model
    required: true, // Makes productId mandatory
  },
});

const FeatureProduct = mongoose.model("FeatureProduct", featureProductSchema);

module.exports = FeatureProduct;
