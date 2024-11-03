document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm'); // Mendapatkan elemen form login
    const rememberMe = document.getElementById('rememberMe'); // Mendapatkan elemen checkbox 'Remember Me'
    
    // Check if user is remembered
    const savedUser = localStorage.getItem('loggedInUser'); // Mengambil username yang disimpan di localStorage
    if (savedUser) {
        window.location.href = 'presensi.html'; // Langsung ke halaman presensi jika ada user yang diingat
    }

    // Menangani event submit pada form login
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Mencegah pengiriman form secara default
        const username = document.getElementById('username').value; // Mengambil username dari input
        const password = document.getElementById('password').value; // Mengambil password dari input

        // Simulasi login validasi
        if (username === "testUser" && password === "testPassword") { // Validasi username dan password
            if (rememberMe.checked) {
                localStorage.setItem('loggedInUser', username); // Menyimpan username jika 'Remember Me' dicentang
            }
            sessionStorage.setItem('loggedInUser', username); // Menyimpan username di sessionStorage
            window.location.href = 'presensi.html'; // Mengarahkan ke halaman presensi
        } else {
            alert("Username atau Password salah!"); // Peringatan jika username atau password salah
        }
    });
});

// Pesan Telegram
function kirimPesan(type) {
    const username = localStorage.getItem("loggedInUser"); // Mengambil username dari localStorage

    if (!username) {
        alert("Silakan login terlebih dahulu!"); // Peringatan jika belum login
        window.location.href = "index.html"; // Mengarahkan ke halaman login
        return;
    }

    let message; // Variabel untuk menyimpan pesan
    switch (type) {
        case "datang":
            message = `Presensi berhasil! Selamat Datang ${username}`; // Pesan untuk presensi datang
            break;
        case "pulang":
            message = `Presensi berhasil! Selamat Jalan ${username}`; // Pesan untuk presensi pulang
            break;
        case "wfh":
            message = `Work From Home oleh ${username}`; // Pesan untuk presensi WFH
            break;
        default:
            message = "Tipe presensi tidak dikenali."; // Pesan jika tipe presensi tidak dikenali
    }

    // Mengirim pesan ke Telegram
    const token = "7528327776:AAEpEOwz75EocPfdTsf1fMWWTdZ6UJhfU7Y"; // Token bot Telegram
    const chatId = "1312023283"; // ID chat untuk mengirim pesan
    const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`; // URL untuk mengirim pesan

    // Mengirimkan permintaan untuk mengirim pesan
    fetch(telegramUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: chatId,
            text: message // Pesan yang akan dikirim
        })
    }).then(response => response.json()) // Mengubah response menjadi JSON
      .then(data => {
        if (data.ok) {
            alert("Pesan berhasil dikirim ke Telegram!"); // Peringatan jika pengiriman berhasil
        } else {
            alert("Gagal mengirim pesan ke Telegram."); // Peringatan jika pengiriman gagal
        }
    });
}

// Fungsi logout
function logout() {
    localStorage.removeItem("loggedInUser"); // Menghapus username dari localStorage
    sessionStorage.removeItem("loggedInUser"); // Menghapus username dari sessionStorage
    window.location.href = "index.html"; // Mengarahkan ke halaman login
}
