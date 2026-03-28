const productService = require("../services/productService");

function getProducts(_req, res, next) {
  try {
    const products = productService.getAllProducts();
    return res.status(200).json(products);
  } catch (error) {
    return next(error);
  }
}

function createProduct(req, res, next) {
  try {
    const { name, price, category } = req.body;
    if (!name || price === undefined || !category) {
      return res.status(400).json({ error: "name, price and category are required" });
    }

    const product = productService.addProduct({ name, price, category });
    return res.status(201).json(product);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getProducts,
  createProduct
};
