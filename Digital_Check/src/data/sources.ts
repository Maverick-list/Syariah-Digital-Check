import type { SourceRef } from '../types';

const CHECKED = '2026-11-20';

/**
 * Registry Terpusat Sumber Rujukan Edukasi (Fatwa DSN-MUI, Regulasi OJK & BI, Bappebti).
 *
 * Prinsip Tata Kelola Sumber (Knowledge Governance):
 * 1. Setiap sumber mencatat nomor dokumen resmi, instansi penerbit, tanggal penetapan, dan status keberlakuan.
 * 2. Membedakan secara tegas instrumen Ta'zir (sanksi denda sosial) dalam Fatwa 17/2000
 *    dengan instrumen Ta'widh (ganti rugi riil kerugian kreditur) dalam Fatwa 43/2004.
 * 3. Menjelaskan secara transparan status regulasi LPBBTI: POJK No. 10/POJK.05/2022 telah
 *    DICABUT dan DIGANTIKAN oleh POJK No. 40 Tahun 2024 beserta petunjuk teknis SEOJK No. 19/SEOJK.06/2023 (berlaku 2024-2026).
 * 4. Sumber yang belum diverifikasi naskah primernya diberi status 'Needs Verification'
 *    dan TIDAK boleh diklaim telah disetujui otoritas dewan syariah.
 */
