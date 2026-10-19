import Foundation

public struct QuizItem: Identifiable {
    public let id: String
    public let question: String
    public let options: [String]
    public let correctIndex: Int
    public let explanation: String

    public init(id: String, question: String, options: [String], correctIndex: Int, explanation: String) {
        self.id = id
        self.question = question
        self.options = options
        self.correctIndex = correctIndex
        self.explanation = explanation
    }

    public static let sampleQuiz: [QuizItem] = [
        QuizItem(
            id: "q1",
            question: "Jika rincian biaya dan denda keterlambatan belum jelas di aplikasi, apa tindakan terbaik kamu?",
            options: [
                "Tetap checkout karena prosesnya sangat cepat",
                "Berhenti sejenak (PAUSE) dan minta penjelasan tertulis",
                "Percaya saja pada tulisan promo banner di aplikasi"
            ],
            correctIndex: 1,
            explanation: "Informasi klausul denda dan bunga yang belum transparan berpotensi riba atau gharar. Berhenti sejenak dan periksa dokumen resmi sebelum mengambil keputusan."
        ),
        QuizItem(
            id: "q2",
            question: "Apakah aplikasi Syariah Digital Check dapat mengeluarkan fatwa sah atau sertifikasi halal?",
            options: [
                "Ya, fatwanya setara dengan Dewan Syariah Nasional",
                "Tidak; ini alat edukasi literasi, bukan lembaga penerbit fatwa",
                "Ya, asalkan seluruh checklist dijawab dengan status 'Jelas'"
            ],
            correctIndex: 1,
            explanation: "Aplikasi ini adalah media edukasi mandiri. Penetapan fatwa resmi hanya berada di bawah otoritas ulama berwenang seperti DSN-MUI."
        ),
        QuizItem(
            id: "q3",
            question: "Bagaimana status denda keterlambatan pada layanan cicilan syariah menurut Fatwa DSN-MUI?",
            options: [
                "Boleh dijadikan sumber pemasukan dan keuntungan perusahaan",
                "Hanya boleh berupa sanksi (ta'zir) yang 100% disalurkan untuk dana kebajikan",
                "Bebas ditentukan bunganya oleh penyedia tanpa batasan"
            ],
            correctIndex: 1,
            explanation: "Sesuai Fatwa DSN-MUI No. 43/2004, dana sanksi keterlambatan (ta'zir) tidak boleh diakui sebagai pendapatan lembaga, melainkan dana kebajikan sosial (qardhul hasan)."
        ),
        QuizItem(
            id: "q4",
            question: "Apakah dua aplikasi dengan kategori 'PayLater' pasti memiliki akad transaksi yang sama persis?",
            options: [
                "Pasti sama karena namanya sama",
                "Tidak selalu; akad bisa berbeda (Murabahah, Qardh, Ijarah, atau Hawalah)",
                "Pasti berbeda regulatornya"
            ],
            correctIndex: 1,
            explanation: "Struktur hukum dan akad dapat bervariasi tergantung perjanjian kerja sama antara konsumen, penyedia paylater, dan perbankan mitra."
        ),
        QuizItem(
            id: "q5",
            question: "Apa makna dari filosofi langkah PAUSE → CHECK → CHOOSE?",
            options: [
                "Berhenti sejenak, periksa transparansi akad & biaya, lalu pilih dengan sadar",
                "Klik cepat lalu komplain belakangan jika ada kendala",
                "Menyerahkan seluruh keputusan finansial kepada saran teman"
            ],
            correctIndex: 0,
            explanation: "Tujuannya adalah melatih kebiasaan 'Mindful Financial Decision' agar konsumen tidak mudah terjebak skema manipulatif digital."
        ),
        QuizItem(
            id: "q6",
            question: "Untuk memeriksa apakah platform keuangan digital terdaftar resmi di Indonesia, ke mana harus mengecek?",
            options: [
                "Melihat jumlah follower akun Instagramnya",
                "Mengecek daftar berizin resmi di situs Otoritas Jasa Keuangan (OJK)",
                "Membaca kolom komentar di forum online"
            ],
            correctIndex: 1,
            explanation: "Situs resmi regulator (OJK & Bank Indonesia) adalah rujukan legalitas hukum tertinggi di Indonesia."
        ),
        QuizItem(
            id: "q7",
            question: "Muncul tulisan 'Diskon Berakhir 3 Menit Lagi!', namun kamu belum membaca biaya langganan bulanan. Tindakan bijak:",
            options: [
                "Langsung bayar agar tidak kehilangan diskon",
                "Jangan biarkan tekanan waktu menggantikan kehati-hatian memeriksa biaya",
                "Pinjam akun teman untuk membayar"
            ],
            correctIndex: 1,
            explanation: "Urgensi buatan (dark patterns) sengaja dirancang memicu panik belanja (FOMO). Tetap utamakan membaca rincian biaya berkala."
        ),
        QuizItem(
            id: "q8",
            question: "Sebelum mentransfer donasi lewat poster ajakan di media sosial, apa yang penting diverifikasi?",
            options: [
                "Legalitas lembaga pengelola, rekening resmi yayasan, dan laporan penyaluran",
                "Warna desain grafis poster donasi",
                "Jumlah like pada postingan tersebut"
            ],
            correctIndex: 0,
            explanation: "Transparansi amil dan perizinan Kemenag/BAZNAS memastikan dana donasi dan ziswaf tersalurkan kepada mustahik yang sah."
        )
    ]
}
