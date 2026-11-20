import { SOURCES, SOURCES_BY_ID, getVerifiedSources } from '../data/sources';
import { LESSONS } from '../data/lessons';
import { SCENARIOS } from '../data/scenarios';
import { QUIZ } from '../data/quiz';
import type { ContentStatus, ValidityStatus } from '../types';

describe('Source Registry & Knowledge Governance', () => {
  it('every source possesses complete mandatory governance metadata', () => {
    const validReviewStatuses: ContentStatus[] = [
      'Draft',
      'Needs Verification',
      'Under Review',
      'Approved',
      'Published',
      'Archived',
    ];
    const validValidityStatuses: ValidityStatus[] = ['Berlaku', 'Dicabut', 'Diubah'];

    for (const source of SOURCES) {
      expect(source.id).toBeTruthy();
      expect(source.title.length).toBeGreaterThan(10);
      expect(source.documentNumber.length).toBeGreaterThan(3);
      expect(source.publisher.length).toBeGreaterThan(3);
      expect(validValidityStatuses).toContain(source.validityStatus);
      expect(validReviewStatuses).toContain(source.reviewStatus);
      expect(source.url).toMatch(/^https:\/\//);
      expect(source.lastVerified).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(source.verificationNote.length).toBeGreaterThan(15);
      expect(Array.isArray(source.relevantClauses)).toBe(true);
      expect(source.relevantClauses.length).toBeGreaterThanOrEqual(1);
    }
  });

  it('filters unverified sources and prevents them from being published', () => {
    const verified = getVerifiedSources();
    expect(verified.length).toBeGreaterThan(0);
    for (const s of verified) {
      expect(['Approved', 'Published']).toContain(s.reviewStatus);
      expect(['Draft', 'Needs Verification', 'Under Review', 'Archived']).not.toContain(s.reviewStatus);
    }
  });

  it('correctly distinguishes Fatwa 17 (Ta\'zir) and Fatwa 43 (Ta\'widh)', () => {
    const fatwa17 = SOURCES_BY_ID['dsnmui-17-2000'];
    const fatwa43 = SOURCES_BY_ID['dsnmui-43-2004'];

    expect(fatwa17).toBeDefined();
    expect(fatwa17.documentNumber).toBe('17/DSN-MUI/IX/2000');
    expect(fatwa17.title.toLowerCase()).toContain('sanksi');
    expect(fatwa17.relevantClauses.join(' ').toLowerCase()).toContain('kebajikan');

    expect(fatwa43).toBeDefined();
    expect(fatwa43.documentNumber).toBe('43/DSN-MUI/VIII/2004');
    expect(fatwa43.title.toLowerCase()).toContain('ganti rugi');
    expect(fatwa43.title.toLowerCase()).toContain('ta\'widh');
    expect(fatwa43.relevantClauses.join(' ').toLowerCase()).toContain('riil');
  });

  it('verifies foundational Murabahah fatwas (No. 04/2000 and No. 111/2017)', () => {
    const fatwa04 = SOURCES_BY_ID['dsnmui-04-2000'];
    const fatwa111 = SOURCES_BY_ID['dsnmui-111-2017'];

    expect(fatwa04).toBeDefined();
    expect(fatwa04.documentNumber).toBe('04/DSN-MUI/IV/2000');
    expect(fatwa04.validityStatus).toBe('Berlaku');

    expect(fatwa111).toBeDefined();
    expect(fatwa111.documentNumber).toBe('111/DSN-MUI/IX/2017');
    expect(fatwa111.validityStatus).toBe('Berlaku');
  });

  it('verifies exact original document numbering for non-cash gold (Fatwa 77/2010)', () => {
    const fatwa77 = SOURCES_BY_ID['dsnmui-77-2010'];
    expect(fatwa77).toBeDefined();
    expect(fatwa77.documentNumber).toBe('77/DSN-MUI/V/2010');
    expect(fatwa77.title).toContain('Jual Beli Emas Secara Tidak Tunai');
    expect(fatwa77.validityStatus).toBe('Berlaku');
    expect(fatwa77.relevantClauses.join(' ')).toContain('Qabdh Hukmi');
  });

  it('verifies E-Money (Fatwa 116/2017) and IT Financing (Fatwa 117/2018)', () => {
    const fatwa116 = SOURCES_BY_ID['dsnmui-116-2017'];
    const fatwa117 = SOURCES_BY_ID['dsnmui-117-2018'];

    expect(fatwa116).toBeDefined();
    expect(fatwa116.documentNumber).toBe('116/DSN-MUI/IX/2017');

    expect(fatwa117).toBeDefined();
    expect(fatwa117.documentNumber).toBe('117/DSN-MUI/II/2018');
  });

  it('properly documents POJK 40 Tahun 2024 and flags POJK 10/POJK.05/2022 as revoked', () => {
    const pojk40 = SOURCES_BY_ID['ojk-pojk-40-2024'];
    const pojk10 = SOURCES_BY_ID['ojk-pojk-10-2022'];
    const seojk19 = SOURCES_BY_ID['ojk-seojk-19-2023'];

    expect(pojk40).toBeDefined();
    expect(pojk40.validityStatus).toBe('Berlaku');
    expect(pojk40.revocationNote).toContain('Mencabut');
    expect(pojk40.reviewStatus).toBe('Published');

    expect(pojk10).toBeDefined();
    expect(pojk10.validityStatus).toBe('Dicabut');
    expect(pojk10.revocationNote).toContain('DICABUT');
    expect(pojk10.reviewStatus).toBe('Archived');

    expect(seojk19).toBeDefined();
    expect(seojk19.validityStatus).toBe('Berlaku');
  });
});

describe('Editorial Standards for Learning Modules', () => {
  it('every lesson conforms to structured editorial criteria', () => {
    for (const lesson of LESSONS) {
      expect(lesson.learningObjectives.length).toBeGreaterThanOrEqual(2);
      expect(lesson.conceptExplanation.length).toBeGreaterThan(20);
      expect(lesson.applicableContext.length).toBeGreaterThan(10);
      expect(lesson.practicalExample.length).toBeGreaterThan(20);
      expect(lesson.relevantPrinciples.length).toBeGreaterThanOrEqual(2);
      expect(lesson.importantLimitations.length).toBeGreaterThanOrEqual(1);
      expect(lesson.reviewStatus).toBe('Published');
      expect(lesson.reviewer).toBeTruthy();

      // Ensure every referenced source exists in the registry
      for (const sourceId of lesson.sourceIds) {
        expect(SOURCES_BY_ID[sourceId]).toBeDefined();
      }
    }
  });

  it('scenarios and quizzes are traceable to validated sources and published', () => {
    for (const scenario of SCENARIOS) {
      expect(scenario.reviewStatus).toBe('Published');
      if (scenario.sourceIds) {
        for (const sId of scenario.sourceIds) {
          expect(SOURCES_BY_ID[sId]).toBeDefined();
        }
      }
    }

    for (const q of QUIZ) {
      expect(q.reviewStatus).toBe('Published');
      if (q.sourceIds) {
        for (const sId of q.sourceIds) {
          expect(SOURCES_BY_ID[sId]).toBeDefined();
        }
      }
    }
  });
});

describe('Ethical Guardrails & Disclaimers', () => {
  it('does not make unsupported absolute halal/haram declarations', () => {
    const combinedTexts = [
      ...LESSONS.map((l) => [l.title, l.conceptExplanation, l.practicalExample, ...l.body].join(' ')),
      ...SCENARIOS.map((s) => [s.title, s.story, ...s.explanations].join(' ')),
      ...QUIZ.map((q) => [q.question, q.explanation].join(' ')),
    ];

    for (const text of combinedTexts) {
      const lower = text.toLowerCase();
      expect(lower).not.toMatch(/dijamin halal|pasti halal|mutlak halal|pasti haram/);
      expect(lower).not.toMatch(/fatwa resmi dari aplikasi|kami memfatwakan/);
    }
  });
});
