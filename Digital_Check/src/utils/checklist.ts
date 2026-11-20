import {
  CATEGORY_BY_ID,
  CATEGORY_CHECKLIST_STEPS,
  CHECKLIST_STEPS,
  GENERIC_QUESTIONS,
  STEP_IDS,
  getStepsForCategory,
} from '../data/checklist';
import { SOURCES_BY_ID } from '../data/sources';
import type {
  AnswerStatus,
  ChecklistAnswers,
  ChecklistStepDef,
  CheckResult,
  ClarityLevel,
  ContractObservation,
  EvaluatedRisk,
  FiqhPrinciple,
  MissingItem,
  NextStepGuidance,
  StepId,
  TransactionCategory,
  TransactionOverview,
  UserResponseSummary,
} from '../types';

export const TOTAL_STEPS = CHECKLIST_STEPS.length;

export function getStep(index: number, category?: TransactionCategory): ChecklistStepDef | undefined {
  const steps = category ? getStepsForCategory(category) : CHECKLIST_STEPS;
  return steps[index];
}

/** Menemukan status suatu opsi jawaban. Mendukung opsi standar maupun opsi spesifik kategori. */
export function statusOf(
  stepId: StepId,
  optionId: string | undefined,
  category?: TransactionCategory,
): AnswerStatus | null {
  if (!optionId) return null;

  // 1. Cek dari langkah kategori jika ada
  if (category) {
    const catSteps = getStepsForCategory(category);
    const catStep = catSteps.find((s) => s.id === stepId);
    const catOpt = catStep?.options.find((o) => o.id === optionId);
    if (catOpt) return catOpt.status;
  }

  // 2. Cek dari CHECKLIST_STEPS umum
  const defaultStep = CHECKLIST_STEPS.find((s) => s.id === stepId);
  const defaultOpt = defaultStep?.options.find((o) => o.id === optionId);
  if (defaultOpt) return defaultOpt.status;

  // 3. Cari di seluruh kategori untuk memastikan opsi spesifik kategori tetap dikenali
  for (const catKey of Object.keys(CATEGORY_CHECKLIST_STEPS) as TransactionCategory[]) {
    const steps = CATEGORY_CHECKLIST_STEPS[catKey];
    const s = steps.find((item) => item.id === stepId);
    const opt = s?.options.find((o) => o.id === optionId);
    if (opt) return opt.status;
  }

  return null;
}

export function isStepAnswered(
  index: number,
  answers: ChecklistAnswers,
  category?: TransactionCategory,
): boolean {
  const step = getStep(index, category);
  if (!step) return false;
  return statusOf(step.id, answers[step.id], category) !== null;
}

/** Validasi: kembalikan pesan kesalahan bila langkah belum dijawab, atau null bila valid. */
export function validateStep(
  index: number,
  answers: ChecklistAnswers,
  category?: TransactionCategory,
): string | null {
  return isStepAnswered(index, answers, category) ? null : 'Pilih satu jawaban terlebih dahulu.';
}

export function allAnswered(answers: ChecklistAnswers, category?: TransactionCategory): boolean {
  const steps = category ? getStepsForCategory(category) : CHECKLIST_STEPS;
  return steps.every((_, i) => isStepAnswered(i, answers, category));
}

/** Membuang kunci/opsi yang tidak dikenal (mis. dari draft lama yang rusak). */
export function sanitizeAnswers(raw: unknown, category?: TransactionCategory): ChecklistAnswers {
  const out: ChecklistAnswers = {};
  if (!raw || typeof raw !== 'object') return out;
  const obj = raw as Record<string, unknown>;
  for (const id of STEP_IDS) {
    const v = obj[id];
    if (typeof v === 'string' && statusOf(id, v, category) !== null) {
      out[id] = v;
    }
  }
  return out;
}

export function progressPercent(stepIndex: number): number {
  return Math.round(((stepIndex + 1) / TOTAL_STEPS) * 100);
}

