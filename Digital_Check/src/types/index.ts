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
  topic?: string;
  accuracyPercent?: number;
}

export interface ActivityEntry {
  date: string;
  text: string;
}

export interface UserPreferences {
  theme?: 'system' | 'light' | 'dark';
  analyticsEnabled?: boolean;
  privacyPledgeAccepted?: boolean;
  cloudSyncNoticeDismissed?: boolean;
}

export interface PersistedState {
  version: 1;
  onboardingDone: boolean;
  displayName: string;
  preferences?: UserPreferences;
  checks: CheckRecord[];
  draft: ChecklistDraft | null;
  lessonsRead: string[];
  bookmarkedLessons?: string[];
  scenariosDone: string[];
  quizAttempts: QuizAttempt[];
  activity: ActivityEntry[];
}

/** Entitas umpan balik pengguna beta terstruktur (Fase 11) */
export interface UserBetaFeedback {
  id: string;
  rating: number; // 1 - 5
  category: string;
  issues: string[];
  email?: string;
  message: string;
  timestamp: string;
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
  introduction?: string;
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
  relatedLessonIds?: string[];
  reviewStatus: ContentStatus;
  reviewedAt: string;
  reviewer?: string;
}

export interface ScenarioFiqhPrinciple {
  arabic?: string;
  translit?: string;
  translation: string;
  application: string;
}

export interface ScenarioAnalysis {
  facts: string[];
  assumptions: string[];
  interpretations: string[];
  conclusion: string;
}

export interface ScenarioContractStructure {
  name: string;
  description: string;
  idealAkad: string;
}

export interface ScenarioFlow {
  moneyFlow: string;
  ownershipFlow: string;
}

export interface ScenarioExercise {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Scenario {
  id: string;
  title: string;
  icon: string;
  category: TransactionCategory;
  categoryLabel: string;
  isSimulation?: boolean;
  simulationNotice?: string;
  story: string;
  background?: string;
  partiesInvolved?: string[];
  chronology?: string[];
  contractStructure?: ScenarioContractStructure;
  moneyAndOwnershipFlow?: ScenarioFlow;
  fiqhPrinciples?: ScenarioFiqhPrinciple[];
  criticalQuestions?: string[];
  analysis?: ScenarioAnalysis;
  limitations?: string[];
  practicalLessons?: string[];
  exercise?: ScenarioExercise;
  question: string;
  options: string[];
  correctIndex: number;
  explanations: string[];
  lessonId: string;
  sourceIds?: string[];
  reviewStatus?: ContentStatus;
  reviewedAt?: string;
  reviewer?: string;
}

export type QuizDifficulty = 'mudah' | 'sedang' | 'sulit';

export interface QuizQuestion {
  id: string;
  topic?: string;
  difficulty?: QuizDifficulty;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  optionExplanations?: string[];
  sourceIds?: string[];
  reviewStatus?: ContentStatus;
  reviewedAt?: string;
  reviewer?: string;
}
