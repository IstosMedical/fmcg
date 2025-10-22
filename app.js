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

function toggleCategoryPanel() {
  document.getElementById("category-panel").classList.toggle("hidden");
}

function openMobileFilters() {
  document.getElementById("mobile-filter-sheet").classList.remove("hidden");
}

function closeMobileFilters() {
  document.getElementById("mobile-filter-sheet").classList.add("hidden");
}

function applyMobileFilters() {
  // Add filter logic here
  closeMobileFilters();
}

function getBadgeIcon(tag) {
  const icons = {
    "Limited Stock": "⏳",
    "Flash Deal": "⚡",
    "Best Seller":
