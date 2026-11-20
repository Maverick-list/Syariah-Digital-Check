import type { ChecklistStepDef, StepId, TransactionCategory } from '../types';

export const DISCLAIMER =
  'Aplikasi ini merupakan sarana edukasi literasi keuangan syariah, bukan fatwa, nasihat keuangan profesional, atau sertifikasi kepatuhan syariah. Informasi transaksi dapat berbeda berdasarkan akad, ketentuan produk, dan kondisi yang berlaku. Periksa dokumen resmi dan konsultasikan pertanyaan syariah kepada pihak yang kompeten.';

export const STEP_IDS: StepId[] = ['structure', 'transparency', 'mechanism', 'sharia', 'readiness'];

/** Default generic checklist steps for fallback and backwards compatibility */
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

/** Category-specific tailored checklist steps for all 9 categories */
export const CATEGORY_CHECKLIST_STEPS: Record<TransactionCategory, ChecklistStepDef[]> = {
  paylater: [
    {
      id: 'structure',
      topic: 'AKAD & STRUKTUR PEMBIAYAAN',
      question: 'Apakah struktur perjanjian PayLater menyatakan akad dan peran para pihak secara jelas?',
      help: 'Periksa apakah penyedia bertindak sebagai penjual langsung (Murabahah), pemberi talangan (Qardh), atau perantara perwakilan (Wakalah bil Ujrah).',
      missingLabel: 'Struktur akad dan pihak pembiayaan PayLater',
      missingHint: 'Tanyakan: apa akad pokok pembiayaan ini dan siapa pihak kreditur/pendana sebenarnya?',
      options: [
        { id: 'murabahah_clear', label: 'Jelas: Akad Murabahah / Qardh dengan peran pihak transparan', status: 'clear' },
        { id: 'hybrid_complex', label: 'Ada banyak pihak ketiga / skema pengalihan utang yang belum jelas', status: 'partial' },
        { id: 'unknown_structure', label: 'Saya belum memeriksa lembar ringkasan informasi produk', status: 'unknown' },
      ],
    },
    {
      id: 'transparency',
      topic: 'TRANSPARANSI BIAYA & DENDA',
      question: 'Bagaimana ketentuan biaya layanan, provisi, dan denda keterlambatan diatur?',
      help: "Sesuai Fatwa DSN-MUI No. 17/2000, denda keterlambatan (ta'zir) bagi nasabah mampu hanya boleh disalurkan untuk dana sosial kebajikan, bukan pendapatan penyedia.",
      missingLabel: "Alokasi denda keterlambatan (Ta'zir) dan rincian biaya",
      missingHint: "Tanyakan apakah denda bertingkat dialokasikan ke pos kebajikan sosial atau keuntungan kreditur.",
      options: [
        { id: 'social_tazir', label: 'Biaya tetap transparan, denda dialokasikan ke pos kebajikan sosial', status: 'clear' },
        { id: 'compound_interest', label: 'Ada denda persentase harian yang bertambah seiring hari keterlambatan', status: 'partial' },
        { id: 'fees_uninspected', label: 'Belum memeriksa rincian denda dan skema biaya administrasi', status: 'unknown' },
      ],
    },
    {
      id: 'mechanism',
      topic: 'MEKANISME & SERAH TERIMA',
      question: 'Apakah barang yang ditalangi sudah nyata, berstatus halal, dan diserahterimakan sebelum cicilan berjalan?',
      help: "Pastikan objek pembiayaan halal dan telah sah diserahkan (qabdh) sebelum kewajiban pelunasan jatuh tempo.",
      missingLabel: 'Keabsahan objek belanja dan bukti serah terima invoice',
      missingHint: 'Pastikan barang bukan objek terlarang dan invoice transaksi resmi dapat diunduh.',
      options: [
        { id: 'delivered_halal', label: 'Objek riil, halal, dan invoice pembelian diterbitkan resmi', status: 'clear' },
        { id: 'pending_validation', label: 'Objek digital/jasa yang bukti serah terimanya belum sepenuhnya jelas', status: 'partial' },
        { id: 'unclear_goods', label: 'Belum memverifikasi rincian barang atau legalitas merchant', status: 'unknown' },
      ],
    },
    {
      id: 'sharia',
      topic: 'LEGALITAS & PENGAWASAN SYARIAH',
      question: 'Apakah platform PayLater berizin OJK (POJK No. 40 Tahun 2024) dan diawasi Dewan Pengawas Syariah (DPS)?',
      help: 'Periksa izin resmi penyelenggara pada portal OJK dan pastikan produk memiliki opini kesesuaian syariah dari DPS.',
      missingLabel: 'Izin OJK dan rekomendasi Dewan Pengawas Syariah',
      missingHint: 'Periksa daftar penyelenggara berizin di portal OJK dan kepemilikan DPS.',
      options: [
        { id: 'licensed_dps', label: 'Berizin resmi OJK dan diawasi Dewan Pengawas Syariah', status: 'clear' },
        { id: 'licensed_only', label: 'Berizin OJK namun belum memiliki unit syariah / DPS', status: 'partial' },
        { id: 'unverified_license', label: 'Belum memverifikasi izin legalitas di portal OJK', status: 'unknown' },
      ],
    },
    {
      id: 'readiness',
      topic: 'KESIAPAN MEMILIH & BEBAN UTANG',
      question: 'Apakah total cicilan bulanan aman terhadap arus kas dan kamu siap menanggung konsekuensinya?',
      help: 'Patuhi prinsip Hifzhul Maal. Beban utang bulanan sebaiknya tidak melampaui 30% dari penghasilan rutin.',
      missingLabel: 'Kesiapan anggaran dan rasio beban utang',
      missingHint: 'Hitung total cicilan dan pastikan tidak melebihi 30% kapasitas pendapatan bulanan.',
      options: [
        { id: 'financially_ready', label: 'Ya, cicilan aman dalam batas anggaran (<30% penghasilan)', status: 'clear' },
        { id: 'tight_budget', label: 'Khawatir mengganggu pos kebutuhan pokok keluarga', status: 'partial' },
        { id: 'unplanned_impulse', label: 'Belum menghitung total tagihan / belanja impulsif', status: 'unknown' },
      ],
    },
  ],

  lending: [
    {
      id: 'structure',
      topic: 'AKAD PENDANAAN P2P SYARIAH',
      question: 'Apakah perjanjian pendanaan menggunakan akad syariah (Wakalah bil Ujrah / Mudharabah / Al-Qardh)?',
      help: 'Fatwa DSN-MUI No. 117/2018 mengatur layanan pembiayaan berbasis teknologi informasi dengan pemisahan peran platform dan pendana.',
      missingLabel: 'Kesesuaian akad pendanaan Fatwa 117/2018',
      missingHint: 'Periksa dokumen perjanjian apakah menggunakan akad Wakalah bil Ujrah atau pinjaman berbunga.',
      options: [
        { id: 'clear_p2p_contract', label: 'Jelas menggunakan akad syariah (Wakalah / Mudharabah / Musyarakah)', status: 'clear' },
        { id: 'hybrid_lending', label: 'Akad pinjam-meminjam konvensional berkedok syariah', status: 'partial' },
        { id: 'uninspected_p2p', label: 'Belum memeriksa perjanjian induk pendanaan', status: 'unknown' },
      ],
    },
    {
      id: 'transparency',
      topic: 'MANFAAT EKONOMI & BIAYA',
      question: 'Apakah total biaya pendanaan mematuhi batas manfaat ekonomi OJK (SEOJK No. 19/SEOJK.06/2023)?',
      help: 'Regulator membatasi manfaat ekonomi harian dan melarang bunga berbunga atau denda eksesif.',
      missingLabel: 'Batas manfaat ekonomi dan larangan denda eksesif',
      missingHint: 'Hitung seluruh biaya admin, provisi, dan denda agar tidak melampaui plafon pinjaman.',
      options: [
        { id: 'transparent_cap', label: 'Seluruh biaya di bawah batas maksimum OJK tanpa bunga harian ganda', status: 'clear' },
        { id: 'high_hidden_cost', label: 'Biaya admin dan asuransi memotong lebih dari 10% dana di awal', status: 'partial' },
        { id: 'unknown_cap', label: 'Belum mengetahui rincian potongan di awal dan bunga efektif', status: 'unknown' },
      ],
    },
    {
      id: 'mechanism',
      topic: 'PENYALURAN DANA & PENAGIHAN',
      question: 'Apakah dana disalurkan ke rekening escrow resmi dan SOP penagihan mematuhi kode etik?',
      help: 'Penyelenggara LPBBTI wajib menyalurkan dana melalui escrow account dan dilarang mengintimidasi kontak darurat.',
      missingLabel: 'Rekening penampung resmi dan kode etik penagihan',
      missingHint: 'Pastikan platform terdaftar di AFPI/AFSI dan memiliki sertifikasi penagihan etis.',
      options: [
        { id: 'ethical_collection', label: 'Penyaluran via rekening resmi dan penagihan tunduk pada kode etik AFSI', status: 'clear' },
        { id: 'unclear_escrow', label: 'Penyaluran dana melalui rekening perorangan atau akses kontak agresif', status: 'partial' },
        { id: 'not_checked_flow', label: 'Belum memeriksa kebijakan privasi data dan mekanisme pencairan', status: 'unknown' },
      ],
    },
    {
      id: 'sharia',
      topic: 'LEGALITAS LPBBTI & DPS',
      question: 'Apakah platform terdaftar resmi berizin LPBBTI di OJK (POJK 40/2024) dan didampingi DPS?',
      help: 'Waspadai pinjol ilegal. Pastikan platform tercantum di direktori fintech lending OJK yang sah.',
      missingLabel: 'Status izin LPBBTI resmi OJK',
      missingHint: 'Cek nomor izin OJK di website resmi ojk.go.id sebelum memberikan data identitas.',
      options: [
        { id: 'ojk_lpbti_verified', label: 'Terdaftar dan berizin resmi LPBBTI di OJK dengan Dewan Pengawas Syariah', status: 'clear' },
        { id: 'conventional_only', label: 'Berizin OJK namun beroperasi konvensional (bunga riba)', status: 'partial' },
        { id: 'unverified_fintech', label: 'Belum memverifikasi status izin di kontak OJK 157', status: 'unknown' },
      ],
    },
    {
      id: 'readiness',
      topic: 'KESIAPAN PELUNASAN',
      question: 'Apakah kamu memiliki sumber dana pasti untuk melunasi pendanaan tepat waktu?',
      help: 'Jangan meminjam untuk menutup utang lain (gali lubang tutup lubang).',
      missingLabel: 'Kepastian sumber dana pelunasan',
      missingHint: 'Jangan ajukan pinjaman jika belum ada kepastian arus kas masuk sebelum tanggal jatuh tempo.',
      options: [
        { id: 'repayment_ready', label: 'Pasti ada dana masuk sebelum tanggal jatuh tempo', status: 'clear' },
        { id: 'speculative_repay', label: 'Bergantung pada spekulasi atau pinjaman berikutnya', status: 'partial' },
        { id: 'uncalculated_repay', label: 'Belum menghitung jadwal arus kas pembayaran', status: 'unknown' },
      ],
    },
  ],

  shopping: [
    {
      id: 'structure',
      topic: 'AKAD & OBJEK JUAL BELI',
      question: 'Apakah barang yang dibeli nyata, spesifikasinya jelas, dan berstatus halal?',
      help: "Jual beli sah jika objek diketahui jelas kuantitas dan kualitasnya untuk menghindari gharar (ketidakpastian).",
      missingLabel: 'Kejelasan spesifikasi objek barang dan kehalalan',
      missingHint: 'Pastikan deskripsi barang jelas, bukan barang bajakan/haram, dan stoknya nyata.',
      options: [
        { id: 'halal_real_goods', label: 'Barang halal, spesifikasi jelas, dan penjual memiliki stok riil', status: 'clear' },
        { id: 'dropship_unclear', label: 'Skema dropshipping di mana penjual belum memiliki barang / izin wakalah', status: 'partial' },
        { id: 'speculative_goods', label: 'Spesifikasi samar / gambar ilustrasi tanpa kepastian kondisi barang', status: 'unknown' },
      ],
    },
    {
      id: 'transparency',
      topic: 'TRANSPARANSI HARGA & BIAYA',
      question: 'Apakah rincian harga barang, ongkos kirim, diskon, dan biaya platform tertera sebelum bayar?',
      help: 'Seluruh komponen biaya harus transparan sebelum tombol bayar ditekan.',
      missingLabel: 'Rincian total harga dan biaya administrasi platform',
      missingHint: 'Periksa breakdown tagihan sebelum konfirmasi checkout.',
      options: [
        { id: 'price_all_clear', label: 'Semua biaya (ongkir, asuransi, fee aplikasi) dijabarkan transparan', status: 'clear' },
        { id: 'hidden_surcharge', label: 'Ada biaya handling tambahan yang baru muncul di halaman pembayaran', status: 'partial' },
        { id: 'price_unchecked', label: 'Belum memeriksa rincian biaya tambahan pada tagihan', status: 'unknown' },
      ],
    },
    {
      id: 'mechanism',
      topic: 'SERAH TERIMA & HAK KHIYAR',
      question: 'Apakah terdapat jaminan garansi retur/pengembalian dana jika barang rusak atau cacat?',
      help: 'Hak khiyar (hak opsi melanjutkan atau membatalkan akad saat barang cacat) adalah perlindungan syariah bagi pembeli.',
      missingLabel: 'Kebijakan garansi retur (Hak Khiyar)',
      missingHint: 'Cek ketentuan komplain dan kebijakan pengembalian dana marketplace.',
      options: [
        { id: 'khiyar_guaranteed', label: 'Ada garansi uang kembali / hak retur jika barang tidak sesuai', status: 'clear' },
        { id: 'no_return_clause', label: 'Penjual menolak retur sama sekali meskipun ada cacat pabrik', status: 'partial' },
        { id: 'khiyar_uninspected', label: 'Belum membaca ketentuan pengembalian barang penjual', status: 'unknown' },
      ],
    },
    {
      id: 'sharia',
      topic: 'BEBAS GHARAR & MAYSIR',
      question: 'Apakah metode pembayaran dan promo bebas dari unsur judi untung-untungan berbayar (maysir)?',
      help: 'Mystery box berbayar atau undian acak berhadiah dengan modal beli berpotensi mengandung unsur perjudian.',
      missingLabel: 'Bebas skema untung-untungan / mistery box',
      missingHint: 'Hindari paket misteri acak (mystery box) yang isinya tidak diketahui pasti nilainya.',
      options: [
        { id: 'clean_cash_buy', label: 'Beli tunai langsung tanpa undian berbayar atau mystery box spekulatif', status: 'clear' },
        { id: 'gamified_lottery', label: 'Terdapat undian berhadiah acak yang mensyaratkan pembelian tambahan', status: 'partial' },
        { id: 'lottery_unchecked', label: 'Belum memperhatikan klausul promo bersyarat yang ditawarkan', status: 'unknown' },
      ],
    },
    {
      id: 'readiness',
      topic: 'JEDA KEPUTUSAN & KEBUTUHAN',
      question: 'Apakah pembelian ini memenuhi kebutuhan riil dan bukan belanja impulsif karena FOMO?',
      help: 'Ambil jeda sejenak untuk membedakan antara kebutuhan (hajah) dan sekadar keinginan berlebih (hawa nafs).',
      missingLabel: 'Evaluasi kebutuhan riil vs impulsif',
      missingHint: 'Simpan barang di keranjang selama 24 jam sebelum memutuskan checkout.',
      options: [
        { id: 'need_verified', label: 'Sangat dibutuhkan dan telah dianggarkan dengan matang', status: 'clear' },
        { id: 'spontaneous_want', label: 'Tergiur flash sale / diskon sesaat yang belum tentu terpakai', status: 'partial' },
        { id: 'fomo_decision', label: 'Membeli terburu-buru sebelum stok habis tanpa berpikir panjang', status: 'unknown' },
      ],
    },
  ],

  subscription: [
    {
      id: 'structure',
      topic: 'AKAD IJARAH LAYANAN',
      question: 'Apakah akad sewa manfaat layanan (Ijarah Khidmat) memiliki durasi dan hak akses yang pasti?',
      help: 'Akad sewa jasa mewajibkan kejelasan durasi masa aktif dan spesifikasi manfaat yang didapatkan pengguna.',
      missingLabel: 'Kejelasan durasi dan ruang lingkup hak akses langganan',
      missingHint: 'Pastikan dokumen T&C menyebutkan jangka waktu aktif dan ruang lingkup layanan.',
      options: [
        { id: 'ijarah_clear', label: 'Jelas: Hak akses dan periode layanan (bulanan/tahunan) tertera pasti', status: 'clear' },
        { id: 'ijarah_ambiguous', label: 'Hak akses dapat diubah sepihak oleh penyedia tanpa pemberitahuan', status: 'partial' },
        { id: 'ijarah_uninspected', label: 'Belum membaca lembar ketentuan durasi langganan', status: 'unknown' },
      ],
    },
    {
      id: 'transparency',
      topic: 'KLAUSUL PERPANJANGAN OTOMATIS',
      question: 'Apakah ketentuan auto-renewal (debit otomatis) dan tarif normal pasca free-trial dijelaskan gamblang?',
      help: 'Penyedia wajib memberitahukan tanggal berakhirnya uji coba gratis sebelum tagihan pertama ditarik.',
      missingLabel: 'Transparansi auto-debit dan tarif pasca masa uji coba',
      missingHint: 'Periksa kapan tagihan pertama didebit dan berapa tarif perpanjangan berkala.',
      options: [
        { id: 'renewal_transparent', label: 'Tanggal perpanjangan dan nominal tagihan berikutnya dijelaskan gamblang', status: 'clear' },
        { id: 'surprise_renewal', label: 'Periode free-trial langsung menagih tanpa notifikasi pengingat', status: 'partial' },
        { id: 'renewal_uninspected', label: 'Belum mengetahui tanggal dan nominal debit otomatis berikutnya', status: 'unknown' },
      ],
    },
    {
      id: 'mechanism',
      topic: 'KEMUDAHAN PEMBATALAN',
      question: 'Apakah mekanisme pembatalan langganan (cancellation) mudah diakses kapan saja tanpa penalti?',
      help: 'Pengguna berhak menghentikan langganan tanpa prosedur berbelit-belit atau pemotongan sepihak.',
      missingLabel: 'Prosedur pembatalan langganan mandiri',
      missingHint: 'Pastikan tombol kelola atau batalkan langganan dapat diakses langsung dari menu profil.',
      options: [
        { id: 'easy_cancel', label: 'Bisa dibatalkan kapan saja lewat menu aplikasi dalam beberapa klik', status: 'clear' },
        { id: 'difficult_cancel', label: 'Harus menghubungi call center luar negeri / formulir rumit untuk batal', status: 'partial' },
        { id: 'cancel_uninspected', label: 'Belum mengecek cara menghentikan debit otomatis di pengaturan', status: 'unknown' },
      ],
    },
    {
      id: 'sharia',
      topic: 'KEHALALAN OBJEK LAYANAN',
      question: 'Apakah konten atau software yang dilanggan terbebas dari unsur maksiat dan materi terlarang?',
      help: 'Sewa jasa untuk hal yang bertentangan dengan syariat hukumnya tidak diperkenankan.',
      missingLabel: 'Kehalalan konten dan kegunaan software',
      missingHint: 'Pastikan manfaat layanan mendukung aktivitas yang halal dan berfaedah.',
      options: [
        { id: 'halal_content', label: 'Konten / software bermanfaat untuk produktivitas atau edukasi halal', status: 'clear' },
        { id: 'mixed_content', label: 'Platform memuat materi yang bercampur dengan konten pornografi/judi', status: 'partial' },
        { id: 'content_unchecked', label: 'Belum meninjau katalog konten yang disediakan platform', status: 'unknown' },
      ],
    },
    {
      id: 'readiness',
      topic: 'PEMANTAUAN RUTIN & UTILISASI',
      question: 'Apakah layanan ini akan dipakai secara intensif dan kamu sudah memasang alarm evaluasi?',
      help: 'Membayar langganan berulang yang tidak terpakai merupakan bentuk pemborosan (tabdzir).',
      missingLabel: 'Evaluasi utilitas langganan berkala',
      missingHint: 'Pasang pengingat kalender 3 hari sebelum perpanjangan otomatis untuk mengevaluasi manfaatnya.',
      options: [
        { id: 'active_utility', label: 'Pasti digunakan rutin dan saya sudah menyetel alarm pengingat', status: 'clear' },
        { id: 'doubtful_use', label: 'Kemungkinan jarang dipakai setelah minggu pertama', status: 'partial' },
        { id: 'no_reminder_set', label: 'Belum memasang pengingat kalender untuk evaluasi berkala', status: 'unknown' },
      ],
    },
  ],

  gold: [
    {
      id: 'structure',
      topic: 'FISIK EMAS & KUSTODIAN',
      question: 'Apakah emas digital didukung 100% oleh emas fisik murni bersertifikat di kustodian berizin?',
      help: 'Peraturan Bappebti No. 4 Tahun 2019 mewajibkan rasio fisik emas murni minimal 100% di lembaga kustodian terdaftar.',
      missingLabel: 'Ketersediaan emas fisik 100% di brankas kustodian',
      missingHint: 'Tanyakan: siapa lembaga kustodian tempat emas disimpan dan apakah ada laporan audit independen?',
      options: [
        { id: 'audited_physical_gold', label: 'Didukung 100% fisik emas murni bersertifikat di kustodian berizin Bappebti', status: 'clear' },
        { id: 'fractional_reserve', label: 'Klaim saldo emas tanpa kejelasan lokasi brankas fisik atau audit', status: 'partial' },
        { id: 'uninspected_gold_vault', label: 'Belum memeriksa bukti kustodian dan nomor izin Bappebti', status: 'unknown' },
      ],
    },
    {
      id: 'transparency',
      topic: 'SERAH TERIMA NON-TUNAI (QABDH HUKMI)',
      question: 'Apakah pencatatan saldo emas ke rekeningmu berlangsung seketika sesuai Fatwa DSN-MUI No. 77/2010?',
      help: 'Fatwa DSN-MUI No. 77/2010 membolehkan jual beli emas non-tunai jika ada serah terima yuridis/pencatatan seketika (qabdh hukmi).',
      missingLabel: 'Mekanisme serah terima yuridis (Qabdh Hukmi)',
      missingHint: 'Pastikan saldo gramatur emas langsung bertambah di portofolio saat pembayaran terkonfirmasi.',
      options: [
        { id: 'immediate_qabdh', label: 'Saldo gram emas langsung tercatat seketika dengan nomor seri/sertifikat sah', status: 'clear' },
        { id: 'delayed_allocation', label: 'Saldo emas baru dialokasikan beberapa hari setelah transaksi selesai', status: 'partial' },
        { id: 'qabdh_not_checked', label: 'Belum mengetahui kapan status alokasi gramatur emas resmi sah', status: 'unknown' },
      ],
    },
    {
      id: 'mechanism',
      topic: 'HAK CETAK FISIK & BIAYA',
      question: 'Apakah kamu memiliki hak mencetak emas fisik kapan saja dengan rincian biaya transparan?',
      help: 'Pemilik emas berhak menukarkan saldo digital menjadi emas batangan fisik riil.',
      missingLabel: 'Hak penarikan fisik dan rincian biaya cetak emas',
      missingHint: 'Periksa berapa gram batas minimal cetak dan berapa ongkos cetak per gramnya.',
      options: [
        { id: 'physical_delivery_clear', label: 'Bisa dicetak menjadi fisik kapan saja dengan biaya cetak & kirim transparan', status: 'clear' },
        { id: 'hard_to_withdraw', label: 'Batas minimal cetak sangat tinggi atau biaya cetak tidak dicantumkan', status: 'partial' },
        { id: 'withdraw_uninspected', label: 'Belum mengetahui syarat dan biaya penarikan fisik emas', status: 'unknown' },
      ],
    },
    {
      id: 'sharia',
      topic: 'LARANGAN MARGIN & SPEKULASI',
      question: 'Apakah transaksi murni jual beli emas fisik tanpa skema margin trading, leverage, atau short-selling?',
      help: 'Perdagangan emas digital tidak boleh menggunakan pinjaman dana berbunga (margin) atau tebak arah pergerakan harga.',
      missingLabel: 'Larangan skema margin trading / leverage pada emas',
      missingHint: 'Pastikan pembelian dilakukan 100% tunai dari dana sendiri tanpa fasilitas pinjaman berlipat.',
      options: [
        { id: 'spot_cash_only', label: 'Jual beli tunai langsung (spot) tanpa leverage atau fasilitas pinjaman margin', status: 'clear' },
        { id: 'margin_facility_active', label: 'Terdapat opsi trading emas menggunakan leverage / pinjaman berbunga', status: 'partial' },
        { id: 'trading_type_unchecked', label: 'Belum memeriksa fitur produk apakah spot murni atau kontrak berjangka', status: 'unknown' },
      ],
    },
    {
      id: 'readiness',
      topic: 'PROFIL RISIKO & TUJUAN INVESTASI',
      question: 'Apakah pembelian emas ini ditujukan untuk perlindungan nilai jangka menengah/panjang?',
      help: 'Emas memiliki selisih harga beli dan harga jual (spread). Tidak disarankan untuk spekulasi jangka pendek.',
      missingLabel: 'Pemahaman selisih harga (spread) dan jangka waktu investasi',
      missingHint: 'Periksa selisih harga jual dan beli (spread), pastikan untuk jangka waktu minimal 1 tahun.',
      options: [
        { id: 'long_term_hedging', label: 'Untuk tabungan lindung nilai jangka panjang (>1 tahun) dengan dana dingin', status: 'clear' },
        { id: 'short_term_trade', label: 'Berharap untung instan dalam hitungan hari tanpa menghitung spread', status: 'partial' },
        { id: 'spread_uncalculated', label: 'Belum menghitung selisih harga beli dan harga buyback aplikasi', status: 'unknown' },
      ],
    },
  ],

  savings: [
    {
      id: 'structure',
      topic: 'AKAD PENYIMPANAN DANA',
      question: 'Apakah penempatan saldo menggunakan akad Wadiah Yad Dhamanah atau Qardh sesuai Fatwa 116/2017?',
      help: 'Uang elektronik syariah wajib menggunakan akad titipan amanah (Wadiah) atau pinjaman kebajikan tanpa janji imbalan.',
      missingLabel: "Kesesuaian akad uang elektronik Fatwa DSN-MUI No. 116/2017",
      missingHint: 'Periksa syarat dan ketentuan dompet elektronik: apakah menggunakan akad Wadiah atau konvensional.',
      options: [
        { id: 'wadiah_clear', label: 'Jelas menggunakan akad Wadi\'ah Yad Dhamanah / Qardh sesuai Fatwa 116/2017', status: 'clear' },
        { id: 'conventional_wallet', label: 'Penyimpanan dana konvensional tanpa kejelasan akad syariah', status: 'partial' },
        { id: 'wallet_uninspected', label: 'Belum memeriksa akad pembukaan akun di dokumen syarat & ketentuan', status: 'unknown' },
      ],
    },
    {
      id: 'transparency',
      topic: 'LARANGAN BUNGA ATAS SALDO',
      question: 'Apakah saldo tersimpan bebas dari pemberian bunga atau imbalan otomatis atas saldo mengendap?',
      help: 'Kaidah fiqih: Setiap pinjaman yang menarik keuntungan bersyarat adalah riba (kullu qardhin jarra manfa\'atan fahuwa riba).',
      missingLabel: 'Bebas bunga atas saldo mengendap',
      missingHint: 'Pastikan saldo mengendap tidak menghasilkan bunga harian otomatis.',
      options: [
        { id: 'zero_interest_balance', label: 'Bebas bunga; saldo murni bernilai nominal simpanan tanpa tambahan', status: 'clear' },
        { id: 'automatic_yield', label: 'Memberikan bunga simpanan harian otomatis atas saldo mengendap', status: 'partial' },
        { id: 'yield_unchecked', label: 'Belum meneliti skema pertumbuhan saldo di aplikasi', status: 'unknown' },
      ],
    },
    {
      id: 'mechanism',
      topic: 'PROMO CASHBACK & REWARD',
      question: 'Apakah promo potongan harga/cashback tidak mensyaratkan kewajiban saldo utang berbunga?',
      help: 'Diskon atau promosi dari penerbit diperbolehkan jika murni potongan biaya layanan (ujrah) atau hadiah sukarela (hibah).',
      missingLabel: 'Kejelasan skema promo cashback / reward belanja',
      missingHint: 'Pastikan promo tidak mewajibkan penempatan saldo pinjaman berjangka yang mengikat.',
      options: [
        { id: 'clean_discount_promo', label: 'Diskon murni potongan biaya merchant tanpa syarat utang mengendap', status: 'clear' },
        { id: 'tied_balance_promo', label: 'Promo mewajibkan mempertahankan saldo minimal berbunga pinjaman', status: 'partial' },
        { id: 'promo_uninspected', label: 'Belum memeriksa syarat dan ketentuan voucher/promo yang digunakan', status: 'unknown' },
      ],
    },
    {
      id: 'sharia',
      topic: 'IZIN BANK INDONESIA & DPS',
      question: 'Apakah penerbit uang elektronik berizin Bank Indonesia dan menerapkan sistem keamanan teruji?',
      help: 'Penerbit dompet digital dan payment gateway wajib memiliki lisensi resmi dari Bank Indonesia.',
      missingLabel: 'Status lisensi resmi Bank Indonesia dan keamanan akun',
      missingHint: 'Pastikan aplikasi terdaftar di Bank Indonesia dan mengaktifkan autentikasi 2 faktor (PIN/2FA).',
      options: [
        { id: 'bi_licensed_secure', label: 'Berizin resmi Bank Indonesia dengan unit syariah dan sistem proteksi 2FA', status: 'clear' },
        { id: 'bi_licensed_only', label: 'Berizin BI namun belum menerapkan opsi syariah secara penuh', status: 'partial' },
        { id: 'bi_license_unchecked', label: 'Belum memverifikasi legalitas penerbit di direktori Bank Indonesia', status: 'unknown' },
      ],
    },
    {
      id: 'readiness',
      topic: 'PENGENDALIAN SALDO OPERASIONAL',
      question: 'Apakah saldo dompet digital dibatasi hanya untuk kebutuhan transaksi operasional harian?',
      help: 'Simpan dana cadangan di rekening bank syariah berpenjaminan LPS, bukan menumpuk uang berlebih di e-wallet.',
      missingLabel: 'Batasan saldo e-wallet sesuai kebutuhan operasional',
      missingHint: 'Batasi saldo uang elektronik secukupnya untuk transaksi harian agar memitigasi risiko keamanan.',
      options: [
        { id: 'rational_wallet_balance', label: 'Saldo dibatasi secukupnya untuk belanja harian yang terukur', status: 'clear' },
        { id: 'excessive_idle_money', label: 'Menyimpan saldo berlebih tanpa proteksi penjaminan simpanan', status: 'partial' },
        { id: 'unmonitored_balance', label: 'Jarang memeriksa histori mutasi dan sisa saldo berkala', status: 'unknown' },
      ],
    },
  ],

  investment: [
    {
      id: 'structure',
      topic: 'UNDERLYING ASSET & SEKTOR USAHA',
      question: 'Apakah investasi memiliki aset dasar (underlying) riil dan sektor usahanya terbukti halal?',
      help: 'Investasi syariah wajib berbasis pada aktivitas sektor riil yang halal, bukan bisnis miras, perjudian, atau ribawi.',
      missingLabel: 'Kejelasan aset dasar (underlying) dan kehalalan sektor usaha',
      missingHint: 'Minta prospektus: apa portofolio bisnis yang didanai dan apakah masuk Daftar Efek Syariah (DES)?',
      options: [
        { id: 'halal_underlying_clear', label: 'Aset dasar riil, halal, dan terdaftar dalam Daftar Efek Syariah (DES)', status: 'clear' },
        { id: 'mixed_portfolio', label: 'Portofolio bercampur dengan emiten ribawi atau sub-sektor abu-abu', status: 'partial' },
        { id: 'uninspected_underlying', label: 'Belum menelaah prospektus bisnis dan sektor industri emiten', status: 'unknown' },
      ],
    },
    {
      id: 'transparency',
      topic: 'BAGI HASIL VS BUNGA TETAP',
      question: 'Apakah skema imbal hasil berbasis nisbah bagi hasil nyata dan BUKAN jaminan bunga tetap (fixed return)?',
      help: 'Menjanjikan imbal hasil tetap pasti untung (guaranteed fixed return) atas modal investasi dilarang karena merubah akad menjadi pinjaman ribawi.',
      missingLabel: 'Skema nisbah bagi hasil (Mudharabah/Musyarakah) vs janji return tetap',
      missingHint: 'Waspadai tawaran investasi yang menjanjikan persentase keuntungan pasti tanpa risiko.',
      options: [
        { id: 'nisbah_bagi_hasil', label: 'Bagi hasil berbasis rasio (nisbah) dari laba riil, siap untung dan rugi proporsional', status: 'clear' },
        { id: 'guaranteed_fixed_rate', label: 'Menjanjikan imbalan persentase pasti tetap per bulan tanpa risiko rugi', status: 'partial' },
        { id: 'return_scheme_uninspected', label: 'Belum memahami formula pembagian keuntungan dan laporan laba-rugi', status: 'unknown' },
      ],
    },
    {
      id: 'mechanism',
      topic: 'BEBAS GHARAR & MAYSIR',
      question: 'Apakah pergerakan nilai investasi berbasis kinerja usaha riil, bukan perjudian tebak harga (maysir)?',
      help: 'Skema binary option, tebak lilin grafik harga, dan spekulasi perputaran uang cepat tanpa aset riil termasuk perjudian terlarang.',
      missingLabel: 'Bebas skema binary option / perjudian tebak pergerakan harga',
      missingHint: 'Pastikan ada kepemilikan saham, sukuk, atau surat berharga riil yang tercatat di KSEI.',
      options: [
        { id: 'real_business_growth', label: 'Pertumbuhan nilai bersumber dari kinerja operasional bisnis riil', status: 'clear' },
        { id: 'speculative_gamification', label: 'Skema tebak naik-turun harga jangka pendek (zero-sum game/maysir)', status: 'partial' },
        { id: 'trading_logic_unchecked', label: 'Belum mengetahui bagaimana instrumen ini menghasilkan keuntungan', status: 'unknown' },
      ],
    },
    {
      id: 'sharia',
      topic: 'LEGALITAS OJK / BAPPEBTI & DPS',
      question: 'Apakah platform investasi dan manajer investasi terdaftar resmi di OJK/Bappebti serta diawasi DPS?',
      help: 'Cek legalitas di portal OJK (Waspada Investasi) dan pastikan manajer investasi berizin resmi.',
      missingLabel: 'Izin OJK / Bappebti dan opini syariah DPS',
      missingHint: 'Cek portal OJK dan Satgas PASTI untuk memastikan platform bukan investasi bodong.',
      options: [
        { id: 'ojk_dps_approved', label: 'Berizin resmi OJK/Bappebti dengan Dewan Pengawas Syariah / Ahli Pasar Modal Syariah', status: 'clear' },
        { id: 'license_in_process', label: 'Klaim izin luar negeri / belum terdaftar di regulator pasar modal Indonesia', status: 'partial' },
        { id: 'legal_status_uninspected', label: 'Belum memverifikasi izin legalitas di kontak OJK 157', status: 'unknown' },
      ],
    },
    {
      id: 'readiness',
      topic: 'KESIAPAN RISIKO MODAL (DANA DINGIN)',
      question: 'Apakah dana yang digunakan merupakan dana dingin dan kamu memahami risiko fluktuasi pasar?',
      help: 'Kaidah Fiqih: Al-Ghunmu bil-Ghurmi (keuntungan berbanding lurus dengan kesiapan menanggung risiko kerugian).',
      missingLabel: 'Penggunaan dana dingin dan profil toleransi risiko',
      missingHint: 'Jangan gunakan uang dapur, uang sekolah, atau dana darurat untuk investasi berfluktuasi.',
      options: [
        { id: 'cold_money_ready', label: 'Menggunakan dana dingin yang siap dengan risiko fluktuasi nilai pasar', status: 'clear' },
        { id: 'emergency_money_used', label: 'Menggunakan dana darurat / uang kebutuhan pokok bulanan', status: 'partial' },
        { id: 'risk_profile_unchecked', label: 'Belum mengukur toleransi risiko penurunan nilai modal', status: 'unknown' },
      ],
    },
  ],

  donation: [
    {
      id: 'structure',
      topic: 'AKAD & PERUNTUKAN DONASI',
      question: 'Apakah peruntukan dana jelas antara Zakat (wajib 8 asnaf), Infak/Sedekah, atau Wakaf Tunai?',
      help: 'Zakat memiliki kriteria penerima khusus (8 asnaf), sedangkan infak dan wakaf memiliki ketentuan pengelolaan tersendiri.',
      missingLabel: 'Kejelasan klasifikasi dana (Zakat vs Infak vs Wakaf)',
      missingHint: 'Pilih peruntukan dana yang spesifik agar penyalurannya tepat sasaran.',
      options: [
        { id: 'fund_type_clear', label: 'Klasifikasi dana sangat jelas (Zakat / Infak / Wakaf Tunai)', status: 'clear' },
        { id: 'broad_social_fund', label: 'Program sosial umum tanpa kejelasan akad tabarru yang dipakai', status: 'partial' },
        { id: 'fund_type_uninspected', label: 'Belum membaca peruntukan dana program donasi', status: 'unknown' },
      ],
    },
    {
      id: 'transparency',
      topic: 'LEGALITAS LEMBAGA PENGELOLA',
      question: 'Apakah lembaga pengelola memiliki izin resmi (BAZNAS / LAZ Kemenag / BWI) dan diaudit publik?',
      help: 'Lembaga amil zakat wajib berizin dari Kementerian Agama atau BAZNAS, sedangkan wakaf harus terdaftar di BWI.',
      missingLabel: 'Legalitas izin LAZ Kemenag atau Badan Wakaf Indonesia',
      missingHint: 'Periksa nomor SK izin operasional LAZ di portal BAZNAS atau Kemenag.',
      options: [
        { id: 'official_laz_registered', label: 'LAZ resmi berizin Kemenag/BAZNAS/BWI dengan laporan audit transparan', status: 'clear' },
        { id: 'community_initiative', label: 'Komunitas perorangan tanpa badan hukum atau audit keuangan independen', status: 'partial' },
        { id: 'charity_license_uninspected', label: 'Belum memeriksa legalitas lembaga pengumpul donasi', status: 'unknown' },
      ],
    },
    {
      id: 'mechanism',
      topic: 'POTONGAN AMIL & BIAYA PLATFORM',
      question: 'Apakah persentase hak amil/biaya operasional platform disampaikan secara terbuka?',
      help: 'Hak amil zakat dibatasi oleh fatwa syariah dan regulasi Kemenag, maksimal 1/8 (12,5%) untuk amil berhak.',
      missingLabel: 'Transparansi potongan hak amil dan biaya transaksi',
      missingHint: 'Cek berapa persen potongan operasional dari setiap donasi yang disalurkan.',
      options: [
        { id: 'fee_cut_transparent', label: 'Potongan operasional transparan dan memenuhi batas ketentuan syariah', status: 'clear' },
        { id: 'high_fee_cut', label: 'Potongan administrasi platform melebihi batas kewajaran tanpa rincian', status: 'partial' },
        { id: 'fee_cut_uninspected', label: 'Belum memeriksa apakah ada potongan fee dari donasi yang dikirim', status: 'unknown' },
      ],
    },
    {
      id: 'sharia',
      topic: 'BUKTI SETOR & LAPORAN PENYALURAN',
      question: 'Apakah donatur mendapatkan Bukti Setor Zakat (BSZ) resmi dan pembaruan penyaluran berkala?',
      help: 'BSZ resmi dari BAZNAS/LAZ dapat digunakan sebagai pengurang penghasilan kena pajak sesuai regulasi perpajakan.',
      missingLabel: 'Bukti setor resmi dan transparansi laporan penyaluran',
      missingHint: 'Pastikan platform mengirimkan bukti setor donasi dan laporan dokumentasi penerima manfaat.',
      options: [
        { id: 'bsz_reporting_clear', label: 'Mendapatkan bukti setor resmi dan laporan penyaluran berkala', status: 'clear' },
        { id: 'no_formal_report', label: 'Tidak ada pembaruan atau laporan dokumentasi setelah dana ditransfer', status: 'partial' },
        { id: 'reporting_uninspected', label: 'Belum mengetahui bagaimana laporan pertanggungjawaban disampaikan', status: 'unknown' },
      ],
    },
    {
      id: 'readiness',
      topic: 'KEIKHLASAN & PRIORITAS NAFKAH',
      question: 'Apakah donasi bersumber dari harta halal dan tidak melalaikan kewajiban nafkah keluarga?',
      help: 'Menunaikan nafkah wajib kepada keluarga lebih utama daripada sedekah sukarela.',
      missingLabel: 'Prioritas pemenuhan nafkah wajib keluarga',
      missingHint: 'Pastikan kebutuhan pokok keluarga telah terpenuhi sebelum memberikan sedekah sunnah.',
      options: [
        { id: 'sincere_nafkah_safe', label: 'Nafkah keluarga aman terpenuhi dan bersumber dari rezeki yang halal', status: 'clear' },
        { id: 'tight_family_budget', label: 'Mengorbankan pos kebutuhan pokok keluarga demi donasi sukarela', status: 'partial' },
        { id: 'readiness_unconsidered', label: 'Belum menimbang prioritas antara nafkah wajib dan sedekah sunnah', status: 'unknown' },
      ],
    },
  ],

  other: [
    {
      id: 'structure',
      topic: 'AKAD & PARA PIHAK',
      question: 'Apakah nama akad, hak, dan kewajiban masing-masing pihak tertulis jelas dalam dokumen perjanjian?',
      help: "Pastikan kamu mengetahui jenis akad yang digunakan dan siapa saja pihak yang mengikatkan diri.",
      missingLabel: 'Kejelasan akad dan pihak dalam perjanjian',
      missingHint: 'Tanyakan kepada penyedia: apa nama akad resmi yang digunakan dan apa dokumen buktinya?',
      options: [
        { id: 'clear_other_structure', label: 'Nama akad, hak, dan kewajiban para pihak tertulis gamblang', status: 'clear' },
        { id: 'complex_other_terms', label: 'Ada klausul pengikatan sepihak yang sulit dipahami', status: 'partial' },
        { id: 'uninspected_other_terms', label: 'Saya belum membaca syarat dan ketentuan produk', status: 'unknown' },
      ],
    },
    {
      id: 'transparency',
      topic: 'TRANSPARANSI BIAYA & KONSEKUENSI',
      question: 'Apakah seluruh biaya, jadwal pembayaran, dan konsekuensi wanprestasi dipaparkan secara rinci?',
      help: 'Hindari klausul tersembunyi yang dapat membebani biaya tak terduga di kemudian hari.',
      missingLabel: 'Rincian biaya dan aturan konsekuensi keterlambatan',
      missingHint: 'Minta rincian skema biaya lengkap secara tertulis sebelum menyetujui.',
      options: [
        { id: 'transparent_other_costs', label: 'Seluruh biaya dan konsekuensi dijelaskan secara transparan', status: 'clear' },
        { id: 'hidden_other_fees', label: 'Ada potensi biaya tambahan atau denda yang belum pasti nominalnya', status: 'partial' },
        { id: 'uninspected_other_fees', label: 'Belum memeriksa rincian biaya dan denda keterlambatan', status: 'unknown' },
      ],
    },
    {
      id: 'mechanism',
      topic: 'OBJEK & MEKANISME TRANSAKSI',
      question: 'Apakah objek transaksi nyata, halal, dan mekanisme pemenuhannya dapat diverifikasi dengan bukti sah?',
      help: 'Barang atau jasa harus riil, halal, dan diserahterimakan dengan bukti penerimaan yang valid.',
      missingLabel: 'Keabsahan objek transaksi dan bukti serah terima',
      missingHint: 'Pastikan objek transaksi halal dan mekanisme penyerahan dapat dipantau.',
      options: [
        { id: 'verifiable_other_goods', label: 'Objek nyata, halal, dan bukti serah terima dapat diverifikasi resmi', status: 'clear' },
        { id: 'delayed_other_goods', label: 'Mekanisme penyerahan berbelit-belit tanpa estimasi waktu pasti', status: 'partial' },
        { id: 'uninspected_other_goods', label: 'Belum memverifikasi keberadaan fisik objek transaksi', status: 'unknown' },
      ],
    },
    {
      id: 'sharia',
      topic: 'KEPATUHAN PRINSIP MUAMALAH',
      question: 'Apakah transaksi terbebas dari Riba (bunga utang), Gharar (penipuan/ketidakpastian), dan Maysir (judi)?',
      help: 'Pastikan transaksi tidak memuat klausul pertambahan utang berbunga atau unsur spekulasi untung-untungan.',
      missingLabel: 'Bebas dari unsur Riba, Gharar, dan Maysir',
      missingHint: 'Konsultasikan dokumen perjanjian dengan asatidz atau dewan pengawas syariah.',
      options: [
        { id: 'clean_other_muamalah', label: 'Bebas dari klausul bunga, spekulasi judi, dan ketidakpastian objek', status: 'clear' },
        { id: 'doubtful_other_clause', label: 'Terdapat klausul penalti bertingkat atau promo untung-untungan', status: 'partial' },
        { id: 'uninspected_other_sharia', label: 'Belum mengetahui kesesuaian klausul dengan kaidah muamalah', status: 'unknown' },
      ],
    },
    {
      id: 'readiness',
      topic: 'KESIAPAN KEPUTUSAN PRIBADI',
      question: 'Apakah kamu sudah membaca seluruh syarat & ketentuan serta mantap dengan keputusan ini?',
      help: 'Ambil jeda pertimbangan yang cukup sebelum berkomitmen finansial.',
      missingLabel: 'Kesiapan dan kemantapan keputusan pribadi',
      missingHint: 'Tunda keputusan 24 jam jika masih ada klausul penting yang meragukan.',
      options: [
        { id: 'ready_other_decision', label: 'Ya, saya sudah membaca dokumen resmi dan siap bertanggung jawab', status: 'clear' },
        { id: 'hesitant_other_decision', label: 'Masih ragu-ragu dan butuh pertimbangan pihak ketiga', status: 'partial' },
        { id: 'unready_other_decision', label: 'Belum membaca syarat ketentuan / mengambil keputusan terburu-buru', status: 'unknown' },
      ],
    },
  ],
};

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
    id: 'paylater',
    label: 'PayLater & Cicilan Digital',
    icon: 'card-outline',
    blurb: 'Bayar nanti, cicilan e-commerce, dan limit pembiayaan digital.',
    extraQuestions: [
      'Apa akad pokok pembiayaan ini (Murabahah, Qardh, atau Hawalah bil Ujrah)?',
      'Apakah denda keterlambatan disalurkan ke dana kebajikan (ta\'zir) atau keuntungan perusahaan?',
      'Apakah penyelenggara berizin resmi OJK di bawah POJK No. 40 Tahun 2024 dan diawasi Dewan Pengawas Syariah?',
    ],
    lessonIds: ['akad-transaksi-digital', 'transparansi-biaya', 'pembiayaan-digital'],
    sourceIds: ['dsnmui-117-2018', 'dsnmui-17-2000', 'dsnmui-43-2004', 'dsnmui-111-2017', 'ojk-pojk-40-2024', 'ojk-seojk-19-2023'],
    scenarioId: 'paylater',
  },
  {
    id: 'lending',
    label: 'Pinjaman Online / P2P Syariah (LPBBTI)',
    icon: 'business-outline',
    blurb: 'Layanan pendanaan bersama berbasis teknologi informasi (fintech lending).',
    extraQuestions: [
      'Apakah perjanjian pendanaan mematuhi Fatwa DSN-MUI No. 117/2018?',
      'Berapa batas total manfaat ekonomi harian dan biaya admin sesuai SEOJK No. 19/2023?',
      'Apakah penagihan tunduk pada kode etik resmi AFPI/AFSI tanpa intimidasi?',
    ],
    lessonIds: ['pembiayaan-digital', 'akad-transaksi-digital'],
    sourceIds: ['dsnmui-117-2018', 'ojk-pojk-40-2024', 'ojk-seojk-19-2023', 'dsnmui-17-2000'],
    scenarioId: 'paylater',
  },
  {
    id: 'shopping',
    label: 'Belanja Online & Marketplace',
    icon: 'cart-outline',
    blurb: 'Diskon, marketplace, dropshipping, dan checkout kilat.',
    extraQuestions: [
      'Berapa rincian harga akhir setelah ongkir dan biaya penanganan platform?',
      'Apakah tersedia hak khiyar (garansi retur / pengembalian dana) jika barang cacat?',
      'Apakah penjual sudah memiliki barang sebelum menjual (la tabi\' ma laisa \'indak)?',
    ],
    lessonIds: ['transparansi-biaya', 'sumber-tepercaya'],
    sourceIds: ['dsnmui-04-2000', 'ojk-portal', 'bi-portal'],
    scenarioId: 'diskon-online',
  },
  {
    id: 'subscription',
    label: 'Langganan Digital Berulang',
    icon: 'repeat-outline',
    blurb: 'Uji coba gratis, auto-debit, dan tagihan software/konten berkala.',
    extraQuestions: [
      'Kapan tagihan pertama didebit dan berapa biaya perpanjangan otomatisnya?',
      'Apakah prosedur pembatalan langganan mudah diakses tanpa penalti tersembunyi?',
      'Apakah materi dan konten yang dilanggan terbebas dari hal yang dilarang syariat?',
    ],
    lessonIds: ['transparansi-biaya'],
    sourceIds: ['ojk-portal'],
    scenarioId: 'langganan',
  },
  {
    id: 'gold',
    label: 'Emas Digital & Kustodian',
    icon: 'diamond-outline',
    blurb: 'Tabungan emas online, kustodian fisik, dan cetak batangan.',
    extraQuestions: [
      'Siapa lembaga kustodian brankas fisik emas dan apakah berizin Bappebti No. 4/2019?',
      'Apakah pencatatan gramatur emas terjadi seketika (qabdh hukmi) sesuai Fatwa 77/2010?',
      'Berapa biaya cetak fisik dan batas minimal penarikan emas batangan?',
    ],
    lessonIds: ['risiko-investasi', 'akad-transaksi-digital'],
    sourceIds: ['dsnmui-77-2010', 'bappebti-4-2019', 'ojk-portal'],
    scenarioId: 'emas-digital',
  },
  {
    id: 'savings',
    label: 'Tabungan Digital & E-Money',
    icon: 'wallet-outline',
    blurb: 'Neo-bank, uang elektronik syariah, dan dompet digital.',
    extraQuestions: [
      'Apakah penempatan saldo menggunakan akad Wadiah Yad Dhamanah sesuai Fatwa 116/2017?',
      'Apakah saldo dompet digital bebas bunga simpanan harian otomatis?',
      'Apakah penerbit uang elektronik memiliki izin resmi dari Bank Indonesia?',
    ],
    lessonIds: ['layanan-keuangan-syariah', 'sumber-tepercaya'],
    sourceIds: ['dsnmui-116-2017', 'ojk-portal', 'bi-portal'],
    scenarioId: 'tabungan-digital',
  },
  {
    id: 'investment',
    label: 'Investasi Digital & Aset Kripto',
    icon: 'trending-up-outline',
    blurb: 'Securities crowdfunding, reksa dana syariah, sukuk, dan aset kripto.',
    extraQuestions: [
      'Apakah instrumen investasi memiliki underlying asset sektor riil halal yang terdaftar di DES?',
      'Apakah pembagian hasil menggunakan nisbah bagi hasil murni, bukan jaminan bunga pasti?',
      'Apakah platform terdaftar resmi di OJK atau Bappebti dan diawasi Dewan Pengawas Syariah?',
    ],
    lessonIds: ['risiko-investasi', 'layanan-keuangan-syariah'],
    sourceIds: ['dsnmui-117-2018', 'ojk-pojk-40-2024', 'ojk-portal'],
    scenarioId: 'emas-digital',
  },
  {
    id: 'donation',
    label: 'Donasi & ZISWAF Digital',
    icon: 'heart-outline',
    blurb: 'Zakat online, infak, sedekah, dan wakaf tunai digital.',
    extraQuestions: [
      'Apakah lembaga pengelola memiliki izin resmi Kemenag / BAZNAS / BWI?',
      'Berapa persentase hak amil untuk operasional dan bagaimana laporan penyalurannya?',
    ],
    lessonIds: ['zisw-digital', 'sumber-tepercaya'],
    sourceIds: ['ojk-portal'],
    scenarioId: 'donasi',
  },
  {
    id: 'other',
    label: 'Transaksi Lainnya / Umum',
    icon: 'help-circle-outline',
    blurb: 'Pemeriksaan transaksi umum dan kontrak muamalah digital lainnya.',
    extraQuestions: [
      'Apa nama akad resmi yang digunakan dan siapa saja para pihaknya?',
      'Apakah ada potensi denda bertingkat atau biaya tersembunyi yang belum tertera?',
      'Apakah transaksi telah terbebas dari unsur Riba, Gharar, dan Maysir?',
    ],
    lessonIds: ['akad-transaksi-digital', 'transparansi-biaya'],
    sourceIds: ['dsnmui-04-2000', 'ojk-portal'],
    scenarioId: 'paylater',
  },
];

export const CATEGORY_BY_ID: Record<TransactionCategory, CategoryDef> = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c]),
) as Record<TransactionCategory, CategoryDef>;

/** Helper to retrieve category-tailored steps or fallback to standard steps */
export function getStepsForCategory(category: TransactionCategory): ChecklistStepDef[] {
  return CATEGORY_CHECKLIST_STEPS[category] ?? CHECKLIST_STEPS;
}

export const GENERIC_QUESTIONS = [
  'Apa akad atau struktur transaksi yang digunakan?',
  'Apa saja biaya, denda, dan konsekuensinya?',
  'Di mana saya bisa membaca dokumen resmi dan panduan syariahnya?',
];
