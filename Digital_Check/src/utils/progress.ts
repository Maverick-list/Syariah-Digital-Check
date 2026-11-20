import type { PersistedState } from '../types';
import { LESSONS } from '../data/lessons';
import { SCENARIOS } from '../data/scenarios';

export interface ProgressSummary {
  percent: number;
  checks: number;
  lessonsRead: number;
  lessonsTotal: number;
  scenariosDone: number;
  scenariosTotal: number;
  quizAttempts: number;
  lastQuizScore: { score: number; total: number } | null;
  bestQuizPercent: number;
}

export interface CompetencyPillars {
  /** Pemahaman Akad & Perjanjian (0-100%) */
  akad: number;
  /** Deteksi Biaya & Denda Riba (0-100%) */
  riba: number;
  /** Kepemilikan, Serah Terima & Qabdh (0-100%) */
  qabdh: number;
  /** Etika Konsumsi & Kemandirian (0-100%) */
  etika: number;
}

export interface LiteracyLevelInfo {
  level: string;
  tag: string;
  description: string;
  nextTarget: string;
}

/**
 * Bobot progres literasi:
 * - Checklist transaksi (min. 1 selesai): 25%
 * - Materi modul dibaca: 35%
 * - Skenario studi kasus: 15%
 * - Kuis literasi (akurasi terbaik): 25%
 *
 * Catatan penting: Indeks ini hanya mengukur keaktifan dan pemahaman belajar mandiri pengguna,
 * BUKAN penilaian atau sertifikasi kepatuhan syariah formal lembaga otoritas.
 */
export function computeProgress(
  s: Pick<PersistedState, 'checks' | 'lessonsRead' | 'scenariosDone' | 'quizAttempts'>,
  totals = { lessons: LESSONS.length, scenarios: SCENARIOS.length },
): ProgressSummary {
  const lessonIds = new Set(LESSONS.map((l) => l.id));
  const scenarioIds = new Set(SCENARIOS.map((x) => x.id));
  const lessonsRead = new Set(s.lessonsRead.filter((id) => lessonIds.has(id))).size;
  const scenariosDone = new Set(s.scenariosDone.filter((id) => scenarioIds.has(id))).size;
  const best = s.quizAttempts.reduce(
    (m, a) => Math.max(m, a.total > 0 ? a.score / a.total : 0),
    0,
  );
  const last = s.quizAttempts[s.quizAttempts.length - 1];

  const raw =
    (s.checks.length > 0 ? 25 : 0) +
    (totals.lessons ? (lessonsRead / totals.lessons) * 35 : 0) +
    (totals.scenarios ? (scenariosDone / totals.scenarios) * 15 : 0) +
    best * 25;

  return {
    percent: Math.min(100, Math.round(raw)),
    checks: s.checks.length,
    lessonsRead,
    lessonsTotal: totals.lessons,
    scenariosDone,
    scenariosTotal: totals.scenarios,
    quizAttempts: s.quizAttempts.length,
    lastQuizScore: last ? { score: last.score, total: last.total } : null,
    bestQuizPercent: Math.round(best * 100),
  };
}

/**
 * Menghitung distribusi kompetensi 4 pilar keuangan syariah secara dinamis dari aktivitas nyata.
 * Menghasilkan 0% jika pengguna belum menyelesaikan aktivitas pada pilar tersebut.
 */
