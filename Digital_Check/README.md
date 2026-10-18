# Syariah Digital Check — Native Cross-Platform Application (React Native + Expo)

Aplikasi mobile edukasi literasi keuangan syariah untuk generasi muda digital dengan konsep utama:
**PAUSE → CHECK → CHOOSE**.

---

## ⚠️ Batasan Edukasi & Pernyataan Resmi (Mandatory Disclaimer)
> **Aplikasi ini merupakan sarana edukasi literasi keuangan syariah, bukan fatwa, nasihat keuangan profesional, atau sertifikasi kepatuhan syariah.** Informasi transaksi dapat berbeda berdasarkan akad, ketentuan produk, dan kondisi yang berlaku. Periksa dokumen resmi dan konsultasikan pertanyaan syariah kepada pihak yang kompeten.

Aplikasi ini:
1. **TIDAK** mengeluarkan fatwa halal/haram.
2. **TIDAK** memberikan sertifikasi kepatuhan syariah suatu produk.
3. **TIDAK** meminta kredensial akun, password, atau PIN perbankan/fintech.
4. **Semua skenario transaksi bersifat fiktif** untuk sarana latihan berpikir kritis.

---

## 🎨 Identitas Visual & Desain
- **Palette**: Emerald Green (`#065F46`), Deep Forest (`#043B30`), Mint Emerald (`#047857`), Warm Ivory (`#F8F7F0`), Restrained Gold (`#C7A76C`), Slate Ink (`#102A24`).
- **Typography & Accessibility**: Inter / system font, touch target minimum 48pt (`MIN_TOUCH`), dukungan `reduceMotion` untuk transisi layar.
- **Komponen**: Button (Primary, Secondary, Ghost, Danger), OptionRow (Radio selection), Notice (Good, Warning, Info), Card & ListItem, ProgressBar, Chip & StatusLabel, TextField.

---

## 📱 Daftar Layar & Fitur Lengkap

### Selesai Diimplementasikan (Completed Features):
1. **01 Splash Screen (`/splash`)**:
   - Brand mark shield checkmark emas, animasi loading progress bar yang adaptif terhadap setelan aksesibilitas (*reduced motion*).
   - Pengalihan otomatis ke onboarding (jika belum pernah selesai) atau langsung ke beranda.
2. **02 Onboarding (`/onboarding`)**:
   - 3 slide edukasi interaktif: **PAUSE**, **CHECK**, **CHOOSE**.
   - Indikator dot, tombol Lewati, Kembali, dan Mulai. Status tersimpan di AsyncStorage.
3. **03 Home Dashboard (`/(tabs)`)**:
   - Kartu ucapan pengguna dinamis, hero call-to-action 30-detik check.
   - Indikator status draft checklist yang belum selesai (*resume check*).
   - Kartu ringkasan progres belajar interaktif menuju dashboard progres.
   - Skenario pilihan unggulan & materi belajar hari ini.
4. **04 Pemilihan Kategori Transaksi (`/(tabs)/check`)**:
   - 6 kategori transaksi: Belanja online, PayLater/cicilan, Emas digital, Tabungan digital, Langganan digital berulang, Donasi digital.
   - Akses melanjutkan sesi draft dan riwayat pemeriksaan terakhir.
5. **05 Checklist 5 Tahap Interaktif (`/checklist`)**:
   - Alur 5 langkah: (1) Akad/Struktur, (2) Transparansi Biaya, (3) Mekanisme Transaksi, (4) Aspek Syariah, (5) Kesiapan Memilih.
   - Tombol *Sebelumnya* dan *Lanjut*, validasi input wajib pilih, indikator persentase 20%–100%.
   - Auto-save draft lokal sehingga pengguna tidak kehilangan jawaban saat berpindah aplikasi.
6. **06 Hasil Pemeriksaan Edukatif (`/result`)**:
   - Klasifikasi 3 tingkat kejelasan informasi:
     - `understood` (*Informasi utama sudah dipahami*)
     - `needs_checking` (*Masih perlu diperiksa*)
     - `not_understood` (*Belum cukup dipahami*)
   - Daftar butir spesifik yang perlu diperiksa dan saran pertanyaannya.
   - Daftar rekomendasi materi dan rujukan sumber regulator/fatwa terkait.
7. **07 Skenario Transaksi (`/scenarios` & `/scenarios/[id]`)**:
   - 6 studi kasus fiktif lengkap dengan umpan balik instan setiap opsi jawaban.
   - Pencatatan otomatis ke progres saat skenario berhasil diselesaikan.
8. **08 Learning Hub (`/(tabs)/learn` & `/lesson/[id]`)**:
   - Filter materi per kategori dan kotak pencarian teks (real-time).
   - Detail artikel modul literasi, poin-poin penting, rujukan fatwa/regulator resmi, serta tombol *Tandai selesai dibaca*.
