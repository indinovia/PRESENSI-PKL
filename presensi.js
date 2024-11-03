// Fungsi untuk memperbarui waktu dan tanggal real-time
function updateTime() {
    const clock = document.getElementById("clock"); // Mendapatkan elemen dengan ID 'clock'
    const date = document.getElementById("date");   // Mendapatkan elemen dengan ID 'date'

    const now = new Date(); // Mengambil waktu saat ini
    clock.innerHTML = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }); // Menampilkan waktu dalam format lokal
}

// Memperbarui waktu setiap detik
setInterval(updateTime, 1000); // Memanggil fungsi updateTime setiap 1000 milidetik (1 detik)

// Fungsi untuk mengirimkan presensi
function kirimPesan(type) {
    const username = localStorage.getItem("loggedInUser"); // Mengambil username dari localStorage

    if (!username) {
        alert("Silakan login terlebih dahulu!"); // Peringatan jika belum login
        window.location.href = "index.html"; // Mengarahkan ke halaman login
        return;
    }

    let message; // Variabel untuk menyimpan pesan presensi
    const now = new Date(); // Mengambil waktu saat ini
    const waktu = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }); // Mengambil waktu dalam format lokal
    const tanggal = now.toLocaleDateString('id-ID', { year: 'numeric', month: '2-digit', day: '2-digit' }); // Mengambil tanggal dalam format lokal

    // Menentukan pesan berdasarkan jenis presensi
    switch (type) {
        case "datang":
            message = `Presensi berhasil! Selamat Datang ${username}`; // Pesan untuk presensi datang
            break;
        case "pulang":
            message = `Presensi berhasil! Selamat Jalan ${username}`; // Pesan untuk presensi pulang
            break;
    }

    document.getElementById("presensi-message").textContent = message; // Menampilkan pesan di elemen presensi-message
    kirimPesanTelegram(type, username); // Mengirim pesan ke Telegram
}

// Fungsi untuk mengecek status login saat halaman dimuat
document.addEventListener('DOMContentLoaded', function () {
    if (!localStorage.getItem('loggedInUser')) { // Cek apakah ada username di localStorage
        alert("Silakan login terlebih dahulu!"); // Peringatan jika belum login
        window.location.href = "index.html"; // Mengarahkan ke halaman login
    }
});

// Fungsi logout
function logout() {
    localStorage.removeItem("loggedInUser"); // Menghapus username dari localStorage
    window.location.href = "index.html"; // Mengarahkan ke halaman login
}

// Fungsi untuk mengirim lokasi ke Telegram
function kirimLokasiKeTelegram(latitude, longitude, type, username) {
    const token = "7528327776:AAEpEOwz75EocPfdTsf1fMWWTdZ6UJhfU7Y"; // Token bot Telegram
    const chatId = "1312023283"; // ID chat untuk mengirim pesan
    const locationMessage = `Lokasi presensi:\nNama: ${username}\nLatitude: ${latitude}\nLongitude: ${longitude}`; // Pesan lokasi
    
    // URL untuk mengirim pesan ke Telegram
    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(locationMessage)}`;

    // Mengirimkan permintaan untuk mengirim lokasi ke Telegram
    fetch(url)
        .then(response => {
            if (response.ok) {
                console.log("Lokasi terkirim ke Telegram!"); // Log jika pengiriman berhasil
            } else {
                console.error("Gagal mengirim lokasi ke Telegram."); // Log jika pengiriman gagal
            }
        })
        .catch(error => {
            console.error("Error:", error); // Log error jika terjadi kesalahan
        });
}
