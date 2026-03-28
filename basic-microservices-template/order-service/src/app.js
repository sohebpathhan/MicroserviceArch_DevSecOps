const express = require("express");
const cors = require("cors");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
const PORT = 3003;

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ service: "order-service", status: "ok" });
});

app.use("/api/orders", orderRoutes);

app.use((error, _req, res, _next) => {
  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({ error: error.message || "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Order Service running on http://localhost:${PORT}`);
});
