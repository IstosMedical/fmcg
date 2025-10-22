let cartCount = 0;
const grid = document.getElementById("product-grid");
const cart = document.getElementById("cart");

products.forEach((p) => {
  const card = document.createElement("div");
  card.className = "min-w-[250px] bg-white rounded-lg shadow p-4 hover:scale-105 transition-transform duration-300 ease-in-out";

  card.innerHTML = `
    <img src="${p.image}" alt="${p.name}" class="w-full h-40 object-cover rounded" />
    <h3 class="mt-2 text-lg font-semibold">${p.name}</h3>
    <p class="text-green-700 font-bold">₹${p.price}</p>
    <button class="mt-2 bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700">
      Add to Cart
    </button>
  `;

  card.querySelector("button").onclick = () => {
    cartCount++;
    cart.textContent = `🧺 Cart: ${cartCount} item${cartCount !== 1 ? "s" : ""}`;
  };

  grid.appendChild(card);
});
