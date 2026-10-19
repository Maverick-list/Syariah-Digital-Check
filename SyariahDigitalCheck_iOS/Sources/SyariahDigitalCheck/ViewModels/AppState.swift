import Foundation
import SwiftUI
import Combine

@MainActor
public class AppState: ObservableObject {
    // MARK: - User Profile
    @Published public var userName: String {
        didSet {
            UserDefaults.standard.set(userName, forKey: "saved_user_name")
        }
    }

    public var userInitials: String {
        let parts = userName.split(separator: " ")
        if parts.isEmpty { return "FP" }
        if parts.count == 1 { return String(parts[0].prefix(2)).uppercased() }
        return "\(parts[0].prefix(1))\(parts[1].prefix(1))".uppercased()
    }

    // MARK: - Evaluation History
    @Published public var checksCount: Int {
        didSet {
            UserDefaults.standard.set(checksCount, forKey: "saved_checks_count")
        }
    }

    // MARK: - Active Checklist State
    @Published public var selectedCategory: TransactionCategoryItem?
    @Published public var currentStepIndex: Int = 0
    @Published public var stepAnswers: [StepAnswerStatus?] = [nil, nil, nil, nil, nil]
    @Published public var showingResultScreen: Bool = false

    // MARK: - Quiz State
    @Published public var currentQuizIndex: Int = 0
    @Published public var currentQuizScore: Int = 0
    @Published public var selectedOptionIndex: Int? = nil
    @Published public var isQuizAnswerSubmitted: Bool = false

    // MARK: - Reading History
    @Published public var completedLessonIds: Set<String> {
        didSet {
            let array = Array(completedLessonIds)
            UserDefaults.standard.set(array, forKey: "saved_completed_lessons")
        }
    }

    // MARK: - Initialization
    public init() {
        self.userName = UserDefaults.standard.string(forKey: "saved_user_name") ?? "Fikri Pratama"
        self.checksCount = UserDefaults.standard.integer(forKey: "saved_checks_count")
        let savedLessons = UserDefaults.standard.stringArray(forKey: "saved_completed_lessons") ?? []
        self.completedLessonIds = Set(savedLessons)
    }

    // MARK: - Checklist Logic
    public func startCheck(category: TransactionCategoryItem) {
        self.selectedCategory = category
        self.currentStepIndex = 0
        self.stepAnswers = [nil, nil, nil, nil, nil]
        self.showingResultScreen = false
    }

    public func answerStep(at index: Int, status: StepAnswerStatus) {
        guard index >= 0 && index < stepAnswers.count else { return }
        stepAnswers[index] = status
    }

    public func calculateScore() -> Int {
        var clearCount = 0.0
        var partialCount = 0.0
        for ans in stepAnswers {
            if let ans = ans {
                if ans == .clear { clearCount += 1.0 }
                else if ans == .partial { partialCount += 0.5 }
            }
        }
        let score = Int(round(((clearCount + partialCount) / 5.0) * 100.0))
        return min(max(score, 0), 100)
    }

    public func completeChecklist() {
        self.checksCount += 1
        self.showingResultScreen = true
    }

    // MARK: - Reset Actions
    public func resetAllData() {
        self.checksCount = 0
        self.stepAnswers = [nil, nil, nil, nil, nil]
        self.currentStepIndex = 0
        self.currentQuizIndex = 0
        self.currentQuizScore = 0
        self.completedLessonIds.removeAll()
        self.userName = "Fikri Pratama"
        UserDefaults.standard.removeObject(forKey: "saved_user_name")
        UserDefaults.standard.removeObject(forKey: "saved_checks_count")
        UserDefaults.standard.removeObject(forKey: "saved_completed_lessons")
    }
}
