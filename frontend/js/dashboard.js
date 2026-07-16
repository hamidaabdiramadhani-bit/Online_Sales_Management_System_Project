// ==========================================
// dashboard.js
// Online Sales Management System
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    checkLogin();

    loadDashboard();

});

// ==========================================
// Check Login
// ==========================================

function checkLogin() {

    const token = localStorage.getItem("token");

    if (!token) {

        alert("Please login first.");

        window.location.href = "login.html";

    }

}

// ==========================================
// Load Dashboard
// ==========================================

function loadDashboard() {

    loadProductsCount();

    loadCustomersCount();

    loadOrdersCount();

    loadRecentProducts();

}

// ==========================================
// Products Count
// ==========================================

function loadProductsCount() {

    fetch(ENDPOINTS.PRODUCTS, { method: "GET", headers: authHeader() })

        .then(response => response.json())

        .then(products => {

            document.getElementById("total-products").innerHTML =
                products.length;

        })

        .catch(error => {

            console.error(error);

        });

}

// ==========================================
// Customers Count
// ==========================================

function loadCustomersCount() {

    fetch(ENDPOINTS.CUSTOMERS, { method: "GET", headers: authHeader() })

        .then(response => response.json())

        .then(customers => {

            document.getElementById("total-customers").innerHTML =
                customers.length;

        })

        .catch(error => {

            console.error(error);

        });

}

// ==========================================
// Orders Count
// ==========================================

function loadOrdersCount() {

    fetch(ENDPOINTS.ORDERS, { method: "GET", headers: authHeader() })

        .then(response => response.json())

        .then(orders => {

            document.getElementById("total-orders").innerHTML =
                orders.length;

        })

        .catch(error => {

            console.error(error);

        });

}

// ==========================================
// Recent Products
// ==========================================

function loadRecentProducts() {

    fetch(ENDPOINTS.PRODUCTS, { method: "GET", headers: authHeader() })

        .then(response => response.json())

        .then(products => {

            const list = document.getElementById("product-list");

            list.innerHTML = "";

            products.forEach(product => {

                list.innerHTML += `

                    <div class="product-card">

                        <h3>${product.name}</h3>

                        <p>${product.description || "No description available."}</p>

                        <p><strong>Price:</strong> TZS ${product.price}</p>

                        <p><strong>Stock:</strong> ${product.quantity}</p>

                        <p><strong>Category:</strong> ${product.category ? product.category.name : "N/A"}</p>

                    </div>

                `;

            });

        })

        .catch(error => {

            console.error(error);

        });

}

// ==========================================
// Logout
// ==========================================

function logout() {

    localStorage.removeItem("token");

    localStorage.removeItem("cart");

    alert("Logged out successfully");

    window.location.href = "login.html";

}

// ==========================================
// Search Product
// ==========================================

function searchProduct() {

    const keyword =
        document.getElementById("search").value
            .toLowerCase();

    const rows =
        document.querySelectorAll("#product-table tr");

    rows.forEach(row => {

        const text =
            row.innerText.toLowerCase();

        if (text.includes(keyword)) {

            row.style.display = "";

        } else {

            row.style.display = "none";

        }

    });

}

// ==========================================
// Refresh Dashboard
// ==========================================

function refreshDashboard() {

    loadDashboard();

}

// ==========================================
// Go To Products
// ==========================================

function goToProducts() {

    window.location.href =
        "products.html";

}

// ==========================================
// Go To Orders
// ==========================================

function goToOrders() {

    window.location.href =
        "orders.html";

}

// ==========================================
// Go To Customers
// ==========================================

function goToCustomers() {

    window.location.href =
        "customers.html";

}