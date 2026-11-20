# PHASE 16: KNOWN LIMITATIONS, OPERATIONAL BOUNDARIES & LEGAL DISCLAIMER

**Application:** Syariah Digital Check (*Platform Literasi & Uji Akad Finansial Syariah*)  
**Version:** v1.0.0 Production  
**Document Status:** Public Disclosure & Governance Reference  
**Effective Date:** 2026-11-20  

---

## 1. LEGAL & INSTITUTIONAL DISCLAIMERS (DISCLAIMER HUKUM & KELEMBAGAAN)

### 1.1 Non-Fatwa & Non-Advisory Nature
1. **Bukan Lembaga Fatwa:**  
   *Syariah Digital Check* adalah platform perangkat lunak independen yang dirancang untuk **tujuan edukasi, literasi keuangan digital, dan uji mandiri (self-assessment)**. Platform ini **BUKAN** lembaga penerbit fatwa, bukan Dewan Pengawas Syariah (DPS), dan tidak berwenang mengeluarkan fatwa atau sertifikasi halal/syariah atas produk keuangan apa pun.
2. **Bukan Nasihat Finansial atau Hukum yang Mengikat:**  
   Hasil analisis, klasifikasi risiko (Halal, Syubhat, Haram), dan rekomendasi yang disajikan oleh algoritma asesmen bersifat **indikatif-edukatif**. Pengguna disarankan untuk tetap berkonsultasi langsung dengan konsultan keuangan syariah berlisensi, Dewan Pengawas Syariah terkait, atau advokat bersertifikat sebelum mengambil keputusan finansial atau mengikatkan diri pada perjanjian komersial.
3. **Bukan Representasi Resmi Regulator:**  
   Platform ini dibangun secara independen oleh pengembang dan komunitas literasi syariah. Platform ini **TIDAK berafiliasi secara resmi, tidak mewakili, dan tidak disponsori oleh**:
   - **DSN-MUI** (Dewan Syariah Nasional – Majelis Ulama Indonesia)
   - **OJK** (Otoritas Jasa Keuangan)
   - **Bank Indonesia** (BI)
   - Kementerian Keuangan Republik Indonesia
   
   Semua rujukan terhadap nomor fatwa DSN-MUI, Peraturan OJK (POJK), dan Surat Edaran BI adalah kutipan pustaka publik untuk tujuan sitasi akademis dan edukasi publik semata.

---

## 2. EDUCATIONAL & ALGORITHMIC BOUNDARIES (BATASAN ALGORITMA ASESMEN)

### 2.1 Heuristic Assessment vs. Deep Contract Audit
- **Pendekatan Heuristik:**  
  Algoritma Transaction Checker menggunakan pohon keputusan berbasis aturan (rule-based heuristic tree) yang mencocokkan input pengguna dengan klausul-klausul fiqh muamalah kontemporer.
- **Keterbatasan Informasi Pengguna:**  
  Jika pengguna memasukkan informasi yang tidak lengkap, keliru, atau menyembunyikan biaya terselubung (*hidden fees/interest*), hasil asesmen tidak dapat mencerminkan hakikat akad yang sesungguhnya. Prinsip fiqh berlaku: *"Al-'Ibratu fil 'uquud lil maqaashid wal ma'aani laa lil alfaazh wal mabaani"* (Hakikat dalam akad didasarkan pada substansi dan tujuan, bukan sekadar redaksi formal).
- **Ruang Lingkup Produk Finansial (Covered Categories):**  
  Saat ini, mesin asesmen v1.0.0 mencakup 6 kategori instrumen keuangan digital:
  1. *PayLater & Pembiayaan Konsumen*
  2. *Dompet Digital & Uang Elektronik (E-Wallet)*
  3. *Lending / P2P Financing Finansial Syariah*
  4. *Investasi Emas Digital*
  5. *Aset Kripto & Token Digital*
  6. *Robo-Advisor & Reksa Dana Digital*
  
  Instrumen derivatif yang kompleks, valuta asing margin tinggi (*forex trading*), opsi biner (*binary options*), atau skema ponzi di luar sektor ini harus dirujuk ke prinsip umum pelarangan maysir/gharar dan tidak memiliki alur kuesioner khusus di v1.0.0.

