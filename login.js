document.addEventListener('DOMContentLoaded', function () {
    // Cek jika ada user yang masih login sebelumnya
    const savedUser = localStorage.getItem('loggedInUser');
    if (savedUser) {
        window.location.href = 'presensi.html';
    }
});

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const rememberMe = document.getElementById("rememberMe").checked;

    // Ambil data user dari localStorage
    const savedUser = JSON.parse(localStorage.getItem(username));

    if (savedUser && savedUser.password === password) {
        if (rememberMe) {
            localStorage.setItem("loggedInUser", username);
        }
        alert("Login berhasil!");
        window.location.href = "presensi.html";
    } else {
        const errorMessage = document.getElementById("error-message");
        errorMessage.style.display = "block";
        errorMessage.textContent = "Username atau password salah!";
    }
});
