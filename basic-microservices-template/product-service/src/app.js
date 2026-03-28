const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");

const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ service: "product-service", status: "ok" });
});

app.use("/api/products", productRoutes);

app.use((error, _req, res, _next) => {
  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({ error: error.message || "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Product Service running on http://localhost:${PORT}`);
});
