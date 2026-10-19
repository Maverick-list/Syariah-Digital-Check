import SwiftUI

public struct ChecklistView: View {
    @EnvironmentObject var appState: AppState
    @State private var isWhyExpanded: Bool = false

    private var currentStep: ChecklistStep {
        ChecklistStep.defaultSteps[appState.currentStepIndex]
    }

    private var currentAnswer: StepAnswerStatus? {
        appState.stepAnswers[appState.currentStepIndex]
    }

    public var body: some View {
        VStack(spacing: 0) {
            // Top Bar
            HStack {
                Button(action: {
                    if appState.currentStepIndex > 0 {
                        appState.currentStepIndex -= 1
                    } else {
                        appState.selectedCategory = nil
                    }
                }) {
                    HStack(spacing: 4) {
                        Image(systemName: "chevron.left")
                            .font(.system(size: 13, weight: .bold))
                        Text(appState.currentStepIndex > 0 ? "Sebelumnya" : "Ganti Kategori")
                            .font(.system(size: 13, weight: .semibold))
                    }
                    .foregroundColor(.brandEmerald800)
                }

                Spacer()

                if let category = appState.selectedCategory {
                    Text(category.name.components(separatedBy: "&").first?.trimmingCharacters(in: .whitespaces) ?? category.name)
                        .font(.system(size: 11, weight: .bold))
                        .padding(.horizontal, 8)
                        .padding(.vertical, 4)
                        .background(Color.brandEmerald50)
                        .foregroundColor(.brandEmerald800)
                        .clipShape(Capsule())
                }
            }
            .padding(.horizontal, 20)
            .padding(.vertical, 12)

            // Step Progress Track (5 stages)
            HStack(spacing: 6) {
                ForEach(0..<5) { idx in
                    Rectangle()
                        .fill(idx <= appState.currentStepIndex ? Color.brandEmerald800 : Color.brandSage200)
                        .frame(height: 4)
                        .clipShape(Capsule())
                }
            }
            .padding(.horizontal, 20)
            .padding(.bottom, 12)

            ScrollView {
                VStack(alignment: .leading, spacing: 18) {
                    // Stage Header
                    VStack(alignment: .leading, spacing: 4) {
                        Text("TAHAP \(appState.currentStepIndex + 1) DARI 5")
                            .font(.system(size: 10.5, weight: .bold))
                            .tracking(0.8)
                            .foregroundColor(.brandGold700)
                        Text(currentStep.title)
                            .font(.system(size: 20, weight: .bold, design: .serif))
                            .foregroundColor(.brandEmerald950)
                        Text(currentStep.subtitle)
                            .font(.system(size: 12.5))
                            .foregroundColor(.brandTextMuted)
                    }

                    // Question Card
                    VStack(alignment: .leading, spacing: 16) {
                        Text(currentStep.question)
                            .font(.system(size: 15, weight: .bold))
                            .foregroundColor(.brandTextPrimary)
                            .lineSpacing(4)

                        // 3 Options
                        VStack(spacing: 10) {
                            ForEach(StepAnswerStatus.allCases, id: \.self) { opt in
                                Button(action: {
                                    appState.answerStep(at: appState.currentStepIndex, status: opt)
                                }) {
                                    HStack {
                                        Image(systemName: opt.sfSymbol)
                                            .font(.system(size: 18))
                                            .foregroundColor(currentAnswer == opt ? .brandEmerald800 : .brandTextMuted)
                                        Text(opt.title)
                                            .font(.system(size: 13.5, weight: currentAnswer == opt ? .bold : .medium))
                                            .foregroundColor(currentAnswer == opt ? .brandEmerald950 : .brandTextPrimary)
                                        Spacer()
                                        if currentAnswer == opt {
                                            Image(systemName: "checkmark")
                                                .font(.system(size: 12, weight: .bold))
                                                .foregroundColor(.brandEmerald800)
                                        }
                                    }
                                    .padding(14)
                                    .background(currentAnswer == opt ? Color.brandEmerald50 : Color.brandIvoryCard)
                                    .clipShape(RoundedRectangle(cornerRadius: 12))
                                    .overlay(
                                        RoundedRectangle(cornerRadius: 12)
                                            .stroke(currentAnswer == opt ? Color.brandEmerald700 : Color.brandIvoryBorder, lineWidth: currentAnswer == opt ? 1.5 : 1)
                                    )
                                }
                            }
                        }
                    }
                    .padding(18)
                    .background(Color.brandIvoryCard)
                    .clipShape(RoundedRectangle(cornerRadius: 18))
                    .overlay(
                        RoundedRectangle(cornerRadius: 18)
                            .stroke(Color.brandIvoryBorder, lineWidth: 1)
                    )

                    // Expandable Educational Drawer
                    VStack(alignment: .leading, spacing: 10) {
                        Button(action: {
                            withAnimation(.easeInOut(duration: 0.2)) {
                                isWhyExpanded.toggle()
                            }
                        }) {
                            HStack {
                                Image(systemName: "lightbulb.fill")
                                    .foregroundColor(.brandGold500)
                                Text("Mengapa Aspek Ini Krusial?")
                                    .font(.system(size: 13, weight: .bold))
                                    .foregroundColor(.brandEmerald950)
                                Spacer()
                                Image(systemName: isWhyExpanded ? "chevron.up" : "chevron.down")
                                    .font(.system(size: 12, weight: .bold))
                                    .foregroundColor(.brandTextMuted)
                            }
                        }

                        if isWhyExpanded {
                            VStack(alignment: .leading, spacing: 8) {
                                Text(currentStep.whyCrucial)
                                    .font(.system(size: 12))
                                    .foregroundColor(.brandTextSecondary)
                                    .lineSpacing(3)

                                Divider()

                                HStack(alignment: .top, spacing: 6) {
                                    Text("Rujukan:")
                                        .font(.system(size: 11, weight: .bold))
                                        .foregroundColor(.brandEmerald900)
                                    Text(currentStep.fatwaReference)
                                        .font(.system(size: 11))
                                        .foregroundColor(.brandTextMuted)
                                }

                                HStack(alignment: .top, spacing: 6) {
                                    Text("Tips Aksi:")
                                        .font(.system(size: 11, weight: .bold))
                                        .foregroundColor(.brandGold700)
                                    Text(currentStep.actionTip)
                                        .font(.system(size: 11))
                                        .foregroundColor(.brandTextSecondary)
                                }
                            }
                            .padding(.top, 4)
                        }
                    }
                    .padding(16)
                    .background(Color.brandSage50)
                    .clipShape(RoundedRectangle(cornerRadius: 14))
                    .overlay(
                        RoundedRectangle(cornerRadius: 14)
                            .stroke(Color.brandSage200, lineWidth: 1)
                    )

                    // Action Button
                    Button(action: {
                        if appState.currentStepIndex < 4 {
                            appState.currentStepIndex += 1
                            isWhyExpanded = false
                        } else {
                            appState.completeChecklist()
                        }
                    }) {
                        HStack {
                            Text(appState.currentStepIndex < 4 ? "Lanjut ke Tahap \(appState.currentStepIndex + 2)" : "Hitung Hasil Evaluasi Transaksi")
                                .font(.system(size: 14, weight: .bold))
                            Image(systemName: appState.currentStepIndex < 4 ? "arrow.right" : "sparkles")
                                .font(.system(size: 13, weight: .bold))
                        }
                        .foregroundColor(.white)
                        .frame(maxWidth: .infinity)
                        .frame(height: 50)
                        .background(currentAnswer != nil ? Color.brandEmerald800 : Color.brandSage300)
                        .clipShape(RoundedRectangle(cornerRadius: 14))
                    }
                    .disabled(currentAnswer == nil)
                    .padding(.top, 8)
                }
                .padding(.horizontal, 20)
                .padding(.bottom, 32)
            }
        }
        .background(Color.brandIvoryBase.ignoresSafeArea())
    }
}
