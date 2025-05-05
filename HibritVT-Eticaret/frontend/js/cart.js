import { api, getToken, setHeaders } from "./api.js";

document.addEventListener("DOMContentLoaded", async () => {
  const cartContainer = document.getElementById("cartContainer");
  const checkoutBtn = document.getElementById("checkoutBtn");

  // Sepeti getir
  try {
    const res = await fetch(`${api}/cart`, setHeaders());
    const data = await res.json();

    if (data.status === "success") {
      renderCart(data.data.cart);
    } else {
      alert("Sepet yüklenemedi.");
    }
  } catch (err) {
    alert("Hata oluştu: " + err.message);
  }

  // Sipariş Tamamla
  checkoutBtn?.addEventListener("click", async () => {
    const res = await fetch(`${api}/cart/checkout`, {
      method: "POST",
      ...setHeaders(),
    });
    const result = await res.json();
    alert(result.message || result.msg);
    location.reload();
  });
});

// Sepeti ekrana yazdır
function renderCart(cart) {
  const cartContainer = document.getElementById("cartContainer");
  if (!cartContainer) return;

  if (cart.items.length === 0) {
    cartContainer.innerHTML = "<p>Sepetiniz boş.</p>";
    return;
  }

  cartContainer.innerHTML =
    cart.items
      .map(
        (item) => `
    <div>
      <p><strong>${item.name}</strong> - ${item.price}₺ x ${item.quantity}</p>
      <button onclick="removeItem('${item.productId}')">Kaldır</button>
    </div>
  `
      )
      .join("") + `<p><strong>Toplam: ${cart.totalPrice}₺</strong></p>`;
}

// Ürün kaldır
window.removeItem = async (productId) => {
  const res = await fetch(`${api}/cart/${productId}`, {
    method: "DELETE",
    ...setHeaders(),
  });
  const result = await res.json();
  alert("Ürün kaldırıldı");
  location.reload();
};
