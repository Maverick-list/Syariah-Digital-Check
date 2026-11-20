import AsyncStorage from '@react-native-async-storage/async-storage';
import type { PersistedState } from '../types';
import { STORAGE_KEY, initialState, parsePersisted } from '../store/reducer';

/** Memuat state lokal. JSON rusak/tidak ada -> state awal (tidak melempar). */
export async function loadState(): Promise<PersistedState> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...initialState };
    return parsePersisted(JSON.parse(raw));
  } catch {
    return { ...initialState };
  }
}

export async function saveState(state: PersistedState): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export async function clearState(): Promise<void> {
  await AsyncStorage.removeItem(STORAGE_KEY);
}

export interface ExportPackage {
  application: 'Syariah Digital Check';
  formatVersion: 1;
  exportedAt: string;
  data: PersistedState;
}

/**
 * Menghasilkan data cadangan terformat JSON yang aman dan portabel.
 * Menegakkan prinsip minimisasi data: hanya progres dan preferensi lokal, tanpa data pribadi sensitif.
 */
export function exportUserDataJSON(state: PersistedState): string {
  const payload: ExportPackage = {
    application: 'Syariah Digital Check',
    formatVersion: 1,
    exportedAt: new Date().toISOString(),
    data: {
      version: 1,
      onboardingDone: state.onboardingDone,
      displayName: state.displayName,
      preferences: state.preferences,
      checks: state.checks,
      draft: null, // Draft transaksi sementara tidak diexport demi higienitas data
      lessonsRead: state.lessonsRead,
      bookmarkedLessons: state.bookmarkedLessons || [],
      scenariosDone: state.scenariosDone,
      quizAttempts: state.quizAttempts,
      activity: state.activity,
    },
  };
  return JSON.stringify(payload, null, 2);
}

/**
 * Memvalidasi dan mengimpor file cadangan JSON pengguna.
 * Menolak format yang tidak valid, rusak, atau mengandung struktur berbahaya.
 */
export function validateAndParseBackupJSON(
  jsonString: string,
): { ok: true; state: PersistedState } | { ok: false; error: string } {
  try {
    const parsed = JSON.parse(jsonString);
    if (!parsed || typeof parsed !== 'object') {
      return { ok: false, error: 'Format berkas JSON tidak valid.' };
    }

    // Mendukung baik format ExportPackage resmi maupun direct PersistedState
    const rawState =
      'application' in parsed && parsed.application === 'Syariah Digital Check' && 'data' in parsed
        ? parsed.data
        : parsed;

    if (!rawState || typeof rawState !== 'object') {
      return { ok: false, error: 'Struktur data cadangan tidak dikenali.' };
    }

    const state = parsePersisted(rawState);
    return { ok: true, state };
  } catch (err) {
    return {
      ok: false,
      error: `Gagal membaca berkas JSON: ${err instanceof Error ? err.message : 'Format rusak'}`,
    };
  }
}
