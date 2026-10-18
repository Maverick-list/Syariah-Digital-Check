import type { Lesson } from '../types';

const REVIEWED = '2026-10-18';

/**
 * Konten edukasi bersifat konseptual: menjelaskan apa yang perlu DIPERIKSA,
 * bukan menetapkan hukum produk tertentu. Rujukan hanya ke sumber di sources.ts.
 */
export const LESSONS: Lesson[] = [
  {
    id: 'akad-transaksi-digital',
    title: 'Apa itu akad dalam transaksi digital?',
    category: 'Akad',
    readingMinutes: 5,
    summary: 'Memahami mengapa struktur perjanjian dan kewajiban para pihak penting untuk dipelajari.',
    body: [
      'Akad adalah kesepakatan antara para pihak yang menentukan hak dan kewajiban masing-masing. Dalam transaksi digital, akad sering muncul dalam bentuk syarat dan ketentuan yang disetujui dengan satu ketukan tombol.',
      'Dua transaksi yang terlihat mirip di layar bisa memiliki struktur yang berbeda: misalnya jual beli, sewa, pembiayaan, atau layanan berbasis imbalan jasa. Nama produk yang sama tidak otomatis berarti struktur yang sama.',
      'Karena itu pertanyaan pertama yang berguna adalah: apa sebenarnya yang sedang terjadi, siapa pihaknya, dan apa kewajiban saya? Jika jawabannya belum jelas, itu tanda untuk berhenti sejenak dan bertanya.',
    ],
    keyPoints: [
      'Akad menentukan hak dan kewajiban para pihak.',
      'Nama produk yang sama bisa memiliki struktur berbeda.',
      'Baca syarat dan ketentuan sebelum menyetujui.',
    ],
    sourceIds: ['dsnmui-111-2017', 'dsnmui-portal'],
    reviewedAt: REVIEWED,
  },
  {
    id: 'transparansi-biaya',
    title: 'Transparansi biaya dan ketentuan',
    category: 'Digital',
    readingMinutes: 4,
    summary: 'Cara menemukan harga akhir, biaya, denda, kewajiban, dan aturan pembatalan.',
    body: [
      'Transparansi berarti informasi penting dapat ditemukan dan dipahami sebelum kamu setuju: harga akhir, biaya tambahan, denda keterlambatan, jadwal pembayaran, dan cara membatalkan.',
      'Waspadai urgensi buatan seperti hitung mundur promo yang mendorong keputusan cepat. Tekanan waktu bukan alasan untuk melewatkan pemeriksaan.',
      'Simpan bukti syarat, tangkapan layar rincian biaya, dan komunikasi dengan penyedia. Bila ada bagian yang tidak jelas, minta penjelasan tertulis.',
    ],
    keyPoints: [
      'Cek harga akhir, biaya, denda, dan pembatalan.',
      'Promo singkat tidak menggantikan pemeriksaan.',
      'Simpan bukti dan minta penjelasan tertulis.',
    ],
    sourceIds: ['ojk-portal', 'bi-portal'],
    reviewedAt: REVIEWED,
  },
  {
    id: 'sumber-tepercaya',
    title: 'Memeriksa sumber keuangan yang tepercaya',
    category: 'Dasar',
    readingMinutes: 3,
    summary: 'Membedakan dokumen resmi, promosi, opini, dan informasi yang belum terverifikasi.',
    body: [
      'Tidak semua informasi setara. Dokumen resmi penyedia, publikasi regulator, dan fatwa dari lembaga yang berwenang memiliki bobot berbeda dari iklan, komentar anonim, atau opini di media sosial.',
      'Untuk memeriksa legalitas penyelenggara layanan keuangan di Indonesia, gunakan situs resmi regulator seperti OJK dan Bank Indonesia. Untuk rujukan syariah, baca fatwa pada situs resmi DSN-MUI atau tanyakan kepada pihak yang kompeten.',
      'Periksa juga tanggal informasi: ketentuan dapat berubah, sehingga sumber yang lama perlu dicek ulang.',
    ],
    keyPoints: [
      'Utamakan dokumen resmi dan regulator.',
      'Iklan dan komentar anonim bukan sumber utama.',
      'Periksa tanggal dan relevansi sumber.',
    ],
    sourceIds: ['ojk-portal', 'bi-portal', 'dsnmui-portal'],
    reviewedAt: REVIEWED,
  },
  {
    id: 'layanan-keuangan-syariah',
    title: 'Mengenal layanan keuangan syariah',
    category: 'Bank',
    readingMinutes: 6,
    summary: 'Pertanyaan awal untuk memahami struktur dan ketentuan produk tertentu.',
    body: [
      'Layanan keuangan yang menyebut dirinya syariah biasanya menjelaskan akad yang dipakai dan berada di bawah pengawasan dewan pengawas syariah. Namun klaim di iklan tetap perlu diperiksa pada dokumen produknya.',
      'Pertanyaan awal yang membantu: akad apa yang dipakai untuk produk ini? Siapa dewan pengawas syariahnya? Apa biaya dan ketentuan yang berlaku? Di mana dokumen resminya?',
      'Untuk uang elektronik dan produk pembayaran digital, terdapat fatwa DSN-MUI tersendiri yang bisa dibaca sebagai rujukan. Aplikasi ini tidak menyimpulkan apakah produk tertentu sesuai syariah.',
    ],
    keyPoints: [
      'Tanyakan akad yang dipakai dan siapa pengawas syariahnya.',
      'Klaim di iklan perlu dicek pada dokumen produk.',
      'Baca fatwa terkait langsung di situs resmi.',
    ],
    sourceIds: ['dsnmui-116-2017', 'dsnmui-portal', 'ojk-portal'],
    reviewedAt: REVIEWED,
  },
  {
    id: 'zisw-digital',
    title: 'Zakat, infak, sedekah, dan wakaf digital',
    category: 'Sosial',
    readingMinutes: 5,
    summary: 'Memeriksa tujuan, pengelola, kanal pembayaran, dan informasi penyaluran.',
    body: [
      'Ajakan donasi di media sosial semakin mudah dibuat, sehingga verifikasi menjadi penting. Periksa siapa penyelenggaranya, apakah identitasnya dapat dihubungi, dan ke rekening atas nama siapa dana dikirim.',
      'Lembaga pengelola yang kredibel biasanya menyampaikan laporan penyaluran secara berkala. Jika informasi penyaluran tidak ada atau samar, tanyakan atau cari penyelenggara lain yang lebih transparan.',
      'Gunakan kanal resmi penyelenggara, bukan tautan yang diterima dari pesan berantai, untuk menghindari penipuan.',
    ],
    keyPoints: [
      'Verifikasi identitas penyelenggara dan rekening tujuan.',
      'Cari laporan penyaluran dana.',
      'Gunakan kanal resmi, hindari tautan tak dikenal.',
    ],
    sourceIds: ['ojk-portal'],
    reviewedAt: REVIEWED,
  },
  {
    id: 'risiko-investasi',
    title: 'Memahami risiko sebelum berinvestasi',
    category: 'Investasi',
    readingMinutes: 5,
    summary: 'Kenali risiko, biaya, mekanisme kepemilikan, dan dokumen produk.',
    body: [
      'Sebelum menaruh dana pada produk investasi, termasuk emas digital, pahami bagaimana kepemilikan dicatat, di mana aset disimpan, apa biaya transaksi dan penyimpanan, serta bagaimana cara menarik atau menjual kembali.',
      'Harga dapat naik dan turun. Jangan mengandalkan janji imbal hasil pasti atau popularitas aplikasi sebagai satu-satunya dasar keputusan.',
      'Untuk pembelian emas secara tidak tunai terdapat fatwa DSN-MUI tersendiri yang membahas ketentuannya; bacalah naskah resminya dan tanyakan kepada pihak yang kompeten tentang produk spesifik yang kamu pertimbangkan.',
    ],
    keyPoints: [
      'Pahami kepemilikan, penyimpanan, biaya, dan cara penarikan.',
      'Hindari keputusan berdasarkan popularitas atau janji pasti.',
      'Baca rujukan resmi untuk produk yang dipertimbangkan.',
    ],
    sourceIds: ['dsnmui-77-2010', 'ojk-portal'],
    reviewedAt: REVIEWED,
  },
  {
    id: 'pembiayaan-digital',
    title: 'Pembiayaan dan cicilan digital: apa yang dicek?',
    category: 'Pembiayaan',
    readingMinutes: 5,
    summary: 'Daftar periksa untuk PayLater dan layanan pembiayaan berbasis teknologi.',
    body: [
      'Layanan PayLater dan pembiayaan berbasis teknologi dapat memiliki struktur yang berbeda-beda. Pahami apakah transaksi berupa jual beli dengan pembayaran bertahap, pinjaman, atau struktur lain, karena konsekuensi dan ketentuannya berbeda.',
      'Hitung total yang harus dibayar sampai lunas, termasuk biaya layanan dan denda keterlambatan. Bandingkan dengan harga jika dibayar tunai.',
      'Terdapat fatwa DSN-MUI mengenai layanan pembiayaan berbasis teknologi informasi berdasarkan prinsip syariah serta fatwa tentang akad murabahah yang dapat dibaca sebagai rujukan. Periksa juga apakah penyelenggara terdaftar atau berizin pada regulator.',
    ],
    keyPoints: [
      'Identifikasi struktur transaksi sebelum menyetujui.',
      'Hitung total pembayaran sampai lunas.',
      'Cek izin penyelenggara pada situs regulator.',
    ],
    sourceIds: ['dsnmui-117-2018', 'dsnmui-111-2017', 'ojk-portal'],
    reviewedAt: REVIEWED,
  },
];

export const LESSONS_BY_ID: Record<string, Lesson> = Object.fromEntries(
  LESSONS.map((l) => [l.id, l]),
);