export const SOURCES: SourceRef[] = [
  {
    id: 'dsnmui-17-2000',
    title:
      'Fatwa DSN-MUI No. 17/DSN-MUI/IX/2000 tentang Sanksi Atas Nasabah Mampu yang Menunda-nunda Pembayaran',
    documentNumber: '17/DSN-MUI/IX/2000',
    publisher: 'Dewan Syariah Nasional – Majelis Ulama Indonesia',
    publicationDate: '2000-09-23',
    validityStatus: 'Berlaku',
    url: 'https://dsnmui.or.id',
    kind: 'fatwa',
    relevantClauses: [
      'Nasabah mampu yang menunda-nunda pembayaran dan/atau tidak mempunyai kemauan dan iktikad baik untuk membayar hutangnya boleh dikenakan sanksi (ta\'zir).',
      'Sanksi berupa denda finansial wajib dialokasikan dan disalurkan seluruhnya sebagai dana kebajikan (Qardhul Hasan / Dana Sosial), dan tidak boleh diakui sebagai keuntungan atau pos pendapatan LKS/kreditur.',
    ],
    lastVerified: CHECKED,
    reviewStatus: 'Published',
    verificationNote:
      'Nomor fatwa, tanggal penetapan, dan rujukan naskah primer telah dicocokkan via Himpunan Fatwa DSN-MUI. Khusus mengatur sanksi denda finansial (Ta\'zir) untuk dana sosial.',
    relatedContentIds: ['pembiayaan-digital', 'transparansi-biaya'],
  },
  {
    id: 'dsnmui-43-2004',
    title: 'Fatwa DSN-MUI No. 43/DSN-MUI/VIII/2004 tentang Ganti Rugi (Ta\'widh)',
    documentNumber: '43/DSN-MUI/VIII/2004',
    publisher: 'Dewan Syariah Nasional – Majelis Ulama Indonesia',
    publicationDate: '2004-08-11',
    validityStatus: 'Berlaku',
    url: 'https://dsnmui.or.id',
    kind: 'fatwa',
    relevantClauses: [
      'Ganti rugi (ta\'widh) hanya boleh dikenakan atas kerugian riil (real loss) yang pasti dialami oleh LKS akibat wanprestasi atau kelalaian debitur.',
      'Besar ganti rugi tidak boleh melebihi nilai kerugian riil operasional yang terverifikasi, dan tidak boleh ditetapkan dalam persentase keuntungan pasti di awal akad.',
    ],
    lastVerified: CHECKED,
    reviewStatus: 'Published',
    verificationNote:
      'Nomor dan substansi fatwa diverifikasi. Berbeda dari Ta\'zir (Fatwa 17/2000): Ta\'widh adalah kompensasi kerugian riil yang boleh diterima LKS, bukan sanksi sosial.',
    relatedContentIds: ['pembiayaan-digital', 'transparansi-biaya'],
  },
  {
    id: 'dsnmui-04-2000',
    title: 'Fatwa DSN-MUI No. 04/DSN-MUI/IV/2000 tentang Murabahah',
    documentNumber: '04/DSN-MUI/IV/2000',
    publisher: 'Dewan Syariah Nasional – Majelis Ulama Indonesia',
    publicationDate: '2000-04-01',
    validityStatus: 'Berlaku',
    url: 'https://dsnmui.or.id',
    kind: 'fatwa',
    relevantClauses: [
      'Penjual harus memberitahu harga pokok yang ia beli dan menentukan suatu tingkat keuntungan (margin) sebagai tambahannya.',
      'Barang yang diperjualbelikan harus dimiliki secara sah dan prinsipil oleh penjual sebelum dijual kembali kepada pembeli.',
    ],
    lastVerified: CHECKED,
    reviewStatus: 'Published',
    verificationNote:
      'Fatwa dasar DSN-MUI tentang jual beli Murabahah. Telah diverifikasi nomor dan tahun penetapannya.',
    relatedContentIds: ['akad-transaksi-digital', 'pembiayaan-digital'],
  },
  {
    id: 'dsnmui-111-2017',
    title: 'Fatwa DSN-MUI No. 111/DSN-MUI/IX/2017 tentang Akad Jual Beli Murabahah',
    documentNumber: '111/DSN-MUI/IX/2017',
    publisher: 'Dewan Syariah Nasional – Majelis Ulama Indonesia',
    publicationDate: '2017-09-28',
    validityStatus: 'Berlaku',
    url: 'https://dsnmui.or.id',
    kind: 'fatwa',
    relevantClauses: [
      'Ketentuan komprehensif akad murabahah mutakhir mencakup janji beli (wa\'ad), uang muka (urbun), dan penyelesaian bila terjadi wanprestasi.',
      'Pelaksanaan akad wakalah pendahuluan harus terpisah secara jelas dari akad jual beli pokok murabahah.',
    ],
    lastVerified: CHECKED,
    reviewStatus: 'Published',
    verificationNote:
      'Fatwa penyempurna murabahah komprehensif. Judul dan nomor dicocokkan via publikasi resmi DSN-MUI.',
    relatedContentIds: ['akad-transaksi-digital', 'pembiayaan-digital'],
  },
  {
    id: 'dsnmui-77-2010',
    title: 'Fatwa DSN-MUI No. 77/DSN-MUI/V/2010 tentang Jual Beli Emas Secara Tidak Tunai',
    documentNumber: '77/DSN-MUI/V/2010',
    publisher: 'Dewan Syariah Nasional – Majelis Ulama Indonesia',
    publicationDate: '2010-06-03',
    validityStatus: 'Berlaku',
    url: 'https://dsnmui.or.id',
    kind: 'fatwa',
    relevantClauses: [
      'Jual beli emas secara tidak tunai, baik melalui cicilan atau tangguh, hukumnya mubah (boleh) selama emas tidak menjadi alat tukar resmi (tsaman/uang).',
      'Harga jual tidak boleh bertambah selama masa cicilan dan emas fisik wajib ada pada pihak penjual atau kustodian terdaftar yang dapat diserahterimakan (Qabdh Hukmi).',
    ],
    lastVerified: CHECKED,
    reviewStatus: 'Published',
    verificationNote:
      'Nomor asli dokumen: 77/DSN-MUI/V/2010 (ditetapkan 20 Jumadil Akhir 1431 H / 3 Juni 2010). Diverifikasi resmi.',
    relatedContentIds: ['risiko-investasi', 'akad-transaksi-digital'],
  },
  {
    id: 'dsnmui-116-2017',
    title: 'Fatwa DSN-MUI No. 116/DSN-MUI/IX/2017 tentang Uang Elektronik Syariah',
    documentNumber: '116/DSN-MUI/IX/2017',
    publisher: 'Dewan Syariah Nasional – Majelis Ulama Indonesia',
    publicationDate: '2017-09-28',
    validityStatus: 'Berlaku',
    url: 'https://dsnmui.or.id',
    kind: 'fatwa',
    relevantClauses: [
      'Akad penempatan dana antara pemegang uang elektronik dengan penerbit dapat berupa akad Wadi\'ah (titipan) atau Qardh (pinjaman talangan).',
      'Penerbit dilarang membungakan saldo uang elektronik dan penempatan dana mengendap wajib pada bank syariah.',
    ],
    lastVerified: CHECKED,
    reviewStatus: 'Published',
    verificationNote:
      'Diverifikasi resmi. Memuat landasan fiqih dompet digital (e-wallet) syariah di Indonesia.',
    relatedContentIds: ['layanan-keuangan-syariah'],
  },
  {
    id: 'dsnmui-117-2018',
    title:
      'Fatwa DSN-MUI No. 117/DSN-MUI/II/2018 tentang Layanan Pembiayaan Berbasis Teknologi Informasi Berdasarkan Prinsip Syariah',
    documentNumber: '117/DSN-MUI/II/2018',
    publisher: 'Dewan Syariah Nasional – Majelis Ulama Indonesia',
    publicationDate: '2018-02-27',
    validityStatus: 'Berlaku',
    url: 'https://dsnmui.or.id',
    kind: 'fatwa',
    relevantClauses: [
      'Penyelenggaraan fintech pembiayaan syariah wajib terbebas dari Riba, Gharar, Maysir, Tadlis, Dharar, Zhulm, dan Haram.',
      'Akad yang dapat difasilitasi antara lain: Ijarah, Murabahah, Qardh, Wakalah bil Ujrah, dan Mudharabah/Musyarakah.',
    ],
    lastVerified: CHECKED,
    reviewStatus: 'Published',
    verificationNote:
      'Diverifikasi resmi. Merupakan payung hukum fiqih utama bagi fintech P2P lending syariah di Indonesia.',
    relatedContentIds: ['pembiayaan-digital', 'akad-transaksi-digital'],
  },
  {
    id: 'dsnmui-05-2000',
    title: 'Fatwa DSN-MUI No. 05/DSN-MUI/IV/2000 tentang Jual Beli Salam',
    documentNumber: '05/DSN-MUI/IV/2000',
    publisher: 'Dewan Syariah Nasional – Majelis Ulama Indonesia',
    publicationDate: '2000-04-01',
    validityStatus: 'Berlaku',
    url: 'https://dsnmui.or.id',
    kind: 'fatwa',
    relevantClauses: [
      'Jual beli salam adalah jual beli barang pesanan dengan penyerahan barang di kemudian hari sementara pembayaran dilakukan di muka secara tunai.',
      'Spesifikasi barang (jenis, tipe, ukuran, kualitas, dan kuantitas) harus jelas dan disepakati di muka untuk mencegah gharar dan sengketa.',
      'Penjual wajib menyerahkan barang tepat waktu sesuai spesifikasi yang dijanjikan.',
    ],
    lastVerified: CHECKED,
    reviewStatus: 'Published',
    verificationNote:
      'Fatwa resmi DSN-MUI tentang jual beli pesanan salam. Menjadi rujukan utama transaksi dropshipping dan pre-order syariah.',
    relatedContentIds: ['dropshipping-kepemilikan', 'akad-transaksi-digital'],
  },
  {
    id: 'dsnmui-112-2017',
    title: 'Fatwa DSN-MUI No. 112/DSN-MUI/IX/2017 tentang Akad Ijarah',
    documentNumber: '112/DSN-MUI/IX/2017',
    publisher: 'Dewan Syariah Nasional – Majelis Ulama Indonesia',
    publicationDate: '2017-09-28',
    validityStatus: 'Berlaku',
    url: 'https://dsnmui.or.id',
    kind: 'fatwa',
    relevantClauses: [
      'Ijarah adalah akad sewa-menyewa atas manfaat suatu barang atau jasa dengan imbalan ujrah (biaya sewa/upah).',
      'Objek manfaat dan besaran ujrah harus diketahui dengan jelas oleh kedua pihak saat akad (ma\'lum).',
      'Perpanjangan masa pemanfaatan harus didasarkan atas kerelaan bersama tanpa klausul pemaksaan tersembunyi.',
    ],
    lastVerified: CHECKED,
    reviewStatus: 'Published',
    verificationNote:
      'Fatwa standar komprehensif DSN-MUI tentang akad Ijarah (sewa manfaat dan jasa), relevan untuk langganan software/aplikasi digital.',
    relatedContentIds: ['langganan-digital-ijarah', 'transparansi-biaya'],
  },
  {
    id: 'ojk-pojk-40-2024',
    title:
      'Peraturan OJK No. 40 Tahun 2024 tentang Layanan Pendanaan Bersama Berbasis Teknologi Informasi (LPBBTI)',
    documentNumber: 'POJK No. 40 Tahun 2024',
    publisher: 'Otoritas Jasa Keuangan',
    publicationDate: '2024-12-05',
    effectiveDate: '2024-12-05',
    validityStatus: 'Berlaku',
    revocationNote:
      'Mencabut dan menyatakan tidak berlaku POJK No. 10/POJK.05/2022 tentang Layanan Pendanaan Bersama Berbasis Teknologi Informasi.',
    url: 'https://ojk.go.id',
    kind: 'regulator',
    relevantClauses: [
      'Regulasi mutakhir penyelenggaraan fintech P2P lending / LPBBTI di Indonesia.',
      'Kewajiban tata kelola risiko, transparansi biaya/manfaat ekonomi, dan kewajiban memiliki Dewan Pengawas Syariah bagi unit usaha syariah.',
    ],
    lastVerified: CHECKED,
    reviewStatus: 'Published',
    verificationNote:
      'Regulasi OJK terbaru yang berlaku saat ini. Menggantikan regulasi lama POJK 10/2022.',
    relatedContentIds: ['pembiayaan-digital', 'transparansi-biaya'],
  },
  {
    id: 'ojk-pojk-10-2022',
    title:
      'Peraturan OJK No. 10/POJK.05/2022 tentang Layanan Pendanaan Bersama Berbasis Teknologi Informasi',
    documentNumber: 'POJK No. 10/POJK.05/2022',
    publisher: 'Otoritas Jasa Keuangan',
    publicationDate: '2022-06-29',
    validityStatus: 'Dicabut',
    revocationNote:
      'STATUS: DICABUT dan dinyatakan tidak berlaku oleh POJK No. 40 Tahun 2024. Dicatat di sini semata sebagai konteks historis.',
    url: 'https://ojk.go.id',
    kind: 'regulator',
    relevantClauses: [
      'Regulasi historis pendanaan online yang sebelumnya mengatur permodalan, batas pinjaman, dan izin fintech P2P.',
    ],
    lastVerified: CHECKED,
    reviewStatus: 'Archived',
    verificationNote:
      'Telah diverifikasi status hukumnya: Dicabut oleh POJK 40 Tahun 2024. Tidak boleh dijadikan acuan hukum aktif saat ini.',
    relatedContentIds: ['pembiayaan-digital'],
  },
  {
    id: 'ojk-seojk-19-2023',
    title:
      'Surat Edaran OJK No. 19/SEOJK.06/2023 tentang Tata Cara Penyelenggaraan LPBBTI',
    documentNumber: 'SEOJK No. 19/SEOJK.06/2023',
    publisher: 'Otoritas Jasa Keuangan',
    publicationDate: '2023-11-08',
    effectiveDate: '2024-01-01',
    validityStatus: 'Berlaku',
    url: 'https://ojk.go.id',
    kind: 'regulator',
    relevantClauses: [
      'Mengatur batas maksimum manfaat ekonomi (bunga/biaya/margin) harian secara bertahap (0.3% per hari untuk konsumtif tahun 2024, turun ke 0.2% tahun 2025, dan 0.1% tahun 2026).',
      'Total seluruh biaya administrasi, bunga, dan denda keterlambatan dibatasi maksimal tidak boleh melebihi 100% dari nilai pendanaan pokok.',
    ],
    lastVerified: CHECKED,
    reviewStatus: 'Published',
    verificationNote:
      'Diverifikasi resmi. Memuat batasan batas suku bunga/manfaat ekonomi dan denda keterlambatan LPBBTI yang berlaku bertahap.',
    relatedContentIds: ['pembiayaan-digital', 'transparansi-biaya'],
  },
  {
    id: 'bappebti-4-2019',
    title:
      'Peraturan Bappebti No. 4 Tahun 2019 tentang Ketentuan Teknis Penyelenggaraan Pasar Fisik Emas Digital di Bursa Berjangka',
    documentNumber: 'Peraturan Bappebti No. 4/2019',
    publisher: 'Badan Pengawas Perdagangan Berjangka Komoditi',
    publicationDate: '2019-02-08',
    validityStatus: 'Berlaku',
    url: 'https://bappebti.go.id',
    kind: 'regulator',
    relevantClauses: [
      'Kewajiban ketersediaan emas fisik 100% pada Lembaga Depositori (kustodian fisik) berizin.',
      'Jaminan hak cetak fisik emas batangan bersertifikat bagi nasabah emas digital.',
    ],
    lastVerified: CHECKED,
    reviewStatus: 'Published',
    verificationNote:
      'Diverifikasi resmi. Menjadi dasar hukum regulasi keamanan kustodian fisik emas digital di Indonesia.',
    relatedContentIds: ['risiko-investasi'],
  },
  {
    id: 'dsnmui-01-2004',
    title: 'Fatwa DSN-MUI No. 1 Tahun 2004 tentang Bunga (Interest/Fa\'idah)',
    documentNumber: '01 Tahun 2004',
    publisher: 'Dewan Syariah Nasional – Majelis Ulama Indonesia',
    publicationDate: '2004-01-24',
    validityStatus: 'Berlaku',
    url: 'https://dsnmui.or.id',
    kind: 'fatwa',
    relevantClauses: [
      'Praktek pembungaan uang saat ini telah memenuhi kriteria Riba yang terjadi pada zaman Rasulullah SAW (Riba Nasi\'ah).',
      'Praktek pembungaan tersebut hukumnya haram, baik dilakukan oleh bank, asuransi, pasar modal, maupun perorangan.',
    ],
    lastVerified: CHECKED,
    reviewStatus: 'Published',
    verificationNote:
      'Fatwa ijma ulama Indonesia tentang status keharaman bunga uang perbankan/pinjaman sebagai riba nasi\'ah.',
    relatedContentIds: ['transparansi-biaya', 'pembiayaan-digital'],
  },
  {
    id: 'dsnmui-19-2001',
    title: 'Fatwa DSN-MUI No. 19/DSN-MUI/IV/2001 tentang al-Qardh',
    documentNumber: '19/DSN-MUI/IV/2001',
    publisher: 'Dewan Syariah Nasional – Majelis Ulama Indonesia',
    publicationDate: '2001-04-18',
    validityStatus: 'Berlaku',
    url: 'https://dsnmui.or.id',
    kind: 'fatwa',
    relevantClauses: [
      'Pinjaman Qardh adalah penyediaan dana atau tagihan tanpa imbalan tambahan, di mana peminjam wajib mengembalikan sejumlah dana yang diterima.',
      'Biaya administrasi boleh dibebankan kepada nasabah peminjam hanya sebesar biaya nyata (real cost) operasional dan tidak boleh ditetapkan dalam bentuk persentase dari pokok pinjaman.',
    ],
    lastVerified: CHECKED,
    reviewStatus: 'Published',
    verificationNote:
      'Fatwa dasar tentang akad pinjaman sosial Qardh dan pembatasan biaya administrasi riil (real cost).',
    relatedContentIds: ['pembiayaan-digital', 'transparansi-biaya'],
  },
  {
    id: 'dsnmui-80-2011',
    title:
      'Fatwa DSN-MUI No. 80/DSN-MUI/III/2011 tentang Penerapan Prinsip Syariah dalam Mekanisme Perdagangan Efek Bersifat Ekuitas di Pasar Reguler Bursa Efek',
    documentNumber: '80/DSN-MUI/III/2011',
    publisher: 'Dewan Syariah Nasional – Majelis Ulama Indonesia',
    publicationDate: '2011-03-08',
    validityStatus: 'Berlaku',
    url: 'https://dsnmui.or.id',
    kind: 'fatwa',
    relevantClauses: [
      'Perdagangan efek bersifat ekuitas (saham) di bursa efek diperbolehkan jika saham emiten memenuhi kriteria prinsip syariah dan terdaftar di Daftar Efek Syariah (DES).',
      'Mekanisme perdagangan dilarang memuat unsur spekulasi terlarang: dilarang short selling (bai\' al-ma\'dum), margin trading berbunga, insider trading, cornering, dan wash sale (najsy).',
    ],
    lastVerified: CHECKED,
    reviewStatus: 'Published',
    verificationNote:
      'Fatwa komprehensif pasar modal syariah yang mengatur keabsahan transaksi saham syariah dan larangan manipulasi pasar.',
    relatedContentIds: ['risiko-investasi'],
  },
  {
    id: 'dsnmui-82-2011',
    title:
      'Fatwa DSN-MUI No. 82/DSN-MUI/VIII/2011 tentang Perdagangan Komoditi Berdasarkan Prinsip Syariah di Bursa Komoditi (Tawarruq/Murabahah Komoditi)',
    documentNumber: '82/DSN-MUI/VIII/2011',
    publisher: 'Dewan Syariah Nasional – Majelis Ulama Indonesia',
    publicationDate: '2011-08-25',
    validityStatus: 'Berlaku',
    url: 'https://dsnmui.or.id',
    kind: 'fatwa',
    relevantClauses: [
      'Perdagangan komoditi syariah untuk kebutuhan likuiditas (tawarruq/murabahah komoditi) sah dengan syarat komoditas riil ada, spesifikasi jelas, dan terjadi serah terima sah (qabdh hukmi/hakiki).',
      'Dilarang melakukan transaksi rekayasa lingkaran semu di mana komoditas kembali ke penjual asal tanpa perpindahan hak kepemilikan riil (larangan bai\' al-\'inah).',
    ],
    lastVerified: CHECKED,
    reviewStatus: 'Published',
    verificationNote:
      'Fatwa rujukan tata kelola Tawarruq dan komoditi syariah di Bursa Berjangka Jakarta / ICDX.',
    relatedContentIds: ['pembiayaan-digital', 'risiko-investasi'],
  },
  {
    id: 'dsnmui-135-2020',
    title: 'Fatwa DSN-MUI No. 135/DSN-MUI/V/2020 tentang Saham',
    documentNumber: '135/DSN-MUI/V/2020',
    publisher: 'Dewan Syariah Nasional – Majelis Ulama Indonesia',
    publicationDate: '2020-05-20',
    validityStatus: 'Berlaku',
    url: 'https://dsnmui.or.id',
    kind: 'fatwa',
    relevantClauses: [
      'Saham merupakan bukti kepemilikan atas suatu perusahaan yang memenuhi prinsip syariah dan tidak bertentangan dengan ketentuan hukum Islam.',
      'Perusahaan yang sahamnya dapat dimiliki wajib terbebas dari kegiatan usaha yang diharamkan (riba, maysir, gharar, barang haram) serta memenuhi rasio keuangan syariah OJK.',
    ],
    lastVerified: CHECKED,
    reviewStatus: 'Published',
    verificationNote:
      'Fatwa mutakhir tentang kodifikasi kepemilikan saham perusahaan dan hak dividen syariah.',
    relatedContentIds: ['risiko-investasi'],
  },
  {
    id: 'mui-ijtima-kripto-2021',
    title:
      'Keputusan Ijtima Ulama Komisi Fatwa MUI VII Tahun 2021 tentang Hukum Uang Kripto (Cryptocurrency)',
    documentNumber: 'Ijtima Ulama VII/2021',
    publisher: 'Majelis Ulama Indonesia',
    publicationDate: '2021-11-11',
    validityStatus: 'Berlaku',
    url: 'https://mui.or.id',
    kind: 'fatwa',
    relevantClauses: [
      'Penggunaan cryptocurrency sebagai mata uang hukumnya haram, karena mengandung gharar, dharar, dan bertentangan dengan UU No. 7 Tahun 2011 (mata uang sah di NKRI adalah Rupiah).',
      'Cryptocurrency sebagai komoditi/aset digital tidak sah diperjualbelikan jika mengandung gharar, dharar, qimar/maysir, serta tidak memenuhi syarat sil\'ah secara syar\'i (tidak ada wujud fisik, nilai intrinsik, underlying asset yang jelas, dan manfaat riil).',
      'Cryptocurrency yang memenuhi syarat sebagai sil\'ah (ada underlying asset dan ada manfaat jelas) sah untuk diperjualbelikan.',
    ],
    lastVerified: CHECKED,
    reviewStatus: 'Published',
    verificationNote:
      'Keputusan Ijtima Ulama Nasional Komisi Fatwa se-Indonesia mengenai kripto sebagai mata uang dan aset digital.',
    relatedContentIds: ['risiko-investasi'],
  },
  {
    id: 'ojk-pojk-15-2015',
    title:
      'Peraturan Otoritas Jasa Keuangan No. 15/POJK.04/2015 tentang Penerapan Prinsip Syariah di Pasar Modal',
    documentNumber: 'POJK No. 15/POJK.04/2015',
    publisher: 'Otoritas Jasa Keuangan',
    publicationDate: '2015-11-03',
    validityStatus: 'Berlaku',
    url: 'https://ojk.go.id',
    kind: 'regulator',
    relevantClauses: [
      'Menetapkan kriteria penapisan (screening) saham syariah dan penetapan Daftar Efek Syariah (DES) di Indonesia (rasio utang berbasis bunga dibanding total aset maksimal 45%, dan pendapatan non-halal dibanding total pendapatan usaha maksimal 10%).',
      'Kewajiban kepemilikan Ahli Pasar Modal Syariah (ASPM) dan Dewan Pengawas Syariah pada manajer investasi syariah.',
    ],
    lastVerified: CHECKED,
    reviewStatus: 'Published',
    verificationNote:
      'Dasar regulasi penapisan Daftar Efek Syariah (DES) dan instrumen reksa dana/saham syariah oleh OJK.',
    relatedContentIds: ['risiko-investasi'],
  },
  {
    id: 'ojk-portal',
    title: 'Portal resmi Otoritas Jasa Keuangan (daftar entitas berizin, edukasi, pengaduan konsumen)',
    documentNumber: 'OJK-PORTAL',
    publisher: 'Otoritas Jasa Keuangan',
    validityStatus: 'Berlaku',
    url: 'https://ojk.go.id',
    kind: 'portal',
    relevantClauses: ['Pusat informasi dan pengecekan legalitas izin entitas keuangan berizin.'],
    lastVerified: CHECKED,
    reviewStatus: 'Published',
    verificationNote:
      'Hanya beranda situs resmi yang dirujuk. Gunakan portal ini untuk mengecek legalitas izin penyelenggara.',
  },
  {
    id: 'bi-portal',
    title: 'Portal resmi Bank Indonesia (sistem pembayaran dan perlindungan konsumen)',
    documentNumber: 'BI-PORTAL',
    publisher: 'Bank Indonesia',
    validityStatus: 'Berlaku',
    url: 'https://www.bi.go.id',
    kind: 'portal',
    relevantClauses: ['Pusat informasi sistem pembayaran digital, QRIS, dan perlindungan konsumen.'],
    lastVerified: CHECKED,
    reviewStatus: 'Published',
    verificationNote: 'Hanya beranda situs resmi yang dirujuk.',
  },
  {
    id: 'dsnmui-portal',
    title: 'Portal resmi Dewan Syariah Nasional – Majelis Ulama Indonesia (kumpulan fatwa)',
    documentNumber: 'DSNMUI-PORTAL',
    publisher: 'Dewan Syariah Nasional – Majelis Ulama Indonesia',
    validityStatus: 'Berlaku',
    url: 'https://dsnmui.or.id',
    kind: 'portal',
    relevantClauses: ['Pusat dokumentasi naskah fatwa ekonomi syariah nasional.'],
    lastVerified: CHECKED,
    reviewStatus: 'Published',
    verificationNote:
      'Gunakan portal resmi DSN-MUI untuk membaca salinan naskah fatwa lengkap.',
  },
];

export const SOURCES_BY_ID: Record<string, SourceRef> = Object.fromEntries(
  SOURCES.map((s) => [s.id, s]),
);

export function getSources(ids: string[]): SourceRef[] {
  return ids.map((id) => SOURCES_BY_ID[id]).filter((s): s is SourceRef => !!s);
}

/** Helper untuk memastikan hanya rujukan dengan status Published/Approved yang disajikan ke publik */
export function getVerifiedSources(): SourceRef[] {
  return SOURCES.filter((s) => s.reviewStatus === 'Published' || s.reviewStatus === 'Approved');
}
