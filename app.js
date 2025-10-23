// 🎨 Tailwind ClassMap
const classMap = {
  card: "w-full sm:w-[48%] md:w-[31%] lg:w-[23%] bg-white rounded-xl shadow-md p-4 hover:shadow-lg hover:scale-[1.03] transition-all duration-300 ease-in-out",
  badge: "absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded shadow z-10 flex items-center gap-1",
  image: "w-full h-32 object-cover rounded",
  title: "mt-2 text-sm font-semibold leading-snug",
  price: "text-green-700 font-bold text-sm",
  button: "bg-orange-600 text-white px-3 py-1 rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors duration-200",
};

let cartCount = 0;
let cartItems = [];

const grid = document.getElementById("product-grid");
const cartCountDisplay = document.getElementById("cart-count");
const sectionHeader = document.getElementById("section-header");

// 🧠 Icon logic for urgency badges
function getBadgeIcon(tag) {
  const icons = {
    "Limited Stock": "⏳",
    "Flash Deal": "⚡",
    "Best Seller": "🔥",
    "New Arrival": "🆕",
    "Deal of the Day": "💥",
    "🔥 Fast Moving": "🔥",
    "⏳ Limited Stock": "⏳",
    "💥 Deal of the Day": "💥"
  };
  return icons[tag] || "🏷️";
}

// 🧩 Create product card
function createProductCard(product) {
  const card = document.createElement("div");
  card.className = classMap.card;

  const badge = product.tag
    ? `<div class="${classMap.badge}">${getBadgeIcon(product.tag)} ${product.tag}</div>`
    : "";

  card.innerHTML = `
    <div class="relative">
      ${badge}
      <img src="${product.image}" alt="${product.name}" class="${classMap.image}" />
      <button class="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full p-1 hover:bg-opacity-80 transition">❤️</button>
    </div>
    <h3 class="${classMap.title}">${product.name}</h3>
    <p class="${classMap.price}">₹${product.price}</p>
    <button class="${classMap.button} mt-2">Add to Cart</button>
  `;

  const button = card.querySelector("button:last-of-type");
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

// 🛒 Filter products by category
function filterProducts(category) {
  sectionHeader.querySelector("h2").textContent = category === "All" ? "All Products" : category;
  sectionHeader.querySelector("p").textContent = "Fast delivery available on select items. Limited stock—order now!";
  grid.innerHTML = "";

  const filtered = category === "All"
    ? products
    : products.filter(p => p.category === category);

  filtered.forEach(product => {
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

  cartItems.forEach(item => {
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

// 📱 Mobile filter sheet logic
function openMobileFilters() {
  document.getElementById("mobile-filter-sheet").classList.remove("hidden");
}

function closeMobileFilters() {
  document.getElementById("mobile-filter-sheet").classList.add("hidden");
}

function applyMobileFilters() {
  // Placeholder for actual filter logic
  closeMobileFilters();
}

// 🚀 Initialize
filterProducts("All");
updateCartDisplay();
