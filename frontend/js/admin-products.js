// =====================================
// admin-products.js
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    checkLogin();

    loadCategories();

    loadProducts();

    document
        .getElementById("productForm")
        .addEventListener("submit", saveProduct);

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

    fetch(ENDPOINTS.CATEGORIES, { headers: authHeader() })

        .then(response => response.json())

        .then(categories => {

            let select =
                document.getElementById("category");

            select.innerHTML = "";

            categories.forEach(category => {

                select.innerHTML += `

            <option value="${category.id}">

                ${category.name}

            </option>

            `;

            });

        })

        .catch(error => console.log(error));

}

// =====================================
// Load Products
// =====================================

function loadProducts() {

    fetch(ENDPOINTS.PRODUCTS, { headers: authHeader() })

        .then(response => response.json())

        .then(products => {

            let table =
                document.getElementById("productsTable");

            table.innerHTML = "";

            products.forEach(product => {

                table.innerHTML += `

            <tr>

                <td>${product.id}</td>

                <td>${product.name}</td>

                <td>${product.price}</td>

                <td>${product.quantity}</td>

                <td>${product.category.name}</td>

                <td>

                    <button
                    class="edit-btn">

                    Edit

                    </button>

                    <button
                    class="delete-btn"
                    onclick="deleteProduct(${product.id})">

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
// Save Product
// =====================================

function saveProduct(event) {

    event.preventDefault();

    const product = {

        name:
            document.getElementById("name").value,

        description:
            document.getElementById("description").value,

        price:
            document.getElementById("price").value,

        quantity:
            document.getElementById("quantity").value,

        category: {

            id:
                document.getElementById("category").value

        }

    };

    fetch(ENDPOINTS.PRODUCTS, {

        method: "POST",

        headers: Object.assign({ "Content-Type": "application/json" }, authHeader()),

        body: JSON.stringify(product)

    })

        .then(response => response.json())

        .then(data => {

            alert("Product Added Successfully");

            document
                .getElementById("productForm")
                .reset();

            loadProducts();

        })

        .catch(error => console.log(error));

}

// =====================================
// Delete Product
// =====================================

function deleteProduct(id) {

    if (!confirm("Delete this product?")) {

        return;

    }

    fetch(ENDPOINTS.PRODUCTS + "/" + id, { method: "DELETE", headers: authHeader() })

        .then(() => {

            alert("Product Deleted");

            loadProducts();

        })

        .catch(error => console.log(error));

}

// =====================================
// Logout
// =====================================

function logout() {

    localStorage.removeItem("token");

    window.location.href = "login.html";

}