import SwiftUI

public struct LearnView: View {
    @EnvironmentObject var appState: AppState
    @State private var searchText: String = ""
    @State private var selectedCategoryFilter: String = "Semua"
    @State private var activeLessonDetail: LessonItem? = nil

    private let categories = ["Semua", "Akad", "Denda", "Investasi", "Regulasi"]

    private var filteredLessons: [LessonItem] {
        LessonItem.sampleLessons.filter { lesson in
            let matchesCategory = selectedCategoryFilter == "Semua" || lesson.category == selectedCategoryFilter
            let matchesSearch = searchText.isEmpty ||
                lesson.title.localizedCaseInsensitiveContains(searchText) ||
                lesson.summary.localizedCaseInsensitiveContains(searchText)
            return matchesCategory && matchesSearch
        }
    }

    public var body: some View {
        NavigationStack {
            VStack(spacing: 0) {
                // Header
                VStack(alignment: .leading, spacing: 12) {
                    Text("Pusat Edukasi Muamalah")
                        .font(.system(size: 22, weight: .bold, design: .serif))
                        .foregroundColor(.brandEmerald950)

                    // Search Field
                    HStack {
                        Image(systemName: "magnifyingglass")
                            .foregroundColor(.brandTextMuted)
                        TextField("Cari topik: akad, denda, emas...", text: $searchText)
                            .font(.system(size: 13.5))
                        if !searchText.isEmpty {
                            Button(action: { searchText = "" }) {
                                Image(systemName: "xmark.circle.fill")
                                    .foregroundColor(.brandTextMuted)
                            }
                        }
                    }
                    .padding(10)
                    .background(Color.brandIvoryCard)
                    .clipShape(RoundedRectangle(cornerRadius: 12))
                    .overlay(
                        RoundedRectangle(cornerRadius: 12)
                            .stroke(Color.brandIvoryBorder, lineWidth: 1)
                    )

                    // Filter Chips
                    ScrollView(.horizontal, showsIndicators: false) {
                        HStack(spacing: 8) {
                            ForEach(categories, id: \.self) { cat in
                                Button(action: {
                                    selectedCategoryFilter = cat
                                }) {
                                    Text(cat)
                                        .font(.system(size: 12, weight: .semibold))
                                        .padding(.horizontal, 14)
                                        .padding(.vertical, 7)
                                        .background(selectedCategoryFilter == cat ? Color.brandEmerald900 : Color.brandIvoryCard)
                                        .foregroundColor(selectedCategoryFilter == cat ? .white : .brandTextSecondary)
                                        .clipShape(Capsule())
                                        .overlay(
                                            Capsule()
                                                .stroke(selectedCategoryFilter == cat ? Color.clear : Color.brandIvoryBorder, lineWidth: 1)
                                        )
                                }
                            }
                        }
                    }
                }
                .padding(.horizontal, 20)
                .padding(.top, 16)
                .padding(.bottom, 12)

                // Lesson Cards List
                ScrollView {
                    VStack(spacing: 12) {
                        ForEach(filteredLessons) { lesson in
                            Button(action: {
                                activeLessonDetail = lesson
                            }) {
                                VStack(alignment: .leading, spacing: 8) {
                                    HStack {
                                        Text(lesson.category.uppercased())
                                            .font(.system(size: 9.5, weight: .bold))
                                            .tracking(0.6)
                                            .foregroundColor(.brandEmerald800)
                                            .padding(.horizontal, 8)
                                            .padding(.vertical, 3)
                                            .background(Color.brandEmerald50)
                                            .clipShape(Capsule())

                                        Spacer()

                                        HStack(spacing: 4) {
                                            Image(systemName: "clock")
                                                .font(.system(size: 10))
                                            Text("\(lesson.readingMinutes) mnt")
                                                .font(.system(size: 11))
                                        }
                                        .foregroundColor(.brandTextMuted)

                                        if appState.completedLessonIds.contains(lesson.id) {
                                            Image(systemName: "checkmark.circle.fill")
                                                .font(.system(size: 14))
                                                .foregroundColor(.brandEmerald700)
                                        }
                                    }

                                    Text(lesson.title)
                                        .font(.system(size: 14.5, weight: .bold))
                                        .foregroundColor(.brandEmerald950)
                                        .lineLimit(2)

                                    Text(lesson.summary)
                                        .font(.system(size: 12))
                                        .foregroundColor(.brandTextSecondary)
                                        .lineLimit(2)
                                        .lineSpacing(2)
                                }
                                .padding(16)
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
                    .padding(.bottom, 32)
                }
            }
            .background(Color.brandIvoryBase.ignoresSafeArea())
            .navigationBarHidden(true)
            .sheet(item: $activeLessonDetail) { lesson in
                LessonDetailSheet(lesson: lesson)
            }
        }
    }
}

struct LessonDetailSheet: View {
    let lesson: LessonItem
    @EnvironmentObject var appState: AppState
    @Environment(\.dismiss) var dismiss

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 16) {
                    HStack {
                        Text(lesson.category.uppercased())
                            .font(.system(size: 10, weight: .bold))
                            .foregroundColor(.brandEmerald800)
                            .padding(.horizontal, 10)
                            .padding(.vertical, 4)
                            .background(Color.brandEmerald50)
                            .clipShape(Capsule())
                        Spacer()
                        Text("\(lesson.readingMinutes) menit baca")
                            .font(.system(size: 12))
                            .foregroundColor(.brandTextMuted)
                    }

                    Text(lesson.title)
                        .font(.system(size: 22, weight: .bold, design: .serif))
                        .foregroundColor(.brandEmerald950)
                        .lineSpacing(4)

                    // Reference Pill
                    HStack(alignment: .top, spacing: 8) {
                        Image(systemName: "book.closed.fill")
                            .foregroundColor(.brandGold700)
                            .font(.system(size: 14))
                        Text(lesson.fatwaReference)
                            .font(.system(size: 11.5, weight: .semibold))
                            .foregroundColor(.brandGold700)
                    }
                    .padding(12)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .background(Color.brandGold50)
                    .clipShape(RoundedRectangle(cornerRadius: 10))

                    // Body
                    VStack(alignment: .leading, spacing: 12) {
                        ForEach(lesson.bodyParagraphs, id: \.self) { p in
                            Text(p)
                                .font(.system(size: 13.5))
                                .foregroundColor(.brandTextPrimary)
                                .lineSpacing(4)
                        }
                    }

                    // Key Points Card
                    VStack(alignment: .leading, spacing: 10) {
                        Text("Poin Penting untuk Diingat:")
                            .font(.system(size: 13, weight: .bold))
                            .foregroundColor(.brandEmerald950)

                        ForEach(lesson.keyPoints, id: \.self) { kp in
                            HStack(alignment: .top, spacing: 8) {
                                Text("•")
                                    .font(.system(size: 16, weight: .bold))
                                    .foregroundColor(.brandEmerald800)
                                Text(kp)
                                    .font(.system(size: 12.5))
                                    .foregroundColor(.brandTextSecondary)
                            }
                        }
                    }
                    .padding(16)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .background(Color.brandSage50)
                    .clipShape(RoundedRectangle(cornerRadius: 14))

                    // Mark as Done Button
                    Button(action: {
                        appState.completedLessonIds.insert(lesson.id)
                        dismiss()
                    }) {
                        HStack {
                            Image(systemName: "checkmark")
                                .font(.system(size: 13, weight: .bold))
                            Text(appState.completedLessonIds.contains(lesson.id) ? "Sudah Dibaca ✓" : "Selesai Membaca & Simpan Progres")
                                .font(.system(size: 14, weight: .bold))
                        }
                        .foregroundColor(.white)
                        .frame(maxWidth: .infinity)
                        .frame(height: 48)
                        .background(Color.brandEmerald800)
                        .clipShape(RoundedRectangle(cornerRadius: 12))
                    }
                    .padding(.top, 8)
                }
                .padding(20)
            }
            .background(Color.brandIvoryBase.ignoresSafeArea())
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Tutup") {
                        dismiss()
                    }
                    .foregroundColor(.brandEmerald800)
                }
            }
        }
    }
}