9. **09 Kuis Singkat Interaktif (`/(tabs)/quiz`)**:
   - Kuis pilihan ganda evaluasi pemahaman, penjelasan benar/salah instan, kalkulasi skor akhir, serta opsi ulangi kuis (*retry*).
10. **10 Progress Dashboard (`/progress`)**:
    - Kalkulasi progres komprehensif (checklist, materi dibaca, skenario, skor kuis terbaik).
    - Statistik metrik dan log aktivitas pembelajaran terakhir.
11. **11 Profil & Pengaturan (`/(tabs)/profile`)**:
    - Pengaturan nama panggilan dengan validasi sanitasi input (tersimpan offline).
    - Menu privasi data, daftar rujukan sumber, tautan katalog UI library, dan tombol *Reset Progres* dengan konfirmasi dialog aman.
12. **12 UI Component Library (`/ui-library`)**:
    - Showcase interaktif seluruh varian komponen antarmuka.
13. **13 Sumber & Referensi (`/sources`)**:
    - Transparansi rujukan DSN-MUI (Fatwa No. 117/2018, 111/2017, 77/2010, 116/2017), OJK, dan Bank Indonesia beserta catatan status verifikasinya.

### Status Pengujian & Kualitas Kode:
- **TypeScript**: 100% lulus `npm run typecheck` tanpa error.
- **Unit & Logic Tests**: 37 pengujian Jest lulus 100% (`checklist.test.ts`, `scoring.test.ts`, `store.test.ts`).
- **Bundling Verification**: Lulus `expo export --platform web` (Metro bundler memproses 904 modul tanpa kegagalan impor).

---

## 🚀 Panduan Menjalankan Aplikasi

### Prasyarat
- Node.js versi 18+ (Disarankan versi LTS atau v20+)
- npm
- Ponsel fisik atau Emulator Android / iOS Simulator dengan aplikasi **Expo Go**.

### Langkah Instalasi
1. Buka terminal di folder proyek ini:
   ```powershell
   cd "c:\Users\MAVERICK\Downloads\Syariah_Digital_Check_Design_and_Prototype\Digital_Check"
   ```
2. Pastikan dependensi sudah terpasang:
   ```powershell
   npm install
   ```

### 1. Menjalankan di Android
- **Menggunakan HP Fisik (Expo Go - Paling Praktis)**:
  1. Pasang aplikasi **Expo Go** dari Google Play Store pada HP Android Anda.
  2. Pastikan HP dan komputer berada di jaringan Wi-Fi yang sama.
  3. Jalankan server Expo:
     ```powershell
     npx expo start
     ```
  4. Buka aplikasi Expo Go di HP, lalu scan QR Code yang muncul di terminal.
- **Menggunakan Android Emulator (Android Studio)**:
  1. Buka Android Studio dan jalankan emulator Android (AVD).
  2. Di terminal proyek, jalankan:
     ```powershell
     npx expo start --android
     ```
  *(Aplikasi Expo Go akan otomatis terpasang dan terbuka di emulator).*

### 2. Menjalankan di iOS
- **Menggunakan iPhone Fisik (Expo Go)**:
  1. Pasang aplikasi **Expo Go** dari Apple App Store di iPhone Anda.
  2. Pastikan iPhone dan komputer berada di jaringan Wi-Fi yang sama.
  3. Jalankan:
     ```powershell
     npx expo start
     ```
  4. Buka aplikasi Kamera bawaan iPhone, arahkan ke QR Code di terminal, lalu ketuk pop-up untuk membukanya di Expo Go.
- **Menggunakan iOS Simulator (Memerlukan macOS & Xcode)**:
  - *Catatan jujur: Pembuatan build native langsung atau simulator iOS lokal memerlukan sistem operasi macOS dengan Xcode. Jika Anda berada di Windows, gunakan metode iPhone Fisik via Expo Go di atas atau Expo Application Services (EAS Build).*
  - Di macOS:
    ```bash
    npx expo start --ios
    ```

### 3. Menjalankan di Browser (Web Preview)
Anda juga dapat melihat dan mencoba interaksinya secara instan di peramban web:
```powershell
npx expo start --web
```

### 4. Menjalankan Pengujian Unit Otomatis (Jest)
Untuk memverifikasi logika checklist, scoring kuis, dan persistensi:
```powershell
npm test
```
Untuk memverifikasi ketepatan tipe data:
```powershell
npm run typecheck
```

---

## ⚖️ Catatan Transparansi & Validasi Build
Sesuai prinsip transparansi teknik:
- **Build APK Mandiri / iOS IPA Standalone**: *Belum dilakukan kompilasi EAS Build cloud atau native Gradle/Xcode build di perangkat lokal.* Pengujian di lingkungan lokal dilakukan via runtime Expo dan simulasi bundler Metro (lulus 100%).
- **Edukasi Syariah**: Dokumen fatwa dan portal regulator telah diverifikasi nomor dan konteksnya per Oktober 2026 sebagai sarana literasi edukatif.
