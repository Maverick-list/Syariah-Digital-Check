import type { Scenario } from '../types';

/** Semua skenario fiktif; tidak menilai produk atau merek tertentu. */
export const SCENARIOS: Scenario[] = [
  {
    id: 'paylater',
    title: 'PayLater: apakah ini pilihan yang tepat?',
    icon: 'card-outline',
    category: 'paylater',
    categoryLabel: 'Pembiayaan',
    story:
      'Kamu ingin membeli laptop untuk kuliah seharga Rp8.000.000. Sebuah layanan menawarkan cicilan dengan proses cepat, tetapi kamu belum membaca seluruh ketentuan biaya dan keterlambatannya.',
    question: 'Apa langkah paling bijak?',
    options: [
      'Langsung pilih karena prosesnya cepat',
      'Periksa struktur transaksi, biaya, kewajiban, dan sumber panduan yang tepercaya',
      'Anggap semua layanan PayLater memiliki ketentuan yang sama',
    ],
    correctIndex: 1,
    explanations: [
      'Kecepatan proses bukan ukuran kejelasan ketentuan. Baca biaya dan konsekuensinya lebih dulu.',
      'Tepat: produk dengan nama serupa bisa memiliki struktur dan ketentuan berbeda. Baca dokumen produk dan cari penjelasan yang tepercaya sebelum memutuskan.',
      'Belum tepat: produk bernama sama bisa memiliki akad, biaya, dan ketentuan yang berbeda.',
    ],
    lessonId: 'pembiayaan-digital',
  },
  {
    id: 'diskon-online',
    title: 'Diskon besar di toko online',
    icon: 'cart-outline',
    category: 'shopping',
    categoryLabel: 'Belanja digital',
    story:
      'Sebuah toko menawarkan diskon besar yang hanya berlaku beberapa menit. Rincian harga akhir dan kebijakan pengembalian belum kamu periksa.',
    question: 'Apa yang perlu dilakukan terlebih dahulu?',
    options: [
      'Checkout sebelum promonya berakhir',
      'Periksa harga akhir, penjual, ketentuan, dan kebijakan pengembalian',
      'Mengandalkan komentar promosi saja',
    ],
    correctIndex: 1,
    explanations: [
      'Urgensi promosi sebaiknya tidak menggantikan pemeriksaan informasi penting.',
      'Tepat: jangan biarkan urgensi promosi menggantikan pemeriksaan informasi penting.',
      'Komentar promosi bukan sumber yang cukup; periksa ketentuan resmi penjual.',
    ],
    lessonId: 'transparansi-biaya',
  },
  {
    id: 'emas-digital',
    title: 'Investasi emas digital',
    icon: 'diamond-outline',
    category: 'gold',
    categoryLabel: 'Investasi',
    story:
      'Kamu melihat aplikasi yang menawarkan pembelian emas digital. Informasi kepemilikan, penyimpanan, biaya, dan mekanisme penarikan belum sepenuhnya kamu pahami.',
    question: 'Apa langkah yang paling masuk akal?',
    options: [
      'Pilih hanya karena aplikasi terlihat populer',
      'Periksa mekanisme kepemilikan, biaya, risiko, dan sumber resmi',
      'Menganggap semua produk emas digital identik',
    ],
    correctIndex: 1,
    explanations: [
      'Popularitas tidak menjelaskan kepemilikan, biaya, atau risiko produk.',
      'Tepat: periksa karakteristik produk tertentu, dokumen resmi, risiko, serta panduan yang relevan.',
      'Produk emas digital dapat berbeda dalam kepemilikan, penyimpanan, dan biaya.',
    ],
    lessonId: 'risiko-investasi',
  },
  {
    id: 'langganan',
    title: 'Langganan digital otomatis',
    icon: 'repeat-outline',
    category: 'subscription',
    categoryLabel: 'Langganan',
    story:
      'Kamu mendaftar layanan digital dengan masa percobaan gratis. Setelah masa tersebut, biaya akan ditagihkan secara berkala.',
    question: 'Apa yang perlu diperiksa?',
    options: [
      'Tanggal penagihan, biaya, pembatalan, dan persetujuan perpanjangan',
      'Hanya warna tombol daftar',
      'Tidak perlu membaca ketentuan',
    ],
    correctIndex: 0,
    explanations: [
      'Tepat: memahami biaya berulang dan cara membatalkan langganan membantu mengambil keputusan yang sadar.',
      'Tampilan tombol tidak menjelaskan biaya dan kewajibanmu.',
      'Ketentuan menjelaskan biaya berulang dan pembatalan; baca sebelum menyetujui.',
    ],
    lessonId: 'transparansi-biaya',
  },
  {
    id: 'donasi',
    title: 'Donasi digital',
    icon: 'heart-outline',
    category: 'donation',
    categoryLabel: 'Keuangan sosial',
    story:
      'Kamu menemukan ajakan donasi di media sosial. Informasi penyelenggara dan penyaluran dana masih terbatas.',
    question: 'Apa yang sebaiknya kamu cek?',
    options: [
      'Langsung transfer karena unggahannya menyentuh',
      'Verifikasi penyelenggara, tujuan, kanal pembayaran, dan informasi penyaluran',
      'Menganggap semua tautan donasi resmi',
    ],
    correctIndex: 1,
    explanations: [
      'Perasaan tersentuh baik, tetapi verifikasi penerima tetap diperlukan.',
      'Tepat: verifikasi pihak penerima dan informasi penyaluran sebelum berdonasi.',
      'Tidak semua tautan donasi terpercaya; verifikasi dulu.',
    ],
    lessonId: 'zisw-digital',
  },
  {
    id: 'tabungan-digital',
    title: 'Tabungan digital',
    icon: 'wallet-outline',
    category: 'savings',
    categoryLabel: 'Perbankan',
    story:
      'Kamu membandingkan dua produk tabungan digital. Informasi biaya, fitur, perlindungan, dan akad perlu dibaca dari dokumen masing-masing.',
    question: 'Bagaimana membandingkannya?',
    options: [
      'Gunakan nama merek sebagai satu-satunya dasar',
      'Baca dokumen resmi, fitur, biaya, dan struktur produk',
      'Pilih yang iklannya paling menarik',
    ],
    correctIndex: 1,
    explanations: [
      'Nama merek saja tidak menjelaskan fitur, biaya, atau struktur produk.',
      'Tepat: nilai produk berdasarkan informasi dan dokumen yang relevan, bukan asumsi umum.',
      'Iklan menarik bukan ukuran kesesuaian dengan kebutuhanmu.',
    ],
    lessonId: 'layanan-keuangan-syariah',
  },
];

export const SCENARIOS_BY_ID: Record<string, Scenario> = Object.fromEntries(
  SCENARIOS.map((s) => [s.id, s]),
);
