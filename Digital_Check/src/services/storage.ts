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
