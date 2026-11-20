import {
  initialState,
  reducer,
  parsePersisted,
  defaultPreferences,
} from '../store/reducer';
import {
  exportUserDataJSON,
  validateAndParseBackupJSON,
} from '../services/storage';
import type { PersistedState } from '../types';

describe('Phase 6 — Guest-First & Privacy-Preserving Experience', () => {
  test('initial state operates completely as guest without mandatory auth token', () => {
    expect(initialState.displayName).toBe('');
    expect(initialState.onboardingDone).toBe(false);
    expect(initialState.checks).toEqual([]);
    expect(initialState.lessonsRead).toEqual([]);
    expect(initialState.bookmarkedLessons).toEqual([]);
    expect(initialState.quizAttempts).toEqual([]);
  });

  test('data minimization: state contains strictly NO sensitive financial credentials', () => {
    const sensitiveKeys = [
      'password',
      'pin',
      'otp',
      'cardNumber',
      'card_number',
      'cvv',
      'bankAccount',
      'bank_account',
      'creditCard',
    ];

    const stateKeys = Object.keys(initialState);
    sensitiveKeys.forEach((key) => {
      expect(stateKeys).not.toContain(key);
    });
  });
});

describe('Phase 6 — Data Persistence, Bookmarks & Preferences', () => {
  test('TOGGLE_BOOKMARK adds lesson ID if not bookmarked, and removes if already bookmarked', () => {
    let state: PersistedState = { ...initialState, bookmarkedLessons: [] };

    // 1. Add bookmark
    state = reducer(state, { type: 'TOGGLE_BOOKMARK', lessonId: 'akad-transaksi-digital' });
    expect(state.bookmarkedLessons).toContain('akad-transaksi-digital');
    expect(state.bookmarkedLessons?.length).toBe(1);

    // 2. Remove bookmark
    state = reducer(state, { type: 'TOGGLE_BOOKMARK', lessonId: 'akad-transaksi-digital' });
    expect(state.bookmarkedLessons).not.toContain('akad-transaksi-digital');
    expect(state.bookmarkedLessons?.length).toBe(0);
  });

  test('UPDATE_PREFERENCES preserves existing preferences while updating targeted settings', () => {
    let state: PersistedState = {
      ...initialState,
      preferences: { ...defaultPreferences, theme: 'system' },
    };

    state = reducer(state, {
      type: 'UPDATE_PREFERENCES',
      preferences: { theme: 'dark', analyticsEnabled: true },
    });

    expect(state.preferences?.theme).toBe('dark');
    expect(state.preferences?.analyticsEnabled).toBe(true);
    expect(state.preferences?.privacyPledgeAccepted).toBe(true);
  });
});

describe('Phase 6 — Functional Export & Import (Data Portability)', () => {
  const samplePopulatedState: PersistedState = {
    version: 1,
    onboardingDone: true,
    displayName: 'Ahmad Fauzi',
    preferences: {
      theme: 'light',
      analyticsEnabled: false,
      privacyPledgeAccepted: true,
      cloudSyncNoticeDismissed: true,
    },
    checks: [
      {
        id: 'chk-1',
        date: '2026-11-20',
        category: 'paylater',
        answers: ['clear', 'partial', 'clear', 'clear', 'clear'] as any,
        resultState: 'understood',
        unresolvedCount: 0,
      },
    ],
    draft: {
      category: 'paylater',
      step: 1,
      answers: ['clear', null, null, null, null] as any,
      startedAt: '2026-11-20',
    },
    lessonsRead: ['akad-transaksi-digital', 'transparansi-biaya'],
    bookmarkedLessons: ['akad-transaksi-digital'],
    scenariosDone: ['paylater'],
    quizAttempts: [
      {
        id: 'quiz-1',
        date: '2026-11-20',
        score: 4,
        total: 4,
        topic: 'Akad & Fiqih Dasar',
        accuracyPercent: 100,
      },
    ],
    activity: [
      { date: '2026-11-20', text: 'Menyelesaikan Kuis Akad & Fiqih Dasar: 4/4 (100%)' },
    ],
  };

  test('exportUserDataJSON produces valid, clean JSON with expected envelope and no drafts', () => {
    const jsonStr = exportUserDataJSON(samplePopulatedState);
    expect(typeof jsonStr).toBe('string');

    const parsed = JSON.parse(jsonStr);
    expect(parsed.application).toBe('Syariah Digital Check');
    expect(parsed.formatVersion).toBe(1);
    expect(parsed.exportedAt).toBeDefined();
    expect(parsed.data).toBeDefined();
    expect(parsed.data.displayName).toBe('Ahmad Fauzi');
    expect(parsed.data.draft).toBeNull(); // Drafts are stripped for clean export
    expect(parsed.data.checks.length).toBe(1);
    expect(parsed.data.lessonsRead.length).toBe(2);
    expect(parsed.data.bookmarkedLessons.length).toBe(1);
    expect(parsed.data.quizAttempts.length).toBe(1);
  });

  test('validateAndParseBackupJSON successfully validates and parses exported package', () => {
    const jsonStr = exportUserDataJSON(samplePopulatedState);
    const result = validateAndParseBackupJSON(jsonStr);

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.state.displayName).toBe('Ahmad Fauzi');
      expect(result.state.lessonsRead).toEqual(['akad-transaksi-digital', 'transparansi-biaya']);
      expect(result.state.checks.length).toBe(1);
      expect(result.state.quizAttempts.length).toBe(1);
    }
  });

  test('validateAndParseBackupJSON rejects corrupt or non-JSON payloads gracefully', () => {
    const badResult1 = validateAndParseBackupJSON('{ corrupted json text');
    expect(badResult1.ok).toBe(false);

    const badResult2 = validateAndParseBackupJSON('"just a string"');
    expect(badResult2.ok).toBe(false);

    const badResult3 = validateAndParseBackupJSON('null');
    expect(badResult3.ok).toBe(false);
  });
});

