# Analisis Risiko Tersisa & Rencana Mitigasi (Remaining Risks)
**Syariah Digital Check (v2.4.0 Production Release)**
*Dokumen Manajemen Risiko Pasca-Audit Independen*

---

## 1. Pendahuluan

Sebagai bentuk komitmen terhadap integritas keinsinyuran dan keterbukaan produk, dokumen ini memetakan seluruh risiko yang tersisa (*residual risks*) setelah rilis produksi versi 2.4.0. Setiap risiko dianalisis tingkat keparahannya (*severity*), probabilitas kemunculannya (*likelihood*), serta langkah mitigasi operasional yang telah dan perlu dilakukan.

---

## 2. Matriks Risiko Tersisa

| ID Risiko | Deskripsi Risiko | Keparahan | Probabilitas | Mitigasi yang Telah Diterapkan | Rekomendasi Mitigasi Lanjutan |
| :---: | :--- | :---: | :---: | :--- | :--- |
| **RSK-01** | **Kehilangan Data Akibat Pembersihan Cache Browser**<br>Pengguna menghapus riwayat peramban atau berpindah perangkat, menyebabkan data progres lokal terhapus. | **Sedang** | **Tinggi** | Tersedia fitur **Ekspor Data (JSON)** mandiri yang memungkinkan pengguna mengunduh arsip aktivitas kapan saja. | Terapkan sinkronisasi cloud terenkripsi opsional (Fase Masa Depan) berbasis RLS bagi pengguna yang menginginkan akun lintas perangkat. |
| **RSK-02** | **Perubahan Struktur URL Dokumen Fatwa Eksternal**<br>Tautan dokumen PDF resmi di situs eksternal MUI (`mui.or.id`) atau OJK mengalami pergeseran tautan (*broken link*). | **Rendah** | **Sedang** | Menyertakan nomor resmi dan tanggal penetapan fatwa secara eksplisit di antarmuka, sehingga pengguna tetap dapat mencari dokumen secara mandiri. | Buat bot pemantau kesehatan tautan (*link health check*) berkala di GitHub Actions untuk mendeteksi status HTTP 404 pada tautan rujukan. |
| **RSK-03** | **Dinamika Klausul Fintech Komersial Pihak Ketiga**<br>Penyedia paylater atau e-commerce memperbarui T&C secara sepihak dengan struktur biaya baru yang belum tercakup di kuesioner. | **Sedang** | **Tinggi** | Kuesioner dirancang berbasis esensi hukum muamalah umum (kejelasan akad, alur dana vs alur barang, denda keterlambatan), bukan berbasis merek dagang spesifik. | Buka saluran umpan balik komunitas (`#contact`) untuk melaporkan jenis biaya atau skema baru yang muncul di industri fintech. |
| **RSK-04** | **Salah Persepsi Edukasi sebagai Fatwa Formal**<br>Pengguna atau entitas usaha keliru menganggap hasil kalkulator sebagai vonis halal/haram mutlak atau legitimasi hukum perdata. | **Tinggi** | **Rendah** | Menempatkan kotak sanggahan resmi (*disclaimer*) dan pernyataan non-afiliasi secara mencolok di Beranda, Profil, dan Footer situs. | Tetap mempertahankan bahasa evaluasi berbasis transparansi klausul ("Dipahami", "Perlu Perhatian", "Berisiko") daripada vonis absolut "Halal/Haram". |
| **RSK-05** | **Ketergantungan pada Instalasi PWA (Non-Store)**<br>Pengguna awam yang terbiasa mengunduh dari Google Play Store / Apple App Store kesulitan menemukan tombol "Add to Home Screen". | **Rendah** | **Sedang** | Disediakan modal panduan visual langkah-demi-langkah pemasangan di iOS Safari dan Android Chrome. | Bangun bundel aplikasi native (APK/AAB dan IPA) memanfaatkan basis kode yang ada di `Digital_Check/` menggunakan Expo EAS Build di masa mendatang. |

---

## 3. Protokol Tanggap Darurat & Kontak Dukungan

Jika ditemukan anomali hukum fiqih, inkonsistensi kalkulasi akad, atau kerentanan teknis:
1. **Pelaporan Masalah**: Pengguna dapat mengirimkan laporan melalui formulir dalam aplikasi (`#contact`) atau melalui email `halo@syariahdigitalcheck.id`.
2. **Karantina Konten**: Konten yang diperselisihkan keabsahan rujukannya akan segera ditandai `PENDING_REVIEW` dan sementara waktu ditarik dari bank soal kuis atau modul aktif hingga diverifikasi oleh dewan pakar.
3. **Pemberitahuan Transparan**: Setiap perbaikan substansial akan dicatat secara transparan pada dokumen `docs/RELEASE_NOTES.md`.
