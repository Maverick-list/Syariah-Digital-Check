import SwiftUI

public extension Color {
    // MARK: - Primary Brand (Deep Emerald Green)
    static let brandEmerald950 = Color(hex: "#032115")
    static let brandEmerald900 = Color(hex: "#064E3B")
    static let brandEmerald800 = Color(hex: "#065F46")
    static let brandEmerald700 = Color(hex: "#047857")
    static let brandEmerald600 = Color(hex: "#059669")
    static let brandEmerald100 = Color(hex: "#D1FAE5")
    static let brandEmerald50  = Color(hex: "#ECFDF5")

    // MARK: - Canvas Neutral (Warm Ivory & Alabaster)
    static let brandIvoryBase   = Color(hex: "#FAF8F5")
    static let brandIvoryCard   = Color(hex: "#FFFFFF")
    static let brandIvoryWarm   = Color(hex: "#F4EFE6")
    static let brandIvoryBorder = Color(hex: "#E7E2D6")

    // MARK: - Secondary Neutral (Muted Sage)
    static let brandSage900 = Color(hex: "#1F3529")
    static let brandSage700 = Color(hex: "#385444")
    static let brandSage300 = Color(hex: "#B2C4B8")
    static let brandSage200 = Color(hex: "#D5DFD8")
    static let brandSage100 = Color(hex: "#E7EDE9")
    static let brandSage50  = Color(hex: "#F2F6F3")

    // MARK: - Restrained Accent (Champagne Gold)
    static let brandGold700 = Color(hex: "#8C6A28")
    static let brandGold600 = Color(hex: "#B28834")
    static let brandGold500 = Color(hex: "#C89D42")
    static let brandGold100 = Color(hex: "#F7EED8")
    static let brandGold50  = Color(hex: "#FDF9F0")

    // MARK: - High-Legibility Typography
    static let brandTextPrimary   = Color(hex: "#0D281E")
    static let brandTextSecondary = Color(hex: "#2C4337")
    static let brandTextMuted     = Color(hex: "#577063")

    // MARK: - Semantic Feedback
    static let brandDangerBg   = Color(hex: "#FDF2F2")
    static let brandDangerText = Color(hex: "#9B1C1C")
    static let brandWarnBg     = Color(hex: "#FEF9EC")
    static let brandWarnText   = Color(hex: "#8C6A28")

    // MARK: - Hex Initializer
    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 3: // RGB (12-bit)
            (a, r, g, b) = (255, (int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
        case 6: // RGB (24-bit)
            (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
        case 8: // ARGB (32-bit)
            (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
        default:
            (a, r, g, b) = (255, 0, 0, 0)
        }
        self.init(
            .sRGB,
            red: Double(r) / 255,
            green: Double(g) / 255,
            blue: Double(b) / 255,
            opacity: Double(a) / 255
        )
    }
}
