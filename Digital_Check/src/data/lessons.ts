import type { Lesson } from '../types';

const REVIEWED = '2026-11-20';

/**
 * Modul Edukasi Literasi Keuangan Syariah.
 *
 * Standar Editorial (Editorial Standards):
 * 1. Menjelaskan tujuan pembelajaran (learning objectives) secara terukur.
 * 2. Penjelasan konsep fiqih murni terpisah dari interpretasi aplikatif.
 * 3. Menyertakan contoh kasus praktis di era digital.
 * 4. Merujuk fatwa DSN-MUI dan regulasi otoritas yang telah diverifikasi status hukumnya.
 * 5. Menegaskan batasan penting (important limitations): edukasi bukanlah fatwa atau audit kepatuhan.
 */
export const LESSONS: Lesson[] = [
  {
    id: 'akad-transaksi-digital',
    title: 'Apa itu akad dalam transaksi digital?',
    category: 'Akad',
    readingMinutes: 5,
    summary: 'Memahami mengapa struktur perjanjian dan kewajiban para pihak penting untuk dipelajari.',
    learningObjectives: [
      'Memahami hakikat akad sebagai penentu hak dan kewajiban hukum dalam muamalah.',
      'Mengenali perbedaan struktur akad (Murabahah, Ijarah, Qardh, Wakalah) pada aplikasi digital.',
      'Mampu mengidentifikasi klausul akad sebelum menekan tombol persetujuan.',
    ],
    conceptExplanation:
      'Dalam kaidah fiqih "al-Ibratu fil \'uqud lil-maqashid wal-ma\'ani la lil-alfazh wal-mabani" (yang menjadi patokan dalam akad adalah maksud dan substansinya, bukan sekadar kata-kata dan bentuk lahiriahnya). Nama produk di layar boleh berupa promo modern, namun keabsahan transaksinya diukur dari akad pokok yang melandasinya.',
    applicableContext:
      'Sangat relevan saat menggunakan platform e-commerce, paylater, marketplace, atau aplikasi investasi digital.',
    practicalExample:
      'Pada pembelian barang secara cicilan di marketplace: jika penyedia membeli barang terlebih dahulu lalu menjualnya kepadamu dengan margin keuntungan tetap, akadnya adalah Murabahah. Jika penyedia hanya meminjamkan uang tunai berbunga untuk membayar belanjaanmu, itu adalah pinjaman ribawi.',
    relevantPrinciples: ['Al-Wafa bil \'Uqud (Menepati Perjanjian)', 'Kejelasan Status Para Pihak', 'Bebas dari Penipuan (Tadlis)'],
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
    sourceIds: ['dsnmui-04-2000', 'dsnmui-111-2017', 'dsnmui-portal'],
    importantLimitations: [
      'Penjelasan modul ini bersifat edukasi konsep fiqih umum, bukan verifikasi hukum atas aplikasi spesifik.',
      'Pastikan dokumen resmi produk mencantumkan opini Dewan Pengawas Syariah (DPS) berizin.',
    ],
    furtherReading: [
      {
        title: 'Fatwa DSN-MUI No. 04/2000 tentang Murabahah',
        url: 'https://dsnmui.or.id',
      },
      {
        title: 'Fatwa DSN-MUI No. 111/2017 tentang Akad Jual Beli Murabahah',
        url: 'https://dsnmui.or.id',
      },
    ],
    reviewStatus: 'Published',
    reviewedAt: REVIEWED,
    reviewer: 'Tim Riset & Edukasi Syariah Digital Check',
  },
  {
    id: 'transparansi-biaya',
    title: 'Transparansi biaya, denda keterlambatan, dan ganti rugi',
    category: 'Digital',
    readingMinutes: 4,
    summary: 'Cara membedakan biaya operasional, sanksi finansial (ta\'zir), dan ganti rugi (ta\'widh).',
    learningObjectives: [
      'Membedakan konsep sanksi keterlambatan (ta\'zir) dalam Fatwa 17/2000 dengan ganti rugi riil (ta\'widh) dalam Fatwa 43/2004.',
      'Mengetahui batasan regulasi OJK terbaru mengenai batas manfaat ekonomi dan denda pada fintech pendanaan.',
      'Menghindari jebakan denda berlipat ganda yang berpotensi menjadi Riba Nasi\'ah.',
    ],
    conceptExplanation:
      'Dalam syariah, denda keterlambatan tidak boleh menjadi sumber laba atau pendapatan kreditur. Fatwa DSN-MUI No. 17/2000 membolehkan sanksi (ta\'zir) pada nasabah mampu yang menunda pembayaran HANYA JIKA disalurkan 100% untuk dana sosial kebajikan (qardhul hasan). Sementara itu, Fatwa DSN-MUI No. 43/2004 mengatur ganti rugi (ta\'widh) yang hanya boleh menutupi kerugian riil operasional yang pasti timbul.',
    applicableContext:
      'Transaksi pembiayaan digital, paylater, kartu pembiayaan syariah, dan pinjaman online.',
    practicalExample:
      'Jika sebuah aplikasi menetapkan denda Rp50.000 atas keterlambatan, periksa apakah dana denda tersebut masuk ke rekening keuntungan perusahaan (ini berpotensi riba) atau disalurkan ke pos kebajikan sosial yang diawasi DPS.',
    relevantPrinciples: ['Larangan Riba Nasi\'ah', 'Keadilan Transaksional', 'Pemisahan Dana Sosial'],
    body: [
      'Transparansi berarti informasi penting dapat ditemukan dan dipahami sebelum kamu setuju: harga akhir, biaya tambahan, denda keterlambatan, jadwal pembayaran, dan cara membatalkan.',
      'Waspadai urgensi buatan seperti hitung mundur promo yang mendorong keputusan cepat. Tekanan waktu bukan alasan untuk melewatkan pemeriksaan.',
      'Simpan bukti syarat, tangkapan layar rincian biaya, dan komunikasi dengan penyedia. Bila ada bagian yang tidak jelas, minta penjelasan tertulis.',
    ],
    keyPoints: [
      'Cek harga akhir, biaya operasional riil, dan alur dana denda.',
      'Denda ta\'zir wajib disalurkan untuk dana sosial, bukan pendapatan perusahaan.',
      'Simpan bukti dan minta penjelasan tertulis sebelum transaksi.',
    ],
    sourceIds: ['dsnmui-17-2000', 'dsnmui-43-2004', 'ojk-pojk-40-2024', 'ojk-seojk-19-2023'],
    importantLimitations: [
      'Aplikasi tidak menghitungkan besaran kerugian riil spesifik setiap sengketa konsumen.',
      'Konsumen wajib mengonfirmasi rincian biaya langsung ke layanan pelanggan resmi penyedia.',
    ],
    furtherReading: [
      {
        title: 'Fatwa DSN-MUI No. 17/2000 tentang Sanksi Ta\'zir',
        url: 'https://dsnmui.or.id',
      },
      {
        title: 'Fatwa DSN-MUI No. 43/2004 tentang Ganti Rugi Ta\'widh',
        url: 'https://dsnmui.or.id',
      },
      {
        title: 'SEOJK No. 19/SEOJK.06/2023 tentang Manfaat Ekonomi LPBBTI',
        url: 'https://ojk.go.id',
      },
    ],
    reviewStatus: 'Published',
    reviewedAt: REVIEWED,
    reviewer: 'Tim Riset & Edukasi Syariah Digital Check',
  },
  {
    id: 'sumber-tepercaya',
    title: 'Memeriksa sumber keuangan yang tepercaya',
    category: 'Dasar',
    readingMinutes: 3,
    summary: 'Membedakan dokumen resmi, promosi, opini, dan informasi yang belum terverifikasi.',
    learningObjectives: [
      'Mampu memverifikasi legalitas entitas finansial melalui portal resmi OJK dan Bank Indonesia.',
      'Memahami hierarki bobot sumber: dokumen hukum resmi vs iklan promosi media sosial.',
      'Mengetahui tanggal pembaruan regulasi hukum agar tidak berpedoman pada peraturan yang telah dicabut.',
    ],
    conceptExplanation:
      'Prinsip tabayyun (verifikasi teliti) diperintahkan dalam Al-Qur\'an (QS. Al-Hujurat: 6). Dalam muamalah digital, tabayyun dilakukan dengan memverifikasi izin entitas ke OJK/BI dan mencocokkan akad ke fatwa DSN-MUI.',
    applicableContext:
      'Menerima tawaran investasi baru, aplikasi pinjaman online, atau penawaran titip dana di media sosial.',
    practicalExample:
      'Sebelum menyetor dana ke aplikasi investasi berlabel syariah, cek nama perusahaannya di daftar penyelenggara berizin di situs ojk.go.id, bukan sekadar percaya pada logo OJK yang ditempel di banner iklan.',
    relevantPrinciples: ['Prinsip Tabayyun', 'Penjagaan Harta (Hifzhul Maal)', 'Integritas Informasi'],
    body: [
      'Tidak semua informasi setara. Dokumen resmi penyedia, publikasi regulator, dan fatwa dari lembaga yang berwenang memiliki bobot berbeda dari iklan, komentar anonim, atau opini di media sosial.',
      'Untuk memeriksa legalitas penyelenggara layanan keuangan di Indonesia, gunakan situs resmi regulator seperti OJK dan Bank Indonesia. Untuk rujukan syariah, baca fatwa pada situs resmi DSN-MUI atau tanyakan kepada pihak yang kompeten.',
      'Periksa juga tanggal informasi: ketentuan dapat berubah, sehingga sumber yang lama perlu dicek ulang.',
    ],
    keyPoints: [
      'Utamakan dokumen resmi dan portal regulator.',
      'Iklan dan ulasan influencer bukan jaminan legalitas syariah.',
      'Periksa status keberlakuan dokumen rujukan.',
    ],
    sourceIds: ['ojk-portal', 'bi-portal', 'dsnmui-portal'],
    importantLimitations: [
      'Izin OJK menjamin legalitas operasional, namun kesesuaian syariah produk diverifikasi oleh DPS.',
    ],
    furtherReading: [
      {
        title: 'Pusat Edukasi Konsumen OJK (Sikapi Uangmu)',
        url: 'https://sikapiuangmu.ojk.go.id',
      },
    ],
    reviewStatus: 'Published',
    reviewedAt: REVIEWED,
    reviewer: 'Tim Riset & Edukasi Syariah Digital Check',
  },
  {
    id: 'layanan-keuangan-syariah',
    title: 'Mengenal layanan keuangan syariah digital',
    category: 'Bank',
    readingMinutes: 6,
    summary: 'Pertanyaan awal untuk memahami struktur uang elektronik dan bank digital syariah.',
    learningObjectives: [
      'Memahami akad penempatan dana uang elektronik syariah menurut Fatwa DSN-MUI No. 116/2017.',
      'Mengenali peran Dewan Pengawas Syariah (DPS) pada bank dan fintech digital.',
      'Mengetahui perbedaan perlakuan saldo titipan (Wadi\'ah) dan investasi bagi hasil (Mudharabah).',
    ],
    conceptExplanation:
      'Layanan keuangan syariah digital beroperasi di bawah pengawasan ganda: OJK/BI untuk kepatuhan regulasi finansial nasional, dan Dewan Pengawas Syariah (DPS) yang direkomendasikan DSN-MUI untuk kepatuhan syariah.',
    applicableContext:
      'Penggunaan dompet digital (e-wallet), bank digital syariah, dan instrumen pembayaran QRIS.',
    practicalExample:
      'Pada e-wallet syariah, dana mengendap (float fund) ditempatkan pada rekening giro wadiah di bank syariah dan tidak dibungakan, serta tidak digunakan untuk membiayai bisnis haram.',
    relevantPrinciples: ['Bebas Riba', 'Kemitraan yang Adil', 'Pengawasan DPS'],
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
    sourceIds: ['dsnmui-116-2017', 'dsnmui-portal', 'ojk-portal', 'bi-portal'],
    importantLimitations: [
      'Status syariah produk diterbitkan oleh otoritas terkait, bukan oleh aplikasi ini.',
    ],
    furtherReading: [
      {
        title: 'Fatwa DSN-MUI No. 116/2017 tentang Uang Elektronik Syariah',
        url: 'https://dsnmui.or.id',
      },
    ],
    reviewStatus: 'Published',
    reviewedAt: REVIEWED,
    reviewer: 'Tim Riset & Edukasi Syariah Digital Check',
  },
  {
    id: 'zisw-digital',
    title: 'Zakat, infak, sedekah, dan wakaf digital',
    category: 'Sosial',
    readingMinutes: 5,
    summary: 'Memeriksa tujuan, pengelola, kanal pembayaran, dan informasi penyaluran.',
    learningObjectives: [
      'Memahami syarat sah serah terima donasi dan wakaf uang secara digital.',
      'Mampu memverifikasi izin lembaga amil zakat (BAZNAS/LAZ resmi) dan Badan Wakaf Indonesia (BWI).',
      'Menghindari penggalangan dana ilegal berkedok donasi keagamaan.',
    ],
    conceptExplanation:
      'Penyaluran zakat dan wakaf uang memiliki aturan fiqih yang ketat mengenai mustahiq (penerima berhak) dan kekekalan pokok wakaf (nazhir wajib menjaga pokok aset wakaf).',
    applicableContext:
      'Pembayaran zakat fitrah/maal via aplikasi, crowdfunding kemanusiaan, dan wakaf uang digital.',
    practicalExample:
      'Saat berwakaf uang secara digital, pastikan platform terafiliasi dengan Lembaga Keuangan Syariah Penerima Wakaf Uang (LKS-PWU) yang ditunjuk Menteri Agama dan terdaftar di BWI.',
    relevantPrinciples: ['Amanah', 'Transparansi Penyaluran', 'Kekekalan Manfaat Wakaf'],
    body: [
      'Ajakan donasi di media sosial semakin mudah dibuat, sehingga verifikasi menjadi penting. Periksa siapa penyelenggaranya, apakah identitasnya dapat dihubungi, dan ke rekening atas nama siapa dana dikirim.',
      'Lembaga pengelola yang kredibel biasanya menyampaikan laporan penyaluran secara berkala. Jika informasi penyaluran tidak ada atau samar, tanyakan atau cari penyelenggara lain yang lebih transparan.',
      'Gunakan kanal resmi penyelenggara, bukan tautan yang diterima dari pesan berantai, untuk menghindari penipuan.',
    ],
    keyPoints: [
      'Verifikasi identitas penyelenggara dan rekening tujuan.',
      'Cari laporan penyaluran dana berkala.',
      'Gunakan kanal resmi LAZ/BWI terdaftar.',
    ],
    sourceIds: ['ojk-portal', 'bi-portal'],
    importantLimitations: [
      'Aplikasi ini tidak mengumpulkan atau menyalurkan dana zakat/wakaf apa pun.',
    ],
    furtherReading: [
      {
        title: 'Portal Resmi Badan Wakaf Indonesia (BWI)',
        url: 'https://www.bwi.go.id',
      },
    ],
    reviewStatus: 'Published',
    reviewedAt: REVIEWED,
    reviewer: 'Tim Riset & Edukasi Syariah Digital Check',
  },
  {
    id: 'risiko-investasi',
    title: 'Memahami risiko investasi dan emas digital',
    category: 'Investasi',
    readingMinutes: 5,
    summary: 'Kenali syarat qabdh hukmi emas digital, kustodian fisik, dan mitigasi spekulasi.',
    learningObjectives: [
      'Memahami ketentuan Fatwa DSN-MUI No. 77/2010 tentang jual beli emas secara tidak tunai.',
      'Mengetahui syarat Qabdh Hukmi (serah terima yuridis) dan keberadaan emas fisik nyata di kustodian berizin Bappebti.',
      'Membedakan investasi emas komoditas nyata dengan perdagangan margin emas fiktif/spekulatif.',
    ],
    conceptExplanation:
      'Emas dikategorikan sebagai komoditas ribawi dalam sabda Nabi SAW. Transaksinya wajib memenuhi kaidah penyerahan yang jelas. Fatwa DSN-MUI No. 77/2010 membolehkan jual beli emas non-tunai dengan syarat harga tetap dan emas fisiknya nyata ada serta dapat dicetak kapan saja.',
    applicableContext:
      'Tabungan emas digital di e-commerce, aplikasi investasi emas, dan cicilan emas.',
    practicalExample:
      'Ketika kamu membeli 1 gram emas digital, saldo emas bertambah di aplikasi dan di saat yang sama pihak kustodian (seperti Antam atau Pegadaian) mengalokasikan 1 gram emas fisik riil di brankas terdaftar.',
    relevantPrinciples: ['Qabdh Hukmi Sah', 'Underlying Asset Nyata', 'Bebas Perdagangan Fiktif'],
    body: [
      'Sebelum menaruh dana pada produk investasi, termasuk emas digital, pahami bagaimana kepemilikan dicatat, di mana aset disimpan, apa biaya transaksi dan penyimpanan, serta bagaimana cara menarik atau menjual kembali.',
      'Harga dapat naik dan turun. Jangan mengandalkan janji imbal hasil pasti atau popularitas aplikasi sebagai satu-satunya dasar keputusan.',
      'Untuk pembelian emas secara tidak tunai terdapat fatwa DSN-MUI tersendiri yang membahas ketentuannya; bacalah naskah resminya dan tanyakan kepada pihak yang kompeten tentang produk spesifik yang kamu pertimbangkan.',
    ],
    keyPoints: [
      'Pahami kepemilikan, penyimpanan, biaya, dan cara cetak fisik.',
      'Emas fisik wajib 100% dialokasikan di kustodian resmi berizin Bappebti.',
      'Hindari janji keuntungan tetap pada komoditas fluktuatif.',
    ],
    sourceIds: ['dsnmui-77-2010', 'bappebti-4-2019', 'ojk-portal'],
    importantLimitations: [
      'Kesesuaian syariah platform emas digital bergantung pada ada/tidaknya audit berkala saldo fisik emas di kustodian.',
    ],
    furtherReading: [
      {
        title: 'Fatwa DSN-MUI No. 77/2010 tentang Jual Beli Emas Tidak Tunai',
        url: 'https://dsnmui.or.id',
      },
      {
        title: 'Peraturan Bappebti No. 4/2019 tentang Pasar Fisik Emas Digital',
        url: 'https://bappebti.go.id',
      },
    ],
    reviewStatus: 'Published',
    reviewedAt: REVIEWED,
    reviewer: 'Tim Riset & Edukasi Syariah Digital Check',
  },
  {
    id: 'pembiayaan-digital',
    title: 'Pembiayaan digital dan PayLater: apa yang harus dicek?',
    category: 'Pembiayaan',
    readingMinutes: 5,
    summary: 'Daftar periksa menyeluruh untuk PayLater dan fintech pendanaan LPBBTI syariah.',
    learningObjectives: [
      'Mengetahui ketentuan Fatwa DSN-MUI No. 117/2018 tentang fintech pembiayaan syariah.',
      'Memahami regulasi POJK No. 40 Tahun 2024 yang menggantikan POJK No. 10/2022.',
      'Mampu menghitung total biaya sampai lunas dan membandingkannya dengan belanja tunai.',
    ],
    conceptExplanation:
      'Layanan pembiayaan berbasis teknologi informasi syariah wajib menggunakan akad sah (seperti Murabahah, Ijarah, atau Qardh) dan tidak boleh memungut tambahan bunga atas utang. POJK No. 40 Tahun 2024 dan SEOJK No. 19/SEOJK.06/2023 mengatur pembatasan manfaat ekonomi dan perlindungan hak pengguna.',
    applicableContext:
      'Layanan PayLater e-commerce, pinjaman produktif modal usaha P2P, dan cicilan digital.',
    practicalExample:
      'Jika platform PayLater syariah bekerja sama dengan perbankan syariah melalui akad murabahah, rincian margin keuntungan disepakati di depan secara tetap, dan denda keterlambatan disalurkan ke pos kebajikan sosial sesuai Fatwa 17/2000.',
    relevantPrinciples: ['Bebas Riba Nasi\'ah', 'Transparansi Biaya Finansial', 'Kepatuhan Regulasi LPBBTI'],
    body: [
      'Layanan PayLater dan pembiayaan berbasis teknologi dapat memiliki struktur yang berbeda-beda. Pahami apakah transaksi berupa jual beli dengan pembayaran bertahap, pinjaman, atau struktur lain, karena konsekuensi dan ketentuannya berbeda.',
      'Hitung total yang harus dibayar sampai lunas, termasuk biaya layanan dan denda keterlambatan. Bandingkan dengan harga jika dibayar tunai.',
      'Terdapat fatwa DSN-MUI mengenai layanan pembiayaan berbasis teknologi informasi berdasarkan prinsip syariah serta fatwa tentang akad murabahah yang dapat dibaca sebagai rujukan. Periksa juga apakah penyelenggara terdaftar atau berizin pada regulator.',
    ],
    keyPoints: [
      'Identifikasi struktur akad transaksi sebelum menyetujui.',
      'Hitung total pengeluaran sampai lunas, jangan tergiur jargon bunga 0%.',
      'Pastikan platform berizin OJK di bawah POJK No. 40 Tahun 2024 dan diawasi DPS.',
    ],
    sourceIds: ['dsnmui-117-2018', 'dsnmui-04-2000', 'dsnmui-17-2000', 'ojk-pojk-40-2024', 'ojk-seojk-19-2023'],
    importantLimitations: [
      'Keberadaan akad syariah di syarat dan ketentuan wajib dijalankan secara substantif, bukan sekadar tempelan administrasi.',
    ],
    furtherReading: [
      {
        title: 'Fatwa DSN-MUI No. 117/2018 tentang Layanan Pembiayaan Berbasis TI Syariah',
        url: 'https://dsnmui.or.id',
      },
      {
        title: 'Peraturan OJK No. 40 Tahun 2024 tentang LPBBTI',
        url: 'https://ojk.go.id',
      },
    ],
    reviewStatus: 'Published',
    reviewedAt: REVIEWED,
    reviewer: 'Tim Riset & Edukasi Syariah Digital Check',
  },
];

export const LESSONS_BY_ID: Record<string, Lesson> = Object.fromEntries(
  LESSONS.map((l) => [l.id, l]),
);
