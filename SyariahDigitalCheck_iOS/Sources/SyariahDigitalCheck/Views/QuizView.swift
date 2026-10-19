import SwiftUI

public struct QuizView: View {
    @EnvironmentObject var appState: AppState
    @State private var isFinished: Bool = false

    private var currentQuestion: QuizItem {
        QuizItem.sampleQuiz[appState.currentQuizIndex]
    }

    public var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 20) {
                    // Top Bar Info
                    HStack {
                        VStack(alignment: .leading, spacing: 2) {
                            Text("KUIS LITERASI SYARIAH")
                                .font(.system(size: 10, weight: .bold))
                                .tracking(0.8)
                                .foregroundColor(.brandGold700)
                            Text("Uji Pemahaman Muamalah")
                                .font(.system(size: 20, weight: .bold, design: .serif))
                                .foregroundColor(.brandEmerald950)
                        }
                        Spacer()
                        Text("Skor: \(appState.currentQuizScore)")
                            .font(.system(size: 12, weight: .bold))
                            .padding(.horizontal, 10)
                            .padding(.vertical, 5)
                            .background(Color.brandGold50)
                            .foregroundColor(.brandGold700)
                            .clipShape(Capsule())
                    }
                    .padding(.horizontal, 20)
                    .padding(.top, 16)

                    if !isFinished {
                        // Question Card
                        VStack(alignment: .leading, spacing: 16) {
                            HStack {
                                Text("Soal \(appState.currentQuizIndex + 1) dari \(QuizItem.sampleQuiz.count)")
                                    .font(.system(size: 11.5, weight: .semibold))
                                    .foregroundColor(.brandTextMuted)
                                Spacer()
                            }

                            Text(currentQuestion.question)
                                .font(.system(size: 15.5, weight: .bold))
                                .foregroundColor(.brandEmerald950)
                                .lineSpacing(4)

                            // Options
                            VStack(spacing: 10) {
                                ForEach(Array(currentQuestion.options.enumerated()), id: \.offset) { idx, option in
                                    Button(action: {
                                        guard !appState.isQuizAnswerSubmitted else { return }
                                        appState.selectedOptionIndex = idx
                                    }) {
                                        HStack(alignment: .top, spacing: 12) {
                                            Circle()
                                                .stroke(appState.selectedOptionIndex == idx ? Color.brandEmerald800 : Color.brandSage300, lineWidth: 2)
                                                .frame(width: 20, height: 20)
                                                .overlay(
                                                    Circle()
                                                        .fill(appState.selectedOptionIndex == idx ? Color.brandEmerald800 : Color.clear)
                                                        .frame(width: 10, height: 10)
                                                )
                                                .padding(.top, 2)

                                            Text(option)
                                                .font(.system(size: 13, weight: appState.selectedOptionIndex == idx ? .semibold : .regular))
                                                .foregroundColor(.brandTextPrimary)
                                                .multilineTextAlignment(.leading)
                                                .lineSpacing(2)

                                            Spacer()
                                        }
                                        .padding(14)
                                        .background(appState.selectedOptionIndex == idx ? Color.brandEmerald50 : Color.brandIvoryCard)
                                        .clipShape(RoundedRectangle(cornerRadius: 12))
                                        .overlay(
                                            RoundedRectangle(cornerRadius: 12)
                                                .stroke(appState.selectedOptionIndex == idx ? Color.brandEmerald700 : Color.brandIvoryBorder, lineWidth: 1)
                                        )
                                    }
                                    .disabled(appState.isQuizAnswerSubmitted)
                                }
                            }

                            // Feedback Box after answer submission
                            if appState.isQuizAnswerSubmitted, let selected = appState.selectedOptionIndex {
                                let isCorrect = (selected == currentQuestion.correctIndex)
                                VStack(alignment: .leading, spacing: 6) {
                                    HStack(spacing: 6) {
                                        Image(systemName: isCorrect ? "checkmark.circle.fill" : "xmark.circle.fill")
                                            .foregroundColor(isCorrect ? .brandEmerald800 : .brandDangerText)
                                        Text(isCorrect ? "Jawaban Benar!" : "Kurang Tepat.")
                                            .font(.system(size: 13, weight: .bold))
                                            .foregroundColor(isCorrect ? .brandEmerald950 : .brandDangerText)
                                    }
                                    Text(currentQuestion.explanation)
                                        .font(.system(size: 12))
                                        .foregroundColor(.brandTextSecondary)
                                        .lineSpacing(2)
                                }
                                .padding(12)
                                .frame(maxWidth: .infinity, alignment: .leading)
                                .background(isCorrect ? Color.brandEmerald50 : Color.brandDangerBg)
                                .clipShape(RoundedRectangle(cornerRadius: 10))
                            }

                            // Action Button
                            Button(action: {
                                if !appState.isQuizAnswerSubmitted {
                                    if let selected = appState.selectedOptionIndex {
                                        appState.isQuizAnswerSubmitted = true
                                        if selected == currentQuestion.correctIndex {
                                            appState.currentQuizScore += 1
                                        }
                                    }
                                } else {
                                    if appState.currentQuizIndex < QuizItem.sampleQuiz.count - 1 {
                                        appState.currentQuizIndex += 1
                                        appState.selectedOptionIndex = nil
                                        appState.isQuizAnswerSubmitted = false
                                    } else {
                                        isFinished = true
                                    }
                                }
                            }) {
                                HStack {
                                    Text(!appState.isQuizAnswerSubmitted ? "Periksa Jawaban" : (appState.currentQuizIndex < QuizItem.sampleQuiz.count - 1 ? "Soal Berikutnya" : "Lihat Hasil Akhir"))
                                        .font(.system(size: 14, weight: .bold))
                                    Image(systemName: "arrow.right")
                                        .font(.system(size: 12, weight: .bold))
                                }
                                .foregroundColor(.white)
                                .frame(maxWidth: .infinity)
                                .frame(height: 48)
                                .background(appState.selectedOptionIndex != nil ? Color.brandEmerald800 : Color.brandSage300)
                                .clipShape(RoundedRectangle(cornerRadius: 12))
                            }
                            .disabled(appState.selectedOptionIndex == nil)
                        }
                        .padding(18)
                        .background(Color.brandIvoryCard)
                        .clipShape(RoundedRectangle(cornerRadius: 20))
                        .overlay(
                            RoundedRectangle(cornerRadius: 20)
                                .stroke(Color.brandIvoryBorder, lineWidth: 1)
                        )
                        .padding(.horizontal, 20)
                    } else {
                        // Finished Recap Card
                        VStack(spacing: 16) {
                            Image(systemName: "star.circle.fill")
                                .font(.system(size: 54))
                                .foregroundColor(.brandGold500)

                            Text("Kuis Selesai!")
                                .font(.system(size: 22, weight: .bold, design: .serif))
                                .foregroundColor(.brandEmerald950)

                            Text("Skor Akhir Kamu: \(appState.currentQuizScore) dari \(QuizItem.sampleQuiz.count)")
                                .font(.system(size: 16, weight: .bold))
                                .foregroundColor(.brandEmerald800)

                            Text("Terus tingkatkan pemahaman muamalah digital kamu dengan membaca modul di Pusat Edukasi.")
                                .font(.system(size: 12.5))
                                .foregroundColor(.brandTextSecondary)
                                .multilineTextAlignment(.center)
                                .lineSpacing(3)

                            Button(action: {
                                appState.currentQuizIndex = 0
                                appState.currentQuizScore = 0
                                appState.selectedOptionIndex = nil
                                appState.isQuizAnswerSubmitted = false
                                isFinished = false
                            }) {
                                Text("Ulangi Kuis")
                                    .font(.system(size: 14, weight: .bold))
                                    .foregroundColor(.white)
                                    .frame(maxWidth: .infinity)
                                    .frame(height: 48)
                                    .background(Color.brandEmerald800)
                                    .clipShape(RoundedRectangle(cornerRadius: 12))
                            }
                        }
                        .padding(24)
                        .background(Color.brandIvoryCard)
                        .clipShape(RoundedRectangle(cornerRadius: 20))
                        .overlay(
                            RoundedRectangle(cornerRadius: 20)
                                .stroke(Color.brandIvoryBorder, lineWidth: 1)
                        )
                        .padding(.horizontal, 20)
                    }

                    Spacer(minLength: 32)
                }
            }
            .background(Color.brandIvoryBase.ignoresSafeArea())
            .navigationBarHidden(true)
        }
    }
}