---

## 3. TECHNICAL CONSTRAINTS & DEVICE DEPENDENCIES (BATASAN TEKNIS & PERANGKAT)

### 3.1 Guest Mode & Browser Storage Limitations
- **Kapasitas Penyimpanan Lokal:**  
  Dalam mode tamu (Guest Mode), seluruh riwayat asesmen, skor kuis, dan lencana disimpan di `localStorage` peramban pengguna (kuota browser umumnya ~5MB per origin).
- **Risiko Pembersihan Riwayat Peramban:**  
  Jika pengguna membersihkan cache/cookies peramban (*Clear Browsing Data*), beralih ke jendela penyamaran (*Incognito/Private Browsing*), atau berganti peramban/perangkat, data mode tamu akan hilang secara permanen kecuali jika pengguna telah mengekspor cadangan JSON (*Data Export*) atau mengaktifkan sinkronisasi cloud (*Cloud Sync*).

### 3.2 Offline vs. Online Capabilities
- **Kemampuan Offline:**  
  Aplikasi web mendukung Service Worker / PWA caching. Modul edukasi, kuesioner asesmen, dan kuis lokal dapat dijalankan tanpa koneksi internet aktif.
- **Ketergantungan Online:**  
  Fitur autentikasi pengguna, sinkronisasi antarperangkat ke Supabase, pembaruan fatwa terbaru, dan pengiriman formulir umpan balik (*Feedback Form*) memerlukan koneksi internet aktif. Antrean sinkronisasi lokal (*sync queue*) akan menampung operasi offline dan menyinkronkannya kembali begitu jaringan pulih.

### 3.3 Browser & Hardware Support
- **Peramban yang Didukung:**
  - Google Chrome / Chromium (versi >= 90)
  - Apple Safari (versi >= 15 di iOS & macOS)
  - Mozilla Firefox (versi >= 90)
  - Microsoft Edge (versi >= 90)
- **Peramban yang Tidak Didukung:**
  - Microsoft Internet Explorer 11 atau versi lebih lama (tidak mendukung ES6 modern modules & modern CSS grid/flexbox).
  - Peramban lawas perangkat fitur (*feature phones*) tanpa dukungan JavaScript modern.

---

## 4. DATA PRIVACY & JURISDICTION (YURISDIKSI & PRIVASI DATA)

- **Kepatuhan Privasi:**  
  Aplikasi dirancang mematuhi **Undang-Undang No. 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP)** Republik Indonesia.
- **Tanpa Pengumpulan Identitas Sensitif:**  
  Platform tidak pernah meminta Nomor Induk Kependudukan (NIK), foto KTP, kata sandi perbankan, nomor kartu kredit/debit, atau PIN e-wallet. Segala bentuk permintaan data sensitif tersebut yang mengatasnamakan platform ini adalah tindakan penipuan pihak ketiga.
- **Hak Subjek Data:**  
  Pengguna memiliki hak penuh untuk mengunduh seluruh salinan datanya (Portabilitas Data) dan menghapus seluruh datanya secara instan dari perangkat maupun cloud (Hak atas Penghapusan / *Right to Erasure*).

---

## 5. FEEDBACK, PELAPORAN KESALAHAN & ESKALASI

Jika akademisi, pakar syariah, praktisi fintech, atau masyarakat umum menemukan ketidaksesuaian teks fatwa, distorsi klausul, atau kegagalan teknis:
- **Saluran Umpan Balik:** Gunakan fitur *"Beri Masukan"* pada navigasi aplikasi atau buat issue pada repositori GitHub resmi.
- **Tindak Lanjut Perbaikan:** Kesalahan teks rujukan fatwa akan diperbaiki dalam siklus rilis patch tanpa menunggu rilis versi mayor.
