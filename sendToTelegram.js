function kirimPesanTelegram(type, username) {
    const token = "7528327776:AAEpEOwz75EocPfdTsf1fMWWTdZ6UJhfU7Y"; // Token bot Telegram
    const chatId = "1312023283"; // ID chat untuk mengirim pesan
    const now = new Date(); // Mendapatkan waktu saat ini
    const waktu = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }); // Format waktu
    const tanggal = now.toLocaleDateString('id-ID', { year: 'numeric', month: '2-digit', day: '2-digit' }); // Format tanggal

    let pesan; // Variabel untuk menyimpan pesan
    if (type === "datang") {
        pesan = `Presensi berhasil!\nNama: ${username}\nKehadiran: ${tanggal}\npukul ${waktu}`; // Pesan untuk presensi datang
    } else if (type === "pulang") {
        pesan = `Presensi berhasil!\nNama: ${username}\nPulang: ${tanggal}\npukul ${waktu}`; // Pesan untuk presensi pulang
    }

    // URL untuk mengirim pesan ke Telegram
    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(pesan)}`;

    // Mengirimkan permintaan untuk mengirim pesan
    fetch(url)
        .then(response => {
            if (response.ok) {
                console.log("Pesan Telegram terkirim!"); // Log jika pengiriman berhasil
            } else {
                console.error("Gagal mengirim pesan ke Telegram."); // Log jika pengiriman gagal
            }
        })
        .catch(error => {
            console.error("Error:", error); // Log jika terjadi error
        });
}
