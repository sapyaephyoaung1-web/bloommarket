const products = [
  { id: 1, name: "Avocado", price: 2.50, emoji: "🥑" },
  { id: 2, name: "Strawberries", price: 4.00, emoji: "🍓" },
  { id: 3, name: "Sourdough Loaf", price: 5.50, emoji: "🍞" },
  { id: 4, name: "Free-range Eggs", price: 3.80, emoji: "🥚" },
  { id: 5, name: "Honey Jar", price: 7.20, emoji: "🍯" },
  { id: 6, name: "Basil Plant", price: 4.50, emoji: "🌿" },
  { id: 7, name: "Tomatoes", price: 3.00, emoji: "🍅" },
  { id: 8, name: "Cheese Wedge", price: 6.40, emoji: "🧀" }
];

let cart = loadCart();

function loadCart() {
  const saved = localStorage.getItem("bloomCart");
  return saved ? JSON.parse(saved) : [];
}

function saveCart() {
  localStorage.setItem("bloomCart", JSON.stringify(cart));
}

function renderProducts(containerId, list) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = "";
  list.forEach(product => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="image">${product.emoji}</div>
      <div class="info">
        <h3>${product.name}</h3>
        <div class="price">$${product.price.toFixed(2)}</div>
        <button onclick="addToCart(${product.id})">Add to cart</button>
      </div>
    `;
    container.appendChild(card);
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const item = cart.find(i => i.id === id);
  if (item) {
    item.quantity += 1;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, quantity: 1 });
  }
  saveCart();
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  renderCart();
}

function renderCart() {
  const container = document.getElementById("cart-items");
  if (!container) return;
  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = '<p class="empty">Your cart is empty.</p>';
  }

  cart.forEach(item => {
    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <div>
        <div class="name">${item.name}</div>
        <div class="qty">$${item.price.toFixed(2)} × ${item.quantity}</div>
      </div>
      <button class="remove-button" onclick="removeFromCart(${item.id})">Remove</button>
    `;
    container.appendChild(row);
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  document.getElementById("cart-total").textContent = "$" + total.toFixed(2);
  document.getElementById("cart-count").textContent = count;
}

function toggleCart() {
  document.getElementById("cart-panel").classList.toggle("open");
}

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }
  alert("Thank you for your order!");
  cart = [];
  saveCart();
  renderCart();
  toggleCart();
}

function sendMessage() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  if (!name || !email || !message) {
    alert("Please fill in all fields.");
    return;
  }
  alert("Thanks, " + name + "! Your message has been sent.");
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("message").value = "";
}

renderCart();
