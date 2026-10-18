import type { PersistedState } from '../types';
import { LESSONS } from '../data/lessons';
import { SCENARIOS } from '../data/scenarios';

export interface ProgressSummary {
  percent: number;
  checks: number;
  lessonsRead: number;
  lessonsTotal: number;
  scenariosDone: number;
  scenariosTotal: number;
  quizAttempts: number;
  lastQuizScore: { score: number; total: number } | null;
  bestQuizPercent: number;
}

/**
 * Bobot progres: checklist (min. 1 selesai) 25%, materi 35%, skenario 15%, kuis (skor terbaik) 25%.
 * Hanya mengukur aktivitas belajar, bukan penilaian kepatuhan syariah.
 */
export function computeProgress(
  s: Pick<PersistedState, 'checks' | 'lessonsRead' | 'scenariosDone' | 'quizAttempts'>,
  totals = { lessons: LESSONS.length, scenarios: SCENARIOS.length },
): ProgressSummary {
  const lessonIds = new Set(LESSONS.map((l) => l.id));
  const scenarioIds = new Set(SCENARIOS.map((x) => x.id));
  const lessonsRead = new Set(s.lessonsRead.filter((id) => lessonIds.has(id))).size;
  const scenariosDone = new Set(s.scenariosDone.filter((id) => scenarioIds.has(id))).size;
  const best = s.quizAttempts.reduce(
    (m, a) => Math.max(m, a.total > 0 ? a.score / a.total : 0),
    0,
  );
  const last = s.quizAttempts[s.quizAttempts.length - 1];

  const raw =
    (s.checks.length > 0 ? 25 : 0) +
    (totals.lessons ? (lessonsRead / totals.lessons) * 35 : 0) +
    (totals.scenarios ? (scenariosDone / totals.scenarios) * 15 : 0) +
    best * 25;

  return {
    percent: Math.min(100, Math.round(raw)),
    checks: s.checks.length,
    lessonsRead,
    lessonsTotal: totals.lessons,
    scenariosDone,
    scenariosTotal: totals.scenarios,
    quizAttempts: s.quizAttempts.length,
    lastQuizScore: last ? { score: last.score, total: last.total } : null,
    bestQuizPercent: Math.round(best * 100),
  };
}
