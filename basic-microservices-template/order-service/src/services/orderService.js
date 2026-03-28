const orders = [];

function createOrder({ userId, productId, quantity }) {
  const order = {
    id: orders.length + 1,
    userId,
    productId,
    quantity,
    createdAt: new Date().toISOString()
  };
  orders.push(order);
  return order;
}

function getAllOrders() {
  return orders;
}

module.exports = {
  createOrder,
  getAllOrders
};
