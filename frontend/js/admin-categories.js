// =====================================
// admin-categories.js
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    checkLogin();

    loadCategories();

    document
        .getElementById("categoryForm")
        .addEventListener("submit", saveCategory);

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
// Load Categories
// =====================================

function loadCategories() {

    fetch(ENDPOINTS.CATEGORIES, { method: "GET", headers: authHeader() })

        .then(response => response.json())

        .then(categories => {

            const table =
                document.getElementById("categoryTable");

            table.innerHTML = "";

            categories.forEach(category => {

                table.innerHTML += `

            <tr>

                <td>${category.id}</td>

                <td>${category.name}</td>

                <td>

                    <button
                    class="edit-btn">

                    Edit

                    </button>

                    <button
                    class="delete-btn"
                    onclick="deleteCategory(${category.id})">

                    Delete

                    </button>

                </td>

            </tr>

            `;

            });

        })

        .catch(error => console.log(error));

}

// =====================================
// Save Category
// =====================================

function saveCategory(event) {

    event.preventDefault();

    const category = {

        name:
            document.getElementById("categoryName").value

    };

    fetch(ENDPOINTS.CATEGORIES, {

        method: "POST",

        headers: Object.assign({ "Content-Type": "application/json" }, authHeader()),

        body: JSON.stringify(category)

    })

        .then(response => response.json())

        .then(data => {

            alert("Category Added Successfully");

            document
                .getElementById("categoryForm")
                .reset();

            loadCategories();

        })

        .catch(error => console.log(error));

}

// =====================================
// Delete Category
// =====================================

function deleteCategory(id) {

    alert("Delete endpoint is not available in your backend.");

}

// =====================================
// Logout
// =====================================

function logout() {

    localStorage.removeItem("token");

    localStorage.removeItem("role");

    window.location.href = "login.html";

}