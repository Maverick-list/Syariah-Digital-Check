import SwiftUI

public struct CategorySelectView: View {
    @EnvironmentObject var appState: AppState

    public var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            VStack(alignment: .leading, spacing: 4) {
                Text("Cek Transaksi Digital")
                    .font(.system(size: 22, weight: .bold, design: .serif))
                    .foregroundColor(.brandEmerald950)
                Text("Pilih skema transaksi yang sedang atau akan kamu setujui:")
                    .font(.system(size: 13))
                    .foregroundColor(.brandTextSecondary)
            }
            .padding(.horizontal, 20)
            .padding(.top, 16)

            ScrollView {
                VStack(spacing: 12) {
                    ForEach(TransactionCategoryItem.sampleCategories) { cat in
                        Button(action: {
                            appState.startCheck(category: cat)
                        }) {
                            HStack(spacing: 14) {
                                Image(systemName: cat.sfSymbol)
                                    .font(.system(size: 20))
                                    .foregroundColor(.brandEmerald800)
                                    .frame(width: 44, height: 44)
                                    .background(Color.brandEmerald50)
                                    .clipShape(RoundedRectangle(cornerRadius: 12))

                                VStack(alignment: .leading, spacing: 3) {
                                    Text(cat.name)
                                        .font(.system(size: 14, weight: .bold))
                                        .foregroundColor(.brandEmerald950)
                                    Text(cat.contractBasis)
                                        .font(.system(size: 11, weight: .medium))
                                        .foregroundColor(.brandGold700)
                                    Text(cat.description)
                                        .font(.system(size: 11.5))
                                        .foregroundColor(.brandTextMuted)
                                        .lineLimit(2)
                                }

                                Spacer()

                                Image(systemName: "chevron.right")
                                    .font(.system(size: 13, weight: .bold))
                                    .foregroundColor(.brandSage300)
                            }
                            .padding(14)
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
                .padding(.bottom, 32)
            }
        }
        .background(Color.brandIvoryBase.ignoresSafeArea())
    }
}
