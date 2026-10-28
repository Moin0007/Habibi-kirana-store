// Habibi Kirana Store
// Replace these demo prices with your actual shop prices.
const products = [
    { id: 1, name: "Rice (1 kg)", price: 60, category: "Grocery", image: "🍚" },
    { id: 2, name: "Wheat Flour (1 kg)", price: 40, category: "Grocery", image: "🌾" },
    { id: 3, name: "Cooking Oil (1 L)", price: 140, category: "Grocery", image: "🫗" },
    { id: 4, name: "Sugar (1 kg)", price: 45, category: "Grocery", image: "🍚" },
    { id: 5, name: "Salt (1 kg)", price: 25, category: "Grocery", image: "🧂" },
    { id: 6, name: "Biscuits", price: 10, category: "Snacks", image: "🍪" },
    { id: 7, name: "Potato Chips", price: 20, category: "Snacks", image: "🍟" },
    { id: 8, name: "Chocolate", price: 20, category: "Snacks", image: "🍫" },
    { id: 9, name: "Cold Drink", price: 40, category: "Drinks", image: "🥤" },
    { id: 10, name: "Mineral Water", price: 20, category: "Drinks", image: "💧" },
    { id: 11, name: "Bathing Soap", price: 35, category: "Personal Care", image: "🧼" },
    { id: 12, name: "Shampoo", price: 5, category: "Personal Care", image: "🧴" }
];
let cart = [];
let selectedCategory = "All";
function displayProducts() {
    const search = document.getElementById("search").value.toLowerCase();
    const filtered = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(search);
        const matchesCategory =
            selectedCategory === "All" ||
            product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });
    const container = document.getElementById("products");
    if (filtered.length === 0) {
        container.innerHTML = "<p>No products found.</p>";
        return;
    }
    container.innerHTML = filtered.map(product => `
        <div class="product-card">
            <div class="product-image">${product.image}</div>
            <h3>${product.name}</h3>
            <p>₹${product.price}</p>
            <button class="add-btn" onclick="addToCart(${product.id})">
                + Add to Cart
            </button>
        </div>
    `).join("");
}
function filterCategory(category) {
    selectedCategory = category;
    displayProducts();
}
function addToCart(id) {
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ id: id, quantity: 1 });
    }
    updateCart();
}
function changeQuantity(id, change) {
    const item = cart.find(item => item.id === id);
    if (!item) return;
    item.quantity += change;
    if (item.quantity <= 0) {
        cart = cart.filter(item => item.id !== id);
    }
    updateCart();
}
function updateCart() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("cart-count").textContent = count;
    const total = cart.reduce((sum, item) => {
        const product = products.find(p => p.id === item.id);
        return sum + product.price * item.quantity;
    }, 0);
    document.getElementById("cart-total").textContent = total;
    const container = document.getElementById("cart-items");
    if (cart.length === 0) {
        container.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }
    container.innerHTML = cart.map(item => {
        const product = products.find(p => p.id === item.id);
        return `
            <div class="cart-item">
                <span>${product.image} ${product.name}</span>
                <span>
                    <button onclick="changeQuantity(${item.id}, -1)">−</button>
                    ${item.quantity}
                    <button onclick="changeQuantity(${item.id}, 1)">+</button>
                </span>
                <strong>₹${product.price * item.quantity}</strong>
            </div>
        `;
    }).join("");
}
function toggleCart() {
    const section = document.getElementById("cart-section");
    section.classList.toggle("hidden");
    if (!section.classList.contains("hidden")) {
        updateCart();
        section.scrollIntoView({ behavior: "smooth" });
    }
}
function checkout() {
    if (cart.length === 0) {
        alert("Please add products to your cart first!");
        return;
    }
    // IMPORTANT: Replace with your shop's WhatsApp number.
    // Use country code + number, without +, spaces, or dashes.
    const phoneNumber = "91XXXXXXXXXX";
    if (!/^91\d{10}$/.test(phoneNumber)) {
        alert("Shop owner: Please add your WhatsApp number in script.js first.");
        return;
    }
    let message = "Hello Habibi Kirana Store! I want to order:\n\n";
    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        message += `${product.name} x ${item.quantity} = ₹${product.price * item.quantity}\n`;
    });
    const total = cart.reduce((sum, item) => {
        const product = products.find(p => p.id === item.id);
        return sum + product.price * item.quantity;
    }, 0);
    message += `\nTotal: ₹${total}\n`;
    message += "\nPlease confirm my order.";
    const url = "https://wa.me/" + phoneNumber +
        "?text=" + encodeURIComponent(message);
    window.open(url, "_blank");
}
displayProducts();
updateCart();
