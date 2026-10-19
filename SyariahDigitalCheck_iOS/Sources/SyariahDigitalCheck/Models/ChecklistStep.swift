import Foundation

public enum StepAnswerStatus: String, Codable, CaseIterable {
    case clear = "clear"       // Jelas / Ya (Nilai 1.0)
    case partial = "partial"   // Ragu / Parsial (Nilai 0.5)
    case unknown = "unknown"   // Belum Tahu (Nilai 0.0)

    public var title: String {
        switch self {
        case .clear: return "Jelas / Ya"
        case .partial: return "Ragu / Parsial"
        case .unknown: return "Belum Tahu"
        }
    }

    public var sfSymbol: String {
        switch self {
        case .clear: return "checkmark.circle.fill"
        case .partial: return "exclamationmark.triangle.fill"
        case .unknown: return "questionmark.circle.fill"
        }
    }
}

public struct ChecklistStep: Identifiable {
    public let id: Int
    public let title: String
    public let subtitle: String
    public let question: String
    public let whyCrucial: String
    public let fatwaReference: String
    public let actionTip: String

    public init(
        id: Int,
        title: String,
        subtitle: String,
        question: String,
        whyCrucial: String,
        fatwaReference: String,
        actionTip: String
    ) {
        self.id = id
        self.title = title
        self.subtitle = subtitle
        self.question = question
        self.whyCrucial = whyCrucial
        self.fatwaReference = fatwaReference
        self.actionTip = actionTip
    }

    public static let defaultSteps: [ChecklistStep] = [
        ChecklistStep(
            id: 0,
            title: "Tahap 1: Struktur Akad",
            subtitle: "Kejelasan Hubungan Hukum Antara Para Pihak",
            question: "Apakah kamu memahami jenis akad yang disepakati (jual beli, talangan pinjaman, sewa jasa, atau wakalah)?",
            whyCrucial: "Dalam hukum muamalah syariah, nama promosi tidak menjamin isi perjanjian. Memahami siapa yang bertindak sebagai penjual, perantara (wakil), atau pemberi pinjaman adalah kunci agar terhindar dari akad fasad (rusak).",
            fatwaReference: "Fatwa DSN-MUI No. 04/DSN-MUI/IV/2000 & POJK No. 10/POJK.05/2022",
            actionTip: "Periksa klausul pertama pada dokumen 'Syarat & Ketentuan' aplikasi sebelum menyetujui centang digital."
        ),
        ChecklistStep(
            id: 1,
            title: "Tahap 2: Biaya & Denda",
            subtitle: "Transparansi Biaya Pokok & Sanksi Keterlambatan",
            question: "Apakah seluruh rincian biaya admin, bunga/margin, dan denda keterlambatan (ta'zir) telah dijelaskan secara pasti di awal?",
            whyCrucial: "Denda keterlambatan yang dijadikan keuntungan bisnis penyedia masuk dalam kategori riba nasiah. Pada skema syariah, denda hanya boleh berupa ta'zir (sanksi mendidik) yang 100% wajib disalurkan untuk dana sosial kebajikan.",
            fatwaReference: "Fatwa DSN-MUI No. 43/DSN-MUI/VIII/2004 tentang Ganti Rugi (Ta'widh) dan Sanksi (Ta'zir)",
            actionTip: "Tanyakan kepada CS: 'Apakah dana denda keterlambatan disalurkan ke dana kebajikan atau masuk laba perusahaan?'"
        ),
        ChecklistStep(
            id: 2,
            title: "Tahap 3: Serah Terima (Qabdh)",
            subtitle: "Kepemilikan Sah & Risiko Kerusakan Barang",
            question: "Kapan hak kepemilikan barang atau manfaat layanan secara sah berpindah ke tangan kamu?",
            whyCrucial: "Larangan menjual barang yang belum dimiliki (ba'i ma la yamlik) atau belum berada dalam penguasaan pembeli (qabdh hukmi/hissi) bertujuan mencegah perselisihan bila barang rusak atau hilang di perjalanan.",
            fatwaReference: "Hadits Riwayat Ahmad: 'Janganlah engkau menjual sesuatu yang belum engkau terima.' & Fatwa DSN-MUI No. 77/2010",
            actionTip: "Pastikan penyedia memiliki stok barang atau perjanjian keagenan resmi (wakalah) sebelum dana ditransfer."
        ),
        ChecklistStep(
            id: 3,
            title: "Tahap 4: Kesesuaian Syariah",
            subtitle: "Penyaringan dari Praktik Terlarang",
            question: "Apakah transaksi ini bebas dari klausul spekulasi (maysir), ketidakpastian manipulatif (gharar), dan bunga berbunga (riba)?",
            whyCrucial: "Fitur digital seperti kotak misteri (gacha berbayar), bunga cicilan berbunga tanpa batas, atau barang tanpa kejelasan wujud adalah transaksi yang mengandung gharar dan maysir.",
            fatwaReference: "Kaidah Fiqih Muamalah: 'Al-ashlu fil mu'amalati al-ibahah illa an yadulla dalilun 'ala tahrimiha.'",
            actionTip: "Jangan tergiur promo '0%' jika di dalamnya terdapat biaya langganan siluman atau penalti yang berlipat ganda."
        ),
        ChecklistStep(
            id: 4,
            title: "Tahap 5: Kesiapan Mengambil Keputusan",
            subtitle: "Pertimbangan Matang Sebelum Menekan Setuju",
            question: "Apakah kamu sudah merasa cukup paham dan tidak sedang tergesa-gesa karena tekanan batas waktu diskon?",
            whyCrucial: "Prinsip 'Antaradin' (suka sama suka dengan kesadaran penuh) adalah syarat sah muamalah. Urgensi buatan seperti hitung mundur promo sering memanipulasi emosi konsumen untuk menandatangani kontrak yang belum dipahami.",
            fatwaReference: "Al-Qur'an Surah An-Nisa ayat 29: 'Kecuali dengan jalan perniagaan yang berlaku dengan suka sama suka di antara kamu.'",
            actionTip: "Ambil jeda 5 menit (PAUSE) sebelum menyetujui transaksi digital bernilai signifikan."
        )
    ]
}
