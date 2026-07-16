// =======================================
// cart.js
// Online Sales Management System
// =======================================

document.addEventListener("DOMContentLoaded", function () {

    loadCart();

    updateCartSummary();

});

// =======================================
// Load Cart
// =======================================

function loadCart() {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const tableBody = document.getElementById("cart-body");

    const emptyCart = document.getElementById("empty-cart");

    tableBody.innerHTML = "";

    if (cart.length === 0) {

        emptyCart.style.display = "block";

        return;

    }

    emptyCart.style.display = "none";

    cart.forEach(function (item, index) {

        tableBody.innerHTML += `

        <tr>

            <td>${item.name}</td>

            <td>TZS ${item.price}</td>

            <td>

                <input
                    type="number"
                    min="1"
                    value="${item.quantity}"
                    onchange="updateQuantity(${index}, this.value)"
                >

            </td>

            <td>

                TZS ${(item.price * item.quantity).toFixed(2)}

            </td>

            <td>

                <button
                    class="remove-btn"
                    onclick="removeItem(${index})">

                    Remove

                </button>

            </td>

        </tr>

        `;

    });

}

// =======================================
// Update Quantity
// =======================================

function updateQuantity(index, quantity) {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart[index].quantity = parseInt(quantity);

    localStorage.setItem("cart", JSON.stringify(cart));

    loadCart();

    updateCartSummary();

}

// =======================================
// Remove Item
// =======================================

function removeItem(index) {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    loadCart();

    updateCartSummary();

}

// =======================================
// Cart Summary
// =======================================

function updateCartSummary() {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    let subtotal = 0;

    cart.forEach(function (item) {

        subtotal += item.price * item.quantity;

    });

    const tax = subtotal * 0.18;

    const total = subtotal + tax;

    document.getElementById("subtotal").innerHTML =
        "TZS " + subtotal.toFixed(2);

    document.getElementById("tax").innerHTML =
        "TZS " + tax.toFixed(2);

    document.getElementById("total").innerHTML =
        "TZS " + total.toFixed(2);

}

// =======================================
// Continue Shopping
// =======================================

function continueShopping() {

    window.location.href = "products.html";

}

// =======================================
// Checkout
// =======================================

function checkout() {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;

    }

    window.location.href = "checkout.html";

}

// =======================================
// Clear Cart
// =======================================

function clearCart() {

    if (confirm("Are you sure you want to clear your cart?")) {

        localStorage.removeItem("cart");

        loadCart();

        updateCartSummary();

    }

}