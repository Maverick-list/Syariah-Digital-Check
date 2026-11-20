import { LESSONS, LESSONS_BY_ID } from '../data/lessons';
import { SCENARIOS, SCENARIOS_BY_ID } from '../data/scenarios';
import { SOURCES_BY_ID } from '../data/sources';
import { filterLessons } from '../utils/lessons';

describe('Phase 4: Learning Hub Architecture & Editorial Structure', () => {
  it('every lesson has a complete, consistent educational structure', () => {
    for (const lesson of LESSONS) {
      expect(lesson.id).toBeTruthy();
      expect(lesson.title.length).toBeGreaterThan(10);
      expect(lesson.readingMinutes).toBeGreaterThanOrEqual(2);
      expect(lesson.summary.length).toBeGreaterThan(15);

      // 1. Introduction
      expect(lesson.introduction).toBeDefined();
      expect(lesson.introduction!.length).toBeGreaterThan(30);

      // 2. Learning objectives
      expect(lesson.learningObjectives.length).toBeGreaterThanOrEqual(2);

      // 3. Main concept explanation
      expect(lesson.conceptExplanation.length).toBeGreaterThan(25);
      expect(lesson.body.length).toBeGreaterThanOrEqual(2);

      // 4. Practical examples
      expect(lesson.practicalExample.length).toBeGreaterThan(25);

      // 5. Key takeaways
      expect(lesson.keyPoints.length).toBeGreaterThanOrEqual(2);

      // 6. Supporting references
      expect(lesson.sourceIds.length).toBeGreaterThanOrEqual(1);
      for (const sId of lesson.sourceIds) {
        expect(SOURCES_BY_ID[sId]).toBeDefined();
      }

      // 7. Further reading & Related recommendations
      expect(lesson.furtherReading).toBeDefined();
      expect(lesson.furtherReading!.length).toBeGreaterThanOrEqual(1);

      if (lesson.relatedLessonIds) {
        for (const relId of lesson.relatedLessonIds) {
          expect(LESSONS_BY_ID[relId]).toBeDefined();
        }
      }
    }
  });

  it('functional search and category filtering work accurately', () => {
    // Category filter
    const akadLessons = filterLessons('', 'Akad');
    expect(akadLessons.length).toBeGreaterThan(0);
    for (const l of akadLessons) {
      expect(l.category).toBe('Akad');
    }

    // Keyword search
    const murabahahResults = filterLessons('murabahah', 'Semua');
    expect(murabahahResults.length).toBeGreaterThan(0);

    const qabdhResults = filterLessons('qabdh', 'Semua');
    expect(qabdhResults.length).toBeGreaterThan(0);

    // Empty result handling
    const nonExistent = filterLessons('xyznonexistentkeyword123', 'Semua');
    expect(nonExistent).toHaveLength(0);
  });
});

describe('Phase 4: Case Study Scenarios Completeness', () => {
  const REQUIRED_SCENARIOS = ['paylater', 'emas-digital', 'dropshipping', 'langganan'];

  it('contains all 4 core scenarios required by Phase 4 specification', () => {
    for (const reqId of REQUIRED_SCENARIOS) {
      expect(SCENARIOS_BY_ID[reqId]).toBeDefined();
    }
  });

  it('every scenario possesses complete background, parties, chronology, and flow analysis', () => {
    for (const scenario of SCENARIOS) {
      // 1. Simulation label & notice
      expect(scenario.isSimulation).toBe(true);
      expect(scenario.simulationNotice).toContain('Simulasi Edukasi Fiktif');

      // 2. Scenario background & parties
      expect(scenario.background).toBeDefined();
      expect(scenario.background!.length).toBeGreaterThan(30);
      expect(scenario.partiesInvolved).toBeDefined();
      expect(scenario.partiesInvolved!.length).toBeGreaterThanOrEqual(2);

      // 3. Chronology
      expect(scenario.chronology).toBeDefined();
      expect(scenario.chronology!.length).toBeGreaterThanOrEqual(3);

      // 4. Contract structure
      expect(scenario.contractStructure).toBeDefined();
      expect(scenario.contractStructure!.name.length).toBeGreaterThan(5);
      expect(scenario.contractStructure!.idealAkad.length).toBeGreaterThan(10);

      // 5. Money and ownership flow
      expect(scenario.moneyAndOwnershipFlow).toBeDefined();
      expect(scenario.moneyAndOwnershipFlow!.moneyFlow.length).toBeGreaterThan(15);
      expect(scenario.moneyAndOwnershipFlow!.ownershipFlow.length).toBeGreaterThan(15);

      // 6. Fiqh principles
      expect(scenario.fiqhPrinciples).toBeDefined();
      expect(scenario.fiqhPrinciples!.length).toBeGreaterThanOrEqual(1);
      for (const p of scenario.fiqhPrinciples!) {
        expect(p.translation.length).toBeGreaterThan(10);
        expect(p.application.length).toBeGreaterThan(15);
      }

      // 7. Critical questions
      expect(scenario.criticalQuestions).toBeDefined();
      expect(scenario.criticalQuestions!.length).toBeGreaterThanOrEqual(2);

      // 8. Multi-dimensional Educational analysis (Facts, Assumptions, Interpretations, Conclusions)
      expect(scenario.analysis).toBeDefined();
      expect(scenario.analysis!.facts.length).toBeGreaterThanOrEqual(1);
      expect(scenario.analysis!.assumptions.length).toBeGreaterThanOrEqual(1);
      expect(scenario.analysis!.interpretations.length).toBeGreaterThanOrEqual(1);
      expect(scenario.analysis!.conclusion.length).toBeGreaterThan(20);

      // 9. Supporting references
      expect(scenario.sourceIds).toBeDefined();
      expect(scenario.sourceIds!.length).toBeGreaterThanOrEqual(1);
      for (const sId of scenario.sourceIds!) {
        expect(SOURCES_BY_ID[sId]).toBeDefined();
      }

      // 10. Limitations & Practical lessons
      expect(scenario.limitations).toBeDefined();
      expect(scenario.limitations!.length).toBeGreaterThanOrEqual(1);
      expect(scenario.practicalLessons).toBeDefined();
      expect(scenario.practicalLessons!.length).toBeGreaterThanOrEqual(2);

      // 11. Interactive case exercise
      expect(scenario.exercise).toBeDefined();
      expect(scenario.exercise!.question.length).toBeGreaterThan(10);
      expect(scenario.exercise!.options.length).toBeGreaterThanOrEqual(2);
      expect(scenario.exercise!.correctIndex).toBeGreaterThanOrEqual(0);
      expect(scenario.exercise!.correctIndex).toBeLessThan(scenario.exercise!.options.length);
      expect(scenario.exercise!.explanation.length).toBeGreaterThan(20);
    }
  });

  it('strictly adheres to educational neutrality without absolute halal/haram certification', () => {
    const combinedTexts = [
      ...LESSONS.map((l) => [l.title, l.introduction, l.conceptExplanation, l.practicalExample, ...l.body].join(' ')),
      ...SCENARIOS.map((s) => [
        s.title,
        s.background,
        s.contractStructure?.idealAkad,
        s.analysis?.conclusion,
        ...(s.practicalLessons || []),
      ].join(' ')),
    ];

    for (const text of combinedTexts) {
      const lower = text.toLowerCase();
      expect(lower).not.toMatch(/dijamin halal|pasti halal|mutlak halal|pasti haram/);
      expect(lower).not.toMatch(/fatwa resmi dari aplikasi|kami memfatwakan/);
    }
  });
});
