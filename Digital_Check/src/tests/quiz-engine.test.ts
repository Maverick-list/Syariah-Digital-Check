import { QUIZ } from '../data/quiz';
import { SOURCES_BY_ID } from '../data/sources';
import {
  evaluateQuizAnswer,
  scoreQuiz,
  scorePercent,
  filterQuizQuestions,
  shuffleQuizQuestions,
  calculateQuizAnalytics,
  getQuizPerformanceBadge,
} from '../utils/scoring';
import {
  computeProgress,
  computePillarCompetencies,
  getLiteracyLevel,
} from '../utils/progress';

describe('Phase 5 — Quiz Question Bank & Governance', () => {
  test('question bank contains at least 12 published questions', () => {
    expect(QUIZ.length).toBeGreaterThanOrEqual(12);
  });

  test('all questions have valid ID, topic, difficulty, options, and correct index', () => {
    const validDifficulties = new Set(['mudah', 'sedang', 'sulit']);

    QUIZ.forEach((q) => {
      expect(q.id).toBeDefined();
      expect(typeof q.id).toBe('string');
      expect(q.topic).toBeDefined();
      expect(q.topic!.length).toBeGreaterThan(0);
      expect(validDifficulties.has(q.difficulty!)).toBe(true);
      expect(Array.isArray(q.options)).toBe(true);
      expect(q.options.length).toBeGreaterThanOrEqual(2);
      expect(q.correctIndex).toBeGreaterThanOrEqual(0);
      expect(q.correctIndex).toBeLessThan(q.options.length);
      expect(q.explanation.length).toBeGreaterThan(15);
      expect(q.reviewStatus).toBe('Published');
    });
  });

  test('each question has optionExplanations matching its options count', () => {
    QUIZ.forEach((q) => {
      if (q.optionExplanations) {
        expect(q.optionExplanations.length).toBe(q.options.length);
        q.optionExplanations.forEach((note) => {
          expect(typeof note).toBe('string');
          expect(note.length).toBeGreaterThan(5);
        });
      }
    });
  });

  test('all question sourceIds exist in the centralized SOURCES_BY_ID registry', () => {
    QUIZ.forEach((q) => {
      if (q.sourceIds) {
        expect(q.sourceIds.length).toBeGreaterThanOrEqual(1);
        q.sourceIds.forEach((sId) => {
          expect(SOURCES_BY_ID[sId]).toBeDefined();
        });
      }
    });
  });
});

describe('Phase 5 — Quiz Experience & Engine', () => {
  test('evaluateQuizAnswer returns correct=true for correct option and includes specific note', () => {
    const q = QUIZ[0];
    const resCorrect = evaluateQuizAnswer(q, q.correctIndex);
    expect(resCorrect.correct).toBe(true);
    expect(resCorrect.explanation).toContain(q.explanation);

    const wrongIdx = (q.correctIndex + 1) % q.options.length;
    const resWrong = evaluateQuizAnswer(q, wrongIdx);
    expect(resWrong.correct).toBe(false);
  });

  test('evaluateQuizAnswer throws RangeError on invalid option indices', () => {
    const q = QUIZ[0];
    expect(() => evaluateQuizAnswer(q, -1)).toThrow(RangeError);
    expect(() => evaluateQuizAnswer(q, q.options.length)).toThrow(RangeError);
    expect(() => evaluateQuizAnswer(q, NaN)).toThrow(RangeError);
  });

  test('filterQuizQuestions filters questions by topic or returns all', () => {
    const all = filterQuizQuestions(QUIZ, 'Semua Topik');
    expect(all.length).toBe(QUIZ.length);

    const akadQuestions = filterQuizQuestions(QUIZ, 'Akad');
    expect(akadQuestions.length).toBeGreaterThan(0);
    akadQuestions.forEach((q) => {
      expect(q.topic!.toLowerCase()).toContain('akad');
    });

    const nonExistent = filterQuizQuestions(QUIZ, 'TopikYangTidakAda123');
    expect(nonExistent.length).toBe(0);
  });

  test('shuffleQuizQuestions returns shuffled copy without modifying original array', () => {
    const original = [...QUIZ];
    const shuffled = shuffleQuizQuestions(QUIZ);

    expect(shuffled.length).toBe(original.length);
    // Contains all original items
    const origIds = new Set(original.map((q) => q.id));
    shuffled.forEach((q) => expect(origIds.has(q.id)).toBe(true));
  });

  test('scoreQuiz accurately counts correct answers and handles unanswered questions (null)', () => {
    const sample = QUIZ.slice(0, 4);
    // Question 0: correct, Question 1: null (unanswered), Question 2: wrong, Question 3: correct
    const answers = [
      sample[0].correctIndex,
      null,
      (sample[2].correctIndex + 1) % sample[2].options.length,
      sample[3].correctIndex,
    ];

    const score = scoreQuiz(sample, answers);
    expect(score).toBe(2);
    expect(scorePercent(score, sample.length)).toBe(50);
  });

  test('scorePercent handles total=0 gracefully without division by zero', () => {
    expect(scorePercent(0, 0)).toBe(0);
    expect(scorePercent(5, 10)).toBe(50);
    expect(scorePercent(3, 4)).toBe(75);
  });

  test('getQuizPerformanceBadge returns appropriate label and guidance', () => {
    const high = getQuizPerformanceBadge(90);
    expect(high.label).toContain('Sangat Baik');
    expect(high.pillClass).toBe('pill-emerald');

    const med = getQuizPerformanceBadge(70);
    expect(med.label).toContain('Cukup Baik');
    expect(med.pillClass).toBe('pill-gold');

    const low = getQuizPerformanceBadge(40);
    expect(low.label).toContain('Perlu Penguatan');
    expect(low.pillClass).toBe('pill-warn');
  });
});

