// =====================================
// admin-dashboard.js
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    checkLogin();

    loadDashboard();

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
// Load Dashboard
// =====================================

function loadDashboard() {

    loadProducts();

    loadCategories();

    loadCustomers();

    loadOrders();

}

// =====================================
// Total Products
// =====================================

function loadProducts() {

    fetch(ENDPOINTS.PRODUCTS, { method: "GET", headers: authHeader() })

        .then(response => response.json())

        .then(data => {

            document.getElementById("total-products").innerHTML = data.length;

        })

        .catch(error => console.log(error));

}

// =====================================
// Total Categories
// =====================================

function loadCategories() {

    fetch(ENDPOINTS.CATEGORIES, { method: "GET", headers: authHeader() })

        .then(response => response.json())

        .then(data => {

            document.getElementById("total-categories").innerHTML = data.length;

        })

        .catch(error => console.log(error));

}

// =====================================
// Total Customers
// =====================================

function loadCustomers() {

    fetch(ENDPOINTS.CUSTOMERS, { method: "GET", headers: authHeader() })

        .then(response => response.json())

        .then(data => {

            document.getElementById("total-customers").innerHTML = data.length;

        })

        .catch(error => console.log(error));

}

// =====================================
// Total Orders
// =====================================

function loadOrders() {

    fetch(ENDPOINTS.ORDERS, { method: "GET", headers: authHeader() })

        .then(response => response.json())

        .then(data => {

            document.getElementById("total-orders").innerHTML = data.length;

        })

        .catch(error => console.log(error));

}

// =====================================
// Logout
// =====================================

function logout() {

    localStorage.removeItem("token");

    alert("Logged Out Successfully");

    window.location.href = "login.html";

}