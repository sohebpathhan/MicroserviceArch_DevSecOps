const orderService = require("../services/orderService");

function createOrder(req, res, next) {
  try {
    const { userId, productId, quantity } = req.body;
    if (!userId || !productId || !quantity) {
      return res.status(400).json({ error: "userId, productId and quantity are required" });
    }

    const order = orderService.createOrder({ userId, productId, quantity });
    return res.status(201).json(order);
  } catch (error) {
    return next(error);
  }
}

function getOrders(_req, res, next) {
  try {
    const orders = orderService.getAllOrders();
    return res.status(200).json(orders);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  createOrder,
  getOrders
};
