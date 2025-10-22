
let cartCount = 0;
let cartItems = [];


const grid = document.getElementById("product-grid");
const cart = document.getElementById("cart");

// Utility: Create product card
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
    <button class="mt-2 bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700">
      Add to Cart
    </button>
  `;

  const button = card.querySelector("button");
  button.addEventListener("click", () => {
    cartCount++;
    updateCartDisplay();
  });

  return card;
}

// Utility: Update cart display
function updateCartDisplay() {
  cart.textContent = `🧺 Cart: ${cartCount} item${cartCount !== 1 ? "s" : ""}`;
}

// Render all products
function renderProducts() {
  products.forEach((product) => {
    const card = createProductCard(product);
    grid.appendChild(card);
  });
}

// Initialize
renderProducts();
updateCartDisplay();
