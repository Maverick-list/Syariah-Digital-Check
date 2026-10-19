import SwiftUI
#if canImport(UIKit)
import UIKit
#endif

public struct ResultView: View {
    @EnvironmentObject var appState: AppState
    @State private var copiedToClipboard: Bool = false

    private var score: Int {
        appState.calculateScore()
    }

    private var statusBadgeTitle: String {
        if score >= 80 { return "TINGKAT KEJELASAN : TINGGI" }
        if score >= 50 { return "PERLU VERIFIKASI LANJUTAN" }
        return "POTENSI RISIKO TINGGI"
    }

    private var statusBadgeColor: Color {
        if score >= 80 { return .brandEmerald800 }
        if score >= 50 { return .brandGold700 }
        return .brandDangerText
    }

    private var statusBadgeBg: Color {
        if score >= 80 { return .brandEmerald50 }
        if score >= 50 { return .brandGold50 }
        return .brandDangerBg
    }

    private var headingText: String {
        if score >= 80 { return "Informasi Transaksi Cukup Transparan & Jelas" }
        if score >= 50 { return "Terdapat Klausul yang Masih Ragu / Belum Terinci" }
        return "Banyak Poin Penting yang Belum Terverifikasi"
    }

    private var summaryText: String {
        if score >= 80 {
            return "Aspek akad, biaya pokok, dan mekanisme serah terima sudah kamu pahami dengan baik. Tetap simpan salinan tanda terima dan periksa mutasi rekening secara berkala."
        } else if score >= 50 {
            return "Ada beberapa ketentuan biaya atau skema penalti yang belum sepenuhnya jelas. Ambil jeda sebelum menandatangani persetujuan digital."
        } else {
            return "Risiko akad fasad, bunga tersembunyi, atau denda tidak transparan cukup tinggi. Sangat disarankan untuk menunda transaksi sampai seluruh poin di bawah jelas."
        }
    }

