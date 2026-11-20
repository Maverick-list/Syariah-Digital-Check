import type { Scenario, QuizQuestion, QuizAttempt } from '../types';

export function evaluateScenario(scenario: Scenario, selectedIndex: number) {
  if (
    !Number.isInteger(selectedIndex) ||
    selectedIndex < 0 ||
    selectedIndex >= scenario.options.length
  ) {
    throw new RangeError('Pilihan skenario tidak valid');
  }
  return {
    correct: selectedIndex === scenario.correctIndex,
    explanation: scenario.explanations[selectedIndex] ?? '',
  };
}

export function evaluateQuizAnswer(q: QuizQuestion, selectedIndex: number) {
  if (!Number.isInteger(selectedIndex) || selectedIndex < 0 || selectedIndex >= q.options.length) {
    throw new RangeError('Pilihan kuis tidak valid');
  }
  const isCorrect = selectedIndex === q.correctIndex;
  const specificNote = q.optionExplanations?.[selectedIndex] || '';
  const explanation = specificNote ? `${q.explanation} ${specificNote}` : q.explanation;
  return {
    correct: isCorrect,
    explanation,
    specificNote,
  };
}

/** Skor kuis dari daftar jawaban (indeks atau null untuk belum dijawab). */
export function scoreQuiz(questions: QuizQuestion[], answers: (number | null)[]): number {
  return questions.reduce(
    (n, q, i) => n + (answers[i] === q.correctIndex ? 1 : 0),
    0,
  );
}

export function scorePercent(score: number, total: number): number {
  return total > 0 ? Math.round((score / total) * 100) : 0;
}

/**
 * Filter pertanyaan kuis berdasarkan topik kategori.
 * Jika topicFilter kosong atau 'Semua Topik', mengembalikan seluruh pertanyaan.
 */
export function filterQuizQuestions(questions: QuizQuestion[], topicFilter?: string): QuizQuestion[] {
  if (!topicFilter || topicFilter.trim().toLowerCase() === 'semua topik') {
    return questions;
  }
  const target = topicFilter.trim().toLowerCase();
  return questions.filter((q) => q.topic && q.topic.toLowerCase().includes(target));
}

/**
 * Acak urutan pertanyaan kuis menggunakan algoritma Fisher-Yates shuffle yang aman.
 */
export function shuffleQuizQuestions<T>(items: readonly T[], randomFn = Math.random): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(randomFn() * (i + 1));
    const temp = result[i];
    result[i] = result[j];
    result[j] = temp;
  }
  return result;
}

export interface QuizAnalyticsSummary {
  totalAttempts: number;
  averageScore: number;
  averagePercent: number;
  bestPercent: number;
  totalAnswered: number;
  totalCorrect: number;
  overallAccuracyPercent: number;
  recentAttempts: QuizAttempt[];
}

/**
 * Menghitung metrik analitik kuis secara transparan dari riwayat upaya kuis.
 * Menghindari nilai statis atau data rekaan.
 */
export function calculateQuizAnalytics(attempts: QuizAttempt[] = []): QuizAnalyticsSummary {
  if (!attempts || attempts.length === 0) {
    return {
      totalAttempts: 0,
      averageScore: 0,
      averagePercent: 0,
      bestPercent: 0,
      totalAnswered: 0,
      totalCorrect: 0,
      overallAccuracyPercent: 0,
      recentAttempts: [],
    };
  }

  let totalScore = 0;
  let totalQuestions = 0;
  let bestPct = 0;
  let sumPercents = 0;

  for (const a of attempts) {
    totalScore += a.score;
    totalQuestions += a.total;
    const pct = a.total > 0 ? (a.score / a.total) * 100 : 0;
    sumPercents += pct;
    if (pct > bestPct) bestPct = pct;
  }

  const avgPct = Math.round(sumPercents / attempts.length);
  const overallAccuracy = totalQuestions > 0 ? Math.round((totalScore / totalQuestions) * 100) : 0;

  return {
    totalAttempts: attempts.length,
    averageScore: Math.round((totalScore / attempts.length) * 10) / 10,
    averagePercent: avgPct,
    bestPercent: Math.round(bestPct),
    totalAnswered: totalQuestions,
    totalCorrect: totalScore,
    overallAccuracyPercent: overallAccuracy,
    recentAttempts: attempts.slice(-5).reverse(),
  };
}

/**
 * Menentukan status dan saran performa kuis untuk umpan balik belajar.
 */
export function getQuizPerformanceBadge(percent: number): {
  label: string;
  pillClass: string;
  advice: string;
} {
  if (percent >= 85) {
    return {
      label: 'Sangat Baik (Mumtaz)',
      pillClass: 'pill-emerald',
      advice: 'Pemahamanmu terhadap kaidah fiqih muamalah kontemporer sangat mendalam.',
    };
  }
  if (percent >= 60) {
    return {
      label: 'Cukup Baik (Jayyid)',
      pillClass: 'pill-gold',
      advice: 'Konsep dasar sudah dipahami dengan baik, pertajam telaah klausul denda dan serah terima (qabdh).',
    };
  }
  return {
    label: 'Perlu Penguatan (Maqbul)',
    pillClass: 'pill-warn',
    advice: 'Pelajari kembali modul terkait akad dan denda keterlambatan sebelum mengulang kuis.',
  };
}
