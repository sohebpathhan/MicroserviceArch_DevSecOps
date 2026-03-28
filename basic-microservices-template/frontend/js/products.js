const listEl = document.getElementById("productList");

function renderProducts(products) {
  if (!products.length) {
    listEl.innerHTML = "<p>No products yet.</p>";
    return;
  }

  listEl.innerHTML = products
    .map(
      (product) =>
        `<div class="item">#${product.id} - ${product.name} | $${product.price} | ${product.category}</div>`
    )
    .join("");
}

async function loadProducts() {
  try {
    const products = await apiRequest("/products");
    renderProducts(products);
  } catch (error) {
    listEl.innerHTML = `<p>Error: ${error.message}</p>`;
  }
}

async function addProduct() {
  const name = document.getElementById("name").value.trim();
  const price = Number(document.getElementById("price").value);
  const category = document.getElementById("category").value.trim();

  try {
    await apiRequest("/products", {
      method: "POST",
      body: JSON.stringify({ name, price, category })
    });
    await loadProducts();
  } catch (error) {
    listEl.innerHTML = `<p>Error: ${error.message}</p>`;
  }
}

document.getElementById("loadProductsBtn").addEventListener("click", loadProducts);
document.getElementById("addProductBtn").addEventListener("click", addProduct);

loadProducts();
