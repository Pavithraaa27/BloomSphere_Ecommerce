// ===============================
// CART LOGIC WITH LOCAL STORAGE
// ===============================

let cartItems = JSON.parse(localStorage.getItem("cartItems")) || {};

// Save cart to localStorage
function saveCart() {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    updateCartCount();
}

// Add to cart
function addToCart(productName) {
    cartItems[productName] = (cartItems[productName] || 0) + 1;
    saveCart();
    showToast(`${productName} added to cart`);
}

// Load cart items (cart.html)
function loadCartItems() {
    const cartContainer = document.querySelector(".cart-items");
    if (!cartContainer) return;

    cartContainer.innerHTML = "";

    if (Object.keys(cartItems).length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty</p>";
        return;
    }

    Object.entries(cartItems).forEach(([item, quantity]) => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("cart-item");

        itemElement.innerHTML = `
            <span>${item}</span>
            <div class="quantity-controls">
                <button class="decrease">-</button>
                <span>${quantity}</span>
                <button class="increase">+</button>
            </div>
        `;

        // Attach event listeners (NO inline JS)
        itemElement.querySelector(".decrease").addEventListener("click", () => {
            updateQuantity(item, -1);
        });

        itemElement.querySelector(".increase").addEventListener("click", () => {
            updateQuantity(item, 1);
        });

        cartContainer.appendChild(itemElement);
    });
}

// Update quantity
function updateQuantity(item, change) {
    cartItems[item] += change;

    if (cartItems[item] <= 0) {
        delete cartItems[item];
    }

    saveCart();
    loadCartItems();
}

// Clear cart
function clearCart() {
    cartItems = {};
    localStorage.removeItem("cartItems");
    loadCartItems();
    updateCartCount();
}

// ===============================
// CART COUNT BADGE (Optional)
// ===============================

function updateCartCount() {
    const cartCount = document.querySelector(".cart-count");
    if (!cartCount) return;

    const totalItems = Object.values(cartItems).reduce((a, b) => a + b, 0);
    cartCount.textContent = totalItems;
}

// ===============================
// SEARCH FUNCTIONALITY
// ===============================

function initSearch() {
    const searchBtn = document.getElementById("search-btn");
    const searchBox = document.getElementById("search-box");

    if (!searchBtn || !searchBox) return;

    searchBtn.addEventListener("click", () => {
        const searchQuery = searchBox.value.toLowerCase();
        const products = document.querySelectorAll(".product");

        products.forEach(product => {
            const productName = product.querySelector("h3").textContent.toLowerCase();
            product.style.display = productName.includes(searchQuery)
                ? "block"
                : "none";
        });
    });
}

// ===============================
// CHECKOUT BUTTON
// ===============================

function initCheckout() {
    const checkoutBtn = document.querySelector(".checkout-btn");
    if (!checkoutBtn) return;

    checkoutBtn.addEventListener("click", () => {
        window.location.href = "payment.html";
    });
}

// ===============================
// SIMPLE TOAST (Better than alert)
// ===============================

function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 2000);
}

// ===============================
// INIT ON PAGE LOAD
// ===============================

document.addEventListener("DOMContentLoaded", () => {
    loadCartItems();
    initSearch();
    initCheckout();
    updateCartCount();
});
