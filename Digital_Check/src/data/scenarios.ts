import type { Scenario } from '../types';

const SIMULATION_DISCLAIMER =
  'Simulasi Edukasi Fiktif: Skenario ini disusun untuk tujuan literasi dan analisis kritis terhadap klausul muamalah digital, tidak merepresentasikan merek atau produk komersial tertentu.';

/**
 * Koleksi Studi Kasus Transaksi Digital Syariah.
 * Seluruh skenario merupakan simulasi fiktif untuk melatih nalar kritis konsumen.
 */
export const SCENARIOS: Scenario[] = [
  {
    id: 'paylater',
    title: 'Promo PayLater 0% dengan Biaya Layanan Bulanan Tetap',
    icon: 'card-outline',
    category: 'paylater',
    categoryLabel: 'Pembiayaan',
    isSimulation: true,
    simulationNotice: SIMULATION_DISCLAIMER,
    story:
      'Rian ingin membeli laptop seharga Rp6.000.000 untuk kuliah. Layanan PayLater menawarkan cicilan tenor 3 bulan dengan promosi "Bunga 0%", namun mengenakan biaya platform bulanan tetap Rp90.000/bulan dan denda keterlambatan Rp50.000/kejadian.',
    background:
      'Rian (21 tahun, mahasiswa) membutuhkan laptop untuk tugas akhir. Saat checkout di e-commerce, terdapat opsi cicilan 3 bulan berlabel "Bunga 0%". Namun pada rincian tagihan, ada biaya administrasi bulanan tetap sebesar Rp90.000 per bulan ditambah denda keterlambatan harian jika terlambat membayar.',
    partiesInvolved: [
      'Konsumen / Pengguna (Rian - Pembeli/Debitur)',
      'Platform E-Commerce (Penyedia antarmuka marketplace)',
      'Perusahaan Fintech P2P / Multifinance (Penyedia fasilitas dana PayLater)',
      'Toko / Mitra Merchant Penjual Laptop',
    ],
    chronology: [
      'Rian memilih laptop seharga Rp6.000.000 di keranjang belanja e-commerce.',
      'Rian memilih opsi pembayaran PayLater 3 bulan dengan banner promosi "Bunga 0%".',
      'Sistem menampilkan rincian cicilan: Rp2.000.000 pokok + Rp90.000 biaya bulanan = Rp2.090.000/bulan (Total bayar: Rp6.270.000).',
      'Terdapat klausul denda keterlambatan Rp50.000 per kejadian yang dibukukan sebagai laba operasional fintech.',
      'Rian diminta menyetujui syarat & ketentuan digital dalam hitungan menit sebelum promo hangus.',
    ],
    contractStructure: {
      name: 'Qardh (Pinjaman Talangan) dengan Biaya Layanan Bulanan vs Murabahah Riil',
      description:
        'Fintech menalangi pembayaran laptop ke merchant sehingga timbul utang uang tunai antara konsumen dan fintech.',
      idealAkad:
        'Akad Murabahah riil di mana lembaga pembiayaan syariah membeli laptop dari merchant terlebih dahulu, menanggung risiko kepemilikan, lalu menjualnya kembali kepada konsumen dengan margin laba disepakati di muka tanpa denda ribawi.',
    },
    moneyAndOwnershipFlow: {
      moneyFlow:
        'Fintech membayarkan Rp6.000.000 ke merchant. Rian mengangsur ke fintech Rp2.090.000/bulan x 3 bulan = Rp6.270.000.',
      ownershipFlow:
        'Laptop langsung dikirim merchant ke alamat Rian. Fintech tidak pernah memiliki kepemilikan fisik maupun menanggung risiko barang (al-kharaj bid-dhaman).',
    },
    fiqhPrinciples: [
      {
        arabic: 'كُلُّ قَرْضٍ جَرَّ مَنْفَعَةً فَهُوَ رِبًا',
        translit: 'Kullu qardhin jarra manfa\'atan fahuwa riba',
        translation: 'Setiap pinjaman yang mendatangkan keuntungan/manfaat tambahan (bagi kreditur) adalah riba.',
        application:
          'Biaya bulanan tetap sebesar Rp90.000 yang dikaitkan dengan jangka waktu pinjaman uang pada hakikatnya adalah penambahan imbalan atas utang.',
      },
      {
        arabic: 'الْغُرْمُ بِالْغُنْمِ',
        translit: 'Al-Ghurmu bil-ghunmi',
        translation: 'Keuntungan diperoleh sebanding dengan kesiapan menanggung risiko kerugian.',
        application:
          'Kreditur yang hanya menyalurkan uang tanpa menanggung risiko kerusakan komoditas tidak berhak mengambil laba jual beli.',
      },
    ],
    criticalQuestions: [
      'Apakah biaya platform bulanan Rp90.000 mencerminkan biaya operasional riil (real cost) atau bunga terselubung?',
      'Ke mana alokasi dana denda keterlambatan: apakah disalurkan 100% untuk dana kebajikan sosial atau diakui sebagai laba fintech?',
      'Apakah akad yang mendasari adalah Murabahah (jual beli barang riil) atau Qardh (utang uang berbunga)?',
    ],
    analysis: {
      facts: [
        'Produk dipromosikan sebagai "Bunga 0%".',
        'Terdapat biaya layanan bulanan tetap Rp90.000 x 3 bulan = Rp270.000 (4,5% dari pokok pinjaman).',
        'Denda keterlambatan Rp50.000 masuk ke pendapatan perusahaan penyedia.',
      ],
      assumptions: [
        'Konsumen sering berasumsi bahwa "Bunga 0%" berarti sama sekali tidak ada biaya tambahan di atas harga tunai laptop.',
      ],
      interpretations: [
        'Secara substansi hukum fiqih, biaya layanan bulanan yang dihitung proporsional terhadap waktu utang merupakan bentuk rekayasa bunga (hilah riba).',
        'Sanksi keterlambatan yang dijadikan laba perusahaan melanggar Fatwa DSN-MUI No. 17/2000.',
      ],
      conclusion:
        'Skema ini memiliki risiko ketidakpatuhan syariah yang tinggi jika berlandaskan utang uang (Qardh). Konsumen disarankan memilih pembiayaan syariah berakad Murabahah riil atau membayar tunai.',
    },
    limitations: [
      'Skenario ini tidak menilai legalitas izin OJK platform secara individual; rincian klausul harus diperiksa pada lembar perjanjian masing-masing penyelenggara.',
    ],
    practicalLessons: [
      'Jangan tergiur jargon pemasaran "Bunga 0%". Selalu hitung total pengeluaran sampai lunas.',
      'Periksa apakah denda keterlambatan dialokasikan ke pos dana sosial kebajikan atau menjadi laba kreditur.',
      'Pertimbangkan opsi menabung tunai daripada berutang untuk barang konsumtif.',
    ],
    exercise: {
      question: 'Apa langkah paling bijak bagi Rian sebelum menyetujui cicilan PayLater tersebut?',
      options: [
        'Langsung klik setuju karena prosesnya cepat dan tergiur promo bunga 0%',
        'Meneliti rincian biaya bulanan, struktur akad, alokasi denda, serta membandingkan dengan harga tunai',
        'Menganggap semua layanan PayLater di pasar sudah otomatis halal tanpa perlu membaca dokumen',
      ],
      correctIndex: 1,
      explanation:
        'Tepat! Langkah bijak adalah meneliti seluruh komponen biaya, akad pokok, dan konsekuensi denda. Label bunga 0% sering menyamarkan biaya layanan tetap yang substansinya menyerupai bunga.',
    },
    question: 'Apa langkah paling bijak?',
    options: [
      'Langsung pilih karena prosesnya cepat dan ada promo 0%',
      'Periksa struktur transaksi, biaya layanan bulanan, klausul denda, dan sumber panduan yang tepercaya',
      'Anggap semua layanan PayLater memiliki ketentuan yang sama',
    ],
    correctIndex: 1,
    explanations: [
      'Kecepatan proses bukan ukuran kejelasan ketentuan. Biaya bulanan tetap dan denda wajib dihitung lebih dulu.',
      'Tepat: produk dengan nama serupa bisa memiliki struktur berbeda. Baca dokumen produk dan teliti alur biaya sebelum memutuskan.',
      'Belum tepat: produk bernama sama bisa memiliki akad, biaya, dan konsekuensi denda yang berbeda secara fundamental.',
    ],
    lessonId: 'pembiayaan-digital',
    sourceIds: ['dsnmui-117-2018', 'dsnmui-17-2000', 'dsnmui-43-2004', 'ojk-pojk-40-2024'],
    reviewStatus: 'Published',
    reviewedAt: '2026-11-20',
    reviewer: 'Tim Riset & Edukasi Syariah Digital Check',
  },
  {
    id: 'emas-digital',
    title: 'Investasi Emas Digital: Kapan Qabdh Sah Terjadi?',
    icon: 'diamond-outline',
    category: 'gold',
    categoryLabel: 'Investasi',
    isSimulation: true,
    simulationNotice: SIMULATION_DISCLAIMER,
    story:
      'Siti membeli emas senilai Rp1.000.000 pada aplikasi investasi digital. Saldo emas 0,85 gram langsung masuk ke akun aplikasi seketika, namun cetak fisik baru bisa dilakukan dengan biaya cetak tambahan dan batas minimal 5 gram.',
    background:
      'Siti (26 tahun) ingin melindungi nilai tabungannya melalui emas digital. Aplikasi menawarkan pembelian mulai dari Rp10.000. Setelah mentransfer dana, saldo emasnya bertambah seketika, namun Siti belum mengetahui bagaimana mekanisme penyimpanan fisik emas tersebut di brankas kustodian.',
    partiesInvolved: [
      'Konsumen / Investor (Siti - Pembeli)',
      'Pedagang Fisik Emas Digital (Aplikasi Penyelenggara)',
      'Lembaga Kustodian Terdaftar (Brankas Penyimpan Emas Fisik)',
      'Lembaga Kliring Berjangka (Pencatat mutasi hak milik)',
    ],
    chronology: [
      'Siti menyetor dana Rp1.000.000 melalui virtual account aplikasi.',
      'Aplikasi memotong dana dan mengkreditkan saldo 0,85 gram emas ke portofolio Siti.',
      'Lembaga Kliring mencatat perpindahan kepemilikan hak atas kuota emas fisik di brankas kustodian.',
      'Siti berhak menjual kembali saldo emas secara real-time atau meminta cetak fisik dengan biaya cetak resmi.',
    ],
    contractStructure: {
      name: 'Jual Beli Emas secara Tidak Tunai dengan Qabdh Hukmi',
      description:
        'Penyerahan emas secara yuridis (qabdh hukmi) di mana saldo teralokasi langsung dan didukung 100% oleh cadangan emas fisik riil.',
      idealAkad:
        'Fatwa DSN-MUI No. 77/2010: Jual beli emas non-tunai mubah selama emas fisik ada pada penjual/kustodian berizin dan harga tidak bertambah selama masa cicilan.',
    },
    moneyAndOwnershipFlow: {
      moneyFlow: 'Siti membayar tunai penuh Rp1.000.000 di muka.',
      ownershipFlow:
        'Emas fisik tetap tersimpan di brankas kustodian berizin Bappebti, namun kepemilikan sah berpindah ke Siti melalui pencatatan saldo terpisah (segregated).',
    },
    fiqhPrinciples: [
      {
        arabic: 'الْقَبْضُ الْحُكْمِيُّ كَالْقَبْضِ الْحِسِّيِّ',
        translit: 'Al-Qabdhu al-hukmiyyu kal-qabdhi al-hissiyyi',
        translation: 'Serah terima secara yuridis/sistem setara dengan serah terima secara fisik langsung.',
        application:
          'Pencatatan saldo emas digital yang didukung alokasi emas fisik riil di kustodian memenuhi syarat taqabudh kontemporer.',
      },
    ],
    criticalQuestions: [
      'Apakah emas fisik 0,85 gram tersebut benar-benar dialokasikan 100% di brankas kustodian resmi berizin Bappebti?',
      'Apakah platform memiliki izin Pedagang Fisik Emas Digital dari Bappebti dan terhubung ke Lembaga Kliring?',
      'Berapa batas minimal dan rincian biaya cetak fisik jika konsumen ingin mengambil lempengan emas riil?',
    ],
    analysis: {
      facts: [
        'Pembelian tunai seketika menghasilkan saldo gramasi emas di aplikasi.',
        'Pencetakan lempengan fisik memiliki syarat batas gramatur minimal dan ongkos cetak.',
      ],
      assumptions: [
        'Sebagian konsumen mengira emas digital tidak boleh karena emas tidak langsung dipegang tangan saat transaksi.',
      ],
      interpretations: [
        'Fatwa DSN-MUI No. 77/2010 dan regulasi Bappebti No. 4/2019 menegaskan bahwa serah terima yuridis (qabdh hukmi) sah selama didukung emas fisik 1:1 di kustodian.',
      ],
      conclusion:
        'Investasi emas digital sah secara syariah apabila platform berizin resmi, cadangan fisik riil 1:1 diaudit berkala, dan bukan skema perdagangan margin fiktif.',
    },
    limitations: [
      'Audit fisik brankas dilakukan oleh otoritas Bappebti dan Lembaga Kliring, bukan oleh pengguna secara perorangan.',
    ],
    practicalLessons: [
      'Pastikan platform berizin resmi Bappebti sebagai Pedagang Fisik Emas Digital.',
      'Ketahui biaya penitipan (jika ada) dan ongkos cetak sebelum membeli.',
      'Hindari platform yang menawarkan imbal hasil tetap bulanan dari tabungan emas, karena harga emas murni fluktuatif.',
    ],
    exercise: {
      question: 'Kapan jual beli emas digital dianggap sah memenuhi syarat Qabdh Hukmi menurut syariah?',
      options: [
        'Hanya jika lempengan emas langsung dikirim ke rumah di hari yang sama',
        'Ketika saldo emas tercatat secara sah dan didukung 100% oleh cadangan emas fisik riil di kustodian berizin',
        'Boleh tanpa cadangan emas fisik asalkan aplikasi memiliki banyak pengguna',
      ],
      correctIndex: 1,
      explanation:
        'Tepat! Fatwa DSN-MUI No. 77/2010 dan Peraturan Bappebti No. 4/2019 mensyaratkan serah terima yuridis (Qabdh Hukmi) dengan kepastian cadangan fisik emas 100% di brankas kustodian resmi.',
    },
    question: 'Apa langkah yang paling masuk akal sebelum membeli emas digital?',
    options: [
      'Pilih hanya karena aplikasi terlihat populer dan iklannya ada di mana-mana',
      'Periksa mekanisme kepemilikan (qabdh hukmi), lisensi Bappebti, biaya cetak, dan kustodian fisik resmi',
      'Menganggap semua produk emas digital identik dan tidak perlu dicek izinnya',
    ],
    correctIndex: 1,
    explanations: [
      'Popularitas tidak menjelaskan legalitas perizinan, biaya, atau kepemilikan fisik emas.',
      'Tepat: periksa karakteristik produk, izin Bappebti, keberadaan kustodian fisik, dan biaya sebelum berinvestasi.',
      'Produk emas digital dapat berbeda dalam hal pencadangan fisik, biaya simpan, dan kemudahan pencetakan.',
    ],
    lessonId: 'risiko-investasi',
    sourceIds: ['dsnmui-77-2010', 'bappebti-4-2019', 'ojk-portal'],
    reviewStatus: 'Published',
    reviewedAt: '2026-11-20',
    reviewer: 'Tim Riset & Edukasi Syariah Digital Check',
  },
  {
    id: 'dropshipping',
    title: 'Model Dropshipping: Menjual Barang Sebelum Memiliki (Bai\' Ma La Yamlik)',
    icon: 'cube-outline',
    category: 'shopping',
    categoryLabel: 'E-Commerce',
    isSimulation: true,
    simulationNotice: SIMULATION_DISCLAIMER,
    story:
      'Budi membuat toko online di marketplace dengan memajang foto produk jaket kulit milik supplier tanpa izin keagenan resmi. Ketika pembeli memesan dan membayar Rp350.000, Budi baru memesankan barang ke supplier seharga Rp280.000 dan meminta paket dikirim atas nama toko Budi.',
    background:
      'Budi (24 tahun) memulai usaha toko online tanpa modal stok barang. Budi memajang foto produk jaket kulit dari supplier grosir di kota lain. Budi belum membeli produk tersebut. Saat ada pembeli melakukan checkout, Budi baru meneruskan pesanan ke supplier dengan uang pembeli dan meminta supplier mengirimkannya atas nama Budi.',
    partiesInvolved: [
      'Konsumen / Pembeli Akhir',
      'Dropshipper (Budi - Penjual Perantara)',
      'Supplier Grosir / Pemilik Stok Barang Riil',
      'Platform Marketplace & Jasa Logistik Ekspedisi',
    ],
    chronology: [
      'Budi mengunggah foto produk jaket kulit di marketplace dengan harga Rp350.000.',
      'Pembeli membeli jaket dan mentransfer pembayaran Rp350.000 ke rekening marketplace.',
      'Budi menghubungi supplier dan membeli jaket seharga Rp280.000 secara online.',
      'Budi menginstruksikan supplier untuk mengirim jaket langsung ke alamat pembeli dengan label pengirim toko Budi.',
      'Budi mengambil selisih margin keuntungan Rp70.000 tanpa menanggung risiko kerusakan barang.',
    ],
    contractStructure: {
      name: 'Penjualan Barang yang Belum Dimiliki (Bai\' Ma Laisa \'Indak) vs Wakalah bil Ujrah',
      description:
        'Menjual komoditas bergerak sebelum adanya hak kepemilikan dan serah terima (qabdh), yang dilarang dalam sabda Nabi SAW.',
      idealAkad:
        '1. Akad Wakalah bil Ujrah: Budi menjadi agen perantara resmi supplier dengan komisi upah jasa (ujrah) yang transparan.\n2. Akad Salam: Jual beli pesanan di mana pembeli membayar lunas di depan dan Budi menanggung risiko pemenuhan spesifikasi barang.',
    },
    moneyAndOwnershipFlow: {
      moneyFlow: 'Pembeli mentransfer Rp350.000. Budi membayar Rp280.000 ke supplier.',
      ownershipFlow:
        'Barang langsung dikirim dari supplier ke pembeli tanpa pernah masuk ke dalam kekuasaan fisik maupun tanggungan risiko (dhaman) Budi.',
    },
    fiqhPrinciples: [
      {
        arabic: 'لَا تَبِعْ مَا لَيْسَ عِنْدَكَ',
        translit: 'La tabi\' ma laisa \'indak',
        translation: 'Janganlah kamu menjual sesuatu yang tidak ada padamu / belum kamu miliki (HR. Abu Dawud).',
        application:
          'Menjual barang milik pihak lain seolah-olah milik sendiri tanpa izin keagenan dilarang untuk mencegah gharar dan sengketa.',
      },
      {
        arabic: 'الْخَرَاجُ بِالضَّمَانِ',
        translit: 'Al-Kharaju bid-dhaman',
        translation: 'Hak mendapatkan hasil sebanding dengan kesiapan menanggung risiko kerugian.',
        application:
          'Keuntungan halal diperoleh jika penjual siap menanggung risiko retur/kerusakan barang jika terjadi cacat.',
      },
    ],
    criticalQuestions: [
      'Apakah penjual memiliki perjanjian keagenan resmi (Wakalah) dengan supplier pemilik barang?',
      'Siapa yang menanggung risiko finansial jika barang rusak atau hilang di perjalanan ekspedisi?',
      'Apakah pembeli mengetahui bahwa barang dikirim langsung dari supplier pihak ketiga?',
    ],
    analysis: {
      facts: [
        'Penjual belum memiliki barang saat akad jual beli dilakukan.',
        'Tidak ada stok barang fisik pada penjual perantara.',
        'Barang dikirim langsung oleh pihak ketiga (supplier) ke pembeli.',
      ],
      assumptions: [
        'Pembeli mengira penjual memiliki stok barang di gudangnya sendiri dan siap kirim seketika.',
      ],
      interpretations: [
        'Jika penjual bertindak sebagai penjual langsung (bukan wakil/agen), transaksi melanggar larangan bai\' ma la yamlik.',
        'Skema ini dapat menjadi sah jika diubah menjadi akad Wakalah bil Ujrah (agen komisi) atau akad Salam (jual beli pesanan).',
      ],
      conclusion:
        'Model dropshipping tanpa izin supplier dan tanpa menanggung risiko barang bertentangan dengan kaidah muamalah. Dropshipper wajib membuat akad keagenan resmi (Wakalah) atau akad Salam.',
    },
    limitations: [
      'Dropshipping pada marketplace modern memiliki variasi fitur (seperti resi otomatis) yang perlu disesuaikan dengan akad keagenan tertulis.',
    ],
    practicalLessons: [
      'Buat perjanjian keagenan resmi (Wakalah bil Ujrah) dengan supplier pemilik barang.',
      'Berlaku jujur kepada konsumen mengenai asal pengiriman dan estimasi waktu sampai.',
      'Siap menanggung risiko garansi pengembalian dana jika barang cacat atau tidak sesuai deskripsi.',
    ],
    exercise: {
      question: 'Bagaimana solusi syariah agar bisnis dropshipping menjadi sah dan halal?',
      options: [
        'Cukup merahasiakan identitas supplier agar pembeli tidak tahu',
        'Menjadi agen resmi supplier dengan akad Wakalah bil Ujrah (komisi jasa) atau menanggung garansi penuh dengan akad Salam',
        'Menaikkan harga setinggi-tingginya untuk menutupi biaya komisi',
      ],
      correctIndex: 1,
      explanation:
        'Tepat! Fiqih muamalah memberikan solusi berupa akad Wakalah bil Ujrah (agen perantara resmi dengan komisi upah) atau akad Salam (pesanan dengan tanggung jawab spesifikasi penuh).',
    },
    question: 'Apa langkah paling tepat untuk memperbaiki skema dropshipping agar sesuai prinsip syariah?',
    options: [
      'Tetap berjualan tanpa memberitahu supplier maupun pembeli',
      'Menyepakati akad keagenan (Wakalah bil Ujrah) dengan supplier atau menggunakan akad jual beli pesanan (Salam)',
      'Menghapus foto produk dan hanya berjualan jasa titip',
    ],
    correctIndex: 1,
    explanations: [
      'Merahasiakan status kepemilikan melanggar prinsip transparansi dan keterbukaan akad.',
      'Tepat: akad Wakalah bil Ujrah atau Salam memberikan kepastian hak, kewajiban, dan tanggung jawab risiko yang jelas.',
      'Jasa titip (jastip) juga merupakan alternatif, namun dropshipping tetap dapat sah dengan akad keagenan resmi.',
    ],
    lessonId: 'dropshipping-kepemilikan',
    sourceIds: ['dsnmui-05-2000', 'dsnmui-04-2000', 'dsnmui-portal'],
    reviewStatus: 'Published',
    reviewedAt: '2026-11-20',
    reviewer: 'Tim Riset & Edukasi Syariah Digital Check',
  },
  {
    id: 'langganan',
    title: 'Langganan Digital Otomatis: Batasan Ijarah & Risiko Gharar',
    icon: 'repeat-outline',
    category: 'subscription',
    categoryLabel: 'Langganan',
    isSimulation: true,
    simulationNotice: SIMULATION_DISCLAIMER,
    story:
      'Dina mendaftar "Uji Coba Gratis 14 Hari" aplikasi editing video dengan mengisi data kartu debit. Pada hari ke-15, saldo tabungannya terpotong otomatis Rp450.000 untuk langganan tahunan tanpa notifikasi persetujuan di muka, padahal Dina sudah tidak menggunakan aplikasi tersebut.',
    background:
      'Dina (23 tahun) mencoba aplikasi editing video berlabel "Free Trial 14 Days". Pendaftaran mewajibkan input informasi kartu pembayaran. Pada hari ke-15, tanpa ada notifikasi pengingat, kartu didebit otomatis Rp450.000 untuk paket tahunan. Pengajuan pengembalian dana ditolak oleh sistem penyedia.',
    partiesInvolved: [
      'Konsumen / Penyewa Manfaat (Dina)',
      'Pengembang Aplikasi / Penyedia Layanan Software',
      'Payment Gateway / Penerbit Kartu Pembayaran Otomatis',
    ],
    chronology: [
      'Dina mengaktifkan fitur free trial 14 hari dengan memasukkan detail pembayaran.',
      'Dina menggunakan aplikasi selama 5 hari lalu berhenti menggunakan dan menghapusnya.',
      'Pada hari ke-15, payment gateway memotong Rp450.000 dari rekening tabungan Dina secara otomatis.',
      'Dina mengajukan permohonan pengembalian dana (refund) namun ditolak berdasarkan klausul tersembunyi.',
    ],
    contractStructure: {
      name: 'Ijarah Manfaat Jasa Digital Berulang (Recurring Ijarah Service)',
      description:
        'Perjanjian sewa guna pemanfaatan software digital dengan imbalan biaya ujrah berulang.',
      idealAkad:
        'Akad Ijarah transparan di mana penyedia mengirimkan notifikasi pengingat 2-3 hari sebelum masa uji coba berakhir dan meminta persetujuan aktif (opt-in) perpanjangan.',
    },
    moneyAndOwnershipFlow: {
      moneyFlow: 'Rp450.000 didebit otomatis dari rekening Dina ke rekening penyedia layanan.',
      ownershipFlow:
        'Dina menerima hak akses lisensi software selama 1 tahun, meskipun tidak berniat memanfaatkannya.',
    },
    fiqhPrinciples: [
      {
        arabic: 'إِلَّا أَنْ تَكُونَ تِجَارَةً عَنْ تَرَاضٍ مِنْكُمْ',
        translit: 'Illa an takuna tijaratan \'an taradhin minkum',
        translation: 'Kecuali dengan perniagaan yang berlaku atas dasar suka sama suka / kerelaan di antara kamu (QS. An-Nisa: 29).',
        application:
          'Klausul penarikan dana otomatis tanpa notifikasi konfirmasi di muka mencederai rukun kerelaan dalam akad muamalah.',
      },
    ],
    criticalQuestions: [
      'Apakah klausul penagihan berulang disajikan secara jelas di muka sebelum konsumen memasukkan data kartu?',
      'Apakah ada notifikasi peringatan sebelum masa gratis berakhir dan dana dipotong?',
      'Seberapa mudah mekanisme pembatalan langganan bagi konsumen?',
    ],
    analysis: {
      facts: [
        'Promosi berlabel "Uji Coba Gratis 14 Hari".',
        'Penarikan otomatis terjadi pada hari ke-15 sebesar Rp450.000 untuk durasi satu tahun penuh.',
        'Tidak ada notifikasi pengingat sebelum tanggal pendebitan saldo.',
      ],
      assumptions: [
        'Konsumen mengira menghapus (uninstall) aplikasi otomatis membatalkan kewajiban langganan.',
      ],
      interpretations: [
        'Mengikat konsumen pada komitmen keuangan jangka panjang tanpa notifikasi aktif mengandung unsur gharar dan pemaksaan terselubung.',
      ],
      conclusion:
        'Akad sewa manfaat (Ijarah) sah jika jadwal dan biaya disepakati sukarela. Penyedia wajib transparan dan memberikan opsi pembatalan yang mudah.',
    },
    limitations: [
      'Kebijakan refund tunduk pada ketentuan toko aplikasi internasional (Apple App Store / Google Play Store).',
    ],
    practicalLessons: [
      'Menghapus aplikasi tidak membatalkan langganan. Batalkan selalu lewat menu pengaturan akun.',
      'Pasang pengingat di kalender 2 hari sebelum masa coba gratis berakhir.',
      'Gunakan kartu virtual atau e-wallet dengan saldo terbatas untuk mencegah tagihan tak terduga.',
    ],
    exercise: {
      question: 'Apa langkah pencegahan terbaik saat mendaftar fitur free trial aplikasi digital?',
      options: [
        'Langsung menghapus aplikasi di layar utama HP setelah selesai mencoba',
        'Mencatat tanggal berakhirnya free trial di kalender dan segera membatalkan langganan jika tidak berniat lanjut',
        'Mengabaikan rincian tagihan karena mengira free trial selalu 100% gratis selamanya',
      ],
      correctIndex: 1,
      explanation:
        'Tepat! Menghapus aplikasi dari layar HP tidak membatalkan langganan di sistem billing. Selalu pasang alarm pengingat dan batalkan secara manual melalui menu langganan akun.',
    },
    question: 'Apa yang perlu diperiksa sebelum mendaftar masa uji coba gratis layanan digital?',
    options: [
      'Tanggal jatuh tempo penagihan, nominal perpanjangan otomatis, dan prosedur pembatalan',
      'Hanya warna dan animasi tombol pendaftaran di layar',
      'Tidak perlu membaca karena uji coba gratis pasti tanpa risiko',
    ],
    correctIndex: 0,
    explanations: [
      'Tepat: memahami biaya berulang dan mekanisme pembatalan membantu konsumen mengambil keputusan secara sadar.',
      'Tampilan visual tidak menjelaskan kewajiban finansial yang akan ditagihkan.',
      'Banyak free trial otomatis berubah menjadi langganan berbayar tahunan jika tidak dibatalkan.',
    ],
    lessonId: 'langganan-digital-ijarah',
    sourceIds: ['dsnmui-112-2017', 'ojk-portal', 'bi-portal'],
    reviewStatus: 'Published',
    reviewedAt: '2026-11-20',
    reviewer: 'Tim Riset & Edukasi Syariah Digital Check',
  },
  {
    id: 'diskon-online',
    title: 'Diskon Kilat (Flash Sale) & Manipulasi Urgensi Transaksi',
    icon: 'cart-outline',
    category: 'shopping',
    categoryLabel: 'Belanja Digital',
    isSimulation: true,
    simulationNotice: SIMULATION_DISCLAIMER,
    story:
      'Sebuah toko online menawarkan diskon 70% yang hanya berlaku 5 menit dengan timer hitung mundur. Rincian ongkir, biaya proteksi tambahan, dan kebijakan retur belum sempat diperiksa karena panik kehabisan kuota.',
    background:
      'Konsumen melihat banner promo diskon besar dengan hitung mundur hitungan detik. Karena takut kehabisan promo (FOMO), konsumen langsung checkout tanpa memeriksa rincian harga akhir dan ulasan toko.',
    partiesInvolved: ['Konsumen / Pembeli', 'Toko Online / Penjual', 'Platform E-Commerce'],
    chronology: [
      'Konsumen melihat barang diskon 70% dengan timer hitung mundur 5 menit.',
      'Konsumen terburu-buru checkout tanpa membaca deskripsi kondisi barang.',
      'Saat pembayaran, terdapat biaya asuransi proteksi yang dicentang otomatis.',
      'Barang sampai dalam kondisi cacat minor dan toko menolak retur barang diskon.',
    ],
    contractStructure: {
      name: 'Jual Beli Murabahah/Muthlaq dengan Batasan Khiyar Cacat',
      description: 'Jual beli barang konsumsi di mana hak khiyar pembeli dibatasi sepihak.',
      idealAkad:
        'Jual beli yang memenuhi rukun kejelasan objek dan menjamin hak khiyar aib (hak membatalkan akad jika barang cacat).',
    },
    moneyAndOwnershipFlow: {
      moneyFlow: 'Konsumen membayar total harga termasuk biaya asuransi otomatis.',
      ownershipFlow: 'Kepemilikan barang berpindah kepada pembeli.',
    },
    fiqhPrinciples: [
      {
        arabic: 'الْبَيِّعَانِ بِالْخِيَارِ مَا لَمْ يَتَفَرَّقَا',
        translit: 'Al-Bayyi\'ani bil-khiyari ma lam yatafarraqa',
        translation: 'Penjual dan pembeli memiliki hak khiyar (memilih melanjutkan atau membatalkan) selama belum berpisah.',
        application: 'Penjual dilarang menghilangkan hak pembeli untuk menolak barang yang cacat (khiyar aib).',
      },
    ],
    criticalQuestions: [
      'Apakah harga coret diskon mencerminkan harga riil atau kenaikan harga fiktif di awal?',
      'Apakah ada biaya tambahan tersembunyi yang dicentang secara otomatis saat checkout?',
      'Bagaimana syarat retur jika barang yang diterima rusak?',
    ],
    analysis: {
      facts: ['Diskon besar 70% disertai hitung mundur urgensi.', 'Adanya centang otomatis biaya tambahan.'],
      assumptions: ['Konsumen mengasumsikan barang pasti original dan bebas cacat.'],
      interpretations: ['Manipulasi harga dan peniadaan hak khiyar aib mencederai asas keadilan syariah.'],
      conclusion: 'Urgensi buatan tidak boleh menggantikan kehati-hatian dalam meneliti barang dan rincian harga akhir.',
    },
    limitations: ['Kebijakan promo dan retur ditentukan oleh aturan operasional masing-masing marketplace.'],
    practicalLessons: [
      'Jangan biarkan timer hitung mundur mematikan nalar kritis.',
      'Periksa kembali seluruh komponen biaya sebelum memasukkan PIN pembayaran.',
      'Pastikan toko memiliki garansi pengembalian barang jika terdapat cacat.',
    ],
    exercise: {
      question: 'Apa tindakan paling bijak saat melihat diskon kilat dengan hitung mundur cepat?',
      options: [
        'Langsung klik bayar secepatnya tanpa membaca rincian biaya akhir',
        'Tetap tenang, periksa rincian biaya akhir, ulasan pembeli, dan syarat garansi sebelum membayar',
        'Meminjam dana PayLater agar tidak ketinggalan promo',
      ],
      correctIndex: 1,
      explanation:
        'Tepat! Urgensi waktu promo sering kali digunakan untuk memicu keputusan impulsif. Tetap teliti rincian harga akhir dan reputasi penjual.',
    },
    question: 'Apa yang perlu dilakukan terlebih dahulu saat menghadapi promo diskon kilat?',
    options: [
      'Checkout sebelum promonya berakhir tanpa memeriksa rincian',
      'Periksa rincian harga akhir, identitas penjual, syarat garansi, dan kebijakan pengembalian',
      'Mengandalkan komentar promosi berbayar saja',
    ],
    correctIndex: 1,
    explanations: [
      'Urgensi promosi sebaiknya tidak menggantikan pemeriksaan informasi penting.',
      'Tepat: jangan biarkan urgensi promosi menggantikan pemeriksaan informasi penting.',
      'Komentar promosi bukan sumber yang cukup; periksa ketentuan resmi penjual.',
    ],
    lessonId: 'transparansi-biaya',
    sourceIds: ['ojk-portal', 'bi-portal'],
    reviewStatus: 'Published',
    reviewedAt: '2026-11-20',
    reviewer: 'Tim Riset & Edukasi Syariah Digital Check',
  },
  {
    id: 'donasi',
    title: 'Donasi & Penggalangan Dana Digital: Verifikasi Legalitas Penyalur',
    icon: 'heart-outline',
    category: 'donation',
    categoryLabel: 'Keuangan Sosial',
    isSimulation: true,
    simulationNotice: SIMULATION_DISCLAIMER,
    story:
      'Ajakan donasi kemanusiaan beredar di grup percakapan dengan foto menyentuh dan nomor rekening perorangan. Laporan penyaluran dan legalitas izin amil tidak tercantum.',
    background:
      'Konsumen menerima tautan penggalangan dana di media sosial untuk bantuan bencana. Penggalang mencantumkan nomor rekening bank pribadi, tanpa mencantumkan izin pengumpulan uang dan barang (PUB) dari Kementerian Sosial atau rekomendasi BAZNAS.',
    partiesInvolved: ['Donatur / Muzakki', 'Penyelenggara Penggalangan Dana', 'Penerima Manfaat (Mustahiq)'],
    chronology: [
      'Pesan donasi disebarkan massal di grup obrolan.',
      'Donatur tergerak emosi dan ingin berdonasi Rp100.000.',
      'Rekening tujuan merupakan rekening pribadi bukan yayasan resmi berizin.',
      'Tidak ada laporan pertanggungjawaban penyaluran dana yang dapat diakses publik.',
    ],
    contractStructure: {
      name: 'Hibah / Tabarru\' dan Wakalah Penyaluran Dana Sosial',
      description: 'Pemberian dana sukarela dengan mempercayakan penyaluran kepada pihak perantara.',
      idealAkad:
        'Akad Tabarru\' yang difasilitasi oleh Lembaga Amil Zakat (LAZ) resmi berizin dengan tata kelola amanah dan pelaporan transparan.',
    },
    moneyAndOwnershipFlow: {
      moneyFlow: 'Donatur mentransfer dana ke rekening penampung.',
      ownershipFlow: 'Dana berpindah kepemilikan menjadi hak penerima manfaat yang berhak (mustahiq).',
    },
    fiqhPrinciples: [
      {
        arabic: 'إِنَّ اللَّهَ يَأْمُرُكُمْ أَنْ تُؤَدُّوا الْأَمَانَاتِ إِلَى أَهْلِهَا',
        translit: 'Innallaha ya\'murukum an tu\'addul amanati ila ahliha',
        translation: 'Sesungguhnya Allah menyuruh kamu menyampaikan amanat kepada yang berhak menerimanya (QS. An-Nisa: 58).',
        application: 'Pengelola dana sosial wajib memegang teguh amanah penyaluran secara tepat sasaran.',
      },
    ],
    criticalQuestions: [
      'Apakah lembaga penyelenggara memiliki izin resmi dari Kemensos / BAZNAS / Kemenag?',
      'Berapa persentase potongan hak operasional yang diambil oleh platform penggalang dana?',
      'Apakah tersedia laporan pertanggungjawaban publik mengenai realisasi penyaluran dana?',
    ],
    analysis: {
      facts: ['Penggalangan menggunakan rekening pribadi.', 'Tidak ada bukti izin resmi.'],
      assumptions: ['Masyarakat sering berasumsi bahwa niat baik berdonasi pasti sampai ke penerima yang benar.'],
      interpretations: ['Menyalurkan dana kepada perantara tanpa verifikasi berisiko disalahgunakan dan memakan harta batil.'],
      conclusion: 'Niat beramal harus dibarengi kecermatan tabayyun memilih lembaga penyalur resmi yang akuntabel.',
    },
    limitations: ['Aplikasi ini tidak menyediakan fitur donasi langsung dan tidak mengaudit yayasan sosial secara mandiri.'],
    practicalLessons: [
      'Salurkan donasi dan zakat melalui LAZ/BAZNAS berizin resmi.',
      'Hindari mentransfer donasi publik ke rekening bank pribadi tanpa legalitas jelas.',
      'Minta bukti setor donasi atau pantau laporan berkala program penyaluran.',
    ],
    exercise: {
      question: 'Apa langkah paling tepat saat ingin berdonasi secara digital?',
      options: [
        'Langsung transfer ke nomor rekening mana pun yang ada di poster media sosial',
        'Memverifikasi legalitas izin lembaga penyalur (BAZNAS/Kemensos) dan memastikan rekening tujuan atas nama lembaga resmi',
        'Mengabaikan laporan penyaluran karena yang penting sudah berniat',
      ],
      correctIndex: 1,
      explanation:
        'Tepat! Menyalurkan dana melalui lembaga resmi berizin menjamin akuntabilitas penyaluran dan memastikan dana sampai kepada mustahiq yang berhak.',
    },
    question: 'Apa yang sebaiknya kamu cek sebelum menyalurkan donasi digital?',
    options: [
      'Langsung transfer karena foto unggahannya menyentuh hati',
      'Verifikasi identitas penyelenggara, izin resmi, rekening tujuan, dan laporan penyaluran',
      'Menganggap semua tautan donasi di internet otomatis resmi',
    ],
    correctIndex: 1,
    explanations: [
      'Perasaan tersentuh baik, tetapi verifikasi penerima dan izin resmi tetap diperlukan.',
      'Tepat: verifikasi pihak penerima dan informasi penyaluran sebelum berdonasi.',
      'Tidak semua tautan donasi terpercaya; lakukan tabayyun terlebih dahulu.',
    ],
    lessonId: 'zisw-digital',
    sourceIds: ['ojk-portal', 'bi-portal'],
    reviewStatus: 'Published',
    reviewedAt: '2026-11-20',
    reviewer: 'Tim Riset & Edukasi Syariah Digital Check',
  },
  {
    id: 'tabungan-digital',
    title: 'Tabungan Digital: Membedakan Akad Wadi\'ah dan Mudharabah',
    icon: 'wallet-outline',
    category: 'savings',
    categoryLabel: 'Perbankan',
    isSimulation: true,
    simulationNotice: SIMULATION_DISCLAIMER,
    story:
      'Dua aplikasi bank digital menawarkan produk tabungan dengan tampilan modern. Aplikasi A menawarkan "bunga harian 6%", sedangkan Aplikasi B menawarkan "bagi hasil nisbah 30:70 dengan akad Mudharabah".',
    background:
      'Pengguna membandingkan fitur dua bank digital. Satu produk berbasis konvensional dengan imbalan bunga pasti, sedangkan produk lainnya merupakan bank syariah digital yang diawasi DPS dengan akad Wadi\'ah Yad Dhamanah dan Mudharabah Muthlaqah.',
    partiesInvolved: ['Nasabah / Shahibul Maal', 'Bank Syariah Digital / Mudharib', 'Dewan Pengawas Syariah (DPS)'],
    chronology: [
      'Nasabah membuka rekening via aplikasi bank digital.',
      'Nasabah memilih jenis rekening simpanan harian atau deposito digital.',
      'Sistem menyajikan lembar akad digital (Wadi\'ah titipan atau Mudharabah bagi hasil).',
      'Imbal hasil dibagikan berdasarkan keuntungan riil penyaluran pembiayaan bank, bukan bunga berbunga.',
    ],
    contractStructure: {
      name: 'Wadi\'ah Yad Dhamanah (Titipan Bergaransi) / Mudharabah Muthlaqah (Bagi Hasil)',
      description: 'Penempatan dana nasabah pada bank syariah dengan kejelasan status hukum titipan atau investasi.',
      idealAkad: 'Fatwa DSN-MUI No. 116/2017 dan standar perbankan syariah OJK.',
    },
    moneyAndOwnershipFlow: {
      moneyFlow: 'Dana nasabah disimpan pada rekening bank syariah dan disalurkan ke sektor riil halal.',
      ownershipFlow: 'Nasabah memegang hak kepemilikan dana; bank bertanggung jawab menjamin keutuhan pokok titipan.',
    },
    fiqhPrinciples: [
      {
        arabic: 'الرِّبْحُ عَلَى مَا شَرَطَا وَالْوَضِيعَةُ عَلَى قَدْرِ الْمَالِ',
        translit: 'Ar-Ribhu \'ala ma syaratha wal-wadhi\'atu \'ala qadril-maal',
        translation: 'Keuntungan dibagi sesuai kesepakatan nisbah, sedangkan kerugian modal ditanggung pemilik modal.',
        application: 'Pada akad Mudharabah, hasil keuntungan dibagi berdasarkan nisbah, bukan jaminan nominal pasti di muka.',
      },
    ],
    criticalQuestions: [
      'Akad apa yang digunakan: apakah Wadi\'ah (titipan murni tanpa janji bunga) atau Mudharabah (bagi hasil riil)?',
      'Siapa Dewan Pengawas Syariah (DPS) yang mengawasi operasional bank digital tersebut?',
      'Apakah bank terdaftar sebagai peserta penjaminan Lembaga Penjamin Simpanan (LPS)?',
    ],
    analysis: {
      facts: ['Aplikasi syariah menggunakan akad Wadi\'ah/Mudharabah.', 'Tidak ada jaminan bunga tetap yang dipatok di muka.'],
      assumptions: ['Banyak masyarakat mengira semua tabungan bank sama saja.'],
      interpretations: ['Bunga pasti di muka atas simpanan uang merupakan riba qardh yang diharamkan.'],
      conclusion: 'Tabungan syariah digital memisahkan secara tegas antara titipan murni dan investasi bagi hasil riil.',
    },
    limitations: ['Tingkat imbal hasil nisbah masa lalu tidak mencerminkan jaminan kepastian hasil masa depan.'],
    practicalLessons: [
      'Pilih akad Wadi\'ah jika membutuhkan rekening transaksi harian yang aman dan likuid.',
      'Pilih akad Mudharabah jika ingin menginvestasikan dana dengan skema bagi hasil.',
      'Pastikan bank digital berizin OJK dan memiliki rekomendasi DPS DSN-MUI.',
    ],
    exercise: {
      question: 'Apa perbedaan mendasar antara tabungan berbunga konvensional dengan tabungan Mudharabah syariah?',
      options: [
        'Tabungan konvensional menjanjikan bunga pasti atas utang simpanan, sedangkan tabungan Mudharabah membagi hasil dari keuntungan riil pembiayaan bank',
        'Tidak ada perbedaan, keduanya sama-sama menghasilkan uang tambahan',
        'Tabungan syariah tidak boleh ditarik uangnya sewaktu-waktu',
      ],
      correctIndex: 0,
      explanation:
        'Tepat! Bunga konvensional dipatok di muka sebagai tambahan atas uang simpanan (riba), sedangkan tabungan syariah Mudharabah membagikan nisbah keuntungan riil usaha yang dikelola bank.',
    },
    question: 'Bagaimana cara membandingkan dua produk tabungan digital secara tepat?',
    options: [
      'Gunakan nama merek atau warna aplikasi sebagai satu-satunya dasar',
      'Baca dokumen resmi, periksa akad (Wadi\'ah/Mudharabah), struktur imbal hasil, biaya, dan pengawasan DPS',
      'Pilih yang iklannya paling sering muncul di media sosial',
    ],
    correctIndex: 1,
    explanations: [
      'Nama merek saja tidak menjelaskan struktur akad atau kesesuaian syariah produk.',
      'Tepat: nilai produk berdasarkan dokumen resmi, akad, izin OJK, dan pengawasan DPS.',
      'Iklan menarik bukan ukuran kepatuhan terhadap prinsip muamalah.',
    ],
    lessonId: 'layanan-keuangan-syariah',
    sourceIds: ['dsnmui-116-2017', 'ojk-portal', 'bi-portal'],
    reviewStatus: 'Published',
    reviewedAt: '2026-11-20',
    reviewer: 'Tim Riset & Edukasi Syariah Digital Check',
  },
];

export const SCENARIOS_BY_ID: Record<string, Scenario> = Object.fromEntries(
  SCENARIOS.map((s) => [s.id, s]),
);
