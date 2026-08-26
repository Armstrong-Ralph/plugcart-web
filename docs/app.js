const products = [
  { id: "joggers", name: "Joggers", price: 12000, category: "Clothing", description: "Comfort joggers for casual everyday wear.", image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663738303981/GWoaCmuBMMgzDFIy.jpg" },
  { id: "bayonetta-glasses", name: "Bayonetta Glasses", price: 3000, category: "Glasses", description: "A statement pair for your campus fit." },
  { id: "poedagar-watch", name: "Poedagar Watch", price: 22000, category: "Watches", description: "A polished finishing touch for everyday wear." },
  { id: "star-pimple-patches", name: "Star Pimple Patches", price: 500, category: "Skincare", description: "A small skincare essential for your everyday kit." },
  { id: "campus-sandals", name: "Campus Sandals", price: 13000, category: "Footwear", description: "One style, grouped by the colour and size you choose." },
  { id: "period-relief-belt", name: "Period Relief Belt", price: 10000, category: "Wellness", description: "A comfort-focused item for campus days." },
  { id: "cross-pendant-necklace", name: "Necklace With Cross Pendant", price: 7000, category: "Accessories", description: "A simple statement piece for everyday fits." },
  { id: "skull-cap", name: "Skull Cap", price: 3500, category: "Headwear", description: "An easy finishing piece for your look." },
  { id: "belt-5000", name: "Belt", price: 5000, category: "Belts", description: "A current PlugCart belt style." },
  { id: "octobuddy-phone-holder", name: "Octobuddy / Suction Phone Holder", price: 500, category: "Gadgets", description: "A compact suction phone-holder accessory." },
  { id: "demon-slayer-stickers", name: "Demon Slayer Anime Stickers", price: 1000, category: "Stickers", description: "Anime sticker set, sold in a five-piece bundle." },
  { id: "spotify-premium", name: "Spotify Premium", price: 1000, category: "Services", description: "No slots available right now.", unavailable: true },
];

const money = new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 });
const state = { category: "All", search: "", cart: JSON.parse(localStorage.getItem("plugcart-preview-cart") || "{}") };
const grid = document.querySelector("#product-grid");
const filterHost = document.querySelector("#category-filters");
const searchInput = document.querySelector("#product-search");
const count = document.querySelector("#product-count");
const cartCount = document.querySelector("#cart-count");
const dialog = document.querySelector("#cart-dialog");
const cartLines = document.querySelector("#cart-lines");
const cartTotal = document.querySelector("#cart-total");

function categories() { return ["All", ...new Set(products.map((product) => product.category))]; }
function persistCart() { localStorage.setItem("plugcart-preview-cart", JSON.stringify(state.cart)); }
function cartQuantity() { return Object.values(state.cart).reduce((sum, quantity) => sum + quantity, 0); }
function cartSubtotal() { return products.reduce((sum, product) => sum + product.price * (state.cart[product.id] || 0), 0); }
function setCart(productId, change) { state.cart[productId] = Math.max(0, (state.cart[productId] || 0) + change); if (!state.cart[productId]) delete state.cart[productId]; persistCart(); renderCart(); }

function renderFilters() {
  filterHost.innerHTML = categories().map((category) => `<button class="filter ${category === state.category ? "active" : ""}" type="button" data-category="${category}">${category}</button>`).join("");
  filterHost.querySelectorAll("button").forEach((button) => button.addEventListener("click", () => { state.category = button.dataset.category; renderFilters(); renderProducts(); }));
}

function renderProducts() {
  const visible = products.filter((product) => (state.category === "All" || product.category === state.category) && `${product.name} ${product.category}`.toLowerCase().includes(state.search.toLowerCase()));
  count.textContent = `${visible.length} current catalogue ${visible.length === 1 ? "item" : "items"}`;
  grid.innerHTML = visible.length ? visible.map((product) => `
    <article class="product-card">
      <div class="product-media">${product.image ? `<img src="${product.image}" alt="${product.name}" />` : `<div class="photo-pending"><span>▧</span>Photo being added</div>`}</div>
      <div class="product-body"><span class="product-category">${product.category}${product.unavailable ? " · Unavailable" : ""}</span><h3 title="${product.name}">${product.name}</h3><p>${product.description}</p></div>
      <div class="product-footer"><strong>${money.format(product.price)}</strong><button class="add-button" type="button" data-add="${product.id}" ${product.unavailable ? "disabled aria-label=\"Currently unavailable\"" : `aria-label="Add ${product.name} to preview Cart"`}>${product.unavailable ? "—" : "+"}</button></div>
    </article>`).join("") : "<p>No products match that search.</p>";
  grid.querySelectorAll("[data-add]").forEach((button) => button.addEventListener("click", () => setCart(button.dataset.add, 1)));
}

function renderCart() {
  const selected = products.filter((product) => state.cart[product.id]);
  cartCount.textContent = cartQuantity();
  cartLines.innerHTML = selected.length ? selected.map((product) => `<div class="cart-line"><span>${product.name}<small>${money.format(product.price)} × ${state.cart[product.id]}</small></span><button type="button" data-change="${product.id}" data-value="-1" aria-label="Remove one ${product.name}">−</button><strong>${state.cart[product.id]}</strong><button type="button" data-change="${product.id}" data-value="1" aria-label="Add one ${product.name}">+</button></div>`).join("") : "<p class=\"empty-cart\">Your preview Cart is empty. Add an eligible product from the shop.</p>";
  cartTotal.textContent = money.format(cartSubtotal());
  cartLines.querySelectorAll("[data-change]").forEach((button) => button.addEventListener("click", () => setCart(button.dataset.change, Number(button.dataset.value))));
}

searchInput.addEventListener("input", (event) => { state.search = event.target.value; renderProducts(); });
document.querySelector("#open-cart").addEventListener("click", () => dialog.showModal());
document.querySelector("#open-cart-card").addEventListener("click", () => dialog.showModal());
document.querySelector("#close-cart").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
renderFilters(); renderProducts(); renderCart();
