# Daftar Periksa Review Dewan Pakar Syariah (Shariah Expert Review Checklist)
**Syariah Digital Check (v2.4.0 Public Beta Readiness)**
*Instrumen Verifikasi Ilmiah Fiqih Muamalah & Regulasi Keuangan Syariah*

---

## 1. Pendahuluan & Batasan Etika Keilmuan

Sesuai prinsip keinsinyuran **SOURCE-BASED EDUCATION** dan **HUMAN REVIEW**:
Platform **Syariah Digital Check** dibangun di atas landasan fatwa resmi Dewan Syariah Nasional – Majelis Ulama Indonesia (DSN-MUI) dan regulasi Otoritas Jasa Keuangan (OJK). Platform ini **TIDAK PERNAH MEREKAYASA FATWA** dan **TIDAK MENGKLAIM MEMILIKI SERTIFIKASI ATAU LISENSI RESMI DARI MUI**.

Dokumen ini disusun sebagai panduan telaah (*review checklist*) terstruktur bagi **Dewan Pakar Fiqih Muamalah, Dewan Pengawas Syariah (DPS), dan Akademisi Ekonomi Islam** untuk memvalidasi keselarasan materi edukasi publik sebelum dan selama masa *Public Beta*.

---

## 2. Matriks Rujukan Fatwa & Regulasi Primer (Traceability Matrix)

