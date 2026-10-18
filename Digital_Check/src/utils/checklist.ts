import {
  CATEGORY_BY_ID,
  CHECKLIST_STEPS,
  GENERIC_QUESTIONS,
  STEP_IDS,
} from '../data/checklist';
import type {
  AnswerStatus,
  ChecklistAnswers,
  ChecklistStepDef,
  CheckResult,
  MissingItem,
  StepId,
  TransactionCategory,
} from '../types';

export const TOTAL_STEPS = CHECKLIST_STEPS.length;

export function getStep(index: number): ChecklistStepDef | undefined {
  return CHECKLIST_STEPS[index];
}

export function statusOf(stepId: StepId, optionId: string | undefined): AnswerStatus | null {
  if (!optionId) return null;
  const step = CHECKLIST_STEPS.find((s) => s.id === stepId);
  return step?.options.find((o) => o.id === optionId)?.status ?? null;
}

export function isStepAnswered(index: number, answers: ChecklistAnswers): boolean {
  const step = getStep(index);
  if (!step) return false;
  return statusOf(step.id, answers[step.id]) !== null;
}

/** Validasi: kembalikan pesan kesalahan bila langkah belum dijawab, atau null bila valid. */
export function validateStep(index: number, answers: ChecklistAnswers): string | null {
  return isStepAnswered(index, answers) ? null : 'Pilih satu jawaban terlebih dahulu.';
}

export function allAnswered(answers: ChecklistAnswers): boolean {
  return CHECKLIST_STEPS.every((_, i) => isStepAnswered(i, answers));
}

/** Membuang kunci/opsi yang tidak dikenal (mis. dari draft lama yang rusak). */
export function sanitizeAnswers(raw: unknown): ChecklistAnswers {
  const out: ChecklistAnswers = {};
  if (!raw || typeof raw !== 'object') return out;
  const obj = raw as Record<string, unknown>;
  for (const id of STEP_IDS) {
    const v = obj[id];
    if (typeof v === 'string' && statusOf(id, v) !== null) out[id] = v;
  }
  return out;
}

export function progressPercent(stepIndex: number): number {
  return Math.round(((stepIndex + 1) / TOTAL_STEPS) * 100);
}

export function unresolvedSteps(answers: ChecklistAnswers): MissingItem[] {
  const items: MissingItem[] = [];
  for (const step of CHECKLIST_STEPS) {
    const st = statusOf(step.id, answers[step.id]);
    if (st !== 'clear') {
      items.push({ stepId: step.id, label: step.missingLabel, hint: step.missingHint });
    }
  }
  return items;
}

/**
 * Menentukan status hasil. Aturan:
 *  - semua langkah 'clear'              -> understood
 *  - kesiapan = "belum cukup memahami"  -> not_understood
 *  - >= 3 langkah belum jelas           -> not_understood
 *  - selain itu                         -> needs_checking
 * Tidak ada status "halal/haram/aman": hasil hanya menggambarkan kejelasan informasi.
 */
export function computeResult(
  answers: ChecklistAnswers,
  category: TransactionCategory,
): CheckResult {
  const missing = unresolvedSteps(answers);
  const readiness = statusOf('readiness', answers.readiness);

  let state: CheckResult['state'];
  if (missing.length === 0) state = 'understood';
  else if (readiness === 'unknown' || missing.length >= 3) state = 'not_understood';
  else state = 'needs_checking';

  const copy = {
    understood: {
      title: 'Informasi utama sudah dipahami',
      description:
        'Tetap periksa dokumen resmi dan ketentuan produk yang sebenarnya sebelum memutuskan.',
    },
    needs_checking: {
      title: 'Masih perlu diperiksa',
      description: 'Ada beberapa hal yang sebaiknya kamu pastikan terlebih dahulu.',
    },
    not_understood: {
      title: 'Belum cukup dipahami',
      description:
        'Tidak apa-apa untuk berhenti sejenak. Tanyakan kepada penyedia atau sumber yang kompeten sebelum memutuskan.',
    },
  }[state];

  const cat = CATEGORY_BY_ID[category];
  const questions = [...GENERIC_QUESTIONS, ...cat.extraQuestions];

  // Pelajaran terkait: dari kategori; jika aspek syariah/akad belum jelas, pastikan pelajaran akad ikut.
  const lessonIds = [...cat.lessonIds];
  if (
    missing.some((m) => m.stepId === 'structure' || m.stepId === 'sharia') &&
    !lessonIds.includes('akad-transaksi-digital')
  ) {
    lessonIds.unshift('akad-transaksi-digital');
  }

  return {
    state,
    title: copy.title,
    description: copy.description,
    missing,
    questions,
    lessonIds,
    sourceIds: cat.sourceIds,
  };
}
