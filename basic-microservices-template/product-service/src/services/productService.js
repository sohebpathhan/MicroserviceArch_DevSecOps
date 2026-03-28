const products = [
  { id: 1, name: "Phone", price: 699, category: "Electronics" },
  { id: 2, name: "Shoes", price: 120, category: "Fashion" }
];

function getAllProducts() {
  return products;
}

function addProduct({ name, price, category }) {
  const product = {
    id: products.length + 1,
    name,
    price,
    category
  };
  products.push(product);
  return product;
}

module.exports = {
  getAllProducts,
  addProduct
};
