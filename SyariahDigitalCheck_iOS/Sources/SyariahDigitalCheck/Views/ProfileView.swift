import SwiftUI

public struct ProfileView: View {
    @EnvironmentObject var appState: AppState
    @State private var inputName: String = ""
    @State private var showingResetAlert: Bool = false
    @State private var showingToast: Bool = false

    public var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 18) {
                    // Avatar & Display Name Card
                    VStack(spacing: 12) {
                        Circle()
                            .fill(Color.brandEmerald800)
                            .frame(width: 68, height: 68)
                            .overlay(
                                Text(appState.userInitials)
                                    .font(.system(size: 24, weight: .bold))
                                    .foregroundColor(.white)
                            )

                        VStack(spacing: 2) {
                            Text(appState.userName)
                                .font(.system(size: 20, weight: .bold, design: .serif))
                                .foregroundColor(.brandEmerald950)
                            Text("Pengguna Terverifikasi Lokal")
                                .font(.system(size: 11.5))
                                .foregroundColor(.brandTextMuted)
                        }

                        // Edit Name Field
                        VStack(alignment: .leading, spacing: 6) {
                            Text("Ubah Nama Panggilan:")
                                .font(.system(size: 11.5, weight: .bold))
                                .foregroundColor(.brandTextSecondary)

                            HStack(spacing: 8) {
                                TextField("Nama pengguna...", text: $inputName)
                                    .font(.system(size: 13.5))
                                    .padding(10)
                                    .background(Color.brandSage50)
                                    .clipShape(RoundedRectangle(cornerRadius: 10))

                                Button(action: {
                                    let trimmed = inputName.trimmingCharacters(in: .whitespacesAndNewlines)
                                    if !trimmed.isEmpty {
                                        appState.userName = trimmed
                                        withAnimation {
                                            showingToast = true
                                        }
                                        DispatchQueue.main.asyncAfter(deadline: .now() + 2) {
                                            withAnimation { showingToast = false }
                                        }
                                    }
                                }) {
                                    Text("Simpan")
                                        .font(.system(size: 13, weight: .bold))
                                        .foregroundColor(.white)
                                        .padding(.horizontal, 14)
                                        .padding(.vertical, 10)
                                        .background(Color.brandEmerald800)
                                        .clipShape(RoundedRectangle(cornerRadius: 10))
                                }
                            }
                        }
                        .padding(.top, 4)
                    }
                    .padding(20)
                    .frame(maxWidth: .infinity)
                    .background(Color.brandIvoryCard)
                    .clipShape(RoundedRectangle(cornerRadius: 20))
                    .overlay(
                        RoundedRectangle(cornerRadius: 20)
                            .stroke(Color.brandIvoryBorder, lineWidth: 1)
                    )
                    .padding(.horizontal, 20)
                    .padding(.top, 16)

                    // Stats Card
                    HStack(spacing: 12) {
                        VStack(spacing: 4) {
                            Text("\(appState.checksCount)")
                                .font(.system(size: 24, weight: .bold, design: .serif))
                                .foregroundColor(.brandEmerald800)
                            Text("Evaluasi Selesai")
                                .font(.system(size: 11))
                                .foregroundColor(.brandTextMuted)
                        }
                        .frame(maxWidth: .infinity)
                        .padding(14)
                        .background(Color.brandIvoryCard)
                        .clipShape(RoundedRectangle(cornerRadius: 14))
                        .overlay(RoundedRectangle(cornerRadius: 14).stroke(Color.brandIvoryBorder, lineWidth: 1))

                        VStack(spacing: 4) {
                            Text("\(appState.completedLessonIds.count)")
                                .font(.system(size: 24, weight: .bold, design: .serif))
                                .foregroundColor(.brandGold700)
                            Text("Artikel Dibaca")
                                .font(.system(size: 11))
                                .foregroundColor(.brandTextMuted)
                        }
                        .frame(maxWidth: .infinity)
                        .padding(14)
                        .background(Color.brandIvoryCard)
                        .clipShape(RoundedRectangle(cornerRadius: 14))
                        .overlay(RoundedRectangle(cornerRadius: 14).stroke(Color.brandIvoryBorder, lineWidth: 1))
                    }
                    .padding(.horizontal, 20)

                    // Privacy Reassurance Card
                    VStack(alignment: .leading, spacing: 8) {
                        HStack(spacing: 6) {
                            Image(systemName: "lock.shield.fill")
                                .foregroundColor(.brandEmerald800)
                            Text("PRIVASI & KEAMANAN 100% LOKAL")
                                .font(.system(size: 10.5, weight: .bold))
                                .tracking(0.6)
                                .foregroundColor(.brandEmerald800)
                        }
                        Text("Penyimpanan Hanya di Perangkat iPhone Kamu")
                            .font(.system(size: 14, weight: .bold))
                            .foregroundColor(.brandEmerald950)
                        Text("Aplikasi ini tidak menyimpan data finansial, nomor rekening, atau identitas kamu ke server cloud eksternal. Seluruh riwayat evaluasi hanya ada di memori iPhone kamu.")
                            .font(.system(size: 12))
                            .foregroundColor(.brandTextSecondary)
                            .lineSpacing(2)

                        Button(action: {
                            showingResetAlert = true
                        }) {
                            HStack {
                                Image(systemName: "trash")
                                    .font(.system(size: 12))
                                Text("Hapus Seluruh Data & Riwayat Lokal")
                                    .font(.system(size: 12, weight: .bold))
                            }
                            .foregroundColor(.brandDangerText)
                            .frame(maxWidth: .infinity)
                            .padding(.vertical, 10)
                            .background(Color.brandDangerBg)
                            .clipShape(RoundedRectangle(cornerRadius: 10))
                        }
                        .padding(.top, 6)
                    }
                    .padding(18)
                    .background(Color.brandIvoryCard)
                    .clipShape(RoundedRectangle(cornerRadius: 18))
                    .overlay(RoundedRectangle(cornerRadius: 18).stroke(Color.brandIvoryBorder, lineWidth: 1))
                    .padding(.horizontal, 20)

                    // Legal Disclaimer
                    VStack(alignment: .leading, spacing: 6) {
                        HStack(spacing: 6) {
                            Image(systemName: "info.circle.fill")
                                .foregroundColor(.brandGold600)
                            Text("BATASAN LEGAL & OTORITAS EDUKASI")
                                .font(.system(size: 10, weight: .bold))
                                .foregroundColor(.brandGold700)
                        }
                        Text("Syariah Digital Check dirancang sebagai alat bantu literasi konsumen independen untuk membedah transparansi akad. Evaluasi ini tidak menggantikan fatwa resmi DSN-MUI atau nasihat investasi perorangan.")
                            .font(.system(size: 11.5))
                            .foregroundColor(.brandTextMuted)
                            .lineSpacing(2)
                    }
                    .padding(16)
                    .background(Color.brandIvoryWarm)
                    .clipShape(RoundedRectangle(cornerRadius: 14))
                    .padding(.horizontal, 20)

                    Text("Syariah Digital Check • Native iOS v2.4.0 Build")
                        .font(.system(size: 11))
                        .foregroundColor(.brandTextMuted)
                        .padding(.bottom, 24)
                }
            }
            .background(Color.brandIvoryBase.ignoresSafeArea())
            .navigationBarHidden(true)
            .onAppear {
                inputName = appState.userName
            }
            .alert("Konfirmasi Reset Data", isPresented: $showingResetAlert) {
                Button("Batal", role: .cancel) {}
                Button("Hapus Bersih", role: .destructive) {
                    appState.resetAllData()
                    inputName = appState.userName
                }
            } message: {
                Text("Seluruh riwayat evaluasi dan modul bacaan akan dihapus dari penyimpanan iPhone kamu.")
            }
        }
    }
}
