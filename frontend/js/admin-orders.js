// =====================================
// admin-orders.js
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    checkLogin();

    loadOrders();

});

// =====================================
// Check Login
// =====================================

function checkLogin() {

    if (!isLoggedIn() || !isAdmin()) {

        alert("Admin access required. Please login as admin.");

        window.location.href = "login.html";

    }

}

// =====================================
// Load Orders
// =====================================

function loadOrders() {

    fetch(ENDPOINTS.ORDERS, { method: "GET", headers: authHeader() })

        .then(response => response.json())

        .then(orders => {

            const table =
                document.getElementById("ordersTable");

            table.innerHTML = "";

            orders.forEach(order => {

                table.innerHTML += `

            <tr>

                <td>${order.id}</td>

                <td>${order.customer.firstName} ${order.customer.lastName}</td>

                <td>${order.orderDate}</td>

                <td>TZS ${order.totalAmount}</td>

            </tr>

            `;

            });

        })

        .catch(error => {

            console.log(error);

        });

}

// =====================================
// Search Orders
// =====================================

function searchOrders() {

    const keyword = document
        .getElementById("search")
        .value
        .toLowerCase();

    const rows = document.querySelectorAll("#ordersTable tr");

    rows.forEach(row => {

        const text = row.innerText.toLowerCase();

        if (text.includes(keyword)) {

            row.style.display = "";

        } else {

            row.style.display = "none";

        }

    });

}

// =====================================
// Refresh Orders
// =====================================

function refreshOrders() {

    loadOrders();

}

// =====================================
// Logout
// =====================================

function logout() {

    localStorage.removeItem("token");

    localStorage.removeItem("cart");

    alert("Logged out successfully");

    window.location.href = "login.html";

}