export function unresolvedSteps(
  answers: ChecklistAnswers,
  category?: TransactionCategory,
): MissingItem[] {
  const steps = category ? getStepsForCategory(category) : CHECKLIST_STEPS;
  const items: MissingItem[] = [];
  for (const step of steps) {
    const st = statusOf(step.id, answers[step.id], category);
    if (st !== 'clear') {
      items.push({ stepId: step.id, label: step.missingLabel, hint: step.missingHint });
    }
  }
  return items;
}

/** Menghasilkan prinsip fiqih muamalah yang relevan per kategori transaksi */
function getFiqhPrinciplesForCategory(category: TransactionCategory): FiqhPrinciple[] {
  switch (category) {
    case 'paylater':
    case 'lending':
      return [
        {
          arabic: "كُلُّ قَرْضٍ جَرَّ مَنْفَعَةً فَهُوَ رِبًا",
          transliteration: "Kullu qardhin jarra manfa'atan fahuwa riba",
          meaning: "Setiap pinjaman yang menarik manfaat bersyarat bagi kreditur adalah riba.",
          application:
            "Bunga pinjaman, biaya admin tersembunyi berulang, atau denda keterlambatan yang dijadikan keuntungan penyedia dilarang dalam syariat.",
        },
        {
          arabic: "التَّعْزِيرُ بِالْمَالِ لِلْمَصَالِحِ الْعَامَّةِ",
          transliteration: "At-Ta'ziru bil-maali lil-mashalihil 'ammah",
          meaning: "Sanksi finansial (ta'zir) ditujukan untuk kemaslahatan umum/sosial.",
          application:
            "Sesuai Fatwa DSN-MUI No. 17/2000, dana denda atas nasabah mampu yang sengaja menunda pembayaran wajib disalurkan 100% untuk pos sosial/kebajikan, bukan pos laba operasional.",
        },
        {
          arabic: "الْوَفَاءُ بِالْعُقُودِ",
          transliteration: "Al-Wafa'u bil 'Uqud",
          meaning: "Kewajiban menyempurnakan akad dan janji (QS. Al-Ma'idah: 1).",
          application:
            "Setiap pihak wajib menghormati syarat-syarat akad yang disepakati selama tidak menghalalkan yang haram atau mengharamkan yang halal.",
        },
      ];
    case 'gold':
      return [
        {
          arabic: "يَدًا بِيَدٍ هَاءَ وَهَاءَ",
          transliteration: "Yadan bi yadin ha'a wa ha'a",
          meaning: "Serah terima seketika secara tunai dan timbal balik.",
          application:
            "Dalam transaksi emas non-tunai kontemporer, Fatwa DSN-MUI No. 77/2010 menetapkan kebolehan apabila terjadi serah terima secara yuridis (qabdh hukmi) seketika dalam bentuk alokasi saldo fisik riil di kustodian.",
        },
        {
          arabic: "لَا تَبِعْ مَا لَيْسَ عِنْدَكَ",
          transliteration: "La tabi' ma laisa 'indak",
          meaning: "Janganlah kamu menjual sesuatu yang belum ada dalam kepemilikanmu.",
          application:
            "Penyelenggara emas digital wajib memiliki cadangan emas fisik murni 100% di brankas kustodian berizin Bappebti sebelum menjual gramatur ke pengguna.",
        },
      ];
    case 'shopping':
      return [
        {
          arabic: "لَا تَبِعْ مَا لَيْسَ عِنْدَكَ",
          transliteration: "La tabi' ma laisa 'indak",
          meaning: "Jangan menjual barang yang tidak kamu miliki atau kuasai.",
          application:
            "Dalam e-commerce, penjual atau dropshipper harus memiliki kejelasan akad perwakilan (Wakalah bil Ujrah) atau kepastian ketersediaan stok barang.",
        },
        {
          arabic: "الْمُسْلِمُونَ عَلَى شُرُوطِهِمْ إِلَّا شَرْطًا أَحَلَّ حَرَامًا أَوْ حَرَّمَ حَلَالًا",
          transliteration: "Al-Muslimuna 'ala syuruthihim illa syarthan ahalla haraman aw harrama halalan",
          meaning: "Kaum muslimin terikat pada syarat-syarat perjanjian mereka kecuali syarat yang menyalahi syariat.",
          application:
            "Hak khiyar (hak opsi retur atau pembatalan jika barang cacat) harus dihormati sebagai perlindungan konsumen.",
        },
      ];
    case 'subscription':
      return [
        {
          arabic: "الْإِجَارَةُ عَلَى الْمَنَافِعِ الْمَعْلُومَةِ",
          transliteration: "Al-Ijaratu 'alal manafi'il ma'lumah",
          meaning: "Sewa menyewa wajib atas manfaat yang diketahui secara jelas batasannya.",
          application:
            "Layanan langganan wajib memperjelas durasi masa aktif dan tarif pasca uji coba gratis agar terhindar dari ketidakpastian (gharar).",
        },
        {
          arabic: "إِنَّ الْمُبَذِّرِينَ كَانُوا إِخْوَانَ الشَّيَاطِينِ",
          transliteration: "Innal mubadz-dzirina kanu ikhwana sy-syayathin",
          meaning: "Sesungguhnya orang-orang yang boros itu adalah saudara-saudara setan (QS. Al-Isra: 27).",
          application:
            "Membayar langganan berulang yang tidak terpakai merupakan pemborosan dana (tabdzir). Selalu periksa dan batalkan layanan yang tidak aktif.",
        },
      ];
    case 'savings':
      return [
        {
          arabic: "أَدِّ الْأَمَانَةَ إِلَى مَنِ ائْتَمَنَكَ",
          transliteration: "Addil amanata ila man-i'tamanaka",
          meaning: "Tunaikanlah amanah kepada orang yang mempercayaimu.",
          application:
            "Sesuai Fatwa DSN-MUI No. 116/2017, saldo uang elektronik merupakan dana titipan (Wadi'ah) yang wajib dijaga keamanannya dan tidak boleh menghasilkan bunga utang.",
        },
      ];
    case 'investment':
      return [
        {
          arabic: "الْغُنْمُ بِالْغُرْمِ",
          transliteration: "Al-Ghunmu bil-Ghurmi",
          meaning: "Keuntungan menyertai risiko kerugian.",
          application:
            "Investasi syariah berbasis bagi hasil (nisbah) riil. Menjanjikan imbalan tetap pasti untung (fixed return) tanpa menanggung risiko dilarang karena merubah investasi menjadi pinjaman berbunga.",
        },
        {
          arabic: "الْخَرَاجُ بِالضَّمَانِ",
          transliteration: "Al-Kharaju bid-Dhaman",
          meaning: "Hak mendapatkan hasil timbul karena kesiapan menanggung tanggung jawab risiko aset.",
          application:
            "Keuntungan hanya berhak diperoleh jika pemodal siap menanggung fluktuasi nilai aset dasar (underlying asset) riil yang halal.",
        },
      ];
    case 'donation':
      return [
        {
          arabic: "إِنَّمَا الصَّدَقَاتُ لِلْفُقَرَاءِ وَالْمَسَاكِينِ",
          transliteration: "Innamash shadaqatu lil fuqara'i wal masakin...",
          meaning: "Sesungguhnya zakat itu hanyalah untuk 8 golongan yang telah ditentukan (QS. At-Taubah: 60).",
          application:
            "Dana zakat wajib disalurkan secara amanah kepada mustahik yang berhak melalui lembaga amil yang memiliki audit publik transparan.",
        },
      ];
    default:
      return [
        {
          arabic: "لَا ضَرَرَ وَلَا ضِرَارَ",
          transliteration: "La dharara wa la dhirar",
          meaning: "Tidak boleh membahayakan diri sendiri dan tidak boleh membahayakan orang lain.",
          application:
            "Setiap klausul transaksi harus adil, transparan, dan tidak menimbulkan kerugian bagi salah satu pihak.",
        },
        {
          arabic: "الْأَصْلُ فِي الْمُعَامَلَاتِ الْإِبَاحَةُ حَتَّى يَدُلَّ الدَّلِيلُ عَلَى التَّحْرِيمِ",
          transliteration: "Al-ashlu fil mu'amalati al-ibahah hatta yadulla ad-dalilu 'alat tahrim",
          meaning: "Hukum asal dalam seluruh muamalah adalah boleh sampai ada dalil yang melarangnya.",
          application:
            "Inovasi fintech diperbolehkan sepanjang terbebas dari Riba, Gharar, Maysir, Tadlis, dan kezaliman.",
        },
      ];
  }
}

