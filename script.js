// Cart logic with localStorage integration
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || {};

function addToCart(productName) {
    if (cartItems[productName]) {
        cartItems[productName]++;
    } else {
        cartItems[productName] = 1;
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    alert(`${productName} has been added to your cart!`);
}

// Load cart items on cart.html page
function loadCartItems() {
    const cartContainer = document.querySelector('.cart-items');
    cartContainer.innerHTML = '';

    if (Object.keys(cartItems).length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty</p>';
        return;
    }

    Object.entries(cartItems).forEach(([item, quantity]) => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <span>${item} x${quantity}</span>
            <div class="quantity-controls">
                <button onclick="updateQuantity('${item}', -1)" ${quantity === 1 ? 'disabled' : ''}>-</button>
                <span>${quantity}</span>
                <button onclick="updateQuantity('${item}', 1)">+</button>
            </div>
        `;
        cartContainer.appendChild(itemElement);
    });
}

// Update quantity and prevent it from going below 1
function updateQuantity(item, change) {
    if (cartItems[item] + change < 1) {
        delete cartItems[item];
    } else {
        cartItems[item] += change;
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    loadCartItems();
}

// Clear all items from the cart
function clearCart() {
    cartItems = {};
    localStorage.removeItem('cartItems');
    loadCartItems();
}

// Redirect to payment page on checkout
const checkoutBtn = document.querySelector('.checkout-btn');
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        window.location.href = 'payment.html';
    });
}

// Clear cart button logic
const clearCartBtn = document.querySelector('.clear-cart-btn');
if (clearCartBtn) {
    clearCartBtn.addEventListener('click', () => {
        clearCart();
    });
}

// Initialize cart page if on cart.html
if (window.location.pathname.includes('cart.html')) {
    loadCartItems();
}

// Search functionality
document.getElementById('search-btn').addEventListener('click', function () {
    let searchQuery = document.getElementById('search-box').value.toLowerCase();
    let products = document.querySelectorAll('.product');

    products.forEach(product => {
        let productName = product.querySelector('h3').textContent.toLowerCase();
        if (productName.includes(searchQuery)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
});
