import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEY, initialState, parsePersisted, reducer } from '../store/reducer';
import { clearState, loadState, saveState } from '../services/storage';
import type { PersistedState } from '../types';

beforeEach(async () => {
  await AsyncStorage.clear();
});

describe('reducer', () => {
  it('completes onboarding', () => {
    expect(reducer(initialState, { type: 'COMPLETE_ONBOARDING' }).onboardingDone).toBe(true);
  });

  it('adds a check, clears the draft and logs activity', () => {
    const withDraft = reducer(initialState, {
      type: 'SAVE_DRAFT',
      draft: { category: 'paylater', step: 2, answers: { structure: 'cash' }, startedAt: 't' },
    });
    const next = reducer(withDraft, {
      type: 'ADD_CHECK',
      text: 'Selesai',
      record: { id: 'c1', date: '2026-10-18T00:00:00Z', category: 'paylater', answers: {}, resultState: 'needs_checking', unresolvedCount: 2 },
    });
    expect(next.checks).toHaveLength(1);
    expect(next.draft).toBeNull();
    expect(next.activity[0].text).toBe('Selesai');
  });

  it('marks lessons/scenarios only once', () => {
    const a = reducer(initialState, { type: 'MARK_LESSON_READ', lessonId: 'x', title: 'X', at: 't' });
    const b = reducer(a, { type: 'MARK_LESSON_READ', lessonId: 'x', title: 'X', at: 't' });
    expect(b).toBe(a);
    const c = reducer(b, { type: 'MARK_SCENARIO_DONE', scenarioId: 's', title: 'S', at: 't' });
    expect(reducer(c, { type: 'MARK_SCENARIO_DONE', scenarioId: 's', title: 'S', at: 't' })).toBe(c);
  });

  it('reset keeps name and onboarding but clears progress', () => {
    let s: PersistedState = reducer(initialState, { type: 'SET_NAME', name: 'Firza' });
    s = reducer(s, { type: 'COMPLETE_ONBOARDING' });
    s = reducer(s, { type: 'MARK_LESSON_READ', lessonId: 'x', title: 'X', at: 't' });
    s = reducer(s, { type: 'ADD_QUIZ_ATTEMPT', attempt: { id: 'q', date: 'd', score: 3, total: 8 } });
    const r = reducer(s, { type: 'RESET_PROGRESS' });
    expect(r.displayName).toBe('Firza');
    expect(r.onboardingDone).toBe(true);
    expect(r.lessonsRead).toEqual([]);
    expect(r.quizAttempts).toEqual([]);
    expect(r.activity).toEqual([]);
  });

  it('caps activity length', () => {
    let s = initialState;
    for (let i = 0; i < 40; i++) {
      s = reducer(s, { type: 'MARK_LESSON_READ', lessonId: `l${i}`, title: `L${i}`, at: 't' });
    }
    expect(s.activity.length).toBeLessThanOrEqual(20);
  });
});

describe('persistence (AsyncStorage)', () => {
  it('returns defaults when nothing is stored', async () => {
    expect(await loadState()).toEqual(initialState);
  });

  it('round-trips state — onboarding completion survives a "restart"', async () => {
    let s = reducer(initialState, { type: 'COMPLETE_ONBOARDING' });
    s = reducer(s, { type: 'SET_NAME', name: 'Firza' });
    s = reducer(s, { type: 'MARK_LESSON_READ', lessonId: 'akad-transaksi-digital', title: 'A', at: '2026-10-18T00:00:00Z' });
    s = reducer(s, { type: 'SAVE_DRAFT', draft: { category: 'gold', step: 3, answers: { structure: 'cash', transparency: 'clear' }, startedAt: 't' } });
    await saveState(s);
    const loaded = await loadState();
    expect(loaded.onboardingDone).toBe(true);
    expect(loaded.displayName).toBe('Firza');
    expect(loaded.lessonsRead).toEqual(['akad-transaksi-digital']);
    expect(loaded.draft).toEqual(s.draft);
  });

  it('recovers from corrupted JSON', async () => {
    await AsyncStorage.setItem(STORAGE_KEY, '{not json');
    expect(await loadState()).toEqual(initialState);
  });

  it('sanitizes malformed fields instead of crashing', async () => {
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        version: 1,
        onboardingDone: 'yes',
        displayName: 42,
        checks: [{ bad: true }, null],
        quizAttempts: [{ id: 'q', date: 'd', score: 99, total: 8 }],
        lessonsRead: ['a', 'a', 7],
        draft: { category: 'nope', step: 1, answers: {}, startedAt: 't' },
      }),
    );
    const s = await loadState();
    expect(s.onboardingDone).toBe(false);
    expect(s.displayName).toBe('');
    expect(s.checks).toEqual([]);
    expect(s.quizAttempts).toEqual([]);
    expect(s.lessonsRead).toEqual(['a']);
    expect(s.draft).toBeNull();
  });

  it('clamps draft step and ignores unknown versions', () => {
    const d = parsePersisted({ version: 1, draft: { category: 'paylater', step: 99, answers: { structure: 'cash', junk: 1 }, startedAt: 't' } });
    expect(d.draft?.step).toBe(4);
    expect(d.draft?.answers).toEqual({ structure: 'cash' });
    expect(parsePersisted({ version: 2, onboardingDone: true })).toEqual(initialState);
  });

  it('clearState removes stored data', async () => {
    await saveState({ ...initialState, onboardingDone: true });
    await clearState();
    expect((await loadState()).onboardingDone).toBe(false);
  });
});
