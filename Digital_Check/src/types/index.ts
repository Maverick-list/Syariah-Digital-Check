export type TransactionCategory =
  | 'shopping'
  | 'paylater'
  | 'gold'
  | 'savings'
  | 'subscription'
  | 'donation';

export type StepId =
  | 'structure'
  | 'transparency'
  | 'mechanism'
  | 'sharia'
  | 'readiness';

/** clear = informasi sudah jelas, partial = perlu dicek sebagian, unknown = belum diketahui/diperiksa */
export type AnswerStatus = 'clear' | 'partial' | 'unknown';

export interface ChecklistOption {
  id: string;
  label: string;
  status: AnswerStatus;
}

export interface ChecklistStepDef {
  id: StepId;
  topic: string;
  question: string;
  help: string;
  /** Label ringkas untuk daftar "Yang perlu kamu periksa" di hasil. */
  missingLabel: string;
  missingHint: string;
  options: ChecklistOption[];
}

export type ChecklistAnswers = Partial<Record<StepId, string>>;

export interface ChecklistDraft {
  category: TransactionCategory;
  step: number;
  answers: ChecklistAnswers;
  startedAt: string;
}

export type ResultState = 'understood' | 'needs_checking' | 'not_understood';

export interface MissingItem {
  stepId: StepId;
  label: string;
  hint: string;
}

export interface CheckResult {
  state: ResultState;
  title: string;
  description: string;
  missing: MissingItem[];
  questions: string[];
  lessonIds: string[];
  sourceIds: string[];
}

export interface CheckRecord {
  id: string;
  date: string;
  category: TransactionCategory;
  answers: ChecklistAnswers;
  resultState: ResultState;
  unresolvedCount: number;
}

export interface QuizAttempt {
  id: string;
  date: string;
  score: number;
  total: number;
}

export interface ActivityEntry {
  date: string;
  text: string;
}

export interface PersistedState {
  version: 1;
  onboardingDone: boolean;
  displayName: string;
  checks: CheckRecord[];
  draft: ChecklistDraft | null;
  lessonsRead: string[];
  scenariosDone: string[];
  quizAttempts: QuizAttempt[];
  activity: ActivityEntry[];
}

export interface SourceRef {
  id: string;
  title: string;
  publisher: string;
  /** Hanya URL beranda situs resmi; tautan dalam tidak dipakai karena belum diverifikasi. */
  url: string;
  kind: 'fatwa' | 'regulator' | 'portal';
  /** Tanggal terakhir metadata sumber ini dicek (ISO). */
  lastVerified: string;
  /** Apa yang sudah diverifikasi, ditulis jujur. */
  verificationNote: string;
}

export interface Lesson {
  id: string;
  title: string;
  category: string;
  readingMinutes: number;
  summary: string;
  body: string[];
  keyPoints: string[];
  sourceIds: string[];
  reviewedAt: string;
}

export interface Scenario {
  id: string;
  title: string;
  icon: string;
  category: TransactionCategory;
  categoryLabel: string;
  story: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanations: string[];
  lessonId: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}