describe('Phase 5 — Learning Analytics & Quiz Intelligence', () => {
  test('calculateQuizAnalytics returns 0 on empty quiz attempts', () => {
    const analytics = calculateQuizAnalytics([]);
    expect(analytics.totalAttempts).toBe(0);
    expect(analytics.averageScore).toBe(0);
    expect(analytics.bestPercent).toBe(0);
    expect(analytics.totalAnswered).toBe(0);
    expect(analytics.totalCorrect).toBe(0);
    expect(analytics.overallAccuracyPercent).toBe(0);
    expect(analytics.recentAttempts).toEqual([]);
  });

  test('calculateQuizAnalytics computes multi-attempt averages accurately', () => {
    const attempts = [
      { id: 'att-1', date: '2026-11-19', score: 3, total: 4 }, // 75%
      { id: 'att-2', date: '2026-11-20', score: 4, total: 4 }, // 100%
      { id: 'att-3', date: '2026-11-20', score: 2, total: 4 }, // 50%
    ];

    const analytics = calculateQuizAnalytics(attempts);
    expect(analytics.totalAttempts).toBe(3);
    expect(analytics.bestPercent).toBe(100);
    expect(analytics.averagePercent).toBe(75); // (75 + 100 + 50) / 3 = 75
    expect(analytics.totalAnswered).toBe(12);
    expect(analytics.totalCorrect).toBe(9);
    expect(analytics.overallAccuracyPercent).toBe(75);
    expect(analytics.recentAttempts.length).toBe(3);
  });
});

describe('Phase 5 — Dynamic Competency Pillars & Literacy Index', () => {
  test('empty fresh state returns strict 0% across all 4 pillars', () => {
    const emptyState = {
      checks: [],
      lessonsRead: [],
      scenariosDone: [],
      quizAttempts: [],
    };

    const pillars = computePillarCompetencies(emptyState);
    expect(pillars.akad).toBe(0);
    expect(pillars.riba).toBe(0);
    expect(pillars.qabdh).toBe(0);
    expect(pillars.etika).toBe(0);

    const progress = computeProgress(emptyState);
    expect(progress.percent).toBe(0);

    const level = getLiteracyLevel(progress.percent);
    expect(level.level).toBe('Pemula Sadar');
    expect(level.tag).toBe('AWAL PERJALANAN');
  });

  test('pillar competencies increase dynamically as user completes specific activities', () => {
    const partialState = {
      checks: [
        {
          id: 'c1',
          date: '2026-11-20',
          category: 'paylater' as const,
          answers: [null, null, null, null, null] as any,
          resultState: 'understood' as const,
          unresolvedCount: 0,
        },
      ],
      lessonsRead: ['akad-transaksi-digital', 'riba-denda-keterlambatan'],
      scenariosDone: ['paylater'],
      quizAttempts: [{ id: 'q1', date: '2026-11-20', score: 4, total: 4 }],
    };

    const pillars = computePillarCompetencies(partialState);
    expect(pillars.akad).toBeGreaterThan(0);
    expect(pillars.riba).toBeGreaterThan(0);
    // qabdh has no activities yet
    expect(pillars.qabdh).toBe(0);

    const progress = computeProgress(partialState);
    expect(progress.percent).toBeGreaterThan(0);

    const level = getLiteracyLevel(progress.percent);
    expect(level.level).not.toBe('');
  });

  test('literacy level descriptions distinguish education from formal sharia certification', () => {
    [0, 25, 55, 90].forEach((score) => {
      const level = getLiteracyLevel(score);
      expect(level.level).toBeDefined();
      expect(level.description.length).toBeGreaterThan(20);
      expect(level.nextTarget.length).toBeGreaterThan(15);
    });
  });
});
