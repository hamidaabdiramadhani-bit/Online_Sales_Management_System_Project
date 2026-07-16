// ==========================================
// login.js
// Online Sales Management System
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const loginForm = document.getElementById("login-form");

    if (loginForm) {
        loginForm.addEventListener("submit", loginUser);
    }

});

// ==========================================
// Login Function
// ==========================================


function loginUser(event) {

    event.preventDefault();

    const username = document.getElementById("username").value.trim();

    const password = document.getElementById("password").value.trim();

    if (username === "" || password === "") {

        alert("Please enter username and password.");

        return;

    }

    const loginData = {

        username: username,

        password: password

    };

    fetch(ENDPOINTS.LOGIN, {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(loginData)

    })

        .then(function (response) {

            if (!response.ok) {

                return response.text().then(text => {
                    const message = text || response.statusText;
                    throw new Error(`Login failed (${response.status}): ${message}`);
                });

            }

            return response.json();

        })

        .then(function (data) {

            // Save JWT Token and role; fallback if auth helper is unavailable.
            if (typeof saveToken === "function") {
                saveToken(data.token);
            } else {
                localStorage.setItem("token", data.token);
            }

            if (typeof saveUserRole === "function") {
                saveUserRole(data.role || "USER");
            } else {
                localStorage.setItem("role", data.role || "USER");
            }

            alert("Login Successful.");

            // Redirect based on role
            if (data.role === "ADMIN") {
                window.location.href = "admin-dashboard.html";
            } else {
                window.location.href = "dashboard.html";
            }

        })

        .catch(function (error) {

            console.error("Login error:", error);

            alert(error.message || "Login failed. Check your username and password.");

        });

}

/*
function loginUser(event) {

    event.preventDefault();

    localStorage.setItem("token", "test-token");

    alert("Login Successful");

    window.location.href = "dashboard.html";

}*/

// ==========================================
// Logout Function
// ==========================================

function logout() {

    localStorage.removeItem("token");

    localStorage.removeItem("role");

    window.location.href = "login.html";

}

// ==========================================
// Check Authentication
// ==========================================

function checkLogin() {

    const token = localStorage.getItem("token");

    if (!token) {

        alert("Please login first.");

        window.location.href = "login.html";

    }

}