export function computePillarCompetencies(
  s: Pick<PersistedState, 'checks' | 'lessonsRead' | 'scenariosDone' | 'quizAttempts'>,
): CompetencyPillars {
  const readLessons = new Set(s.lessonsRead);
  const doneScenarios = new Set(s.scenariosDone);
  const checkCategories = new Set(s.checks.map((c) => c.category));

  // 1. Pemahaman Akad & Perjanjian
  // Modul: akad-transaksi-digital, transparansi-biaya (max 40%)
  // Cek: paylater, lending, subscription (max 35%)
  // Skenario: paylater (max 25%)
  const akadLessonScore =
    (readLessons.has('akad-transaksi-digital') ? 20 : 0) +
    (readLessons.has('transparansi-biaya') ? 20 : 0);
  const akadCheckScore =
    (['paylater', 'lending', 'subscription'] as const).some((k) =>
      checkCategories.has(k),
    )
      ? 35
      : 0;
  const akadScenarioScore = doneScenarios.has('paylater') ? 25 : 0;
  const akadTotal = Math.min(100, akadLessonScore + akadCheckScore + akadScenarioScore);

  // 2. Deteksi Biaya & Denda Riba
  // Modul: riba-denda-keterlambatan (max 45%)
  // Skenario: paylater (max 30%)
  // Kuis attempts min 1 (max 25%)
  const ribaLessonScore = readLessons.has('riba-denda-keterlambatan') ? 45 : 0;
  const ribaScenarioScore = doneScenarios.has('paylater') ? 30 : 0;
  const ribaQuizScore = s.quizAttempts.length > 0 ? 25 : 0;
  const ribaTotal = Math.min(100, ribaLessonScore + ribaScenarioScore + ribaQuizScore);

  // 3. Kepemilikan, Serah Terima & Qabdh (Mitigasi Gharar)
  // Modul: risiko-investasi, dropshipping-kepemilikan (max 40%)
  // Cek: gold, shopping (max 35%)
  // Skenario: emas-digital, dropshipping (max 25%)
  const qabdhLessonScore =
    (readLessons.has('risiko-investasi') ? 20 : 0) +
    (readLessons.has('dropshipping-kepemilikan') ? 20 : 0);
  const qabdhCheckScore =
    (['gold', 'shopping'] as const).some((k) => checkCategories.has(k))
      ? 35
      : 0;
  const qabdhScenarioScore =
    (doneScenarios.has('emas-digital') ? 12.5 : 0) +
    (doneScenarios.has('dropshipping') ? 12.5 : 0);
  const qabdhTotal = Math.min(100, Math.round(qabdhLessonScore + qabdhCheckScore + qabdhScenarioScore));

  // 4. Etika Konsumsi & Kemandirian (Hifzhul Maal)
  // Modul: sumber-tepercaya, donasi-ziswaf (max 40%)
  // Cek: donation, subscription (max 35%)
  // Skenario: langganan-otomatis (max 25%)
  const etikaLessonScore =
    (readLessons.has('sumber-tepercaya') ? 20 : 0) +
    (readLessons.has('donasi-ziswaf') ? 20 : 0);
  const etikaCheckScore =
    (['donation', 'subscription'] as const).some((k) => checkCategories.has(k))
      ? 35
      : 0;
  const etikaScenarioScore = doneScenarios.has('langganan-otomatis') ? 25 : 0;
  const etikaTotal = Math.min(100, etikaLessonScore + etikaCheckScore + etikaScenarioScore);

  return {
    akad: akadTotal,
    riba: ribaTotal,
    qabdh: qabdhTotal,
    etika: etikaTotal,
  };
}

/**
 * Menentukan tingkat literasi pengguna berdasarkan akumulasi skor progres nyata.
 */
export function getLiteracyLevel(percent: number): LiteracyLevelInfo {
  if (percent >= 75) {
    return {
      level: 'Duta Literasi Syariah',
      tag: 'KOMPREHENSIF',
      description: 'Kamu telah menyelesaikan sebagian besar materi, skenario studi kasus, dan evaluasi transaksi dengan pemahaman mendalam.',
      nextTarget: 'Terus biasakan jeda kritis dan telaah klausul pada setiap transaksi baru.',
    };
  }
  if (percent >= 45) {
    return {
      level: 'Konsumen Sadar & Kritis',
      tag: 'BERKEMBANG',
      description: 'Kamu telah membangun kebiasaan menelaah akad dan biaya sebelum mengambil keputusan finansial.',
      nextTarget: 'Selesaikan modul emas digital dan studi kasus dropshipping untuk mencapai tingkat Duta Literasi.',
    };
  }
  if (percent >= 20) {
    return {
      level: 'Konsumen Cermat',
      tag: 'DASAR KUAT',
      description: 'Kamu mulai mengenali konsep dasar muamalah dan perbedaan denda ta\'zir vs riba nasi\'ah.',
      nextTarget: 'Coba evaluasi 1 transaksi nyata di menu Cek Transaksi untuk meningkatkan pemahaman praktis.',
    };
  }
  return {
    level: 'Pemula Sadar',
    tag: 'AWAL PERJALANAN',
    description: 'Awal perjalanan literasi muamalah digitalmu. Mulai dengan satu modul belajar atau evaluasi transaksi pertamamu.',
    nextTarget: 'Mulai baca modul Akad & Rukun Jual Beli di menu Modul Belajar.',
  };
}