/** Mengidentifikasi risiko spesifik berdasarkan jawaban pengguna */
function identifyRisks(
  answers: ChecklistAnswers,
  category: TransactionCategory,
  steps: ChecklistStepDef[],
): EvaluatedRisk[] {
  const risks: EvaluatedRisk[] = [];

  for (const step of steps) {
    const ansVal = answers[step.id];
    const status = statusOf(step.id, ansVal, category);

    if (status === 'unknown') {
      risks.push({
        severity: step.id === 'transparency' || step.id === 'structure' ? 'high' : 'medium',
        title: `Informasi Belum Diperiksa: ${step.topic}`,
        description: `Kamu belum memeriksa atau tidak mengetahui detail pada tahap ini. Hal ini membuka risiko biaya tak terduga atau klausul sepihak.`,
      });
    } else if (status === 'partial') {
      if (category === 'paylater' && step.id === 'transparency') {
        risks.push({
          severity: 'high',
          title: 'Potensi Riba Nasi\'ah pada Denda Bertingkat',
          description:
            'Terdapat klausul denda persentase harian yang masuk ke keuntungan kreditur, bukan dana kebajikan sosial (Fatwa DSN-MUI No. 17/2000).',
        });
      } else if (category === 'lending' && step.id === 'transparency') {
        risks.push({
          severity: 'high',
          title: 'Beban Manfaat Ekonomi Tinggi',
          description:
            'Biaya admin dan bunga berpotensi melampaui batas batas manfaat ekonomi harian yang ditetapkan SEOJK No. 19/2023.',
        });
      } else if (category === 'gold' && (step.id === 'structure' || step.id === 'transparency')) {
        risks.push({
          severity: 'high',
          title: 'Risiko Emas Fiktif / Fraksional Tanpa Brankas Fisik',
          description:
            'Ketiadaan bukti audit kustodian berisiko melanggar ketentuan fisik riil 100% Bappebti No. 4/2019 dan Fatwa 77/2010.',
        });
      } else if (category === 'subscription' && step.id === 'transparency') {
        risks.push({
          severity: 'medium',
          title: 'Jebakan Debit Otomatis (Gharar Waktu Tagihan)',
          description:
            'Periode free-trial yang langsung menarik saldo tanpa notifikasi konfirmasi berpotensi menarik biaya atas layanan yang tidak digunakan.',
        });
      } else if (category === 'investment' && step.id === 'transparency') {
        risks.push({
          severity: 'high',
          title: 'Indikasi Skema Bunga Tetap (Riba Qardh)',
          description:
            'Menjanjikan keuntungan pasti tanpa membagi risiko kerugian modal mengindikasikan skema pinjaman berbunga atau investasi berisiko tinggi.',
        });
      } else {
        risks.push({
          severity: 'medium',
          title: `Ketidakjelasan pada Dimensi ${step.topic}`,
          description: step.help,
        });
      }
    }
  }

  return risks;
}

