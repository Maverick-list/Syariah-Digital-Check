import SwiftUI

public struct HomeView: View {
    @EnvironmentObject var appState: AppState
    @Binding var selectedTab: Int

    public init(selectedTab: Binding<Int>) {
        self._selectedTab = selectedTab
    }

    public var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 20) {
                    // Header Bar
                    HStack {
                        VStack(alignment: .leading, spacing: 4) {
                            Text("Assalamu'alaikum,")
                                .font(.subheadline)
                                .foregroundColor(.brandTextMuted)
                            Text(appState.userName.components(separatedBy: " ").first ?? "Sahabat")
                                .font(.system(size: 24, weight: .bold, design: .serif))
                                .foregroundColor(.brandEmerald950)
                        }
                        Spacer()
                        // Avatar
                        Circle()
                            .fill(Color.brandEmerald800)
                            .frame(width: 44, height: 44)
                            .overlay(
                                Text(appState.userInitials)
                                    .font(.system(size: 15, weight: .bold))
                                    .foregroundColor(.white)
                            )
                    }
                    .padding(.horizontal, 20)
                    .padding(.top, 12)

                    // Hero Card: 30-Second Fast Check
                    VStack(alignment: .leading, spacing: 14) {
                        HStack {
                            Text("EVALUASI CEPAT")
                                .font(.system(size: 10, weight: .bold))
                                .tracking(0.8)
                                .foregroundColor(.brandGold700)
                                .padding(.horizontal, 8)
                                .padding(.vertical, 4)
                                .background(Color.brandGold50)
                                .clipShape(Capsule())
                            Spacer()
                            Text("\(appState.checksCount) Selesai")
                                .font(.system(size: 11, weight: .semibold))
                                .foregroundColor(.brandEmerald700)
                        }

                        Text("Cek Transaksi Digital Kamu Sebelum Klik Setuju")
                            .font(.system(size: 18, weight: .bold, design: .serif))
                            .foregroundColor(.brandEmerald950)
                            .lineSpacing(4)

                        Text("Panduan mandiri 5 tahap untuk membedah transparansi akad, biaya tersembunyi, dan denda cicilan.")
                            .font(.system(size: 12.5))
                            .foregroundColor(.brandTextSecondary)
                            .lineSpacing(3)

                        Button(action: {
                            selectedTab = 1 // Switch to Check tab
                        }) {
                            HStack {
                                Text("Mulai Evaluasi Transaksi")
                                    .font(.system(size: 13.5, weight: .bold))
                                Image(systemName: "arrow.right")
                                    .font(.system(size: 12, weight: .bold))
                            }
                            .foregroundColor(.white)
                            .frame(maxWidth: .infinity)
                            .frame(height: 46)
                            .background(Color.brandEmerald800)
                            .clipShape(RoundedRectangle(cornerRadius: 12))
                        }
                    }
                    .padding(20)
                    .background(Color.brandIvoryCard)
                    .clipShape(RoundedRectangle(cornerRadius: 20))
                    .overlay(
                        RoundedRectangle(cornerRadius: 20)
                            .stroke(Color.brandIvoryBorder, lineWidth: 1)
                    )
                    .shadow(color: Color.black.opacity(0.04), radius: 8, x: 0, y: 3)
                    .padding(.horizontal, 20)

                    // Three Pillars: PAUSE - CHECK - CHOOSE
                    VStack(alignment: .leading, spacing: 12) {
                        Text("3 Pilar Keputusan Finansial Bijak")
                            .font(.system(size: 14, weight: .bold))
                            .foregroundColor(.brandEmerald950)
                            .padding(.horizontal, 20)

                        HStack(spacing: 10) {
                            PillarItemView(
                                number: "1",
                                title: "JEDA",
                                subtitle: "Pause 30 detik",
                                sfSymbol: "pause.circle.fill"
                            )
                            PillarItemView(
                                number: "2",
                                title: "TELITI",
                                subtitle: "Cek 5 syarat akad",
                                sfSymbol: "magnifyingglass.circle.fill"
                            )
                            PillarItemView(
                                number: "3",
                                title: "TENTUKAN",
                                subtitle: "Pilih dengan sadar",
                                sfSymbol: "checkmark.seal.fill"
                            )
                        }
                        .padding(.horizontal, 20)
                    }

                    // 6 Categories Section
                    VStack(alignment: .leading, spacing: 12) {
                        HStack {
                            Text("Pilih Kategori Transaksi")
                                .font(.system(size: 14, weight: .bold))
                                .foregroundColor(.brandEmerald950)
                            Spacer()
                            Button("Lihat Semua") {
                                selectedTab = 1
                            }
                            .font(.system(size: 12, weight: .semibold))
                            .foregroundColor(.brandEmerald700)
                        }
                        .padding(.horizontal, 20)

                        LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 12) {
                            ForEach(TransactionCategoryItem.sampleCategories) { category in
                                Button(action: {
                                    appState.startCheck(category: category)
                                    selectedTab = 1
                                }) {
                                    VStack(alignment: .leading, spacing: 8) {
                                        Image(systemName: category.sfSymbol)
                                            .font(.system(size: 20))
                                            .foregroundColor(.brandEmerald800)
                                            .frame(width: 40, height: 40)
                                            .background(Color.brandEmerald50)
                                            .clipShape(RoundedRectangle(cornerRadius: 10))

                                        Text(category.name)
                                            .font(.system(size: 13, weight: .bold))
                                            .foregroundColor(.brandEmerald950)
                                            .lineLimit(1)

                                        Text(category.contractBasis)
                                            .font(.system(size: 10.5))
                                            .foregroundColor(.brandTextMuted)
                                            .lineLimit(1)
                                    }
                                    .padding(14)
                                    .frame(maxWidth: .infinity, alignment: .leading)
                                    .background(Color.brandIvoryCard)
                                    .clipShape(RoundedRectangle(cornerRadius: 16))
                                    .overlay(
                                        RoundedRectangle(cornerRadius: 16)
                                            .stroke(Color.brandIvoryBorder, lineWidth: 1)
                                    )
                                }
                            }
                        }
                        .padding(.horizontal, 20)
                    }

                    Spacer(minLength: 32)
                }
                .padding(.top, 8)
            }
            .background(Color.brandIvoryBase.ignoresSafeArea())
            .navigationBarHidden(true)
        }
    }
}

struct PillarItemView: View {
    let number: String
    let title: String
    let subtitle: String
    let sfSymbol: String

    var body: some View {
        VStack(spacing: 6) {
            Image(systemName: sfSymbol)
                .font(.system(size: 22))
                .foregroundColor(.brandEmerald800)
            Text(title)
                .font(.system(size: 12, weight: .bold))
                .foregroundColor(.brandEmerald950)
            Text(subtitle)
                .font(.system(size: 10))
                .foregroundColor(.brandTextMuted)
                .multilineTextAlignment(.center)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 14)
        .padding(.horizontal, 6)
        .background(Color.brandIvoryCard)
        .clipShape(RoundedRectangle(cornerRadius: 14))
        .overlay(
            RoundedRectangle(cornerRadius: 14)
                .stroke(Color.brandIvoryBorder, lineWidth: 1)
        )
    }
}
