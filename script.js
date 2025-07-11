// Product List
const products = [
  { id: 1, name: "Samsung Note 8", category: "mobile", price: 62650, image: "images/mobile1.png" },
  { id: 2, name: "Infinix Note 50 Pro", category: "mobile", price: 45550, image: "images/mobile2.png" },
  { id: 3, name: "Vivo Y50", category: "mobile", price: 69500, image: "images/mobile3.png" },
  { id: 4, name: "Realme Note 50", category: "mobile", price: 79999, image: "images/mobile4.png" },
  
  { id: 5, name: "Headphone", category: "accessories", price: 6000, image: "images/acces1.png" },
  { id: 6, name: "Headphone", category: "accessories", price: 8800, image: "images/acces2.png" },
  { id: 7, name: "Headphone", category: "accessories", price: 9999, image: "images/acces3.jpeg" },
  { id: 8, name: "Headphone", category: "accessories", price: 7550, image: "images/acces4.png" },
  
  { id: 9, name: "Necklace-351", category: "jewelry", price: 4300, image: "images/jewe1.png" },
  { id: 10, name: "Necklace-507", category: "jewelry", price: 13520, image: "images/jewe2.png" },
  { id: 11, name: "Necklace-3254", category: "jewelry", price: 6500, image: "images/jewe3.png" },

  { id: 12, name: "Long Apparel", category: "clothing", price: 12000, image: "images/cloth1.png" },
  { id: 13, name: "Jacket", category: "clothing", price: 5600, image: "images/cloth2.jpeg" },
  { id: 14, name: "Apparel-780", category: "clothing", price: 11000, image: "images/cloth3.png" },
  { id: 15, name: "Suit", category: "clothing", price: 8560, image: "images/cloth4.png" },
  { id: 16, name: "Shirt", category: "clothing", price: 3500, image: "images/cloth5.png" },
  { id: 17, name: "Leather Jacket", category: "clothing", price: 16000, image: "images/cloth6.png" },
  { id: 18, name: "Gents-Caps", category: "clothing", price: 1199, image: "images/cloth7.jpeg" },
  { id: 19, name: "Boys wearing Caps", category: "clothing", price: 700, image: "images/cloth8.jpeg" },
  { id: 20, name: "Fabric-452", category: "clothing", price: 999, image: "images/cloth9.jpg" },
  { id: 21, name: "Navy Blue Let me Sleep", category: "clothing", price: 1499, image: "images/cloth10.png" },
  { id: 22, name: "Yellow Daffy", category: "clothing", price: 1499, image: "images/cloth11.png" },
];

// Cart State
let cart = [];

// DOM References
const productsContainer = document.getElementById("productsContainer");

// Render products
function renderProducts(list) {
  productsContainer.innerHTML = "";
  list.forEach(product => {
    const col = document.createElement("div");
    col.className = "col-md-3";
    col.innerHTML = `
      <div class="card h-100">
        <img src="${product.image}" class="card-img-top" alt="${product.name}">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">Rs. ${product.price.toLocaleString()}</p>
          <button class="btn btn-primary btn-sm" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
      </div>
    `;
    productsContainer.appendChild(col);
  });
}

// Add to cart
function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (product) {
    cart.push(product);
    updateCartUI();
  }
}

// Remove from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}

// Update cart display
function updateCartUI() {
  const container = document.getElementById("cartItemsContainer");
  const count = document.getElementById("cart-count");
  const totalDisplay = document.getElementById("cartTotal");

  container.innerHTML = "";
  count.textContent = cart.length;

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    const div = document.createElement("div");
    div.className = "d-flex justify-content-between align-items-center mb-3 border-bottom pb-2";
    div.innerHTML = `
      <div>
        <strong>${item.name}</strong><br>
        <small>Rs. ${item.price.toLocaleString()}</small>
      </div>
      <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart(${index})">
        <i class="bi bi-trash"></i>
      </button>
    `;
    container.appendChild(div);
  });

  totalDisplay.textContent = `Total: Rs. ${total.toLocaleString()}`;
}

// Filter products by category, search, and price
function filterProducts() {
  const category = document.getElementById("categoryFilter").value;
  const sort = document.getElementById("priceSort").value;
  const search = document.getElementById("searchInput").value.toLowerCase();

  let filtered = [...products];

  if (category !== "all") {
    filtered = filtered.filter(p => p.category === category);
  }

  if (search) {
    filtered = filtered.filter(p => p.name.toLowerCase().includes(search));
  }

  if (sort === "low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === "high") {
    filtered.sort((a, b) => b.price - a.price);
  }

  renderProducts(filtered);
}

  const darkToggle = document.getElementById("darkToggle");
  darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    darkToggle.textContent = isDark ? "☀️" : "🌙";
  });


// Dark mode toggle
// document.getElementById("darkToggle").addEventListener("click", () => {
//   document.body.classList.toggle("dark-mode");
// });

// Event listeners for filter options
document.getElementById("categoryFilter").addEventListener("change", filterProducts);
document.getElementById("priceSort").addEventListener("change", filterProducts);
document.getElementById("searchInput").addEventListener("input", filterProducts);

// Initial render
renderProducts(products);



  