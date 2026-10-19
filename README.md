# Syariah Digital Check 🌿✨
> **Tagline:** *"Cerdas Sebelum Transaksi, Bijak dalam Pilihan."*

<p align="center">
  <img src="./a_wide_clean_presentation_board_ui_design_mocku.png" alt="Syariah Digital Check UI Board" width="100%" style="border-radius: 12px; box-shadow: 0 8px 30px rgba(0,0,0,0.12);" />
</p>

<p align="center">
  <strong>Platform Edukasi & Evaluasi Mandiri Kepatuhan Syariah pada Transaksi Finansial Digital Modern Indonesia.</strong>
</p>

<p align="center">
  <a href="https://digitalchecksyariah.vercel.app"><img src="https://img.shields.io/badge/Live%20Demo-digitalchecksyariah.vercel.app-065F46?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" /></a>
  <a href="SyariahDigitalCheck_iOS/"><img src="https://img.shields.io/badge/Native%20iOS-Swift%20%26%20SwiftUI-F05138?style=for-the-badge&logo=swift&logoColor=white" alt="Native Swift iOS" /></a>
  <a href="docs/DESIGN.md"><img src="https://img.shields.io/badge/Design%20System-Fintech%20Spec-C89D42?style=for-the-badge" alt="Design System Spec" /></a>
  <a href="docs/design-audit.md"><img src="https://img.shields.io/badge/UX%20Audit-Evidence--Based-065F46?style=for-the-badge" alt="Design Audit" /></a>
  <a href="docs/design-qa-report.md"><img src="https://img.shields.io/badge/QA%20Report-Verified-059669?style=for-the-badge" alt="QA Report" /></a>
  <img src="https://img.shields.io/badge/Platform-iOS%20%7C%20Mobile%20%7C%20Desktop-047857?style=for-the-badge" alt="Responsive" />
  <img src="https://img.shields.io/badge/License-MIT-0F172A?style=for-the-badge" alt="License" />
</p>

---

