// ==========================================
// register.js
// Online Sales Management System
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("register-form");

    if (form) {
        form.addEventListener("submit", registerCustomer);
    }

});

function registerCustomer(event) {

    event.preventDefault();

    const firstName =
        document.getElementById("firstName").value.trim();

    const lastName =
        document.getElementById("lastName").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const customer = {

        firstName: firstName,

        lastName: lastName,

        email: email,

        phone: phone

    };

    fetch(ENDPOINTS.CUSTOMERS, {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(customer)

    })

        .then(function (response) {

            if (!response.ok) {

                throw new Error("Registration failed.");

            }

            return response.json();

        })

        .then(function (data) {

            alert("Customer registered successfully.");

            window.location.href = "login.html";

        })

        .catch(function (error) {

            console.error(error);

            alert("Unable to register customer.");

        });

}