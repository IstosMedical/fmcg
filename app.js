// 🎨 Tailwind ClassMap for consistent styling
const classMap = {
  card: "min-w-[250px] bg-white rounded-xl shadow-md p-4 hover:shadow-lg hover:scale-[1.03] transition-all duration-300 ease-in-out",
  badge: "absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded shadow",
  image: "w-full h-40 object-cover rounded",
  title: "mt-2 text-lg font-semibold leading-snug",
  price: "text-green-700 font-bold text-base",
  button: "mt-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors duration-200",
  cartPanel: "fixed bottom-4 right-4 bg-white shadow-lg rounded-full px-6 py-3 flex items-center gap-4 z-40 transition-all duration-300 ease-in-out",
  modal: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300",
  modalBox: "bg-white rounded-xl shadow-2xl p-6 w-[90%] max-w-md transition-all duration-300 ease-in-out",
  categoryPanel: "w-64 bg-white shadow-md rounded-xl p-4 sticky top-6 hidden md:block transition-all duration-300 ease-in-out",
  categoryButton: "flex items-center gap-2 text-sm text-gray-700 hover:text-orange-600",
};

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
  card.className = classMap.card;

  const badge = product.tag
    ? `<div class="${classMap.badge}">${product.tag}</div>`
    : "";

  card.innerHTML = `
    <div class="relative">
      ${badge}
      <img src="${product.image}" alt="${product.name}" class="${classMap.image}" />
    </div>
    <h3 class="${classMap.title}">${product.name}</h3>
    <p class="${classMap.price}">₹${product.price}</p>
    <button class="${classMap.button}">Add to Cart</button>
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