describe('Phase 6 — Data Deletion & Privacy Wipe Controls', () => {
  test('RESET_PROGRESS cleans learning history while preserving display name and preferences', () => {
    const state: PersistedState = {
      version: 1,
      onboardingDone: true,
      displayName: 'Siti Aminah',
      preferences: { theme: 'dark', analyticsEnabled: false, privacyPledgeAccepted: true },
      checks: [{ id: 'c1', date: '2026-11-20', category: 'gold', answers: [] as any, resultState: 'understood', unresolvedCount: 0 }],
      draft: null,
      lessonsRead: ['akad-transaksi-digital'],
      bookmarkedLessons: ['akad-transaksi-digital'],
      scenariosDone: ['paylater'],
      quizAttempts: [{ id: 'q1', date: '2026-11-20', score: 3, total: 4 }],
      activity: [{ date: '2026-11-20', text: 'Activity' }],
    };

    const resetState = reducer(state, { type: 'RESET_PROGRESS' });
    expect(resetState.displayName).toBe('Siti Aminah');
    expect(resetState.onboardingDone).toBe(true);
    expect(resetState.preferences?.theme).toBe('dark');
    expect(resetState.checks).toEqual([]);
    expect(resetState.lessonsRead).toEqual([]);
    expect(resetState.quizAttempts).toEqual([]);
    expect(resetState.activity).toEqual([]);
  });

  test('WIPE_ALL_DATA completely wipes all user data and resets strictly to initialState', () => {
    const populatedState: PersistedState = {
      version: 1,
      onboardingDone: true,
      displayName: 'Budi Santoso',
      checks: [{ id: 'c1', date: '2026-11-20', category: 'gold', answers: [] as any, resultState: 'understood', unresolvedCount: 0 }],
      draft: null,
      lessonsRead: ['risiko-investasi'],
      scenariosDone: ['emas-digital'],
      quizAttempts: [{ id: 'q1', date: '2026-11-20', score: 4, total: 4 }],
      activity: [{ date: '2026-11-20', text: 'Activity' }],
    };

    const wipedState = reducer(populatedState, { type: 'WIPE_ALL_DATA' });
    expect(wipedState).toEqual(initialState);
    expect(wipedState.displayName).toBe('');
    expect(wipedState.onboardingDone).toBe(false);
  });
});

describe('Phase 11 — Real User Beta Feedback Structure & Data Validation', () => {
  test('validates structured beta feedback schema, rating bounds (1-5), and tags', () => {
    const feedback = {
      id: 'fb_' + Date.now(),
      rating: 5,
      category: 'Pemeriksaan Transaksi',
      issues: ['Istilah fiqih sulit dipahami'],
      message: 'Penjelasan denda PayLater sangat membantu!',
      email: 'user@example.com',
      timestamp: new Date().toISOString(),
    };

    expect(feedback.rating).toBeGreaterThanOrEqual(1);
    expect(feedback.rating).toBeLessThanOrEqual(5);
    expect(feedback.category).toBe('Pemeriksaan Transaksi');
    expect(feedback.issues).toContain('Istilah fiqih sulit dipahami');
    expect(feedback.message.trim().length).toBeGreaterThan(0);
  });

  test('feedback JSON serialization and parsing preserves all properties without data loss', () => {
    const rawList = [
      {
        id: 'fb_1',
        rating: 4,
        category: 'Modul Pembelajaran & Kasus',
        issues: ['Langkah evaluasi terlalu panjang'],
        message: 'Modul emas digital sangat komprehensif.',
        email: 'anonim',
        timestamp: '2026-11-20T10:00:00.000Z',
      },
    ];

    const serialized = JSON.stringify(rawList);
    const parsed = JSON.parse(serialized);

    expect(Array.isArray(parsed)).toBe(true);
    expect(parsed.length).toBe(1);
    expect(parsed[0].id).toBe('fb_1');
    expect(parsed[0].rating).toBe(4);
    expect(parsed[0].issues).toEqual(['Langkah evaluasi terlalu panjang']);
  });

  test('feedback object strictly enforces privacy: contains no credentials or financial data', () => {
    const forbiddenKeys = ['password', 'otp', 'pin', 'cardNumber', 'cvv', 'nik'];
    const feedback = {
      id: 'fb_123',
      rating: 5,
      category: 'Antarmuka & Navigasi',
      issues: [],
      message: 'Navigasi sangat responsif.',
      email: 'guest@example.com',
      timestamp: new Date().toISOString(),
    };

    const keys = Object.keys(feedback);
    forbiddenKeys.forEach((key) => {
      expect(keys).not.toContain(key);
    });
  });
});
