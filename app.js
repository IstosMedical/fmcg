let cartCount = 0;
let cartItems = [];

const grid = document.getElementById("product-grid");
const cartCountDisplay = document.getElementById("cart-count");

// 🧭 Toggle category panel on mobile
function toggleCategoryPanel() {
  const panel = document.getElementById("category-panel");
  panel.classList.toggle("hidden");
}

// 🧩 Create product card
function createProductCard(product) {
  const card = document.createElement("div");
  card.className =
    "min-w-[250px] bg-white rounded-lg shadow p-4 hover:scale-105 transition-transform duration-300 ease-in-out";

  const badge = product.tag
    ? `<div class="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded shadow">${product.tag}</div>`
    : "";

  card.innerHTML = `
    <div class="relative">
      ${badge}
      <img src="${product.image}" alt="${product.name}" class="w-full h-40 object-cover rounded" />
    </div>
    <h3 class="mt-2 text-lg font-semibold">${product.name}</h3>
    <p class="text-green-700 font-bold">₹${product.price}</p>
    <button class="mt-2 bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition-colors">
      Add to Cart
    </button>
  `;

  const button = card.querySelector("button");
  button.addEventListener("click", () => {
    cartCount++;
    cartItems.push(product);
    updateCartDisplay();
  });

  return card;
}

// 🧺 Update cart display
function updateCartDisplay() {
  cartCountDisplay.textContent = cartCount;
}

// 🛒 Render products by category
function filterProducts(category) {
  grid.innerHTML = "";
  const filtered =
    category === "All"
      ? products
      : products.filter((p) => p.category === category);
  filtered.forEach((product) => {
    const card = createProductCard(product);
    grid.appendChild(card);
  });
}

// 🧾 Open checkout modal
function openModal() {
  const modal = document.getElementById("checkout-modal");
  const itemsList = document.getElementById("checkout-items");
  const totalDisplay = document.getElementById("checkout-total");

  itemsList.innerHTML = "";
  let total = 0;

  cartItems.forEach((item) => {
    const li = document.createElement("li");
    li.className = "flex justify-between";
    li.innerHTML = `<span>${item.name}</span><span class="text-green-700 font-semibold">₹${item.price}</span>`;
    itemsList.appendChild(li);
    total += item.price;
  });

  totalDisplay.textContent = `₹${total}`;
  modal.classList.remove("hidden");
}

// ❌ Close modal
function closeModal() {
  document.getElementById("checkout-modal").classList.add("hidden");
}

// ✅ Confirm order
function confirmOrder() {
  alert("Order placed!");
  cartItems = [];
  cartCount = 0;
  updateCartDisplay();
  closeModal();
}

// 🚀 Initialize
filterProducts("All");
updateCartDisplay();
