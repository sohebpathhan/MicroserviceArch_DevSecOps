const productSelectEl = document.getElementById("productSelect");
const orderListEl = document.getElementById("orderList");

async function loadProductOptions() {
  try {
    const products = await apiRequest("/products");
    productSelectEl.innerHTML = products
      .map((product) => `<option value="${product.id}">${product.name} (#${product.id})</option>`)
      .join("");
  } catch (error) {
    productSelectEl.innerHTML = `<option>Error: ${error.message}</option>`;
  }
}

function renderOrders(orders) {
  if (!orders.length) {
    orderListEl.innerHTML = "<p>No orders yet.</p>";
    return;
  }

  orderListEl.innerHTML = orders
    .map(
      (order) =>
        `<div class="item">Order #${order.id} | User: ${order.userId} | Product: ${order.productId} | Qty: ${order.quantity}</div>`
    )
    .join("");
}

async function loadOrders() {
  try {
    const orders = await apiRequest("/orders");
    renderOrders(orders);
  } catch (error) {
    orderListEl.innerHTML = `<p>Error: ${error.message}</p>`;
  }
}

async function createOrder() {
  const userId = Number(document.getElementById("userId").value);
  const productId = Number(productSelectEl.value);
  const quantity = Number(document.getElementById("quantity").value);

  try {
    await apiRequest("/orders", {
      method: "POST",
      body: JSON.stringify({ userId, productId, quantity })
    });
    await loadOrders();
  } catch (error) {
    orderListEl.innerHTML = `<p>Error: ${error.message}</p>`;
  }
}

document.getElementById("loadOrdersBtn").addEventListener("click", loadOrders);
document.getElementById("createOrderBtn").addEventListener("click", createOrder);

loadProductOptions();
loadOrders();
