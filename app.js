const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./db/db.connect");
const productRoutes = require("./routes/product.routes");
const featureProductRoutes = require("./routes/feature-product.routes");
const wishlistProductRoutes = require("./routes/wishlist-product.routes");
const categoryProductRoutes = require("./routes/category.routes");
const app = express();
app.use(bodyParser.json());
// Enable CORS for a specific origin
app.use(cors());

connectDB();

// Routes
app.use("/api", productRoutes);
app.use("/api", featureProductRoutes);
app.use("/api", wishlistProductRoutes);
app.use("/api", categoryProductRoutes);

app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found use /api/events" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

const PORT = process.env.PORT || 50001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
