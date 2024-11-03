document.getElementById('signupForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Mencegah reload otomatis saat form disubmit

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Cek apakah username sudah ada
    if (localStorage.getItem(username)) {
        alert("Username sudah digunakan! Silakan pilih username lain."); // Peringatan jika username sudah ada
    } else {
        // Simpan data pengguna di LocalStorage
        const userData = {
            username: username,
            password: password // Untuk demo, langsung simpan; namun biasanya dienkripsi
        };
        localStorage.setItem(username, JSON.stringify(userData)); // Simpan data pengguna

        // Simpan status login dan arahkan ke halaman presensi
        localStorage.setItem('loggedInUser', username); // Simpan status login
        alert("Pendaftaran berhasil! Anda akan diarahkan ke halaman presensi."); // Konfirmasi
        window.location.href = "presensi.html"; // Arahkan ke halaman presensi
    }
});