| ID Dokumen | Judul Resmi Fatwa / Regulasi | Lembaga Penerbit | Nomor & Tahun Penetapan | Status Rujukan | Kaitan Fitur / Modul |
| :--- | :--- | :--- | :--- | :---: | :--- |
| **DSN-04** | Murabahah | DSN-MUI | No. 04/DSN-MUI/IV/2000 | **TERTELUSUR (PASS)** | Syarat komoditas riil, penentuan margin tetap di muka pada cicilan PayLater. |
| **DSN-09** | Pembiayaan Ijarah | DSN-MUI | No. 09/DSN-MUI/IV/2000 | **TERTELUSUR (PASS)** | Sewa manfaat jasa aplikasi dan langganan digital berkala. |
| **DSN-17** | Sanksi Atas Nasabah Mampu yang Menunda Pembayaran | DSN-MUI | No. 17/DSN-MUI/IX/2000 | **TERTELUSUR (PASS)** | Batasan Ta'zir: hanya untuk nasabah mampu yang sengaja menunda, dialokasikan 100% sebagai dana kebajikan (*Qardhul Hasan*), bukan laba fintech. |
| **DSN-77** | Jual Beli Emas Secara Tidak Tunai | DSN-MUI | No. 77/DSN-MUI/V/2010 | **TERTELUSUR (PASS)** | Keabsahan jual beli emas non-tunai dengan syarat adanya alokasi emas fisik (*Qabdh Hukmi/Hakiki*) dan ketiadaan skema spekulasi. |
| **DSN-110** | Akad Akad Jual Beli (Akad Bai') | DSN-MUI | No. 110/DSN-MUI/IX/2017 | **TERTELUSUR (PASS)** | Syarat sah kepemilikan barang sebelum ditransaksikan (*la tabi' ma laisa 'indak*). |
| **DSN-117** | Layanan Pembiayaan Berbasis Teknologi Informasi Syariah | DSN-MUI | No. 117/DSN-MUI/II/2018 | **TERTELUSUR (PASS)** | Skema fintech P2P Lending syariah, larangan riba, dan batasan akad talangan (*qardh / wakalah bil ujrah*). |
| **DSN-140** | Pengalihan Utang (Hawalah bil Ujrah) | DSN-MUI | No. 140/DSN-MUI/VIII/2021 | **TERTELUSUR (PASS)** | Skema talangan tagihan PayLater multi-pihak dengan imbal jasa perantara wajar. |
| **POJK-40** | Layanan Pendanaan Bersama Berbasis Teknologi Informasi (LPBBTI) | OJK | POJK No. 40/POJK.03/2024 | **TERTELUSUR (PASS)** | Batas maksimum suku bunga/manfaat ekonomi, transparansi biaya tersembunyi, dan tata cara penagihan beretika. |
| **POJK-22** | Perlindungan Konsumen dan Masyarakat di Sektor Jasa Keuangan | OJK | POJK No. 22/POJK.07/2023 | **TERTELUSUR (PASS)** | Larangan klausul eksonerasi sepihak dan hak pembatalan transaksi konsumen. |

---

## 3. Daftar Periksa Komponen Edukasi untuk Review Dewan Pakar

### A. Modul Pembelajaran Utama (Learning Modules)

- [ ] **Modul 1: Memahami Akad Transaksi Digital Modern**
  - *Fokus Review*: Keselarasan penjelasan akad Murabahah vs pinjaman uang tunai (Qardh).
  - *Status Saat Ini*: `VERIFIED_DESK_AUDIT` (Sesuai Fatwa 04/2000 & 110/2017).
- [ ] **Modul 2: Transparansi Biaya vs Bunga Riba Terselubung**
  - *Fokus Review*: Batasan ujrah riil atas jasa perantara vs margin persentase yang meningkat seiring penundaan pembayaran.
  - *Status Saat Ini*: `VERIFIED_DESK_AUDIT` (Sesuai Fatwa 117/2018 & POJK 40/2024).
- [ ] **Modul 3: Riba & Denda Keterlambatan dalam Fiqih Kontemporer**
  - *Fokus Review*: Penegasan bahwa denda keterlambatan tidak boleh menjadi pos pendapatan laba kreditur (*ta'zir lil mashlahah al-'ammah*).
  - *Status Saat Ini*: `VERIFIED_DESK_AUDIT` (Sesuai Fatwa 17/2000).
- [ ] **Modul 4: Tabungan Emas Digital & Ketentuan Serah Terima (Qabdh)**
  - *Fokus Review*: Keabsahan sertifikat kepemilikan digital berbobot gramatur riil sebagai pemenuhan syarat *Qabdh Hukmi*.
  - *Status Saat Ini*: `VERIFIED_DESK_AUDIT` (Sesuai Fatwa 77/2010).
- [ ] **Modul 5: E-Commerce, Dropshipping, dan Etika Kepemilikan Barang**
  - *Fokus Review*: Penggunaan skema akad Wakalah (kuasa beli) atau Akad Salam untuk memvalidasi legalitas dropshipping tanpa modal kepemilikan awal.
  - *Status Saat Ini*: `REQUIRES_EXPERT_PANEL_ENDORSEMENT` (Dianjurkan masukan pakar untuk variasi skema komisi afiliasi marketplace).

---

### B. Studi Kasus Skenario Fiktif (Case Studies)

- [ ] **Kasus 1: PayLater dengan Biaya Layanan Tetap Bulanan**
  - *Label*: Simulasi Edukasi Fiktif (Rian - Mahasiswa membeli laptop).
  - *Tinjauan*: Menelaah apakah biaya layanan tetap Rp90.000/bulan pada pinjaman uang murni tergolong *ziyadah masyruthah fi al-qardh* (manfaat tambahan yang disyaratkan dalam utang piutang).
  - *Status*: `VERIFIED_DESK_AUDIT`.
- [ ] **Kasus 2: Investasi Emas Digital dan Ketentuan Qabdh**
  - *Label*: Simulasi Edukasi Fiktif (Dina - Tabungan emas aplikasi).
  - *Tinjauan*: Memeriksa rasio cadangan emas fisik 1:1 pada brankas kustodian resmi yang diawasi Bappebti.
  - *Status*: `VERIFIED_DESK_AUDIT`.
- [ ] **Kasus 3: Skema Reseller Dropshipping Tanpa Stok Barang**
  - *Label*: Simulasi Edukasi Fiktif (Budi - Toko pakaian online).
  - *Tinjauan*: Penerapan larangan menjual barang yang belum dimiliki (*la tabi' ma laisa 'indak*) dan solusi transisi ke agen pemasaran resmi (*Wakil bil Ujrah*).
  - *Status*: `VERIFIED_DESK_AUDIT`.
- [ ] **Kasus 4: Langganan Berbayar Otomatis Diperpanjang (Auto-Renewal)**
  - *Label*: Simulasi Edukasi Fiktif (Siti - Langganan aplikasi desain).
  - *Tinjauan*: Penilaian unsur ketidakpastian (*gharar*) jika notifikasi perpanjangan disembunyikan dan opsi pembatalan dipersulit.
  - *Status*: `VERIFIED_DESK_AUDIT`.

---

### C. Bank Soal Kuis Literasi (14 Soal Pilihan Ganda)

- [ ] **Validasi Pembahasan Soal Benar & Salah**:
  - Seluruh kunci jawaban memiliki uraian penjelasan ilmiah yang mengutip dalil muamalah dan nomor fatwa DSN-MUI terkait.
  - Tidak ada soal yang menjatuhkan vonis halal/haram mutlak terhadap entitas merek komersial tertentu.

---

## 4. Lembar Pengesahan Reviewer Ahli (Untuk Sidang Pakar)

| Nama Pakar / Pengkaji | Lembaga / Institusi | Catatan Rekomendasi | Tanda Tangan | Tanggal |
| :--- | :--- | :--- | :---: | :---: |
| *[Nama Terbuka]* | *[Dewan Pengawas Syariah / Kampus]* | *[Menunggu Sidang Review]* | ____________ | __/__/2026 |
| *[Nama Terbuka]* | *[Akademisi Fiqih Muamalah]* | *[Menunggu Sidang Review]* | ____________ | __/__/2026 |
