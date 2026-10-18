import type { Scenario, QuizQuestion } from '../types';

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
  return { correct: selectedIndex === q.correctIndex, explanation: q.explanation };
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
