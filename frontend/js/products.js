// ===============================
// products.js
// ===============================

// Wait until the page loads
document.addEventListener("DOMContentLoaded", loadProducts);


// Function to load all products
function loadProducts() {

    // Get JWT Token from localStorage
    const token = localStorage.getItem("token");

    // Check if user is logged in
    if (!token) {

        alert("Please login first.");

        window.location.href = "login.html";

        return;
    }


    // Call Spring Boot API
    fetch(ENDPOINTS.PRODUCTS, {

        method: "GET",

        headers: authHeader()

    })

        .then(function (response) {

            // Check if unauthorized
            if (response.status === 401) {

                alert("Session expired. Please login again.");

                localStorage.removeItem("token");

                window.location.href = "login.html";

                return;
            }

            return response.json();

        })

        .then(function (products) {

            displayProducts(products);

        })

        .catch(function (error) {

            console.error(error);

            alert("Unable to load products.");

        });

}



// Display Products
function displayProducts(products) {

    const productContainer =
        document.getElementById("product-list");

    productContainer.innerHTML = "";



    products.forEach(function (product) {

        productContainer.innerHTML += `

        <div class="product-card">

            <img src="images/product.png">

            <h3>${product.name}</h3>

            <p>${product.description}</p>

            <div class="price">

                TZS ${product.price}

            </div>

            <button onclick="addToCart(${product.id})">

                Add To Cart

            </button>

        </div>

        `;

    });

}



// Add To Cart

function addToCart(productId) {

    alert("Product ID : " + productId);

}