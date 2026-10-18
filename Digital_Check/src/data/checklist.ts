import type { ChecklistStepDef, StepId, TransactionCategory } from '../types';

export const DISCLAIMER =
  'Aplikasi ini merupakan sarana edukasi literasi keuangan syariah, bukan fatwa, nasihat keuangan profesional, atau sertifikasi kepatuhan syariah. Informasi transaksi dapat berbeda berdasarkan akad, ketentuan produk, dan kondisi yang berlaku. Periksa dokumen resmi dan konsultasikan pertanyaan syariah kepada pihak yang kompeten.';

export const STEP_IDS: StepId[] = ['structure', 'transparency', 'mechanism', 'sharia', 'readiness'];

export const CHECKLIST_STEPS: ChecklistStepDef[] = [
  {
    id: 'structure',
    topic: 'AKAD / STRUKTUR',
    question: 'Apa yang sebenarnya terjadi dalam transaksi ini?',
    help: 'Pahami jenis transaksi dan struktur perjanjiannya. Jika belum jelas, jangan menebak.',
    missingLabel: 'Struktur transaksi atau akad',
    missingHint: 'Tanyakan kepada penyedia: apa akad atau struktur yang dipakai, dan siapa pihak-pihaknya?',
    options: [
      { id: 'cash', label: 'Jual beli (tunai)', status: 'clear' },
      { id: 'installment', label: 'Pembiayaan / cicilan', status: 'clear' },
      { id: 'rent', label: 'Sewa (ijarah)', status: 'clear' },
      { id: 'service', label: 'Layanan atau langganan berulang', status: 'clear' },
      { id: 'unknown', label: 'Saya belum tahu', status: 'unknown' },
    ],
  },
  {
    id: 'transparency',
    topic: 'TRANSPARANSI',
    question: 'Apakah harga, biaya, ketentuan, dan konsekuensinya dijelaskan dengan jelas?',
    help: 'Pastikan informasi penting dapat ditemukan dan dipahami.',
    missingLabel: 'Harga, biaya, ketentuan, dan konsekuensi',
    missingHint: 'Minta rincian harga akhir, biaya, denda, dan aturan pembatalan secara tertulis.',
    options: [
      { id: 'clear', label: 'Jelas, dan bisa saya periksa', status: 'clear' },
      { id: 'unclear', label: 'Sebagian masih belum jelas', status: 'partial' },
      { id: 'not_checked', label: 'Belum saya periksa', status: 'unknown' },
    ],
  },
  {
    id: 'mechanism',
    topic: 'MEKANISME',
    question: 'Bagaimana transaksi ini berjalan dari awal hingga selesai?',
    help: 'Pahami cara pembayaran, cicilan, biaya, pembatalan, dan kewajiban yang relevan.',
    missingLabel: 'Mekanisme transaksi dan kewajiban',
    missingHint: 'Tuliskan alur pembayaran, jadwal cicilan, dan apa yang terjadi bila terlambat atau membatalkan.',
    options: [
      { id: 'understand', label: 'Saya memahami alur dan kewajiban', status: 'clear' },
      { id: 'partial', label: 'Saya memahami sebagian', status: 'partial' },
      { id: 'not_understand', label: 'Saya belum memahami mekanismenya', status: 'unknown' },
    ],
  },
  {
    id: 'sharia',
    topic: 'ASPEK SYARIAH',
    question: 'Apa aspek syariah yang perlu saya pahami atau verifikasi?',
    help: 'Rujuk panduan dari sumber atau pihak yang kompeten. Aplikasi ini tidak mengeluarkan fatwa.',
    missingLabel: 'Panduan syariah dari sumber tepercaya',
    missingHint: 'Cari rujukan resmi (misalnya fatwa DSN-MUI yang relevan) dan tanyakan kepada pihak yang kompeten.',
    options: [
      { id: 'found', label: 'Saya sudah menemukan sumber tepercaya', status: 'clear' },
      { id: 'need_check', label: 'Saya masih perlu memeriksa sumber', status: 'partial' },
      { id: 'dont_know', label: 'Saya belum tahu harus memeriksa ke mana', status: 'unknown' },
    ],
  },
  {
    id: 'readiness',
    topic: 'KESIAPAN MEMILIH',
    question: 'Apakah saya sudah cukup memahami transaksi ini untuk mengambil keputusan?',
    help: 'Tidak apa-apa menunda jika ada hal penting yang belum jelas.',
    missingLabel: 'Kesiapan memahami keputusan',
    missingHint: 'Tunda keputusan sampai poin-poin di atas jelas.',
    options: [
      { id: 'understand', label: 'Ya, saya memahami informasi utamanya', status: 'clear' },
      { id: 'need_check', label: 'Saya masih perlu memeriksa beberapa hal', status: 'partial' },
      { id: 'not_understand', label: 'Saya belum cukup memahami', status: 'unknown' },
    ],
  },
];

