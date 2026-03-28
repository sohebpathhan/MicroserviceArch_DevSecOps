const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");

const app = express();
const PORT = 4000;

const USER_SERVICE = "http://localhost:3001";
const PRODUCT_SERVICE = "http://localhost:3002";
const ORDER_SERVICE = "http://localhost:3003";

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ service: "api-gateway", status: "ok" });
});

app.use(
  "/users",
  proxy(USER_SERVICE, {
    proxyReqPathResolver: (req) => `/api/users${req.url}`
  })
);

app.use(
  "/products",
  proxy(PRODUCT_SERVICE, {
    proxyReqPathResolver: (req) => `/api/products${req.url}`
  })
);

app.use(
  "/orders",
  proxy(ORDER_SERVICE, {
    proxyReqPathResolver: (req) => `/api/orders${req.url}`
  })
);

app.listen(PORT, () => {
  console.log(`API Gateway running on http://localhost:${PORT}`);
});
