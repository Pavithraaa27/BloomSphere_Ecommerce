let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ADD TO CART
function addToCart(name, price) {
    const item = cart.find(product => product.name === name);

    if (item) {
        item.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(name + " added to cart 🌿");
}

// DISPLAY CART
function displayCart() {
    const cartContainer = document.querySelector(".cart-items");
    if (!cartContainer) return;

    cartContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        cartContainer.innerHTML += `
            <div class="cart-item">
                <h3>${item.name}</h3>
                <p>Price: Rs ${item.price}</p>
                <p>Quantity: ${item.quantity}</p>
                <button onclick="removeItem(${index})">Remove</button>
            </div>
        `;
    });

    cartContainer.innerHTML += `
        <div class="total">
            <h2>Total: Rs ${total}</h2>
        </div>
    `;
}

// REMOVE ITEM
function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

// CHECKOUT
document.addEventListener("DOMContentLoaded", () => {
    displayCart();

    const checkoutBtn = document.querySelector(".checkout-btn");
    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", () => {
            if (cart.length === 0) {
                alert("Your cart is empty 😢");
            } else {
                window.location.href = "payment.html";
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const searchBox = document.getElementById("search-box");
    const products = document.querySelectorAll(".product");

    if (!searchBox) return;

    searchBox.addEventListener("keyup", () => {
        const value = searchBox.value.toLowerCase();

        products.forEach(product => {
            const name = product.querySelector("h3").textContent.toLowerCase();
            product.style.display = name.includes(value) ? "block" : "none";
        });
    });
});
