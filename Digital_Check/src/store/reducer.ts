import type { ChecklistDraft, PersistedState, TransactionCategory } from '../types';
import { CATEGORY_BY_ID } from '../data/checklist';
import { TOTAL_STEPS, sanitizeAnswers } from '../utils/checklist';

export const STORAGE_KEY = 'sdc.state.v1';
export const MAX_ACTIVITY = 20;
export const MAX_HISTORY = 100;

export const initialState: PersistedState = {
  version: 1,
  onboardingDone: false,
  displayName: '',
  checks: [],
  draft: null,
  lessonsRead: [],
  scenariosDone: [],
  quizAttempts: [],
  activity: [],
};

const isStr = (v: unknown): v is string => typeof v === 'string';
const isNum = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v);
const isCategory = (v: unknown): v is TransactionCategory =>
  isStr(v) && v in CATEGORY_BY_ID;
const strArray = (v: unknown): string[] =>
  Array.isArray(v) ? Array.from(new Set(v.filter(isStr))) : [];

function parseDraft(v: unknown): ChecklistDraft | null {
  if (!v || typeof v !== 'object') return null;
  const o = v as Record<string, unknown>;
  if (!isCategory(o.category) || !isNum(o.step) || !isStr(o.startedAt)) return null;
  const step = Math.min(TOTAL_STEPS - 1, Math.max(0, Math.trunc(o.step)));
  return { category: o.category, step, answers: sanitizeAnswers(o.answers), startedAt: o.startedAt };
}

/** Memvalidasi & menormalkan data mentah dari penyimpanan; data rusak -> default aman. */
export function parsePersisted(raw: unknown): PersistedState {
  if (!raw || typeof raw !== 'object') return { ...initialState };
  const o = raw as Record<string, unknown>;
  if (o.version !== 1) return { ...initialState };

  const checks = (Array.isArray(o.checks) ? o.checks : []).flatMap((c) => {
    if (!c || typeof c !== 'object') return [];
    const r = c as Record<string, unknown>;
    if (
      !isStr(r.id) ||
      !isStr(r.date) ||
      !isCategory(r.category) ||
      !['understood', 'needs_checking', 'not_understood'].includes(r.resultState as string) ||
      !isNum(r.unresolvedCount)
    )
      return [];
    return [
      {
        id: r.id,
        date: r.date,
        category: r.category,
        answers: sanitizeAnswers(r.answers),
        resultState: r.resultState as PersistedState['checks'][number]['resultState'],
        unresolvedCount: r.unresolvedCount,
      },
    ];
  });

  const quizAttempts = (Array.isArray(o.quizAttempts) ? o.quizAttempts : []).flatMap((a) => {
    if (!a || typeof a !== 'object') return [];
    const r = a as Record<string, unknown>;
    if (!isStr(r.id) || !isStr(r.date) || !isNum(r.score) || !isNum(r.total) || r.total <= 0)
      return [];
    if (r.score < 0 || r.score > r.total) return [];
    return [{ id: r.id, date: r.date, score: r.score, total: r.total }];
  });

  const activity = (Array.isArray(o.activity) ? o.activity : []).flatMap((a) => {
    if (!a || typeof a !== 'object') return [];
    const r = a as Record<string, unknown>;
    return isStr(r.date) && isStr(r.text) ? [{ date: r.date, text: r.text }] : [];
  });

  return {
    version: 1,
    onboardingDone: o.onboardingDone === true,
    displayName: isStr(o.displayName) ? o.displayName.slice(0, 30) : '',
    checks: checks.slice(-MAX_HISTORY),
    draft: parseDraft(o.draft),
    lessonsRead: strArray(o.lessonsRead),
    scenariosDone: strArray(o.scenariosDone),
    quizAttempts: quizAttempts.slice(-MAX_HISTORY),
    activity: activity.slice(-MAX_ACTIVITY),
  };
}

export type Action =
  | { type: 'HYDRATE'; state: PersistedState }
  | { type: 'COMPLETE_ONBOARDING' }
  | { type: 'SET_NAME'; name: string }
  | { type: 'SAVE_DRAFT'; draft: ChecklistDraft }
  | { type: 'CLEAR_DRAFT' }
  | { type: 'ADD_CHECK'; record: PersistedState['checks'][number]; text: string }
  | { type: 'MARK_LESSON_READ'; lessonId: string; title: string; at: string }
  | { type: 'MARK_SCENARIO_DONE'; scenarioId: string; title: string; at: string }
  | { type: 'ADD_QUIZ_ATTEMPT'; attempt: PersistedState['quizAttempts'][number] }
  | { type: 'RESET_PROGRESS' };

const pushActivity = (s: PersistedState, text: string, date: string) =>
  [...s.activity, { date, text }].slice(-MAX_ACTIVITY);

export function reducer(state: PersistedState, action: Action): PersistedState {
  switch (action.type) {
    case 'HYDRATE':
      return action.state;
    case 'COMPLETE_ONBOARDING':
      return { ...state, onboardingDone: true };
    case 'SET_NAME':
      return { ...state, displayName: action.name };
    case 'SAVE_DRAFT':
      return { ...state, draft: action.draft };
    case 'CLEAR_DRAFT':
      return { ...state, draft: null };
    case 'ADD_CHECK':
      return {
        ...state,
        checks: [...state.checks, action.record].slice(-MAX_HISTORY),
        draft: null,
        activity: pushActivity(state, action.text, action.record.date),
      };
    case 'MARK_LESSON_READ':
      if (state.lessonsRead.includes(action.lessonId)) return state;
      return {
        ...state,
        lessonsRead: [...state.lessonsRead, action.lessonId],
        activity: pushActivity(state, `Membaca materi: ${action.title}`, action.at),
      };
    case 'MARK_SCENARIO_DONE':
      if (state.scenariosDone.includes(action.scenarioId)) return state;
      return {
        ...state,
        scenariosDone: [...state.scenariosDone, action.scenarioId],
        activity: pushActivity(state, `Menyelesaikan skenario: ${action.title}`, action.at),
      };
    case 'ADD_QUIZ_ATTEMPT':
      return {
        ...state,
        quizAttempts: [...state.quizAttempts, action.attempt].slice(-MAX_HISTORY),
        activity: pushActivity(
          state,
          `Menyelesaikan kuis: ${action.attempt.score}/${action.attempt.total}`,
          action.attempt.date,
        ),
      };
    case 'RESET_PROGRESS':
      // Nama & status onboarding dipertahankan; semua progres belajar dihapus.
      return {
        ...initialState,
        displayName: state.displayName,
        onboardingDone: state.onboardingDone,
      };
    default:
      return state;
  }
}
