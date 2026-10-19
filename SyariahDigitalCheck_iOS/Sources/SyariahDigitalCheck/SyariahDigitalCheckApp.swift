import SwiftUI

@main
public struct SyariahDigitalCheckApp: App {
    public init() {}

    public var body: some Scene {
        WindowGroup {
            MainTabView()
                .preferredColorScheme(.light)
        }
    }
}
