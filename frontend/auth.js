console.log("auth.js loaded");

// ================= REGISTER =================
const registerBtn = document.getElementById("registerBtn");

if (registerBtn) {
    registerBtn.addEventListener("click", async () => {

        console.log("Register clicked");

        const name = document.getElementById("regName").value;
        const email = document.getElementById("regEmail").value;
        const password = document.getElementById("regPassword").value;

        const response = await fetch("http://localhost:8081/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        });

        const result = await response.text();
        alert(result);
    });
}


// ================= LOGIN =================
const loginBtn = document.getElementById("loginBtn");

if (loginBtn) {
    loginBtn.addEventListener("click", async () => {

        console.log("Login clicked");

        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        const response = await fetch("http://localhost:8081/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const result = await response.text();
        alert(result);

        // ✅ REDIRECT FIX (INSIDE LOGIN ONLY)
        if (result === "Login Successful") {
            window.location.href = "index.html";
        }
    });
}