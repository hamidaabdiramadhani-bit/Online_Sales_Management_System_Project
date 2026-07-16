// =====================================
// admin-customers.js
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    checkLogin();

    loadCustomers();

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
// Load Customers
// =====================================

function loadCustomers() {

    fetch(ENDPOINTS.CUSTOMERS, { method: "GET", headers: authHeader() })

        .then(response => response.json())

        .then(customers => {

            const table =
                document.getElementById("customersTable");

            table.innerHTML = "";

            customers.forEach(customer => {

                table.innerHTML += `

            <tr>

                <td>${customer.id}</td>

                <td>${customer.firstName}</td>

                <td>${customer.lastName}</td>

                <td>${customer.email}</td>

                <td>${customer.phone}</td>

                <td>

                    <button
                        class="edit-btn"
                        onclick="editCustomer(${customer.id})">

                        Edit

                    </button>

                    <button
                        class="delete-btn"
                        onclick="deleteCustomer(${customer.id})">

                        Delete

                    </button>

                </td>

            </tr>

            `;

            });

        })

        .catch(error => {

            console.log(error);

        });

}

// =====================================
// Edit Customer
// =====================================

function editCustomer(id) {

    alert("Edit Customer ID: " + id);

    // You can implement update form later.

}

// =====================================
// Delete Customer
// =====================================

function deleteCustomer(id) {

    if (!confirm("Are you sure you want to delete this customer?")) {

        return;

    }

    fetch(ENDPOINTS.CUSTOMERS + "/" + id, { method: "DELETE", headers: authHeader() })

        .then(response => {

            if (response.ok) {

                alert("Customer Deleted Successfully");

                loadCustomers();

            } else {

                alert("Failed to delete customer.");

            }

        })

        .catch(error => {

            console.log(error);

        });

}

// =====================================
// Search Customer
// =====================================

function searchCustomer() {

    const keyword = document
        .getElementById("search")
        .value
        .toLowerCase();

    const rows = document.querySelectorAll("#customersTable tr");

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
// Refresh Customers
// =====================================

function refreshCustomers() {

    loadCustomers();

}

// =====================================
// Logout
// =====================================

function logout() {

    localStorage.removeItem("token");

    localStorage.removeItem("role");

    localStorage.removeItem("cart");

    alert("Logged out successfully");

    window.location.href = "login.html";

}