    public var body: some View {
        VStack(spacing: 0) {
            // Top Bar
            HStack {
                Button(action: {
                    appState.selectedCategory = nil
                    appState.showingResultScreen = false
                }) {
                    HStack(spacing: 4) {
                        Image(systemName: "xmark")
                            .font(.system(size: 13, weight: .bold))
                        Text("Tutup Evaluasi")
                            .font(.system(size: 13, weight: .semibold))
                    }
                    .foregroundColor(.brandEmerald800)
                }
                Spacer()
            }
            .padding(.horizontal, 20)
            .padding(.vertical, 12)

            ScrollView {
                VStack(spacing: 20) {
                    // Score Dial Card
                    VStack(spacing: 16) {
                        ScoreRingView(score: score)
                            .padding(.top, 8)

                        Text(statusBadgeTitle)
                            .font(.system(size: 11, weight: .bold))
                            .tracking(0.8)
                            .foregroundColor(statusBadgeColor)
                            .padding(.horizontal, 12)
                            .padding(.vertical, 5)
                            .background(statusBadgeBg)
                            .clipShape(Capsule())

                        Text(headingText)
                            .font(.system(size: 18, weight: .bold, design: .serif))
                            .foregroundColor(.brandEmerald950)
                            .multilineTextAlignment(.center)
                            .lineSpacing(4)
                            .padding(.horizontal, 8)

                        Text(summaryText)
                            .font(.system(size: 12.5))
                            .foregroundColor(.brandTextSecondary)
                            .multilineTextAlignment(.center)
                            .lineSpacing(3)
                            .padding(.horizontal, 8)
                    }
                    .padding(20)
                    .frame(maxWidth: .infinity)
                    .background(Color.brandIvoryCard)
                    .clipShape(RoundedRectangle(cornerRadius: 20))
                    .overlay(
                        RoundedRectangle(cornerRadius: 20)
                            .stroke(Color.brandIvoryBorder, lineWidth: 1)
                    )

                    // Critical Questions for Merchant CS
                    if let category = appState.selectedCategory {
                        VStack(alignment: .leading, spacing: 14) {
                            HStack {
                                Image(systemName: "questionmark.bubble.fill")
                                    .foregroundColor(.brandGold500)
                                Text("Pertanyaan Kritis untuk Customer Service")
                                    .font(.system(size: 13.5, weight: .bold))
                                    .foregroundColor(.brandEmerald950)
                            }

                            Text("Salin pertanyaan ini dan kirimkan ke live chat atau customer care penyedia sebelum checkout:")
                                .font(.system(size: 12))
                                .foregroundColor(.brandTextSecondary)

                            VStack(alignment: .leading, spacing: 10) {
                                ForEach(Array(category.criticalQuestions.enumerated()), id: \.offset) { idx, q in
                                    HStack(alignment: .top, spacing: 10) {
                                        Text("\(idx + 1).")
                                            .font(.system(size: 12, weight: .bold))
                                            .foregroundColor(.brandGold700)
                                        Text(q)
                                            .font(.system(size: 12.5))
                                            .foregroundColor(.brandTextPrimary)
                                            .lineSpacing(2)
                                    }
                                }
                            }

                            // Copy Button
                            Button(action: {
                                let formattedText = category.criticalQuestions.enumerated()
                                    .map { "\($0.offset + 1). \($0.element)" }
                                    .joined(separator: "\n")
                                #if canImport(UIKit)
                                UIPasteboard.general.string = formattedText
                                #endif
                                withAnimation {
                                    copiedToClipboard = true
                                }
                                DispatchQueue.main.asyncAfter(deadline: .now() + 2.5) {
                                    withAnimation {
                                        copiedToClipboard = false
                                    }
                                }
                            }) {
                                HStack {
                                    Image(systemName: copiedToClipboard ? "checkmark" : "doc.on.doc")
                                        .font(.system(size: 13, weight: .bold))
                                    Text(copiedToClipboard ? "Pertanyaan Berhasil Tersalin! ✓" : "Salin Pertanyaan ke Clipboard")
                                        .font(.system(size: 13, weight: .bold))
                                }
                                .foregroundColor(copiedToClipboard ? .white : .brandEmerald800)
                                .frame(maxWidth: .infinity)
                                .frame(height: 44)
                                .background(copiedToClipboard ? Color.brandEmerald800 : Color.brandSage100)
                                .clipShape(RoundedRectangle(cornerRadius: 12))
                            }
                        }
                        .padding(18)
                        .background(Color.brandSage50)
                        .clipShape(RoundedRectangle(cornerRadius: 16))
                        .overlay(
                            RoundedRectangle(cornerRadius: 16)
                                .stroke(Color.brandSage200, lineWidth: 1)
                        )
                    }

                    // Disclaimer Box
                    HStack(alignment: .top, spacing: 10) {
                        Image(systemName: "exclamationmark.shield.fill")
                            .foregroundColor(.brandGold600)
                            .font(.system(size: 16))
                        Text("Hasil ini merupakan indikator edukasi transparansi konsumen, bukan fatwa hukum halal/haram resmi atau nasihat perorangan.")
                            .font(.system(size: 11.5))
                            .foregroundColor(.brandTextMuted)
                            .lineSpacing(3)
                    }
                    .padding(14)
                    .background(Color.brandIvoryWarm)
                    .clipShape(RoundedRectangle(cornerRadius: 12))

                    // Done Action
                    Button(action: {
                        appState.selectedCategory = nil
                        appState.showingResultScreen = false
                    }) {
                        Text("Selesai & Kembali ke Beranda")
                            .font(.system(size: 14, weight: .bold))
                            .foregroundColor(.white)
                            .frame(maxWidth: .infinity)
                            .frame(height: 50)
                            .background(Color.brandEmerald800)
                            .clipShape(RoundedRectangle(cornerRadius: 14))
                    }
                    .padding(.top, 4)
                }
                .padding(.horizontal, 20)
                .padding(.bottom, 32)
            }
        }
        .background(Color.brandIvoryBase.ignoresSafeArea())
    }
}
