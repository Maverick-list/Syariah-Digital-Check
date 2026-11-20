# PHASE 13 — PRODUCTION DEPLOYMENT & PROVISIONING GUIDE
## Syariah Digital Check — PostgreSQL & Supabase Infrastructure Setup

**Status:** Production Ready  
**Version:** 1.0.0 (Phase 13)  
**Target Environment:** Supabase Cloud / Self-Hosted Supabase / Any PostgreSQL 15+ Instance

---

## 1. Prerequisites & Environment Setup

Sebelum mengoperasikan sinkronisasi cloud untuk lingkungan publik, pastikan instans Supabase telah disediakan:

1. Akun organisasi di [Supabase Cloud](https://supabase.com) atau instans mandiri (*self-hosted*) Docker/Kubernetes.
2. Proyek baru dengan nama `syariah-digital-check-prod`.
3. Supabase CLI versi terbaru (opsional, untuk otomasi pipeline CI/CD).

Salin berkas konfigurasi template ke lingkungan kerja lokal:
```bash
cp .env.example .env
```

Isi variabel lingkungan berikut di `.env` (atau di dashboard hosting Vercel/Netlify):
```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Production Web URL
VITE_SITE_URL=https://syariahdigitalcheck.id
```

> [!IMPORTANT]
> Jangan pernah memasukkan `SUPABASE_SERVICE_ROLE_KEY` ke dalam variabel lingkungan klien (`VITE_*`). Kunci tersebut mengabaikan seluruh kebijakan Row Level Security.

---

## 2. Database Migration Execution

Jalankan skrip migrasi SQL secara berurutan menggunakan Supabase CLI atau melalui **Supabase Dashboard > SQL Editor**:

### Langkah 1: Skema Relasional Inti
Eksekusi file [`supabase/migrations/20261120000001_create_syariah_schema.sql`](file:///home/firza-ilmi/Downloads/Syariah-Digital-Check-main/supabase/migrations/20261120000001_create_syariah_schema.sql):
- Membuat tabel: `user_profiles`, `assessment_records`, `learning_progress`, `quiz_attempts`, `activity_logs`, dan `user_feedbacks`.
- Menetapkan foreign key cascades, indeks performa, dan fungsi trigger otomatis pembaruan waktu `set_updated_at()`.

### Langkah 2: Kebijakan Row Level Security (RLS)
Eksekusi file [`supabase/migrations/20261120000002_enable_rls_policies.sql`](file:///home/firza-ilmi/Downloads/Syariah-Digital-Check-main/supabase/migrations/20261120000002_enable_rls_policies.sql):
- Mengaktifkan isolasi data RLS pada ke-6 tabel.
- Memasang trigger sinkronisasi otomatis `on_auth_user_created` dari `auth.users` ke `public.user_profiles`.

### Langkah 3: Data Awal Edukatif (Opsional untuk Lingkungan Dev/Staging)
Eksekusi file [`supabase/seed.sql`](file:///home/firza-ilmi/Downloads/Syariah-Digital-Check-main/supabase/seed.sql) untuk mengisi data referensi pengujian awal.

---

## 3. Verifikasi Otomatis Pasca-Migrasi

Jalankan suite pengujian terpadu untuk memastikan seluruh integritas arsitektur dan kebijakan keamanan berjalan tanpa celah:

```bash
# 1. Jalankan Unit & Integration Test Suite (11 Suites, 115 Tests)
cd Digital_Check
npm test

# 2. Verifikasi Strict Type Checking
npm run typecheck

# 3. Jalankan QA & Security Audit Runner pada Server Lokal
cd ..
python3 scripts/qa_audit_runner.py
```

Hasil yang diharapkan:
- `Test Suites: 11 passed, 11 total`
- `Tests: 115 passed, 115 total`
- `tsc --noEmit: 0 errors`
- `FINAL AUDIT SUMMARY: 100% ALL CHECKS PASSED`

---

## 4. Cadangan Data & Prosedur Pemulihan Bencana (*Disaster Recovery*)

### Cadangan Harian Otomatis (Cloud Managed)
Supabase secara *default* menjalankan Point-in-Time Recovery (PITR) dan pencadangan harian otomatis.

### Pencadangan Manual via CLI
```bash
# Ekspor skema dan data tabel pengguna
supabase db dump --data-only -f backup_$(date +%Y%m%d).sql
```

### Prosedur Pemulihan Mandiri Pengguna
Pengguna web dan mobile memegang kendali penuh atas data mereka:
1. Klik **Ekspor Data (JSON)** pada dasbor profil untuk mengunduh cadangan lokal.
2. Di perangkat baru, klik **Pulihkan Data (JSON)** untuk mengimpor seluruh riwayat evaluasi transaksi dan progres belajar.

---

## 5. Pemantauan & Telemetri

| Metrik | Indikator Sehat | Tindakan Jika Anomali |
| :--- | :--- | :--- |
| **API Latency (p95)** | < 120 ms | Periksa utilisasi CPU Postgres dan efektivitas indeks. |
| **RLS Violations** | 0 pelanggaran/jam | Periksa integritas token JWT klien dan kebijakan peran. |
| **Penyimpanan Database** | Pertumbuhan linier terukur | Lakukan vacuuming terjadwal pada tabel `activity_logs`. |
