# Syariah Digital Check — Design System & UX Architecture Specification
**Tagline:** *Cerdas Sebelum Transaksi, Bijak dalam Pilihan*  
**Platform:** Mobile-First Responsive Web Application (390 × 844 viewport primary, adaptive to 768px tablet & 1200px desktop)  
**Live Application URL:** [https://digitalchecksyariah.vercel.app](https://digitalchecksyariah.vercel.app)  
**GitHub Repository:** [https://github.com/Maverick-list/Syariah-Digital-Check](https://github.com/Maverick-list/Syariah-Digital-Check)  

---

## 1. Executive Summary & Product Purpose

**Syariah Digital Check** adalah instrumen edukasi literasi finansial mandiri yang dirancang khusus untuk generasi muda Indonesia. Produk ini memberdayakan konsumen untuk:
1. Mendeteksi klausul tidak transparan, denda bertingkat, dan biaya tersembunyi pada layanan fintech populer (PayLater, E-Commerce, Emas Digital, P2P lending, dan langganan digital).
2. Mempelajari prinsip-prinsip fiqih muamalah kontemporer berbasis fatwa Dewan Syariah Nasional MUI (DSN-MUI) dan standar AAOIFI.
3. Membangun kebiasaan berpikir kritis sebelum mengambil komitmen finansial melalui alur: **PAUSE → CHECK → CHOOSE**.

> **Batasan Hukum & Edukasi (Legal Guardrail):**  
> Produk ini adalah **alat bantu edukasi literasi**, bukan lembaga penasihat keuangan berlisensi, bukan otoritas penerbit fatwa resmi, dan tidak menerbitkan vonis mutlak halal/haram atas entitas bisnis tertentu.

---

## 2. Visual Identity & Design System Tokens

Sistem desain dirancang untuk memancarkan nuansa **kepercayaan (trustworthiness), ketenangan (calm), keanggunan kontemporer (sophistication), dan kepatuhan syariah yang elegan** tanpa terjebak estetika dashboard generik atau ornamen berlebihan.

### 2.1 Color Palette & Accessible Contrast

| Token Nama | Nilai HEX | Peran & Penggunaan | Contrast Ratio (WCAG AAA) |
|---|---|---|---|
| `--emerald-950` | `#032115` | Dark canvas backdrop, Controller bar | 16.8:1 on White |
| `--emerald-900` | `#064E3B` | **Primary Brand Color**, Headers, Primary CTA | 11.2:1 on Ivory |
| `--emerald-800` | `#065F46` | Interactive hover, Sub-brand elements | 8.9:1 on Ivory |
| `--emerald-700` | `#047857` | Active borders, Icons, Focused elements | 6.2:1 on White |
| `--emerald-50`  | `#ECFDF5` | Badge background, Success pill | — |
| `--ivory-base`  | `#FAF8F5` | **Canvas Background** (hangat, ramah mata) | Base |
| `--ivory-card`  | `#FFFFFF` | Permukaan kartu utama (elevated surface) | — |
| `--ivory-warm`  | `#F4EFE6` | Permukaan sekunder, notice disclaimer | — |
| `--ivory-border`| `#E7E2D6` | Hairline border pembatas komponen | — |
| `--sage-900`    | `#1F3529` | Text pada background sage | 12.4:1 |
| `--sage-100`    | `#E7EDE9` | Secondary button background, bar track | — |
| `--sage-50`     | `#F2F6F3` | Callout tips, mini cards background | — |
| `--gold-500`    | `#C89D42` | **Champagne Gold Accent**, badges, star rating | 4.8:1 on Emerald 950 |
| `--gold-50`     | `#FDF9F0` | Warning / gold pill background | — |
| `--text-primary`| `#0D281E` | Tipografi teks utama (Forest Charcoal) | 14.1:1 on Ivory |
| `--text-muted`  | `#667D71` | Deskripsi pendukung & caption metadata | 5.2:1 on White |

---

### 2.2 Typography Hierarchy

Tipografi menggabungkan keanggunan editorial serif pada judul dengan ketegasan sans-serif modern pada data dan elemen interaktif:

- **Display & Headings:** `'Playfair Display', Georgia, serif`
  - H1 Display: `26px` (Desktop: `32px`), Line-height `1.25`, Letter-spacing `-0.01em`, Font-weight `700`
  - H2 Section Title: `20px` (Desktop: `24px`), Line-height `1.3`, Font-weight `700`
  - H3 Card Title: `15px` - `16px`, Line-height `1.35`, Font-weight `700`
- **Body & UI Elements:** `'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif`
  - Body Regular: `13px` - `14px`, Line-height `1.55` - `1.6`, Font-weight `400` / `500`
  - Sub-labels & Hints: `11px` - `12px`, Line-height `1.4`, Font-weight `400`
  - Eyebrows & Badges: `10px` - `11px`, Uppercase, Letter-spacing `0.08em`, Font-weight `700`
  - Button Text: `13px` - `14px`, Font-weight `700`, Letter-spacing `0.02em`

---

### 2.3 8-Point Spacing Grid System

Semua padding, margin, gap, dan dimensi tata letak berpedoman mutlak pada kelipatan 8px (dengan sub-grid 4px untuk elemen mikro):
- `4px` (`--space-1`): Gap mikro, padding horizontal badge kecil.
- `8px` (`--space-2`): Gap ikon ke teks, jarak vertikal antar paragraf mikro.
- `12px` (`--space-3`): Padding kartu internal, gap horizontal tombol.
- `16px` (`--space-4`): Padding kartu standar, margin bawah antar section.
- `20px` (`--space-5`): Padding container layar mobile (390px).
- `24px` (`--space-6`): Radius kartu besar, padding vertikal hero section.
- `32px` (`--space-8`): Spacing antar blok besar, modal sheet header.
- `48px` (`--space-12`): Jarak aman dasar bawah mobile navigation.

---

### 2.4 Radii, Elevation & Shadows

- **Border Radii:**
  - Micro Pill: `9999px` (Pills, Mode switchers, Badge tags)
  - Small Controls: `8px` (Form inputs, Tooltip banners)
  - Medium Controls: `12px` (Secondary buttons, Icon boxes)
  - Standard Cards: `16px` (List cards, Lesson previews)
  - Elevated Cards / Containers: `22px` - `28px` (Hero cards, Modal sheets, Mockup bezel)
- **Delicate Shadows:**
  - Subtle (Level 1): `0 1px 3px rgba(13, 40, 30, 0.04), 0 1px 2px rgba(13, 40, 30, 0.02)`
  - Card Resting (Level 2): `0 4px 16px rgba(13, 40, 30, 0.05), 0 1px 3px rgba(13, 40, 30, 0.03)`
  - Elevated Hover (Level 3): `0 12px 32px rgba(13, 40, 30, 0.08), 0 4px 12px rgba(13, 40, 30, 0.04)`
  - Modal Drawer (Level 4): `0 20px 48px rgba(3, 33, 21, 0.16)`

---

## 3. Screen Inventory & UX Architecture (10 Screens)

### Screen 1: Welcome & Onboarding (PAUSE → CHECK → CHOOSE)
- **Tujuan:** Menanamkan pola pikir sebelum bertransaksi digital.
- **Komponen:**
  - Stepper interaktif 3 tahap dengan indikator titik dinamis:
    1. **PAUSE:** Jeda 30 detik untuk meredam dorongan impulsif flash-sale.
    2. **CHECK:** Analisis 5 pilar kesesuaian syariah & klausul T&C.
    3. **CHOOSE:** Mengambil keputusan bertanggung jawab atau memilih alternatif syariah.
  - Value proposition badge bernuansa Champagne Gold.
  - Disclaimer footer: *"Instrumen Edukasi Literasi Syariah · Bukan Otoritas Fatwa"*.

### Screen 2: Home Dashboard
- **Tujuan:** Hub utama aktivitas pengguna dengan visual bersih dan akses 1-ketukan.
- **Komponen:**
  - Header Emerald dengan salam personalisasi *"Assalamu’alaikum, [Nama Pengguna]"* & avatar.
  - Hero Card *"30-Second Fast Check"* dengan tombol CTA primer mencolok.
  - Ringkasan Progres Belajar: Indeks Pemahaman Syariah (84% Mahir), progress bar, dan statistik cepat.
  - Akses cepat ke Studi Kasus Nyata (PayLater, Emas Digital).
  - Modul Unggulan Hari Ini (*"Perbedaan Esensial Murabahah vs Pinjaman Berbunga"*).

### Screen 3: Transaction Category Selection
- **Tujuan:** Memandu pengguna memilih kategori transaksi yang sesuai konteks hukum fiqihnya.
- **6 Kategori Presisi:**
  1. **Belanja Online & E-Commerce:** Akad Salam / Murabahah / Hak Khiyar.
  2. **PayLater & Cicilan Digital:** Qardh / Murabahah / Hawalah (Titik kritis: Denda keterlambatan).
  3. **Investasi Emas Digital:** Sharf & Wadiah Yad Dhamanah (Titik kritis: Syarat Qabdh Hukmi).
  4. **Tabungan & Deposito Digital:** Wadiah / Mudharabah (Titik kritis: Bagi hasil vs Bunga).
  5. **Langganan Berulang (Subscriptions):** Ijarah Khidmat (Titik kritis: Gharar masa aktif).
  6. **Donasi & ZISWAF Digital:** Hibah / Tabarru' / Wakaf Tunai (Titik kritis: Transparansi amil).

### Screen 4: Five-Stage Transaction Checklist
- **Tujuan:** Proses audit mandiri 5 tahap yang sistematis dan mendalam.
- **Tahapan Checklist:**
  - **Tahap 1: Struktur Akad & Perjanjian:** Menilai kejelasan peran para pihak (penjual riil, agen, atau pemberi utang).
  - **Tahap 2: Transparansi Biaya & Denda:** Meneliti rincian bunga terselubung, provisi, dan mekanisme denda ta'zir.
  - **Tahap 3: Mekanisme Transaksi & Serah Terima (Qabdh):** Memastikan objek transaksi riil dan perpindahan hak milik sah.
  - **Tahap 4: Aspek Kesesuaian Syariah:** Memverifikasi bebas dari Riba, Gharar, dan Maysir.
  - **Tahap 5: Kesiapan Keputusan Pribadi:** Evaluasi kesiapan anggaran dan pemahaman atas konsekuensi wanprestasi.
- **Fitur Khusus:** Expandable Tooltip Drawer *"Kenapa aspek ini krusial?"* yang menyajikan argumentasi dalil dan kaidah fiqih.

### Screen 5: Educational Assessment Result
- **Tujuan:** Menyajikan evaluasi objektif tanpa vonis dogmatis, memprioritaskan langkah verifikasi.
- **Komponen:**
  - Dial Skor Transparansi (0% - 100%) dengan lencana status (Tinggi / Perlu Verifikasi / Risiko Tinggi).
  - Ringkasan temuan edukatif yang mudah dicerna.
  - **Poin Verifikasi Lanjutan:** Daftar klausul spesifik yang perlu dicermati ulang.
  - **Pertanyaan Kritis untuk Merchant / CS:** 3 pertanyaan siap-salin (copy to clipboard) untuk ditanyakan ke pihak penyedia.
  - Rekomendasi modul belajar terkait dan tombol simpan evaluasi.

### Screen 6: Interactive Transaction Case Studies
- **Tujuan:** Menguji kepekaan kritis terhadap skenario riil fintech kontemporer.
- **Filter Kategori:** Semua Kasus, PayLater, Emas, E-Commerce, Subscription.
- **Komponen Modal Detail Kasus:**
  - Deskripsi kasus nyata.
  - Titik kritis analisis syariah.
  - Rekomendasi tindakan bijak konsumen.

### Screen 7: Learning Hub (Pusat Edukasi & Fatwa)
- **Tujuan:** Ensiklopedia muamalah praktis yang dapat diakses kapan saja.
- **Fitur:**
  - Search bar instan (real-time filtering).
  - Filter chip kategori (Prinsip Fiqih, Jenis Akad, Fintech & E-Wallet, Investasi Digital).
  - Full Interactive Lesson Reader Drawer: Artikel lengkap dengan rujukan Fatwa DSN-MUI resmi dan tombol tandai selesai.
  - Referensi Otoritatif: Akses cepat ke kompilasi Fatwa DSN-MUI No. 04, No. 43, No. 77, dan Standar AAOIFI.

### Screen 8: Interactive Multiple-Choice Quiz
- **Tujuan:** Mengukur dan memperdalam pemahaman melalui studi kasus situasional.
- **Fitur:**
  - Pertanyaan situasional berbasis penalaran (bukan hafalan definisi kering).
  - Umpan Balik Instan: Kotak pembahasan hijau/merah yang menguraikan alasan syariah di balik opsi jawaban.
  - Score Counter, Streak counter, dan rekonsiliasi ke profil pengguna.

### Screen 9: Learning Progress Dashboard
- **Tujuan:** Memberikan gambaran holistik atas kurva pembelajaran literasi pengguna.
- **Komponen:**
  - Statistik utama: Checklist Selesai, Modul Dibaca, Akurasi Kuis, dan Level Literasi.
  - Distribusi 4 Pilar Kompetensi (Pemahaman Akad, Deteksi Biaya Riba, Mitigasi Gharar, Etika Konsumsi).
  - Linimasa riwayat aktivitas terkini.

### Screen 10: Profile, Privacy Information, and Settings
- **Tujuan:** Mengelola data pengguna dengan transparansi privasi tingkat tinggi.
- **Komponen:**
  - Pengubahan nama panggilan profil (tersimpan di client-side localStorage).
  - **Jaminan Privasi 100% Client-Side:** Pernyataan bahwa tidak ada data nomor rekening, password, atau identitas finansial sensitif yang diunggah ke server luar.
  - Tombol reset riwayat lokal bersih dengan dialog konfirmasi.
  - Pernyataan Batasan Legal & Otoritas secara eksplisit.

---

## 4. Responsive Viewport Adaptability

Aplikasi menyertakan **Viewport Mode Controller** terintegrasi di bagian atas:
1. **Mode Mobile (Default, 390 × 844 px):** Frame iPhone realistis dengan notch kamera, safe area bawah, dan bottom navigation yang selalu terjangkau ibu jari (*thumb zone*).
2. **Mode Tablet (768 px):** Tata letak kartu 2-kolom yang seimbang dengan ruang baca yang proporsional.
3. **Mode Desktop Fluid (1080 - 1200 px):** Layout responsif penuh untuk presentasi produk dan peninjauan tim teknis.

---

## 5. Ringkasan Implementasi & Deployment

- **Source Code Entry:** [`index.html`](file:///c:/Users/MAVERICK/Downloads/Syariah_Digital_Check_Design_and_Prototype/index.html) (Standar web entry) & [`Syariah_Digital_Check_Interactive_Prototype.html`](file:///c:/Users/MAVERICK/Downloads/Syariah_Digital_Check_Design_and_Prototype/Syariah_Digital_Check_Interactive_Prototype.html).
- **Vercel Live Production URL:** [https://digitalchecksyariah.vercel.app](https://digitalchecksyariah.vercel.app)
- **GitHub Repository Portfolio:** [https://github.com/Maverick-list/Syariah-Digital-Check](https://github.com/Maverick-list/Syariah-Digital-Check)