/** Mengompilasi observasi akad dan biaya */
function compileObservations(
  answers: ChecklistAnswers,
  category: TransactionCategory,
  steps: ChecklistStepDef[],
): ContractObservation[] {
  const observations: ContractObservation[] = [];

  for (const step of steps) {
    const optId = answers[step.id];
    const opt = step.options.find((o) => o.id === optId);
    const status = opt?.status ?? 'unknown';

    let guidance = '';
    if (status === 'clear') {
      guidance = 'Informasi pada dimensi ini telah memenuhi transparansi literasi yang direkomendasikan.';
    } else if (status === 'partial') {
      guidance = 'Sebagian poin masih meragukan. Mintalah lembar syarat & ketentuan resmi sebelum konfirmasi.';
    } else {
      guidance = step.missingHint;
    }

    observations.push({
      dimension: step.topic,
      finding: opt ? opt.label : 'Belum diperiksa oleh pengguna',
      guidance,
    });
  }

  return observations;
}

/** Menghasilkan panduan tindak lanjut berbasis kerangka PAUSE - CHECK - CHOOSE */
function compileNextStepGuidance(
  state: CheckResult['state'],
  categoryLabel: string,
): NextStepGuidance {
  switch (state) {
    case 'understood':
      return {
        pauseAdvice: 'Ambil waktu tenang 5 menit untuk meninjau kembali apakah transaksi ini benar-benar kamu perlukan.',
        checkAdvice: 'Simpan salinan bukti akad resmi, invoice pembelian, dan ketentuan produk sebagai arsip bukti.',
        chooseAdvice: `Berdasarkan parameter yang kamu periksa, informasi transaksi ${categoryLabel} ini cukup transparan. Kamu dapat melanjutkan dengan bijak dan tetap memantau mutasi berkala.`,
      };
    case 'needs_checking':
      return {
        pauseAdvice: 'Tunda pembayaran atau penandatanganan akad. Jangan terburu-buru oleh penawaran promo sesaat.',
        checkAdvice: 'Hubungi Customer Support atau periksa dokumen T&C untuk mengonfirmasi poin yang masih abu-abu.',
        chooseAdvice: 'Jika penyedia memberikan penjelasan transparan dan sesuai prinsip syariah, kamu dapat mempertimbangkannya kembali.',
      };
    case 'not_understood':
      return {
        pauseAdvice: 'BERHENTI SEJENAK (PAUSE). Hindari mengambil komitmen finansial yang belum kamu pahami risikonya.',
        checkAdvice: 'Pelajari modul edukasi terkait dan tanyakan poin kritis kepada pihak berwenang atau Dewan Pengawas Syariah.',
        chooseAdvice: 'LEBIH BAIK MENUNDA ATAU MEMBATALKAN transaksi ini demi menjaga keberkahan dan keamanan hartamu (Hifzhul Maal).',
      };
  }
}

