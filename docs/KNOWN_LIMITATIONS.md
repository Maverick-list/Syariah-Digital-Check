# Batasan Sistem & Limitasi yang Diketahui (Known Limitations)
**Syariah Digital Check (v2.4.0 Production Release)**

---

## 1. Pendahuluan

Dokumen ini memuat transparansi teknis, operasional, dan batasan yuridis dari platform **Syariah Digital Check**. Transparansi ini penting agar pengguna, auditor produk, dan pemerhati hukum memahami ruang lingkup serta batasan penggunaan platform secara proporsional.

---

## 2. Rincian Batasan yang Diketahui

### 1. Batasan Status Yuridis & Keagamaan
- **Bukan Fatwa Formal**: Hasil evaluasi dari fitur *Cek Transaksi* adalah simulasi literasi berbasis aturan logika (*rule-based heuristic evaluation*) untuk mendeteksi transparansi klausul kontrak. Hasil evaluasi **BUKAN** fatwa hukum syariah mengikat, bukan sertifikasi halal/haram produk, dan bukan legal opinion dari lembaga peradilan.
- **Bukan Penasihat Keuangan Berlisensi**: Platform tidak bertindak sebagai perencana keuangan independen berlisensi OJK (*Certified Financial Planner*) dan tidak memberikan rekomendasi investasi spesifik.

### 2. Keterbatasan Sinkronisasi Lintas Perangkat (Multi-Device)
- **Client-Side Storage**: Karena dirancang dengan prinsip privasi murni (*guest-first privacy*), seluruh riwayat evaluasi dan skor tersimpan di `localStorage` peramban perangkat aktif.
- **Implikasi**: Jika pengguna berpindah dari peramban ponsel Safari ke peramban laptop Chrome, data tidak otomatis sinkron kecuali pengguna mengekspor file cadangan JSON dan mengimpornya kembali. Sinkronisasi otomatis awan membutuhkan arsitektur backend RLS yang telah dispesifikasikan untuk iterasi berikutnya (lihat `docs/BACKEND_AND_SYNC_ARCHITECTURE.md`).

### 3. Dinamika Syarat & Ketentuan Fintech Pihak Ketiga
- **Perubahan Klausul Sepihak**: Platform fintech komersial (ShopeePay, GoPayLater, Kredivo, Pluang, Pegadaian Digital, dsb.) dapat memperbarui dokumen perjanjian pengguna (*Terms of Service*) sewaktu-waktu tanpa pemberitahuan kepada pengembang Syariah Digital Check.
- **Mitigasi**: Pertanyaan evaluasi dirancang secara generik-struktural berdasar esensi akad, bukan berbasis merek dagang tertentu. Pengguna selalu didorong untuk mencocokkan dokumen T&C terbaru yang mereka hadapi.

### 4. Akses Dokumen Eksternal Saat Mode Offline PWA
- **Aset Shell Aplikasi**: Seluruh antarmuka, modul baca teks, studi kasus, dan kuis dapat diakses penuh saat perangkat tanpa koneksi internet melalui Service Worker (`syariah-check-v2`).
- **Tautan PDF Eksternal**: Tautan dokumen PDF fatwa DSN-MUI asli yang mengarah ke peladen eksternal resmi (seperti `mui.or.id` atau repositori regulasi OJK) memerlukan koneksi internet aktif dan tidak dicache secara lokal demi menjaga efisiensi memori perangkat pengguna.

### 5. Fokus Konsensus Fiqih DSN-MUI di Indonesia
- **Yurisdiksi Regulasi**: Materi pembelajaran, kuis, dan evaluasi diselaraskan dengan fatwa konsensus Dewan Syariah Nasional – Majelis Ulama Indonesia (DSN-MUI) dan kerangka regulasi Otoritas Jasa Keuangan (OJK) Republik Indonesia.
- **Perbedaan Pandangan Global**: Di tingkat internasional (seperti standar AAOIFI Bahrain atau fatwa Dewan Syariah Malaysia), mungkin terdapat variasi penafsiran minor pada instrumen tertentu (seperti batasan *qabdh* pada perdagangan emas digital atau skema *ta'widh* ganti rugi). Platform ini memprioritaskan kepatuhan pada fatwa resmi yang berlaku di wilayah hukum Republik Indonesia.

### 6. Batasan Pengujian Input Pengguna
- **Ketergantungan Jawaban Pengguna**: Mesin evaluasi mengandalkan kejujuran dan ketelitian input pengguna dalam membaca klausul kontrak yang dihadapi. Jika pengguna keliru mencentang opsi (misal menganggap ada penyerahan emas padahal tidak ada), hasil evaluasi akan mengikuti input tersebut.
