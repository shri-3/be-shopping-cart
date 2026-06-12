const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./db/db.connect");
const productRoutes = require("./routes/product.routes");
const featureProductRoutes = require("./routes/feature-product.routes");
const wishlistProductRoutes = require("./routes/wishlist-product.routes");
const app = express();
app.use(bodyParser.json());
// Enable CORS for a specific origin
app.use(cors());

connectDB();

// Routes
app.use("/api", productRoutes);
app.use("/api", featureProductRoutes);
app.use("/api", wishlistProductRoutes);

const PORT = process.env.PORT || 50001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
