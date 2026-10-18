import { CHECKLIST_STEPS, CATEGORIES, DISCLAIMER } from '../data/checklist';
import { LESSONS } from '../data/lessons';
import { SCENARIOS } from '../data/scenarios';
import { QUIZ } from '../data/quiz';
import { SOURCES_BY_ID } from '../data/sources';
import {
  allAnswered,
  computeResult,
  progressPercent,
  sanitizeAnswers,
  validateStep,
} from '../utils/checklist';
import type { ChecklistAnswers } from '../types';

const best: ChecklistAnswers = {
  structure: 'installment',
  transparency: 'clear',
  mechanism: 'understand',
  sharia: 'found',
  readiness: 'understand',
};

describe('checklist logic', () => {
  it('has five steps in the specified order', () => {
    expect(CHECKLIST_STEPS.map((s) => s.id)).toEqual([
      'structure', 'transparency', 'mechanism', 'sharia', 'readiness',
    ]);
  });

  it('validates that a step must be answered', () => {
    expect(validateStep(0, {})).toMatch(/Pilih/);
    expect(validateStep(0, { structure: 'cash' })).toBeNull();
    expect(validateStep(0, { structure: 'bogus' })).not.toBeNull();
    expect(validateStep(99, {})).not.toBeNull();
  });

  it('reports progress as 20%..100%', () => {
    expect([0, 1, 2, 3, 4].map(progressPercent)).toEqual([20, 40, 60, 80, 100]);
  });

  it('allAnswered requires every step', () => {
    expect(allAnswered(best)).toBe(true);
    expect(allAnswered({ ...best, sharia: undefined })).toBe(false);
  });

  it('result is "understood" only when all steps are clear', () => {
    const r = computeResult(best, 'paylater');
    expect(r.state).toBe('understood');
    expect(r.missing).toHaveLength(0);
  });

  it('result is "needs_checking" for 1-2 unresolved items', () => {
    const r = computeResult({ ...best, transparency: 'unclear', sharia: 'need_check' }, 'paylater');
    expect(r.state).toBe('needs_checking');
    expect(r.missing.map((m) => m.stepId)).toEqual(['transparency', 'sharia']);
  });

  it('result is "not_understood" for 3+ unresolved items', () => {
    const r = computeResult(
      { ...best, transparency: 'unclear', mechanism: 'partial', sharia: 'need_check' },
      'shopping',
    );
    expect(r.state).toBe('not_understood');
  });

  it('result is "not_understood" when the user says they do not understand', () => {
    const r = computeResult({ ...best, readiness: 'not_understand' }, 'gold');
    expect(r.state).toBe('not_understood');
  });

  it('unknown structure counts as unresolved and pulls in the akad lesson', () => {
    const r = computeResult({ ...best, structure: 'unknown' }, 'subscription');
    expect(r.missing.map((m) => m.stepId)).toContain('structure');
    expect(r.lessonIds).toContain('akad-transaksi-digital');
  });

  it('never claims halal/haram/certification in any result copy', () => {
    const states: ChecklistAnswers[] = [
      best,
      { ...best, transparency: 'unclear' },
      { structure: 'unknown', transparency: 'not_checked', mechanism: 'not_understand', sharia: 'dont_know', readiness: 'not_understand' },
    ];
    for (const a of states) {
      const r = computeResult(a, 'paylater');
      const text = [r.title, r.description, ...r.missing.map((m) => m.hint)].join(' ').toLowerCase();
      expect(text).not.toMatch(/\bhalal\b|\bharam\b|bersertifikat|sesuai syariah|aman/);
    }
  });

  it('sanitizeAnswers drops unknown keys and options', () => {
    expect(sanitizeAnswers({ structure: 'cash', transparency: 'zzz', extra: 'x', mechanism: 5 })).toEqual({ structure: 'cash' });
    expect(sanitizeAnswers(null)).toEqual({});
  });
});

describe('content integrity', () => {
  it('contains the mandatory disclaimer text', () => {
    expect(DISCLAIMER).toContain('bukan fatwa, nasihat keuangan profesional, atau sertifikasi kepatuhan syariah');
  });

  it('every referenced source, lesson and scenario exists', () => {
    const lessonIds = new Set(LESSONS.map((l) => l.id));
    const scenarioIds = new Set(SCENARIOS.map((s) => s.id));
    for (const l of LESSONS) for (const id of l.sourceIds) expect(SOURCES_BY_ID[id]).toBeDefined();
    for (const c of CATEGORIES) {
      for (const id of c.sourceIds) expect(SOURCES_BY_ID[id]).toBeDefined();
      for (const id of c.lessonIds) expect(lessonIds.has(id)).toBe(true);
      expect(scenarioIds.has(c.scenarioId)).toBe(true);
    }
    for (const s of SCENARIOS) expect(lessonIds.has(s.lessonId)).toBe(true);
  });

  it('scenarios and quiz have valid answer keys and explanations', () => {
    for (const s of SCENARIOS) {
      expect(s.correctIndex).toBeGreaterThanOrEqual(0);
      expect(s.correctIndex).toBeLessThan(s.options.length);
      expect(s.explanations).toHaveLength(s.options.length);
    }
    for (const q of QUIZ) {
      expect(q.correctIndex).toBeLessThan(q.options.length);
      expect(q.explanation.length).toBeGreaterThan(5);
    }
    expect(new Set(QUIZ.map((q) => q.id)).size).toBe(QUIZ.length);
  });

  it('every source states verification status and review date', () => {
    for (const s of Object.values(SOURCES_BY_ID)) {
      expect(s.verificationNote.length).toBeGreaterThan(10);
      expect(s.lastVerified).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(s.url).toMatch(/^https:\/\//);
    }
    for (const l of LESSONS) expect(l.reviewedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});
