import SwiftUI

public struct CheckContainerView: View {
    @EnvironmentObject var appState: AppState

    public var body: some View {
        NavigationStack {
            Group {
                if appState.showingResultScreen {
                    ResultView()
                } else if appState.selectedCategory != nil {
                    ChecklistView()
                } else {
                    CategorySelectView()
                }
            }
            .navigationBarHidden(true)
        }
    }
}