export interface CategoryDef {
  id: TransactionCategory;
  label: string;
  icon: string; // nama ikon Ionicons
  blurb: string;
  extraQuestions: string[];
  lessonIds: string[];
  sourceIds: string[];
  scenarioId: string;
}

export const CATEGORIES: CategoryDef[] = [
  {
    id: 'shopping',
    label: 'Belanja online',
    icon: 'cart-outline',
    blurb: 'Diskon, marketplace, dan checkout cepat.',
    extraQuestions: [
      'Berapa harga akhir setelah ongkir dan biaya layanan?',
      'Bagaimana kebijakan retur dan pengembalian dana?',
    ],
    lessonIds: ['transparansi-biaya', 'sumber-tepercaya'],
    sourceIds: ['ojk-portal', 'bi-portal'],
    scenarioId: 'diskon-online',
  },
  {
    id: 'paylater',
    label: 'PayLater / cicilan',
    icon: 'card-outline',
    blurb: 'Bayar nanti, cicilan, dan pembiayaan digital.',
    extraQuestions: [
      'Apa akad atau struktur yang dipakai (jual beli, pembiayaan, atau lainnya)?',
      'Berapa total yang harus dibayar sampai lunas, termasuk biaya dan denda keterlambatan?',
      'Apakah penyedia terdaftar atau berizin di OJK?',
    ],
    lessonIds: ['akad-transaksi-digital', 'transparansi-biaya', 'pembiayaan-digital'],
    sourceIds: ['dsnmui-117-2018', 'dsnmui-111-2017', 'ojk-portal'],
    scenarioId: 'paylater',
  },
  {
    id: 'gold',
    label: 'Emas digital',
    icon: 'diamond-outline',
    blurb: 'Beli emas lewat aplikasi atau secara cicil.',
    extraQuestions: [
      'Bagaimana kepemilikan dan penyimpanan emasnya, dan apa dokumen buktinya?',
      'Apa biaya beli, jual, dan penyimpanan, serta bagaimana cara menarik emas fisik?',
      'Apakah pembayaran tunai atau tidak tunai, dan ketentuan apa yang berlaku?',
    ],
    lessonIds: ['risiko-investasi', 'akad-transaksi-digital'],
    sourceIds: ['dsnmui-77-2010', 'ojk-portal'],
    scenarioId: 'emas-digital',
  },
  {
    id: 'savings',
    label: 'Tabungan digital',
    icon: 'wallet-outline',
    blurb: 'Bank digital dan dompet elektronik.',
    extraQuestions: [
      'Apakah akad dan ketentuan produk tercantum di dokumen resmi?',
      'Apa saja biaya, batas, dan perlindungan dana yang berlaku?',
    ],
    lessonIds: ['layanan-keuangan-syariah', 'sumber-tepercaya'],
    sourceIds: ['dsnmui-116-2017', 'ojk-portal', 'bi-portal'],
    scenarioId: 'tabungan-digital',
  },
  {
    id: 'subscription',
    label: 'Langganan digital',
    icon: 'repeat-outline',
    blurb: 'Uji coba gratis dan tagihan berulang.',
    extraQuestions: [
      'Kapan tagihan pertama dan berapa biayanya?',
      'Bagaimana cara membatalkan sebelum perpanjangan otomatis?',
    ],
    lessonIds: ['transparansi-biaya'],
    sourceIds: ['ojk-portal'],
    scenarioId: 'langganan',
  },
  {
    id: 'donation',
    label: 'Donasi digital',
    icon: 'heart-outline',
    blurb: 'Zakat, infak, sedekah, dan wakaf online.',
    extraQuestions: [
      'Siapa penyelenggara dan apakah identitas serta izinnya dapat diperiksa?',
      'Bagaimana laporan penyaluran dana disampaikan?',
    ],
    lessonIds: ['zisw-digital', 'sumber-tepercaya'],
    sourceIds: ['ojk-portal'],
    scenarioId: 'donasi',
  },
];

export const CATEGORY_BY_ID: Record<TransactionCategory, CategoryDef> = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c]),
) as Record<TransactionCategory, CategoryDef>;

export const GENERIC_QUESTIONS = [
  'Apa akad atau struktur transaksi yang digunakan?',
  'Apa saja biaya, denda, dan konsekuensinya?',
  'Di mana saya bisa membaca dokumen resmi dan panduan syariahnya?',
];
