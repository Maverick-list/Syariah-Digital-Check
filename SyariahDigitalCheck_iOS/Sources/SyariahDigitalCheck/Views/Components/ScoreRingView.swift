import SwiftUI

public struct ScoreRingView: View {
    public let score: Int
    @State private var animatedProgress: Double = 0.0

    public init(score: Int) {
        self.score = score
    }

    private var progressColor: Color {
        if score >= 80 {
            return .brandEmerald800
        } else if score >= 50 {
            return .brandGold500
        } else {
            return .brandDangerText
        }
    }

    public var body: some View {
        ZStack {
            // Track Circle
            Circle()
                .stroke(Color.brandSage100, lineWidth: 10)
                .frame(width: 130, height: 130)

            // Progress Circle
            Circle()
                .trim(from: 0.0, to: CGFloat(min(animatedProgress, 1.0)))
                .stroke(
                    progressColor,
                    style: StrokeStyle(lineWidth: 10, lineCap: .round)
                )
                .rotationEffect(.degrees(-90))
                .frame(width: 130, height: 130)
                .animation(.easeOut(duration: 1.0), value: animatedProgress)

            // Center Score Text
            VStack(spacing: 2) {
                Text("\(score)%")
                    .font(.system(size: 32, weight: .bold, design: .serif))
                    .foregroundColor(.brandEmerald950)
                Text("KEJELASAN")
                    .font(.system(size: 9, weight: .bold))
                    .tracking(1.0)
                    .foregroundColor(.brandTextMuted)
            }
        }
        .onAppear {
            DispatchQueue.main.asyncAfter(deadline: .now() + 0.1) {
                animatedProgress = Double(score) / 100.0
            }
        }
    }
}
