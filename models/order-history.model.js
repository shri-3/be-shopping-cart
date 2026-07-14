const mongoose = require("mongoose");

const orderHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      totalPrice: { type: Number, required: true }, // Added totalPrice field
    },
  ],
});
const OrderHistory = mongoose.model("OrderHistory", orderHistorySchema);

module.exports = OrderHistory;
