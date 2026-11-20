import {
  CATEGORIES,
  CATEGORY_BY_ID,
  CATEGORY_CHECKLIST_STEPS,
  CHECKLIST_STEPS,
  DISCLAIMER,
  getStepsForCategory,
} from '../data/checklist';
import { SOURCES_BY_ID } from '../data/sources';
import { computeResult, statusOf, unresolvedSteps } from '../utils/checklist';
import type { ChecklistAnswers, TransactionCategory } from '../types';

describe('Phase 3 - Transaction Checker Engine', () => {
  const allCategories: TransactionCategory[] = [
    'paylater',
    'lending',
    'shopping',
    'subscription',
    'gold',
    'savings',
    'investment',
    'donation',
    'other',
  ];

  describe('1. Category-Specific Question Sets', () => {
    it('covers all 9 transaction categories', () => {
      expect(CATEGORIES.map((c) => c.id)).toEqual(
        expect.arrayContaining(allCategories),
      );
    });

    it('each category has its own distinct tailored 5-step checklist', () => {
      for (const cat of allCategories) {
        const steps = getStepsForCategory(cat);
        expect(steps).toHaveLength(5);
        expect(steps.map((s) => s.id)).toEqual([
          'structure',
          'transparency',
          'mechanism',
          'sharia',
          'readiness',
        ]);

        // Verify each step has non-empty topic, question, help, and options
        for (const step of steps) {
          expect(step.topic.length).toBeGreaterThan(3);
          expect(step.question.length).toBeGreaterThan(10);
          expect(step.help.length).toBeGreaterThan(10);
          expect(step.options.length).toBeGreaterThanOrEqual(3);
          expect(step.options.map((o) => o.status)).toContain('clear');
        }
      }
    });

    it('questions are tailored per category, not identical generic questions', () => {
      const paylaterQuestions = getStepsForCategory('paylater').map((s) => s.question);
      const goldQuestions = getStepsForCategory('gold').map((s) => s.question);
      const subscriptionQuestions = getStepsForCategory('subscription').map((s) => s.question);

      expect(paylaterQuestions).not.toEqual(goldQuestions);
      expect(paylaterQuestions).not.toEqual(subscriptionQuestions);
      expect(goldQuestions).not.toEqual(subscriptionQuestions);

      // Category specific terms
      expect(paylaterQuestions.join(' ')).toMatch(/PayLater|Murabahah|Qardh|denda/i);
      expect(goldQuestions.join(' ')).toMatch(/emas|kustodian|qabdh|Bappebti/i);
      expect(subscriptionQuestions.join(' ')).toMatch(/langganan|auto-renewal|free-trial|Ijarah/i);
    });

    it('never asks for sensitive financial credentials', () => {
      for (const cat of allCategories) {
        const steps = getStepsForCategory(cat);
        const allText = steps
          .flatMap((s) => [s.topic, s.question, s.help, ...s.options.map((o) => o.label)])
          .join(' ')
          .toLowerCase();

        expect(allText).not.toMatch(/\bpin\b|\botp\b|password|kata sandi|cvv|nomor kartu atm/i);
      }
    });
  });

  describe('2. Evaluation Engine & Uncertainty Handling', () => {
    it('returns state "understood" with score 100% when all answers are clear', () => {
      for (const cat of allCategories) {
        const steps = getStepsForCategory(cat);
        const clearAnswers: ChecklistAnswers = {};
        for (const s of steps) {
          const clearOpt = s.options.find((o) => o.status === 'clear');
          if (clearOpt) clearAnswers[s.id] = clearOpt.id;
        }

        const result = computeResult(clearAnswers, cat);
        expect(result.state).toBe('understood');
        expect(result.score).toBe(100);
        expect(result.clarityLevel).toBe('Tinggi');
        expect(result.missing).toHaveLength(0);
      }
    });

    it('handles uncertainty: returns "not_understood" and explicit missing warning when info is insufficient', () => {
      const unclearAnswers: ChecklistAnswers = {
        structure: 'unknown_structure',
        transparency: 'fees_uninspected',
        mechanism: 'unclear_goods',
        sharia: 'unverified_license',
        readiness: 'unplanned_impulse',
      };

      const result = computeResult(unclearAnswers, 'paylater');
      expect(result.state).toBe('not_understood');
      expect(result.title).toBe('Informasi belum cukup untuk menarik kesimpulan');
      expect(result.clarityLevel).toBe('Belum Cukup Informasi');
      expect(result.missing.length).toBeGreaterThanOrEqual(3);
      expect(result.nextSteps.pauseAdvice).toContain('BERHENTI SEJENAK');
    });

    it('triggers "needs_checking" when 1-2 items need verification', () => {
      const steps = getStepsForCategory('gold');
      const partialAnswers: ChecklistAnswers = {
        structure: steps[0].options.find((o) => o.status === 'clear')?.id,
        transparency: steps[1].options.find((o) => o.status === 'partial')?.id,
        mechanism: steps[2].options.find((o) => o.status === 'clear')?.id,
        sharia: steps[3].options.find((o) => o.status === 'clear')?.id,
        readiness: steps[4].options.find((o) => o.status === 'clear')?.id,
      };

      const result = computeResult(partialAnswers, 'gold');
      expect(result.state).toBe('needs_checking');
      expect(result.title).toBe('Terdapat hal yang perlu diperiksa');
      expect(result.missing).toHaveLength(1);
    });
  });

  describe('3. 9-Section Structured Educational Report', () => {
    it('produces all 9 structured sections in the result object', () => {
      const steps = getStepsForCategory('paylater');
      const sampleAnswers: ChecklistAnswers = {
        structure: steps[0].options[0].id,
        transparency: steps[1].options[1].id, // partial (bunga/denda)
        mechanism: steps[2].options[0].id,
        sharia: steps[3].options[0].id,
        readiness: steps[4].options[0].id,
      };

      const result = computeResult(sampleAnswers, 'paylater');

      // 1. Transaction Overview
      expect(result.overview).toBeDefined();
      expect(result.overview.category).toBe('paylater');
      expect(result.overview.categoryLabel).toContain('PayLater');
      expect(result.overview.score).toBeGreaterThan(0);

      // 2. Information Provided by User
      expect(result.userResponses).toHaveLength(5);
      expect(result.userResponses[0].stageTag).toContain('AKAD');

      // 3. Identified Risks
      expect(result.identifiedRisks).toBeDefined();
      expect(result.identifiedRisks.length).toBeGreaterThan(0);
      expect(result.identifiedRisks.some((r) => r.title.includes('Riba') || r.title.includes('Denda'))).toBe(true);

      // 4. Contract Observations
      expect(result.observations).toHaveLength(5);

      // 5. Relevant Fiqh Principles
      expect(result.principles.length).toBeGreaterThanOrEqual(2);
      expect(result.principles[0].arabic).toBeDefined();
      expect(result.principles[0].meaning).toBeDefined();
      expect(result.principles[0].application).toBeDefined();

      // 6. Supporting Source References
      expect(result.sources).toBeDefined();
      expect(result.sources!.length).toBeGreaterThan(0);
      expect(result.sources!.some((s) => s.id === 'dsnmui-17-2000' || s.id === 'dsnmui-117-2018')).toBe(true);

      // 7. Missing Information
      expect(result.missing).toHaveLength(1);
      expect(result.missing[0].stepId).toBe('transparency');

      // 8. Recommended Questions to Provider
      expect(result.questionsToProvider.length).toBeGreaterThan(0);

      // 9. Suggested Next Steps (CHOOSE guidance)
      expect(result.nextSteps.pauseAdvice).toBeDefined();
      expect(result.nextSteps.checkAdvice).toBeDefined();
      expect(result.nextSteps.chooseAdvice).toBeDefined();
    });
  });

  describe('4. Strict Terminology Guardrails', () => {
    it('never claims absolute halal, haram, or official fatwa certification', () => {
      for (const cat of allCategories) {
        const steps = getStepsForCategory(cat);
        const answers: ChecklistAnswers = {
          structure: steps[0].options[0].id,
          transparency: steps[1].options[0].id,
          mechanism: steps[2].options[0].id,
          sharia: steps[3].options[0].id,
          readiness: steps[4].options[0].id,
        };

        const result = computeResult(answers, cat);
        const reportCorpus = [
          result.title,
          result.description,
          result.overview.summary,
          ...result.identifiedRisks.map((r) => r.title + ' ' + r.description),
          ...result.observations.map((o) => o.finding + ' ' + o.guidance),
          result.nextSteps.pauseAdvice,
          result.nextSteps.checkAdvice,
          result.nextSteps.chooseAdvice,
        ]
          .join(' ')
          .toLowerCase();

        expect(reportCorpus).not.toMatch(/\bhalal mutlak\b|\bharam mutlak\b|\bterjamin 100% halal\b|fatwa resmi kami/i);
      }
    });

    it('retains the official mandatory disclaimer', () => {
      expect(DISCLAIMER).toContain('Aplikasi ini merupakan sarana edukasi literasi keuangan syariah');
      expect(DISCLAIMER).toContain('bukan fatwa, nasihat keuangan profesional, atau sertifikasi');
    });
  });
});
