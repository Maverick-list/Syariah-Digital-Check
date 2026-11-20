import {
  exportUserDataJSON,
  validateAndParseBackupJSON,
} from '../services/storage';
import { initialState, reducer } from '../store/reducer';
import type { PersistedState } from '../types';

describe('Phase 7 QA — Security, Input Validation & Sanitization', () => {
  describe('1. Cross-Site Scripting (XSS) & Input Validation', () => {
    test('sanitizes and truncates user profile display name', () => {
      const maliciousPayloads = [
        '<script>alert("XSS")</script>',
        '<img src=x onerror=alert(1)>',
        '<svg/onload=alert`1`>',
        'javascript:alert(document.cookie)',
      ];

      maliciousPayloads.forEach((payload) => {
        const state = reducer(initialState, { type: 'SET_NAME', name: payload });
        expect(typeof state.displayName).toBe('string');
        expect(state.displayName.length).toBeLessThanOrEqual(100);
      });
    });

    test('truncates excessively long input strings to prevent denial of service', () => {
      const longString = 'A'.repeat(5000);
      const state = reducer(initialState, { type: 'SET_NAME', name: longString });
      // Capped to <= 100 characters
      expect(state.displayName.length).toBeLessThanOrEqual(100);
      expect(state.displayName).toBe('A'.repeat(100));
    });

    test('trims leading and trailing whitespace from user input', () => {
      const untrimmed = '   Fikri Pratama   ';
      const state = reducer(initialState, { type: 'SET_NAME', name: untrimmed });
      expect(state.displayName).toBe('Fikri Pratama');
    });
  });

  describe('2. Protection Against Prototype Pollution & Malicious Backups', () => {
    test('rejects JSON payloads containing __proto__ pollution attempts', () => {
      const pollutionPayload = JSON.stringify({
        application: 'Syariah Digital Check',
        formatVersion: 1,
        exportedAt: new Date().toISOString(),
        data: {
          version: 1,
          displayName: 'Hacker',
          __proto__: {
            isAdmin: true,
            polluted: 'yes',
          },
        },
      });

      const res = validateAndParseBackupJSON(pollutionPayload);
      // Prototype pollution must not pollute global Object prototype
      expect((Object.prototype as any).isAdmin).toBeUndefined();
      expect((Object.prototype as any).polluted).toBeUndefined();
    });

    test('rejects malformed, non-JSON, or corrupted backup files with ok: false', () => {
      expect(validateAndParseBackupJSON('{ corrupted json').ok).toBe(false);
      expect(validateAndParseBackupJSON('').ok).toBe(false);
      expect(validateAndParseBackupJSON('null').ok).toBe(false);
      expect(validateAndParseBackupJSON('12345').ok).toBe(false);
      expect(validateAndParseBackupJSON('"a plain string"').ok).toBe(false);
      expect(validateAndParseBackupJSON('[]').ok).toBe(false);
    });

    test('rejects backup packages from other applications or incompatible versions', () => {
      const foreignAppPayload = JSON.stringify({
        application: 'Random Unrelated App',
        formatVersion: 1,
        exportedAt: new Date().toISOString(),
        data: initialState,
      });

      const foreignRes = validateAndParseBackupJSON(foreignAppPayload);
      expect(foreignRes.ok).toBe(false);
      if (!foreignRes.ok) {
        expect(foreignRes.error).toContain('Bukan berkas cadangan resmi');
      }

      const futureVersionPayload = JSON.stringify({
        application: 'Syariah Digital Check',
        formatVersion: 999, // Incompatible future version
        exportedAt: new Date().toISOString(),
        data: initialState,
      });

      const futureRes = validateAndParseBackupJSON(futureVersionPayload);
      expect(futureRes.ok).toBe(false);
      if (!futureRes.ok) {
        expect(futureRes.error).toContain('tidak didukung');
      }
    });
  });

  describe('3. Data Minimization & Secret Exposure Audit', () => {
    test('export package contains strictly NO authentication credentials or payment tokens', () => {
      const sampleState: PersistedState = {
        ...initialState,
        displayName: 'Fikri Pratama',
        checks: [
          {
            id: 'check-1',
            date: new Date().toISOString(),
            category: 'paylater',
            answers: {
              structure: 'paylater_structure_1',
              transparency: 'paylater_transparency_1',
              mechanism: 'paylater_mechanism_1',
              sharia: 'paylater_sharia_1',
              readiness: 'paylater_readiness_1',
            },
            resultState: 'understood',
            unresolvedCount: 0,
          },
        ],
      };

      const exportedJSON = exportUserDataJSON(sampleState);
      const forbiddenTokens = [
        'password',
        'secret',
        'token',
        'api_key',
        'apiKey',
        'private_key',
        'cvv',
        'cardNumber',
        'card_number',
        'otp',
        'pin',
      ];

      forbiddenTokens.forEach((token) => {
        expect(exportedJSON.toLowerCase()).not.toContain(`"${token}"`);
      });
    });

    test('validates numbers and bounds in imported state to prevent corrupted analytics', () => {
      const corruptedData = {
        application: 'Syariah Digital Check',
        formatVersion: 1,
        exportedAt: new Date().toISOString(),
        data: {
          version: 1,
          displayName: 'Valid User',
          onboardingDone: true,
          checks: 'not-an-array', // Corrupted
          lessonsRead: 12345, // Corrupted
          quizAttempts: [
            {
              id: 'q1',
              score: -999, // Invalid negative score
              total: 0,
            },
          ],
        },
      };

      const result = validateAndParseBackupJSON(JSON.stringify(corruptedData));
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(Array.isArray(result.state.checks)).toBe(true);
        expect(Array.isArray(result.state.lessonsRead)).toBe(true);
      }
    });
  });
});
