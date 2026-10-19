import SwiftUI

public struct MainTabView: View {
    @StateObject private var appState = AppState()
    @State private var selectedTab: Int = 0

    public init() {}

    public var body: some View {
        TabView(selection: $selectedTab) {
            HomeView(selectedTab: $selectedTab)
                .tabItem {
                    Label("Beranda", systemImage: "house.fill")
                }
                .tag(0)

            CheckContainerView()
                .tabItem {
                    Label("Cek", systemImage: "checkmark.shield.fill")
                }
                .tag(1)

            LearnView()
                .tabItem {
                    Label("Edukasi", systemImage: "book.fill")
                }
                .tag(2)

            QuizView()
                .tabItem {
                    Label("Kuis", systemImage: "sparkles")
                }
                .tag(3)

            ProfileView()
                .tabItem {
                    Label("Profil", systemImage: "person.crop.circle.fill")
                }
                .tag(4)
        }
        .accentColor(.brandEmerald800)
        .environmentObject(appState)
    }
}
