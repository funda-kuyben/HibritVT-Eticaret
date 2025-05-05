import { API_BASE } from "./api.js";

// Sayfa yüklendiğinde ürünleri getir
document.addEventListener("DOMContentLoaded", async () => {
  const productList = document.getElementById("productList");
  if (!productList) return;

  const res = await fetch(`${API_BASE}/products`);
  const data = await res.json();

  if (data.status === "success") {
    data.data.products.forEach((product) => {
      const div = document.createElement("div");
      div.innerHTML = `
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p>₺${product.price}</p>
        <button onclick="addToCart('${product._id}', '${product.name}', ${product.price})">Sepete Ekle</button>
      `;
      productList.appendChild(div);
    });
  }
});

window.addToCart = async (productId, name, price) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_BASE}/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      productId,
      name,
      price,
      quantity: 1,
    }),
  });

  const data = await res.json();
  alert(data.status === "success" ? "Ürün sepete eklendi" : data.message);
};
