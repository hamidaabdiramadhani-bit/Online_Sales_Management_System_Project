function saveToken(token) {
    localStorage.setItem("token", token);
}

function getToken() {
    return localStorage.getItem("token");
}

function saveUserRole(role) {
    localStorage.setItem("role", role);
}

function getUserRole() {
    return localStorage.getItem("role");
}

function isAdmin() {
    return getUserRole() === "ADMIN";
}

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "login.html";
}

function isLoggedIn() {
    return getToken() !== null;
}

function authHeader() {
    const token = getToken();
    const headers = {
        "Content-Type": "application/json"
    };

    if (token) {
        headers["Authorization"] = "Bearer " + token;
    }

    return headers;
}