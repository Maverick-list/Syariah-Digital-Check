import Foundation

public struct LessonItem: Identifiable, Hashable {
    public let id: String
    public let title: String
    public let category: String
    public let readingMinutes: Int
    public let summary: String
    public let bodyParagraphs: [String]
    public let keyPoints: [String]
    public let fatwaReference: String

    public init(
        id: String,
        title: String,
        category: String,
        readingMinutes: Int,
        summary: String,
        bodyParagraphs: [String],
        keyPoints: [String],
        fatwaReference: String
    ) {
        self.id = id
        self.title = title
        self.category = category
        self.readingMinutes = readingMinutes
        self.summary = summary
        self.bodyParagraphs = bodyParagraphs
        self.keyPoints = keyPoints
        self.fatwaReference = fatwaReference
    }

    public static let sampleLessons: [LessonItem] = [
        LessonItem(
            id: "akad-murabahah",
            title: "Mengenal Akad Murabahah pada Cicilan Digital",
            category: "Akad",
            readingMinutes: 4,
            summary: "Memahami struktur jual beli dengan penegasan harga pokok dan margin keuntungan yang disepakati.",
            bodyParagraphs: [
                "Akad Murabahah adalah akad jual beli barang dengan menyatakan harga perolehan dan keuntungan (margin) yang disepakati oleh penjual dan pembeli.",
                "Dalam skema digital, penyedia membiayai atau membeli barang terlebih dahulu atas permintaan konsumen, lalu menjualnya kembali dengan cicilan tetap tanpa bunga berbunga.",
                "Kunci syariah: Barang harus berada dalam penguasaan sah (qabdh) dan total harga jual sudah disepakati di awal tanpa kenaikan sepihak di tengah jalan."
            ],
            keyPoints: [
                "Harga pokok dan margin laba wajib transparan sejak awal.",
                "Bukan pinjaman uang berbunga, melainkan jual beli barang.",
                "Cicilan bernilai tetap sepanjang tenor yang disepakati."
            ],
            fatwaReference: "Fatwa DSN-MUI No. 04/DSN-MUI/IV/2000 tentang Murabahah"
        ),
        LessonItem(
            id: "denda-keterlambatan",
            title: "Sanksi Keterlambatan (Ta'zir) vs Bunga Riba",
            category: "Denda",
            readingMinutes: 5,
            summary: "Mengapa denda tidak boleh menjadi keuntungan bisnis bagi lembaga keuangan syariah.",
            bodyParagraphs: [
                "Dalam perbankan konvensional, denda keterlambatan dihitung sebagai pendapatan bunga tambahan. Dalam syariah, ini diharamkan karena termasuk riba nasiah.",
                "DSN-MUI memperbolehkan sanksi (ta'zir) bagi nasabah mampu yang menunda-nunda pembayaran tanpa alasan sah, asalkan seluruh dana sanksi tersebut dialokasikan ke pos dana kebajikan (dana sosial).",
                "Nasabah yang mengalami kesulitan finansial nyata (mu'sir) wajib diberi penangguhan waktu pembayaran tanpa tambahan biaya denda."
            ],
            keyPoints: [
                "Denda hanya bersifat sanksi mendidik (ta'zir).",
                "100% dana sanksi wajib disalurkan untuk dana sosial kebajikan.",
                "Tidak boleh dimasukkan ke dalam pos laba perusahaan penyedia."
            ],
            fatwaReference: "Fatwa DSN-MUI No. 43/DSN-MUI/VIII/2004 tentang Ta'widh dan Ta'zir"
        ),
        LessonItem(
            id: "emas-digital",
            title: "Hukum Jual Beli Emas Digital secara Tidak Tunai",
            category: "Investasi",
            readingMinutes: 4,
            summary: "Ketentuan serah terima emas non-fisik (qabdh hukmi) dan legalitas tabungan emas digital.",
            bodyParagraphs: [
                "Emas tergolong komoditas ribawi, sehingga secara asal jual belinya harus tunai dan saling serah terima seketika.",
                "Fatwa DSN-MUI No. 77/2010 membolehkan jual beli emas secara tidak tunai (cicil) selama emas tersebut bukan alat tukar resmi uang, harga tidak berubah selama masa perjanjian, dan emas yang diperjualbelikan nyata ada di tempat penyimpanan.",
                "Kepemilikan buku (qabdh hukmi) yang terverifikasi sertifikat kustodian resmi diakui sah setara dengan serah terima fisik langsung."
            ],
            keyPoints: [
                "Emas fisik riil wajib ada di brankas kustodian resmi.",
                "Harga cicilan emas tidak boleh berubah setelah akad disepakati.",
                "Konsumen berhak mencetak fisik emas kapan saja."
            ],
            fatwaReference: "Fatwa DSN-MUI No. 77/DSN-MUI/V/2010 tentang Jual Beli Emas Tidak Tunai"
        ),
        LessonItem(
            id: "uang-elektronik",
            title: "Prinsip Syariah pada Dompet Digital & E-Money",
            category: "Regulasi",
            readingMinutes: 3,
            summary: "Kesesuaian akad wadiah pada saldo dompet digital dan batasan promosi cashback.",
            bodyParagraphs: [
                "Saldo pada dompet elektronik (e-wallet) ditempatkan dengan akad Wadiah (titipan) atau Qardh (pinjaman talangan).",
                "Penyedia jasa uang elektronik wajib menempatkan dana mengendap (float fund) pada bank syariah atau instrumen yang tidak bertentangan dengan syariah.",
                "Diskon dan cashback diperbolehkan selama murni berupa hadiah promosi (hibah) dari pihak penyelenggara dan tidak bersyaratkan riba simpanan."
            ],
            keyPoints: [
                "Akad penempatan saldo adalah Wadiah / Qardh.",
                "Dana float fund wajib di bank syariah.",
                "Cashback diperbolehkan sebagai hibah promosi yang wajar."
            ],
            fatwaReference: "Fatwa DSN-MUI No. 116/DSN-MUI/IX/2017 tentang Uang Elektronik Syariah"
        )
    ]
}
