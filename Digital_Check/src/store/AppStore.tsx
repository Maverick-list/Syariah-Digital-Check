import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';
import type { PersistedState } from '../types';
import { initialState, reducer, type Action } from './reducer';
import { loadState, saveState } from '../services/storage';

interface StoreValue {
  state: PersistedState;
  /** true setelah data lokal selesai dimuat. */
  ready: boolean;
  /** pesan bila penyimpanan lokal gagal (progres tidak tersimpan). */
  saveError: string | null;
  dispatch: React.Dispatch<Action>;
}

const StoreContext = createContext<StoreValue | null>(null);

export function AppStoreProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [ready, setReady] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const hydrated = useRef(false);

  useEffect(() => {
    let alive = true;
    loadState().then((s) => {
      if (!alive) return;
      dispatch({ type: 'HYDRATE', state: s });
      hydrated.current = true;
      setReady(true);
    });
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    saveState(state)
      .then(() => setSaveError(null))
      .catch(() =>
        setSaveError('Progres belum dapat disimpan di perangkat ini. Periksa ruang penyimpanan.'),
      );
  }, [state]);

  const value = useMemo(() => ({ state, ready, saveError, dispatch }), [state, ready, saveError]);
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useAppStore(): StoreValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useAppStore harus dipakai di dalam AppStoreProvider');
  return ctx;
}
