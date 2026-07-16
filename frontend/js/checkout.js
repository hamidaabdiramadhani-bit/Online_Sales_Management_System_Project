// ==========================================
// checkout.js
// Online Sales Management System
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    loadOrderSummary();

    document
        .getElementById("checkout-form")
        .addEventListener("submit", placeOrder);

});

// ==========================================
// Load Order Summary
// ==========================================

function loadOrderSummary() {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const orderItems = document.getElementById("order-items");

    let total = 0;

    orderItems.innerHTML = "";

    cart.forEach(function (item) {

        total += item.price * item.quantity;

        orderItems.innerHTML += `

        <div class="summary-item">

            <span>

                ${item.name}
                (x${item.quantity})

            </span>

            <span>

                TZS ${(item.price * item.quantity).toFixed(2)}

            </span>

        </div>

        `;

    });

    document.getElementById("order-total").innerHTML =
        "TZS " + total.toFixed(2);

}

// ==========================================
// Place Order
// ==========================================

function placeOrder(event) {

    event.preventDefault();

    const token = localStorage.getItem("token");

    if (token == null) {

        alert("Please login first.");

        window.location.href = "login.html";

        return;

    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;

    }

    const customerId =
        document.getElementById("customerId").value;

    const orderItems = [];

    let totalAmount = 0;

    cart.forEach(function (item) {

        totalAmount += item.price * item.quantity;

        orderItems.push({

            productId: item.id,

            quantity: item.quantity

        });

    });

    const order = {

        customerId: Number(customerId),

        items: orderItems

    };

    fetch(ENDPOINTS.ORDERS, {

        method: "POST",

        headers: Object.assign({ "Content-Type": "application/json" }, authHeader()),

        body: JSON.stringify(order)

    })

        .then(function (response) {

            if (!response.ok) {

                throw new Error("Failed to place order");

            }

            return response.json();

        })

        .then(function (data) {

            alert("Order placed successfully.");

            localStorage.removeItem("cart");

            window.location.href = "dashboard.html";

        })

        .catch(function (error) {

            console.error(error);

            alert("Unable to place order.");

        });

}

// ==========================================
// Back To Cart
// ==========================================

function backToCart() {

    window.location.href = "cart.html";

}

// ==========================================
// Cancel Order
// ==========================================

function cancelOrder() {

    if (confirm("Cancel this order?")) {

        window.location.href = "cart.html";

    }

}