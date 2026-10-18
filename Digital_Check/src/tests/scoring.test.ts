import { QUIZ } from '../data/quiz';
import { SCENARIOS } from '../data/scenarios';
import { evaluateQuizAnswer, evaluateScenario, scorePercent, scoreQuiz } from '../utils/scoring';
import { computeProgress } from '../utils/progress';
import { validateDisplayName } from '../utils/text';
import { filterLessons } from '../utils/lessons';

describe('scenario evaluation', () => {
  it('flags the correct option and returns the matching explanation', () => {
    for (const s of SCENARIOS) {
      const ok = evaluateScenario(s, s.correctIndex);
      expect(ok.correct).toBe(true);
      expect(ok.explanation).toBe(s.explanations[s.correctIndex]);
      const wrongIdx = s.options.findIndex((_, i) => i !== s.correctIndex);
      expect(evaluateScenario(s, wrongIdx).correct).toBe(false);
    }
  });

  it('rejects out-of-range choices', () => {
    expect(() => evaluateScenario(SCENARIOS[0], 99)).toThrow(RangeError);
    expect(() => evaluateScenario(SCENARIOS[0], -1)).toThrow(RangeError);
    expect(() => evaluateQuizAnswer(QUIZ[0], 1.5)).toThrow(RangeError);
  });
});

describe('quiz scoring', () => {
  it('scores all correct, all wrong and partial/unanswered', () => {
    const all = QUIZ.map((q) => q.correctIndex);
    expect(scoreQuiz(QUIZ, all)).toBe(QUIZ.length);
    const wrong = QUIZ.map((q) => (q.correctIndex + 1) % q.options.length);
    expect(scoreQuiz(QUIZ, wrong)).toBe(0);
    const partial: (number | null)[] = QUIZ.map(() => null);
    partial[0] = QUIZ[0].correctIndex;
    expect(scoreQuiz(QUIZ, partial)).toBe(1);
  });

  it('computes percentage safely', () => {
    expect(scorePercent(3, 4)).toBe(75);
    expect(scorePercent(0, 0)).toBe(0);
  });
});

describe('progress', () => {
  const empty = { checks: [], lessonsRead: [], scenariosDone: [], quizAttempts: [] };
  it('is 0 with no activity', () => {
    expect(computeProgress(empty).percent).toBe(0);
  });
  it('reaches 100 with everything done and a perfect quiz', () => {
    const p = computeProgress({
      checks: [{ id: 'c', date: '2026-01-01', category: 'paylater', answers: {}, resultState: 'understood', unresolvedCount: 0 }],
      lessonsRead: ['akad-transaksi-digital', 'transparansi-biaya', 'sumber-tepercaya', 'layanan-keuangan-syariah', 'zisw-digital', 'risiko-investasi', 'pembiayaan-digital'],
      scenariosDone: SCENARIOS.map((s) => s.id),
      quizAttempts: [{ id: 'q', date: '2026-01-01', score: 8, total: 8 }],
    });
    expect(p.percent).toBe(100);
  });
  it('ignores unknown ids and duplicates, and uses best quiz score', () => {
    const p = computeProgress({
      ...empty,
      lessonsRead: ['nope', 'akad-transaksi-digital', 'akad-transaksi-digital'],
      quizAttempts: [
        { id: 'a', date: 'x', score: 2, total: 8 },
        { id: 'b', date: 'y', score: 6, total: 8 },
        { id: 'c', date: 'z', score: 4, total: 8 },
      ],
    });
    expect(p.lessonsRead).toBe(1);
    expect(p.bestQuizPercent).toBe(75);
    expect(p.lastQuizScore).toEqual({ score: 4, total: 8 });
  });
});

describe('display name validation', () => {
  it('allows empty (optional) and trims/collapses whitespace', () => {
    expect(validateDisplayName('   ')).toEqual({ ok: true, value: '' });
    expect(validateDisplayName('  Firza   Ilmi ')).toEqual({ ok: true, value: 'Firza Ilmi' });
  });
  it('rejects too long and unsafe input', () => {
    expect(validateDisplayName('a'.repeat(31)).ok).toBe(false);
    expect(validateDisplayName('<script>').ok).toBe(false);
    expect(validateDisplayName('@@@').ok).toBe(false);
  });
  it("accepts names with apostrophes and hyphens", () => {
    expect(validateDisplayName("Nur-Aini O'Brien").ok).toBe(true);
  });
});

describe('lesson search', () => {
  it('filters by query and category', () => {
    expect(filterLessons('', 'Semua').length).toBeGreaterThan(5);
    expect(filterLessons('akad', 'Semua').some((l) => l.id === 'akad-transaksi-digital')).toBe(true);
    expect(filterLessons('', 'Akad').every((l) => l.category === 'Akad')).toBe(true);
    expect(filterLessons('tidak-ada-hasil-xyz', 'Semua')).toHaveLength(0);
    expect(filterLessons('  AKAD ', 'Semua').length).toBeGreaterThan(0);
  });
});