## 🌐 Live Web & Mobile Production
Aplikasi ini sudah live dan dapat diakses langsung secara publik via browser desktop maupun smartphone (iOS Safari / Android Chrome):  
👉 **[https://digitalchecksyariah.vercel.app](https://digitalchecksyariah.vercel.app)**

Dokumentasi lengkap sistem desain, audit, dan jaminan mutu dapat dibaca di:  
- 📄 **[`docs/DESIGN.md`](./docs/DESIGN.md)** (Spesifikasi Desain & Token)  
- 🔍 **[`docs/design-audit.md`](./docs/design-audit.md)** (Temuan Audit Desain & Aksesibilitas)  
- 📋 **[`docs/design-qa-report.md`](./docs/design-qa-report.md)** (Laporan QA & Verifikasi)  
- 📜 **[`docs/session-history.md`](./docs/session-history.md)** (Riwayat Sesi Kerja & Eksekusi)  

---

## 🌟 Filosofi Desain & Arah Visual

Produk ini dirancang dengan standar kualitas fintech peraih penghargaan yang memancarkan ketenangan, kepercayaan, dan keanggunan:
- **Deep Emerald Green (`#064E3B` / `#065F46`):** Warna utama yang merepresentasikan kemakmuran, integritas, dan stabilitas finansial syariah.
- **Warm Ivory (`#FAF8F5`) & Soft Off-White:** Latar kanvas hangat yang ramah bagi mata dan mendukung pembacaan jangka panjang.
- **Muted Sage (`#E7EDE9` / `#1F3529`):** Permukaan sekunder yang lembut untuk hierarki kartu.
- **Champagne Gold (`#C89D42`):** Aksen lencana dan sorotan indikator skor.
- **Forest Charcoal Text (`#0D281E`):** Kontras teks tinggi yang lulus uji aksesibilitas **WCAG AAA**.
- **8-Point Spacing Grid:** Sistem jarak presisi kelipatan 8px dengan sudut kartu 16–28px dan bayangan bertingkat.
- **Custom Crisp SVG Iconography:** Ikon garis bersih dan profesional tanpa emoji kekanak-kanakan atau grafik generik.

---

## 📱 Arsitektur 10 Layar Lengkap

Aplikasi mencakup perjalanan pengguna lengkap 10 layar interaktif:
1. **Welcome & Onboarding:** Alur 3 tahap **PAUSE → CHECK → CHOOSE** dengan indikator langkah dinamis.
2. **Home Dashboard:** Sapaan personalisasi, tombol aksi utama *30-Second Fast Check*, ringkasan indeks literasi syariah, dan skenario cepat.
3. **Pilihan Kategori Transaksi:** 6 kategori riil (Belanja Online, PayLater & Cicilan, Emas Digital, Tabungan Digital, Langganan Berulang, Donasi & Ziswaf).
4. **Checklist Transaksi 5 Tahap:** 
   - Tahap 1: Struktur Akad & Kontrak
   - Tahap 2: Transparansi Biaya & Denda Keterlambatan
   - Tahap 3: Mekanisme Transaksi & Serah Terima (*Qabdh*)
   - Tahap 4: Aspek Kesesuaian Syariah (Bebas Riba, Gharar, Maysir)
   - Tahap 5: Kesiapan Mengambil Keputusan Pribadi
   - *Dilengkapi Expandable Educational Drawer "Mengapa ini krusial?" pada tiap tahap.*
5. **Hasil Evaluasi Edukatif:** Dial skor persentase, lencana status, poin verifikasi lanjutan, 3 pertanyaan kritis siap-salin untuk Customer Service merchant, dan rekomendasi modul bacaan.
6. **Studi Kasus Transaksi Interaktif:** Simulasi skenario riil (PayLater 0%, Emas Digital, Dropshipping, Free Trial Subscription) dengan telaah fiqih mendalam.
7. **Learning Hub & Rujukan Fatwa:** Mesin pencari instan, filter kategori, dan pembaca artikel interaktif lengkap (*drawer*) dengan kutipan Fatwa DSN-MUI.
8. **Kuis Pilihan Ganda Interaktif:** Soal berbasis penalaran kasus dengan umpan balik instan (pembahasan benar/salah), streak counter, dan rekap skor.
9. **Dashboard Progres Belajar:** Distribusi 4 pilar kompetensi muamalah, riwayat aktivitas, dan level melek finansial syariah.
10. **Profil, Privasi & Pengaturan:** Pengaturan nama lokal, jaminan privasi 100% di perangkat (*client-side*), tombol reset riwayat, dan batasan hukum edukasi.

---

## 💻 Pengontrol Tampilan Responsif (Built-in Viewport Switcher)
Di bagian atas layar aplikasi terdapat controller untuk menguji tampilan:
- **Mobile 390:** Menampilkan frame realistis iPhone 390 × 844 px lengkap dengan speaker notch dan bottom navigation yang aman.
- **Tablet 768:** Mengadaptasi tata letak ke mode 2-kolom tablet.
- **Desktop Fluid:** Tampilan desktop penuh untuk presentasi produk.
- **Design System Modal:** Panel peninjau token warna, tipografi, dan panduan etika.

---

## 📂 Struktur Repositori

```text
Syariah_Digital_Check_Design_and_Prototype/
├── index.html                                           # Master High-Fidelity Responsive Web Application
├── Syariah_Digital_Check_Interactive_Prototype.html     # Standalone Interactive Prototype
├── DESIGN_SYSTEM_AND_UX_SPEC.md                         # Product Design System & UX Architecture Spec
├── README.md                                            # Main Repository Documentation
├── a_wide_clean_presentation_board_ui_design_mocku.png  # Visual Presentation Board
├── Syariah_Digital_Check_UI_UX_Design_Guide.pdf         # UI/UX Specification & Guidelines
├── SyariahDigitalCheck_iOS/                             # 100% Native Swift & SwiftUI iOS App
│   ├── Package.swift                                    # SPM Manifest (Target iOS 16+, macOS 13+)
│   ├── README.md                                        # Xcode Setup & Architecture Guide
│   └── Sources/SyariahDigitalCheck/                     # App, Models, ViewModels, Views & Components
└── Digital_Check/                                       # Cross-platform Expo React Native App & Web Build
    ├── web-build/                                       # Production Web Build (Deployed to Vercel)
    │   ├── index.html                                   # Production build entry point
    │   └── .vercel/                                     # Vercel Project Link (digitalchecksyariah.vercel.app)
    ├── app/                                             # Expo Native Navigation
    ├── src/                                             # Components, Theme & Scoring Engine
    └── package.json                                     # Dependencies
```

---

## ⚖️ Batasan Hukum & Edukasi
Aplikasi ini adalah media edukasi mandiri literasi keuangan syariah. Aplikasi ini tidak menggantikan fatwa resmi dari ulama berwenang, tidak menerbitkan sertifikasi kepatuhan syariah, dan bukan merupakan advis finansial atau investasi perorangan.

---

<p align="center">
  Dibuat dengan standar keunggulan Fintech UX & Komitmen Portofolio Bersih.
</p>