/**
 * Menghitung hasil evaluasi edukatif transaksi berbasis aturan transparan.
 *
 * Aturan Penilaian:
 *  - Setiap jawaban dinilai: clear = 100%, partial = 50%, unknown = 0%.
 *  - Status Hasil:
 *      * understood: jika semua 5 langkah clear.
 *      * not_understood: jika kesiapan = "not_understand" / unknown, ATAU >= 3 langkah belum jelas / unknown.
 *      * needs_checking: selain kondisi di atas (ada 1-2 poin yang perlu verifikasi).
 *  - Menghasilkan 9 seksi laporan terstruktur yang transparan dan dapat dilacak ke fatwa & regulasi.
 *  - TIDAK MENGELUARKAN FATWA MUTLAK (tidak ada klaim "halal resmi", "haram mutlak", atau "sertifikasi").
 */
export function computeResult(
  answers: ChecklistAnswers,
  category: TransactionCategory,
): CheckResult {
  const steps = getStepsForCategory(category);
  const missing = unresolvedSteps(answers, category);
  const readiness = statusOf('readiness', answers.readiness, category);

  let clearCount = 0;
  let partialCount = 0;
  for (const step of steps) {
    const st = statusOf(step.id, answers[step.id], category);
    if (st === 'clear') clearCount++;
    else if (st === 'partial') partialCount++;
  }

  const score = Math.round(((clearCount * 1.0 + partialCount * 0.5) / steps.length) * 100);

  let state: CheckResult['state'];
  if (missing.length === 0) {
    state = 'understood';
  } else if (readiness === 'unknown' || answers.readiness === 'not_understand' || missing.length >= 3) {
    state = 'not_understood';
  } else {
    state = 'needs_checking';
  }

  const clarityLevel: ClarityLevel =
    score >= 80
      ? 'Tinggi'
      : score >= 50
        ? 'Sedang'
        : state === 'not_understood'
          ? 'Belum Cukup Informasi'
          : 'Perlu Verifikasi';

  const copy = {
    understood: {
      title: 'Informasi utama sudah dipahami',
      description:
        'Tetap periksa dokumen resmi dan ketentuan produk yang sebenarnya sebelum memutuskan.',
    },
    needs_checking: {
      title: 'Terdapat hal yang perlu diperiksa',
      description: 'Ada beberapa hal yang sebaiknya kamu pastikan terlebih dahulu kepada penyedia.',
    },
    not_understood: {
      title: 'Informasi belum cukup untuk menarik kesimpulan',
      description:
        'Tidak apa-apa untuk berhenti sejenak. Tanyakan kepada penyedia atau sumber yang kompeten sebelum memutuskan.',
    },
  }[state];

  const cat = CATEGORY_BY_ID[category] ?? CATEGORY_BY_ID.other;
  const questionsToProvider = [...cat.extraQuestions];
  const genericQuestions = [...GENERIC_QUESTIONS, ...cat.extraQuestions];

  // Rujukan sumber dari kategori
  const sources = cat.sourceIds.map((id) => SOURCES_BY_ID[id]).filter(Boolean);

  // Pelajaran terkait
  const lessonIds = [...cat.lessonIds];
  if (
    missing.some((m) => m.stepId === 'structure' || m.stepId === 'sharia') &&
    !lessonIds.includes('akad-transaksi-digital')
  ) {
    lessonIds.unshift('akad-transaksi-digital');
  }

  // 1. Transaction Overview
  const evaluatedAt = new Date().toISOString();
  const overview: TransactionOverview = {
    category,
    categoryLabel: cat.label,
    clarityLevel,
    score,
    evaluatedAt,
    summary: copy.description,
  };

  // 2. User Responses Summary
  const userResponses: UserResponseSummary[] = steps.map((s) => {
    const optId = answers[s.id];
    const opt = s.options.find((o) => o.id === optId);
    return {
      stepId: s.id,
      stageTag: s.topic,
      question: s.question,
      selectedOptionLabel: opt ? opt.label : 'Belum dijawab',
      status: opt?.status ?? 'unknown',
    };
  });

  // 3. Identified Risks
  const identifiedRisks = identifyRisks(answers, category, steps);

  // 4. Contract Observations
  const observations = compileObservations(answers, category, steps);

  // 5. Relevant Fiqh Principles
  const principles = getFiqhPrinciplesForCategory(category);

  // 8 & 9. Next Steps
  const nextSteps = compileNextStepGuidance(state, cat.label);

  return {
    state,
    title: copy.title,
    description: copy.description,
    missing,
    questions: genericQuestions,
    lessonIds,
    sourceIds: cat.sourceIds,
    score,
    clarityLevel,
    category,
    categoryLabel: cat.label,
    evaluatedAt,
    overview,
    userResponses,
    identifiedRisks,
    observations,
    principles,
    sources,
    questionsToProvider,
    nextSteps,
  };
}
