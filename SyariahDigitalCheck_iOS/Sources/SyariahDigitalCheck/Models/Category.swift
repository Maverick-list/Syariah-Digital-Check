import Foundation

public struct TransactionCategoryItem: Identifiable, Hashable {
    public let id: String
    public let name: String
    public let sfSymbol: String
    public let contractBasis: String
    public let description: String
    public let criticalQuestions: [String]

    public init(
        id: String,
        name: String,
        sfSymbol: String,
        contractBasis: String,
        description: String,
        criticalQuestions: [String]
    ) {
        self.id = id
        self.name = name
        self.sfSymbol = sfSymbol
        self.contractBasis = contractBasis
        self.description = description
        self.criticalQuestions = criticalQuestions
    }

    public static let sampleCategories: [TransactionCategoryItem] = [
        TransactionCategoryItem(
            id: "paylater",
            name: "PayLater & Cicilan Digital",
            sfSymbol: "creditcard.fill",
            contractBasis: "Qardh / Murabahah / Hawalah",
            description: "Bayar nanti, talangan belanja, atau pembiayaan cicilan digital.",
            criticalQuestions: [
                "Apakah ada biaya denda keterlambatan (ta'zir), dan disalurkan ke pos kebajikan?",
                "Apakah terdapat biaya langganan platform tersembunyi setiap bulan?",
                "Kapan hak kepemilikan barang secara sah beralih ke pembeli?"
            ]
        ),
        TransactionCategoryItem(
            id: "shopping",
            name: "Belanja Online & Marketplace",
            sfSymbol: "cart.fill",
            contractBasis: "Ba'i Salam / Istishna' / Wakalah",
            description: "Pemesanan barang jarak jauh, pre-order, dan promo diskon voucher.",
            criticalQuestions: [
                "Berapa total harga akhir setelah biaya layanan dan ongkir?",
                "Bagaimana mekanisme pengembalian dana (refund) jika barang tidak sesuai spesifikasi?",
                "Apakah barang yang dijual sudah ready stock atau dropship tanpa izin?"
            ]
        ),
        TransactionCategoryItem(
            id: "gold",
            name: "Emas Digital & Tabungan Fisik",
            sfSymbol: "sparkles",
            contractBasis: "Sarf / Murabahah Emas Non-Tunai",
            description: "Beli dan cicil saldo emas digital dengan fasilitas cetak fisik.",
            criticalQuestions: [
                "Apakah emas fisik riil benar-benar dialokasikan (qabdh hukmi)?",
                "Berapa biaya cetak fisik dan selisih kurs beli/jual (spread)?",
                "Apakah penyimpanan emas diawasi oleh lembaga kustodian berizin Bappebti & OJK?"
            ]
        ),
        TransactionCategoryItem(
            id: "savings",
            name: "Tabungan Digital & E-Wallet",
            sfSymbol: "wallet.pass.fill",
            contractBasis: "Wadiah Yad Dhamanah / Mudharabah",
            description: "Penyimpanan saldo harian, reward promo, dan bunga/bagi hasil akun digital.",
            criticalQuestions: [
                "Apakah reward/cashback berasal dari dana promosi atau bunga simpanan?",
                "Apakah dana simpanan dijamin LPS dan tidak diputar di sektor non-halal?",
                "Apakah ada biaya admin bulanan atau biaya penalti dorman?"
            ]
        ),
        TransactionCategoryItem(
            id: "subscription",
            name: "Langganan Berulang Digital",
            sfSymbol: "arrow.triangle.2.circlepath",
            contractBasis: "Ijarah Khidmah (Sewa Layanan Jasa)",
            description: "Uji coba gratis (free trial), streaming musik/film, dan SaaS per bulan.",
            criticalQuestions: [
                "Kapan periode uji coba gratis berakhir dan tagihan otomatis dimulai?",
                "Bagaimana cara membatalkan langganan dengan mudah sebelum dipotong otomatis?",
                "Apakah ada potongan otomatis berulang tanpa notifikasi konfirmasi terlebih dahulu?"
            ]
        ),
        TransactionCategoryItem(
            id: "donation",
            name: "Donasi, Zakat & Crowdfunding",
            sfSymbol: "heart.circle.fill",
            contractBasis: "Tabarru' / Wakalah bil Ujrah",
            description: "Penggalangan dana sosial, sedekah online, dan wakaf produktif.",
            criticalQuestions: [
                "Berapa persentase potongan biaya operasional platform (ujrah amil)?",
                "Apakah lembaga pengelola memiliki izin resmi Kemenag / BAZNAS?",
                "Bagaimana transparansi laporan penyaluran dana kepada penerima manfaat?"
            ]
        )
    ]
}
