import {
  CloudSyncEngine,
  reconcileSetUnion,
  reconcileAssessments,
  reconcileQuizAttempts,
  reconcileProfileDisplayName,
} from '../services/cloudSync';
import { initialState } from '../store/reducer';
import type { CheckRecord, PersistedState, QuizAttempt } from '../types';

describe('Phase 13 — Cloud Synchronization & Hybrid Storage Engine', () => {
  let engine: CloudSyncEngine;

  beforeEach(() => {
    engine = new CloudSyncEngine('https://test-project.supabase.co', 'test-anon-key');
  });

  test('Guest-First: Unauthenticated user stays in local guest mode with 0 network calls', async () => {
    const localState: PersistedState = {
      ...initialState,
      displayName: 'Tamu',
      lessonsRead: ['akad-transaksi-digital'],
    };

    expect(engine.isAuthenticated()).toBe(false);

    const { result, reconciledState } = await engine.synchronize(localState);

    expect(result.success).toBe(true);
    expect(result.status).toBe('guest_local');
    expect(result.message).toContain('Mode Tamu');
    expect(reconciledState.lessonsRead).toEqual(['akad-transaksi-digital']);
  });

  test('Offline Resilience: Authenticated user when offline caches locally without error', async () => {
    engine.setSession({
      user: { id: 'usr-123', email: 'user@test.local', displayName: 'Fulan' },
      accessToken: 'valid-jwt-token',
      expiresAt: Date.now() + 3600000,
    });
    engine.setOnlineStatus(false); // Simulate offline / no internet

    expect(engine.isAuthenticated()).toBe(true);

    const localState: PersistedState = {
      ...initialState,
      displayName: 'Fulan',
      lessonsRead: ['transparansi-biaya'],
    };

    const { result, reconciledState } = await engine.synchronize(localState);

    expect(result.success).toBe(true);
    expect(result.status).toBe('offline_cached');
    expect(result.message).toContain('Koneksi terputus');
    expect(reconciledState.lessonsRead).toEqual(['transparansi-biaya']);
  });

  test('Conflict Resolution: Lessons & Scenarios union guarantees zero data loss', () => {
    const deviceA_lessons = ['akad-transaksi-digital', 'transparansi-biaya'];
    const deviceB_lessons = ['transparansi-biaya', 'risiko-investasi', 'dropshipping-kepemilikan'];

    const merged = reconcileSetUnion(deviceA_lessons, deviceB_lessons);

    expect(merged.length).toBe(4);
    expect(merged).toContain('akad-transaksi-digital');
    expect(merged).toContain('transparansi-biaya');
    expect(merged).toContain('risiko-investasi');
    expect(merged).toContain('dropshipping-kepemilikan');
  });

  test('Conflict Resolution: Assessment records merge by ID without duplicate records', () => {
    const check1: CheckRecord = {
      id: 'chk_paylater_01',
      date: '2026-11-18T10:00:00Z',
      category: 'paylater',
      answers: [] as any,
      resultState: 'understood',
      unresolvedCount: 0,
    };
    const check2: CheckRecord = {
      id: 'chk_gold_02',
      date: '2026-11-19T14:00:00Z',
      category: 'gold',
      answers: [] as any,
      resultState: 'needs_checking',
      unresolvedCount: 1,
    };
    const check1Updated: CheckRecord = {
      id: 'chk_paylater_01',
      date: '2026-11-20T08:00:00Z', // Later timestamp
      category: 'paylater',
      answers: [] as any,
      resultState: 'understood',
      unresolvedCount: 0,
    };

    const localChecks = [check1, check2];
    const remoteChecks = [check1Updated];

    const reconciled = reconcileAssessments(localChecks, remoteChecks);

    expect(reconciled.length).toBe(2);
    // Should preserve latest evaluated check1Updated
    const foundCheck1 = reconciled.find((c) => c.id === 'chk_paylater_01');
    expect(foundCheck1?.date).toBe('2026-11-20T08:00:00Z');
  });

  test('Conflict Resolution: Quiz attempts are combined without dropping history', () => {
    const attempt1: QuizAttempt = {
      id: 'qz_1',
      date: '2026-11-18',
      score: 4,
      total: 5,
    };
    const attempt2: QuizAttempt = {
      id: 'qz_2',
      date: '2026-11-19',
      score: 5,
      total: 5,
    };

    const reconciled = reconcileQuizAttempts([attempt1], [attempt2]);

    expect(reconciled.length).toBe(2);
    expect(reconciled.map((a) => a.id)).toEqual(expect.arrayContaining(['qz_1', 'qz_2']));
  });

  test('Conflict Resolution: Profile display name falls back gracefully to non-empty name', () => {
    expect(reconcileProfileDisplayName('', 'Aisyah')).toBe('Aisyah');
    expect(reconcileProfileDisplayName('Fatih', '')).toBe('Fatih');
    expect(reconcileProfileDisplayName('', '')).toBe('Tamu');
  });

  test('End-to-End Sync: Authenticated online user reconciles local and remote delta', async () => {
    engine.setSession({
      user: { id: 'usr-456', email: 'fatih@test.local', displayName: 'Fatih' },
      accessToken: 'valid-jwt-token',
      expiresAt: Date.now() + 3600000,
    });
    engine.setOnlineStatus(true);

    const localState: PersistedState = {
      ...initialState,
      displayName: 'Fatih',
      lessonsRead: ['akad-transaksi-digital'],
      checks: [
        {
          id: 'chk_local_1',
          date: '2026-11-20T10:00:00Z',
          category: 'paylater',
          answers: [] as any,
          resultState: 'understood',
          unresolvedCount: 0,
        },
      ],
    };

    const mockRemoteState: Partial<PersistedState> = {
      displayName: 'Fatih',
      lessonsRead: ['transparansi-biaya'],
      checks: [
        {
          id: 'chk_remote_2',
          date: '2026-11-20T11:00:00Z',
          category: 'gold',
          answers: [] as any,
          resultState: 'understood',
          unresolvedCount: 0,
        },
      ],
    };

    const { result, reconciledState } = await engine.synchronize(localState, mockRemoteState);

    expect(result.success).toBe(true);
    expect(result.status).toBe('synced');
    expect(result.recordsUploaded).toBe(1);
    expect(result.recordsDownloaded).toBe(1);
    expect(reconciledState.lessonsRead).toEqual(
      expect.arrayContaining(['akad-transaksi-digital', 'transparansi-biaya']),
    );
    expect(reconciledState.checks.length).toBe(2);
  });
});
