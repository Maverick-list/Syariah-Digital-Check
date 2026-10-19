# Syariah Digital Check — Native Swift & SwiftUI iOS App 🌿

> **Tagline:** *"Cerdas Sebelum Transaksi, Bijak dalam Pilihan."*  
> **Platform:** iOS 16.0+, iPadOS 16.0+, macOS 13.0+ (Catalyst/Designed for iPad)  
> **Language & Framework:** Swift 5.9+ / SwiftUI (Declarative UI)  
> **Architecture:** Clean MVVM (Model - View - ViewModel) + Combine State Persistence  

---

## 📱 Ringkasan Proyek iOS

Folder ini memuat implementasi **100% Native Swift & SwiftUI** dari aplikasi **Syariah Digital Check**. Seluruh komponen UI, palet warna, tipografi, dan alur evaluasi syariah dibangun menggunakan standar iOS terkini:

* **Sistem Navigasi:** Native iOS `TabView` dengan 5 tab utama (Beranda, Cek Transaksi, Edukasi, Kuis, Profil).
* **Animasi Skor:** Circular Progress Dial SwiftUI murni menggunakan `Shape.trim(from:to:)` dengan animasi kurva halus.
* **Integrasi Sistem:** Mendukung `UIPasteboard` (salin pertanyaan ke clipboard dengan 1 ketukan), `UserDefaults` (penyimpanan lokal persisten di perangkat), dan Safe Area insets (Dynamic Island & Home Indicator).
* **Ikonografi:** Sepenuhnya menggunakan Apple **SF Symbols** dengan varian hierarki warna (`brandEmerald800`, `brandGold500`, `brandTextPrimary`).

---

## 🚀 Cara Menjalankan di Xcode (Mac)

Aplikasi ini dikemas sebagai **Swift Package** mandiri tanpa ketergantungan CocoaPods atau dependensi pihak ketiga:

1. Buka folder ini di Mac kamu.
2. Klik dua kali berkas **`Package.swift`** (atau buka Xcode, pilih **File → Open**, lalu pilih folder `SyariahDigitalCheck_iOS`).
3. Pilih skema target **SyariahDigitalCheck** dan pilih Simulator iPhone (misalnya: *iPhone 15 Pro* atau *iPhone 16*).
4. Tekan tombol **Run (⌘ + R)**.
5. Untuk melihat tampilan visual secara instan tanpa simulator, buka berkas tampilan apapun (misalnya [HomeView.swift](Sources/SyariahDigitalCheck/Views/HomeView.swift)) dan aktifkan **SwiftUI Canvas Preview (⌥ + ⌘ + P)**.

---

## 📂 Struktur Berkas & Modul

```text
SyariahDigitalCheck_iOS/
├── Package.swift                                      # SPM Manifest (Target iOS 16+, macOS 13+)
├── README.md                                          # Dokumentasi & Panduan Setup
└── Sources/
    └── SyariahDigitalCheck/
        ├── SyariahDigitalCheckApp.swift               # @main App Entry Point
        ├── Theme/
        │   └── ColorTokens.swift                      # Emerald, Ivory, Sage, Gold Color Extensions
        ├── Models/
        │   ├── Category.swift                         # 6 Kategori Transaksi & Pertanyaan Kritis CS
        │   ├── ChecklistStep.swift                    # 5 Tahap Evaluasi & Rujukan Fatwa DSN-MUI
        │   ├── LessonItem.swift                       # Modul Edukasi & Rujukan Fatwa
        │   └── QuizItem.swift                         # Bank Soal Kuis Pilihan Ganda & Pembahasan
        ├── ViewModels/
        │   └── AppState.swift                         # ObservableObject & Persistensi UserDefaults
        └── Views/
            ├── MainTabView.swift                      # 5-Tab iOS Navigation
            ├── HomeView.swift                         # Beranda, Hero 30-Detik & 3 Pilar Muamalah
            ├── CategorySelectView.swift               # Pemilihan Kategori Transaksi
            ├── ChecklistView.swift                    # 5-Tahap Checklist & Drawer Edukasi
            ├── ResultView.swift                       # Ring Skor Persentase & Salin Pertanyaan CS
            ├── CheckContainerView.swift               # Navigasi Dinamis Kategori → Cek → Hasil
            ├── LearnView.swift                        # Pusat Edukasi, Pencarian & Sheet Fatwa
            ├── QuizView.swift                         # Kuis Interaktif & Umpan Balik Instan
            ├── ProfileView.swift                      # Profil, Pengaturan Nama & Reset Data
            └── Components/
                └── ScoreRingView.swift                # Komponen SwiftUI Cincin Skor Animasi
```

---

## 🎨 Palet Token Desain SwiftUI

| Token Nama | Kode Hex | Peran Visual |
|---|---|---|
| `Color.brandEmerald900` | `#064E3B` | Warna utama merek & identitas syariah |
| `Color.brandEmerald800` | `#065F46` | Tombol CTA utama & indikator aktif |
| `Color.brandIvoryBase` | `#FAF8F5` | Latar belakang kanvas anti-silau |
| `Color.brandIvoryCard` | `#FFFFFF` | Permukaan kartu elevasi |
| `Color.brandSage50` | `#F2F6F3` | Permukaan drawer edukasi & catatan kritis |
| `Color.brandGold500` | `#C89D42` | Aksen champagne-gold, lencana & bintang |
| `Color.brandTextPrimary` | `#0D281E` | Teks dengan kontras tinggi (WCAG AAA) |
