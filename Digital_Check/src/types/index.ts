export type TransactionCategory =
  | 'paylater'
  | 'lending'
  | 'shopping'
  | 'subscription'
  | 'gold'
  | 'savings'
  | 'investment'
  | 'donation'
  | 'other';

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

export type ClarityLevel = 'Tinggi' | 'Sedang' | 'Perlu Verifikasi' | 'Belum Cukup Informasi';

export interface MissingItem {
  stepId: StepId;
  label: string;
  hint: string;
}

export interface EvaluatedRisk {
  severity: 'high' | 'medium' | 'low';
  title: string;
  description: string;
}

export interface ContractObservation {
  dimension: string;
  finding: string;
  guidance: string;
}

export interface FiqhPrinciple {
  arabic: string;
  transliteration: string;
  meaning: string;
  application: string;
}

export interface UserResponseSummary {
  stepId: StepId;
  stageTag: string;
  question: string;
  selectedOptionLabel: string;
  status: AnswerStatus;
}

export interface NextStepGuidance {
  pauseAdvice: string;
  checkAdvice: string;
  chooseAdvice: string;
}

export interface TransactionOverview {
  category: TransactionCategory;
  categoryLabel: string;
  clarityLevel: ClarityLevel;
  score: number;
  evaluatedAt: string;
  summary: string;
}

export interface CheckResult {
  state: ResultState;
  title: string;
  description: string;
  missing: MissingItem[];
  questions: string[];
  lessonIds: string[];
  sourceIds: string[];
  score: number;
  clarityLevel: ClarityLevel;
  category: TransactionCategory;
  categoryLabel: string;
  evaluatedAt: string;
  overview: TransactionOverview;
  userResponses: UserResponseSummary[];
  identifiedRisks: EvaluatedRisk[];
  observations: ContractObservation[];
  principles: FiqhPrinciple[];
  sources?: SourceRef[];
  questionsToProvider: string[];
  nextSteps: NextStepGuidance;
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

/** Status alur review tata kelola konten */
export type ContentStatus =
  | 'Draft'
  | 'Needs Verification'
  | 'Under Review'
  | 'Approved'
  | 'Published'
  | 'Archived';

/** Status keberlakuan hukum/fatwa */
export type ValidityStatus = 'Berlaku' | 'Dicabut' | 'Diubah';

export interface SourceRef {
  id: string;
  title: string;
  documentNumber: string;
  publisher: string;
  publicationDate?: string;
  effectiveDate?: string;
  validityStatus: ValidityStatus;
  revocationNote?: string;
  /** URL dokumen resmi atau portal resmi regulator */
  url: string;
  kind: 'fatwa' | 'regulator' | 'portal';
  relevantClauses: string[];
  /** Tanggal terakhir metadata sumber ini dicek (ISO: YYYY-MM-DD). */
  lastVerified: string;
  reviewStatus: ContentStatus;
  /** Apa yang sudah diverifikasi, ditulis secara jujur dan transparan. */
  verificationNote: string;
  relatedContentIds?: string[];
}

export interface FurtherReading {
  title: string;
  url: string;
}

export interface Lesson {
  id: string;
  title: string;
  category: string;
  readingMinutes: number;
  summary: string;
  learningObjectives: string[];
  conceptExplanation: string;
  applicableContext: string;
  practicalExample: string;
  relevantPrinciples: string[];
  body: string[];
  keyPoints: string[];
  sourceIds: string[];
  importantLimitations: string[];
  furtherReading?: FurtherReading[];
  reviewStatus: ContentStatus;
  reviewedAt: string;
  reviewer?: string;
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
  sourceIds?: string[];
  reviewStatus?: ContentStatus;
  reviewedAt?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  sourceIds?: string[];
  reviewStatus?: ContentStatus;
  reviewedAt?: string;
}
