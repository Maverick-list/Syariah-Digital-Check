# Panduan Penerapan & Deployment Produksi
**Syariah Digital Check (v2.4.0 Production Release)**

---

## 1. Arsitektur Deployment

Syariah Digital Check dirancang dengan arsitektur **Jamstack / Static Single Page Application (SPA)** murni. Aplikasi tidak memerlukan runtime Node.js sisi server aktif saat melayani permintaan pengguna, sehingga dapat di-deploy dengan biaya nol (*zero infrastructure cost*), latensi global ultra-rendah melalui Edge CDN, dan ketahanan terhadap lonjakan lalu lintas (*traffic spikes*).

---

## 2. Opsi Platform Deployment

### A. Vercel (Rekomendasi Utama)

1. **Persiapan**:
   - Pastikan repositori GitHub terhubung ke Vercel Dashboard.
2. **Pengaturan Proyek (Project Settings)**:
   - **Framework Preset**: `Other`
   - **Root Directory**: `./` (atau direktori akar repositori)
   - **Build Command**: Kosongkan (atau `npm --prefix Digital_Check test && npm --prefix Digital_Check run typecheck` untuk verifikasi CI otomatis)
   - **Output Directory**: `./`
3. **Konfigurasi Routing & Header (`vercel.json`)**:
   ```json
   {
     "cleanUrls": true,
     "trailingSlash": false,
     "headers": [
       {
         "source": "/(.*)",
         "headers": [
           { "key": "X-Frame-Options", "value": "DENY" },
           { "key": "X-Content-Type-Options", "value": "nosniff" },
           { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
           { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" },
           { "key": "Strict-Transport-Security", "value": "max-age=31536000; includeSubDomains; preload" }
         ]
       },
       {
         "source": "/(sw.js|manifest.json)",
         "headers": [
           { "key": "Cache-Control", "value": "public, max-age=0, must-revalidate" }
         ]
       }
     ]
   }
   ```

---

### B. Cloudflare Pages

1. Buat proyek baru di **Cloudflare Dashboard > Workers & Pages > Create application > Pages**.
2. Sambungkan ke repositori GitHub: `Maverick-list/Syariah-Digital-Check`.
3. **Build settings**:
   - Framework preset: `None`
   - Build output directory: `/` (akar repositori memuat `index.html`, `sw.js`, `manifest.json`, `_headers`).
4. Berkas `_headers` yang ada di akar repositori akan secara otomatis dibaca dan diterapkan oleh Cloudflare Edge CDN.

---

### C. Netlify

1. Hubungkan repositori ke Netlify.
2. **Build Settings**:
   - Base directory: Not set (root)
   - Publish directory: `.`
3. Berkas `_headers` di akar repositori didukung secara bawaan oleh Netlify.

---

### D. GitHub Pages

1. Masuk ke **Settings > Pages** pada repositori GitHub.
2. Sumber: **Deploy from a branch**.
3. Branch: `main`, folder: `/ (root)`.
4. Simpan konfigurasi. GitHub Pages akan aktif di `https://<username>.github.io/<repo>/`.

---

## 3. Variabel Lingkungan (Environment Variables)

Aplikasi klien **TIDAK MEMBUTUHKAN** variabel rahasia (*secret environment variables*) untuk menjalankan seluruh fungsi inti literasi, pemeriksaan akad, dan kuis:

| Nama Variabel | Wajib / Opsional | Default | Keterangan |
| :--- | :--- | :--- | :--- |
| `PUBLIC_SITE_URL` | Opsional | `https://syariahdigitalcheck.id` | URL domain produksi untuk canonical tag. |
| `NEXT_PUBLIC_SUPABASE_URL` | Opsional (Fase Masa Depan) | *Tidak Diaktifkan* | Endpoint sinkronisasi cloud lintas perangkat opsional. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Opsional (Fase Masa Depan) | *Tidak Diaktifkan* | Kunci publik API Supabase dengan proteksi RLS aktif. |

---

## 4. Konfigurasi Domain Kustom & DNS

Untuk memetakan domain produksi resmi (misal `syariahdigitalcheck.id`):

1. **DNS Record Konfigurasi**:
   - `CNAME` | `www` | `cname.vercel-dns.com` (atau target CNAME penyedia Anda)
   - `A` | `@` | IP Anycast penyedia CDN (contoh: `76.76.21.21` untuk Vercel)
2. **Sertifikat SSL/TLS**:
   - Wajib menggunakan HTTPS (TLS 1.3) guna mengaktifkan instalasi Progressive Web App (PWA) dan Service Worker.
   - Perpanjangan otomatis SSL melalui Let's Encrypt / Cloudflare Edge Certificate.

---

## 5. Prosedur Verifikasi Pasca-Deployment (Smoke Testing)

Setelah rilis dipublikasikan, jalankan pengujian verifikasi cepat berikut:
1. **Pemeriksaan HTTPS & Header**:
   ```bash
   curl -I https://syariahdigitalcheck.id/
   ```
   Pastikan kode status `HTTP/2 200` dan header `Content-Security-Policy`, `Strict-Transport-Security`, serta `X-Frame-Options` tertera.
2. **Verifikasi PWA & Service Worker**:
   - Buka Chrome DevTools > Application > Service Workers.
   - Pastikan Service Worker `sw.js` berstatus `Activated and is running` dengan cache `syariah-check-v2`.
3. **Verifikasi Jalur Routing Hash**:
   - Buka URL `https://syariahdigitalcheck.id/#about` dan pastikan Modal Tentang terbuka.
   - Buka URL `https://syariahdigitalcheck.id/#rute-palsu` dan pastikan dialihkan mulus ke `#screenHome` dengan notifikasi informatif.
4. **Verifikasi Penyimpanan Lokal**:
   - Jalankan simulasi pemeriksaan transaksi.
   - Muat ulang (refresh) peramban dan pastikan riwayat telaah tetap muncul di Layar Beranda dan Layar Profil.
