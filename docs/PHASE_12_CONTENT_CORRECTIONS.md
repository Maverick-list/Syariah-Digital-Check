# Log Koreksi Konten & Presisi Terminologi Syariah (Fase 12)
**Syariah Digital Check (v2.5.0 Master Knowledge Governance)**
*Catatan Koreksi Redaksional, Resolusi Rujukan Usang, & Penyempurnaan Konseptual*

---

## 1. Ringkasan Eksekutif Perbaikan Konten

Selama pelaksanaan audit syariah Fase 12, ditemukan beberapa inkonsistensi penomoran dokumen rujukan, ketergantungan pada regulasi yang telah dicabut, serta penyederhanaan berlebihan (*oversimplification*) yang berpotensi menimbulkan kerancuan hukum bagi masyarakat. Seluruh item tersebut telah **dikoreksi secara tuntas dan diverifikasi dengan naskah primer resmi**.

```
╔══════════════════════════════════════════════════════════════════════════╗
║               LOG REKAPITULASI KOREKSI KONTEN FASE 12                    ║
╠══════════════════════════════════════════════════════════════════════════╣
║ 1. Penggantian Regulasi Dicabut      : POJK 10/2022 ➔ POJK 40/2024        ║
║ 2. Koreksi Misatribusi Kategori Sewa : Murabahah 04/2000 ➔ Ijarah 112/2017 ║
║ 3. Koreksi Misatribusi Investasi     : POJK LPBBTI ➔ POJK 15/2015 & DES   ║
║ 4. Presisi Denda Keterlambatan       : Pemisahan Ta'zir vs Ta'widh vs Riba║
║ 5. Presisi Emas Digital & Qabdh      : Penegasan 1:1 Kustodian Bappebti   ║
║ 6. Presisi Fikih Dropshipping        : Penegasan Wakalah bil Ujrah & Salam║
║ 7. Penambahan Rujukan Kripto & Saham : Ijtima MUI 2021 & Fatwa Saham 135  ║
║ 8. Penambahan Fatwa Tawarruq         : Fatwa DSN-MUI No. 82/2011          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

---

## 2. Perbandingan Komparatif Sebelum & Sesudah Koreksi (Before vs After)

### Koreksi 1: Penggantian Regulasi Usang LPBBTI (Fintech P2P Lending)
- **Lokasi Berkas**: `index.html`, `Digital_Check/src/data/sources.ts`, `docs/SOURCE_REGISTRY.md`.
- **Kondisi Sebelum**: Teks lama masih mengutip POJK No. 10/POJK.05/2022 sebagai rujukan utama perizinan fintech pendanaan online.
- **Koreksi yang Diterapkan**:
  - POJK No. 10/POJK.05/2022 diberi status `Dicabut` dan dialihkan ke arsip historis (`Archived`).
  - Mengintegrasikan **POJK No. 40 Tahun 2024** sebagai regulasi LPBBTI aktif yang resmi mencabut POJK 10/2022, disertai **SEOJK No. 19/SEOJK.06/2023** mengenai pembatasan manfaat ekonomi harian dan batas denda keterlambatan maksimal 100% nilai pokok.

---

### Koreksi 2: Koreksi Misatribusi Rujukan Kategori Langganan Digital (`subscription`)
- **Lokasi Berkas**: `index.html` (objek `categorySourceRefs.subscription`).
- **Kondisi Sebelum**: Kategori langganan aplikasi/software berbayar dikaitkan dengan rujukan `dsnmui-04-2000` (Fatwa tentang Murabahah).
- **Masalah Syariah**: Layanan langganan digital (*SaaS, streaming, cloud*) adalah sewa manfaat jasa/aplikasi, bukan transaksi jual beli barang fisik. Mengaitkannya dengan murabahah adalah kesalahan akad (*takhalluf al-'aqd*).
- **Koreksi yang Diterapkan**: Mengubah ID rujukan menjadi **`dsnmui-112-2017` (Fatwa DSN-MUI No. 112/DSN-MUI/IX/2017 tentang Akad Ijarah)** dan memperjelas hak pembatalan pada klausul perpanjangan otomatis (*auto-renewal*).

---

### Koreksi 3: Koreksi Misatribusi Rujukan Kategori Investasi (`investment`)
- **Lokasi Berkas**: `index.html` (objek `categorySourceRefs.investment`).
- **Kondisi Sebelum**: Kategori investasi digital dikaitkan dengan regulasi POJK No. 40 Tahun 2024 (yang merupakan regulasi LPBBTI / Fintech Lending P2P).
- **Masalah Syariah**: Pasar modal, reksa dana syariah, dan saham syariah diatur dalam rezim hukum pasar modal, bukan regulasi pinjaman fintech pendanaan bersama.
- **Koreksi yang Diterapkan**: Memperbarui rujukan investasi menjadi:
  1. **Fatwa DSN-MUI No. 80/DSN-MUI/III/2011** (Penerapan Prinsip Syariah di Pasar Reguler Efek Ekuitas).
  2. **Fatwa DSN-MUI No. 135/DSN-MUI/V/2020** (Fatwa Saham).
  3. **POJK No. 15/POJK.04/2015** (Penerapan Prinsip Syariah di Pasar Modal & Penapisan Daftar Efek Syariah).

---

### Koreksi 4: Penjelasan Nuansa Denda Keterlambatan (Ta'zir vs Ta'widh vs Riba Nasi'ah)
- **Lokasi Berkas**: Modul `transparansi-biaya`, Kuis `q3` dan `q4`, Layar Hasil Pemeriksaan.
- **Kondisi Sebelum**: Narasi awal cenderung menyamaratakan bahwa "setiap denda adalah riba".
- **Koreksi yang Diterapkan**: Membedakan secara presisi dan ilmiah:
  1. **Ta'zir Finansial (Fatwa 17/2000)**: Sanksi disiplin bagi nasabah mampu yang menunda bayar, yang **wajib 100% disalurkan untuk dana kebajikan sosial (Qardhul Hasan)**.
  2. **Ta'widh (Fatwa 43/2004)**: Ganti rugi atas kerugian riil operasional (*real costs*) yang diderita kreditur.
  3. **Denda Ribawi**: Denda persentase harian bertingkat yang masuk menjadi laba atau pendapatan perusahaan kreditur.

---

### Koreksi 5: Presisi Fikih Emas Digital & Keabsahan Qabdh Hukmi
- **Lokasi Berkas**: Modul `risiko-investasi`, Kasus `emas-digital`, Kuis `q8` & `q9`.
- **Kondisi Sebelum**: Sebagian narasi menimbulkan keraguan apakah kepemilikan saldo gramatur emas digital sah tanpa memegang fisik emas di tangan seketika.
- **Koreksi yang Diterapkan**:
  - Menjelaskan bahwa emas adalah komoditas (*sil'ah*), sehingga boleh dicicil non-tunai sesuai Fatwa DSN-MUI No. 77/2010.
  - Menegaskan bahwa serah terima yuridis (**Qabdh Hukmi**) sah secara syar'i asalkan didukung fisik emas 100% nyata (rasio 1:1) di kustodian berizin resmi Bappebti (Peraturan Bappebti No. 4/2019) dan nasabah memiliki hak cetak fisik kapan saja.

---

### Koreksi 6: Presisi Fikih Dropshipping (Hak Kepemilikan Barang)
- **Lokasi Berkas**: Modul `dropshipping-kepemilikan`, Kasus `dropshipping`, Kuis `q10` & `q11`.
- **Kondisi Sebelum**: Larangan menjual barang yang belum dimiliki (*la tabi' ma laisa 'indak*) sering disalahartikan sebagai larangan mutlak terhadap seluruh model bisnis dropshipping.
- **Koreksi yang Diterapkan**:
  - Memberikan 2 jalan keluar syariah yang sah dan diakui:
    1. **Akad Wakalah bil Ujrah**: Dropshipper bertindak sebagai agen pemasar resmi supplier yang menerima komisi jasa tetap.
    2. **Akad Salam (Fatwa 05/2000)**: Transaksi jual beli pesanan dengan spesifikasi barang terukur di mana dropshipper menanggung penjaminan penyerahan barang secara utuh.

---

### Koreksi 7: Penambahan Penegasan Hukum Cryptocurrency & Aset Kripto
- **Lokasi Berkas**: `Digital_Check/src/data/sources.ts`, `docs/SOURCE_REGISTRY.md`, Modal Rujukan Resmi `index.html`.
- **Koreksi yang Diterapkan**: Menambahkan **Keputusan Ijtima Ulama Komisi Fatwa MUI VII Tahun 2021**:
  - Kripto **haram sebagai mata uang** di Indonesia (UU No. 7/2011).
  - Kripto sebagai aset digital/komoditas **tidak sah** jika sarat spekulasi (*gharar/maysir*) tanpa underlying asset riil. Sah hanya jika memenuhi syarat *sil'ah* (memiliki underlying asset fisik dan manfaat nyata).

---

### Koreksi 8: Penambahan Tata Kelola Likuiditas Tawarruq
- **Lokasi Berkas**: `Digital_Check/src/data/sources.ts`, `docs/SOURCE_REGISTRY.md`, Modal Rujukan Resmi `index.html`.
- **Koreksi yang Diterapkan**: Menambahkan **Fatwa DSN-MUI No. 82/DSN-MUI/VIII/2011** tentang Perdagangan Komoditi Berdasarkan Prinsip Syariah di Bursa Komoditi, melarang transaksi lingkaran semu (*bai' al-'inah*) yang merekayasa utang berbunga.

---

## 3. Matriks Rekapitulasi Berkas yang Dikoreksi

| Nama Berkas | Baris Terdampak | Jenis Perubahan | Status Pengujian |
| :--- | :--- | :--- | :---: |
| `index.html` | L. 5646–5668 | Perbaikan pemetaan rujukan kategori `subscription`, `investment`, dan `other`. | **PASS** |
| `index.html` | L. 4247–4330 | Penambahan kartu rujukan resmi Fatwa 01/2004, 19/2001, 80/2011, 82/2011, dan Ijtima Kripto 2021 pada `#modalSourceRef`. | **PASS** |
| `Digital_Check/src/data/sources.ts` | L. 275–425 | Penambahan entri master registry untuk Fatwa 1/2004, 19/2001, 80/2011, 82/2011, 135/2020, MUI Kripto 2021, POJK 15/2015. | **PASS** |
| `Digital_Check/src/tests/content-governance.test.ts` | L. 110–150 | Penambahan unit test verifikasi dokumen Pasar Modal, Qardh, Riba, Tawarruq, dan Kripto. | **PASS** |
| `docs/SOURCE_REGISTRY.md` | L. 184–295 | Pemutakhiran katalog master rujukan primer resmi. | **PASS** |
| `Syariah_Digital_Check_Interactive_Prototype.html` | Seluruh | Sinkronisasi penuh dengan `index.html`. | **PASS** |

---

## 4. Verifikasi Pasca-Koreksi

Seluruh koreksi telah diuji dan divalidasi:
- **0 Regresi**: 100% tes unit lulus (`108/108 passed` pada Jest).
- **0 Kesalahan Tipe**: Lulus kompilasi TypeScript (`tsc --noEmit`).
- **Verifikasi Visual**: Seluruh modal dan layar dapat menampilkan rujukan baru tanpa kendala tata letak (*zero visual distortion*).
