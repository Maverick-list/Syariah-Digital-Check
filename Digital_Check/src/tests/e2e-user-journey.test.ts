import {
  initialState,
  reducer,
  parsePersisted,
} from '../store/reducer';
import { LESSONS } from '../data/lessons';
import { SCENARIOS } from '../data/scenarios';
import { QUIZ } from '../data/quiz';
import { CATEGORIES, getStepsForCategory } from '../data/checklist';
import { computeResult, unresolvedSteps, allAnswered } from '../utils/checklist';
import { computeProgress, computePillarCompetencies, getLiteracyLevel } from '../utils/progress';
import type { PersistedState, ChecklistAnswers, CheckRecord, QuizAttempt } from '../types';

describe('Phase 7 QA — End-to-End User Journey Simulation', () => {
  let state: PersistedState;

  beforeEach(() => {
    state = { ...initialState };
  });

  test('Step 1: New user begins with empty state and zero progress', () => {
    expect(state.checks).toHaveLength(0);
    expect(state.lessonsRead).toHaveLength(0);
    expect(state.scenariosDone).toHaveLength(0);
    expect(state.quizAttempts).toHaveLength(0);

    const progress = computeProgress(state);
    expect(progress.checks).toBe(0);
    expect(progress.lessonsRead).toBe(0);
    expect(progress.quizAttempts).toBe(0);
    expect(progress.percent).toBe(0);

    const pillars = computePillarCompetencies(state);
    expect(pillars.akad).toBe(0);
    expect(pillars.riba).toBe(0);
    expect(pillars.qabdh).toBe(0);
    expect(pillars.etika).toBe(0);

    const level = getLiteracyLevel(progress.percent);
    expect(level.level).toBe('Pemula Sadar');
  });

  test('Step 2 & 3: User explores learning hub and completes a lesson', () => {
    expect(LESSONS.length).toBeGreaterThanOrEqual(4);
    const targetLesson = LESSONS[0];

    // User marks lesson read
    state = reducer(state, {
      type: 'MARK_LESSON_READ',
      lessonId: targetLesson.id,
      title: targetLesson.title,
      at: new Date().toISOString(),
    });

    expect(state.lessonsRead).toContain(targetLesson.id);
    expect(state.lessonsRead).toHaveLength(1);

    // Reading the same lesson again does not duplicate entries
    state = reducer(state, {
      type: 'MARK_LESSON_READ',
      lessonId: targetLesson.id,
      title: targetLesson.title,
      at: new Date().toISOString(),
    });
    expect(state.lessonsRead).toHaveLength(1);

    // Progress updates accurately
    const progress = computeProgress(state);
    expect(progress.lessonsRead).toBe(1);
    expect(progress.percent).toBeGreaterThan(0);
  });

  test('Step 4: User completes a quiz with high accuracy', () => {
    expect(QUIZ.length).toBeGreaterThanOrEqual(5);
    const questionsToTake = QUIZ.slice(0, 5);

    // Record quiz attempt
    const attempt: QuizAttempt = {
      id: 'quiz-attempt-1',
      date: new Date().toISOString(),
      score: 5,
      total: questionsToTake.length,
      topic: 'Akad Fiqih & Riba',
    };

    state = reducer(state, { type: 'ADD_QUIZ_ATTEMPT', attempt });

    expect(state.quizAttempts).toHaveLength(1);
    expect(state.quizAttempts[0].score).toBe(5);

    const progress = computeProgress(state);
    expect(progress.quizAttempts).toBe(1);
    expect(progress.bestQuizPercent).toBe(100);

    // Competency pillars reflect verified learning
    const pillars = computePillarCompetencies(state);
    expect(pillars.riba).toBeGreaterThan(0);
  });

  test('Step 5 & 6: User starts a transaction assessment and views results', () => {
    const category = 'paylater';
    const steps = getStepsForCategory(category);
    expect(steps).toHaveLength(5);

    // Realistic assessment answers: all clear options
    const answers: ChecklistAnswers = {
      structure: steps[0].options[0].id,
      transparency: steps[1].options[0].id,
      mechanism: steps[2].options[0].id,
      sharia: steps[3].options[0].id,
      readiness: steps[4].options[0].id,
    };

    expect(allAnswered(answers, category)).toBe(true);

    const evaluation = computeResult(answers, category);
    expect(evaluation.state).toBe('understood');
    expect(evaluation.missing).toHaveLength(0);

    // Save assessment to user history
    const checkRecord: CheckRecord = {
      id: 'check-e2e-1',
      date: new Date().toISOString(),
      category,
      answers,
      resultState: evaluation.state,
      unresolvedCount: evaluation.missing.length,
    };

    state = reducer(state, {
      type: 'ADD_CHECK',
      record: checkRecord,
      text: 'Evaluasi PayLater selesai dengan status dipahami',
    });
    expect(state.checks).toHaveLength(1);
    expect(state.checks[0].category).toBe('paylater');
  });

  test('Step 7 & 8: Dashboard analytics update dynamically', () => {
    // Populate realistic state with 1 check, 2 lessons, 1 scenario, 1 quiz
    state = reducer(state, {
      type: 'MARK_LESSON_READ',
      lessonId: LESSONS[0].id,
      title: LESSONS[0].title,
      at: new Date().toISOString(),
    });
    state = reducer(state, {
      type: 'MARK_LESSON_READ',
      lessonId: LESSONS[1].id,
      title: LESSONS[1].title,
      at: new Date().toISOString(),
    });
    state = reducer(state, {
      type: 'MARK_SCENARIO_DONE',
      scenarioId: SCENARIOS[0].id,
      title: SCENARIOS[0].title,
      at: new Date().toISOString(),
    });
    state = reducer(state, {
      type: 'ADD_QUIZ_ATTEMPT',
      attempt: {
        id: 'quiz-1',
        date: new Date().toISOString(),
        score: 5,
        total: 5,
      },
    });

    const category = 'gold';
    const steps = getStepsForCategory(category);
    const answers: ChecklistAnswers = {
      structure: steps[0].options[0].id,
      transparency: steps[1].options[0].id,
      mechanism: steps[2].options[0].id,
      sharia: steps[3].options[0].id,
      readiness: steps[4].options[0].id,
    };
    const evalResult = computeResult(answers, category);

    state = reducer(state, {
      type: 'ADD_CHECK',
      record: {
        id: 'check-1',
        date: new Date().toISOString(),
        category,
        answers,
        resultState: evalResult.state,
        unresolvedCount: evalResult.missing.length,
      },
      text: 'Evaluasi Emas Digital selesai',
    });

    const progress = computeProgress(state);
    expect(progress.checks).toBe(1);
    expect(progress.lessonsRead).toBe(2);
    expect(progress.scenariosDone).toBe(1);
    expect(progress.quizAttempts).toBe(1);
    expect(progress.percent).toBeGreaterThan(40);

    const pillars = computePillarCompetencies(state);
    expect(pillars.akad).toBeGreaterThan(0);
    expect(pillars.qabdh).toBeGreaterThan(0);
    expect(pillars.riba).toBeGreaterThan(0);
  });

  test('Step 9 & 10: Page refresh persistence round-trip keeps guest data 100% intact', () => {
    // Setup state
    state = reducer(state, { type: 'SET_NAME', name: 'Ahmad Fauzi' });
    state = reducer(state, {
      type: 'MARK_LESSON_READ',
      lessonId: LESSONS[0].id,
      title: LESSONS[0].title,
      at: new Date().toISOString(),
    });
    state = reducer(state, {
      type: 'ADD_QUIZ_ATTEMPT',
      attempt: {
        id: 'quiz-persistent-1',
        date: '2026-11-20T10:00:00Z',
        score: 4,
        total: 5,
      },
    });

    // 1. Serialize to JSON string (simulating localStorage.setItem)
    const serialized = JSON.stringify(state);

    // 2. Deserialize (simulating browser page reload and localStorage.getItem)
    const rehydrated = parsePersisted(serialized);

    // 3. Verify exact fidelity
    expect(rehydrated.displayName).toBe('Ahmad Fauzi');
    expect(rehydrated.lessonsRead).toEqual([LESSONS[0].id]);
    expect(rehydrated.quizAttempts).toHaveLength(1);
    expect(rehydrated.quizAttempts[0].score).toBe(4);
    expect(rehydrated.quizAttempts[0].id).toBe('quiz-persistent-1');
  });

  describe('Edge Cases & Resiliency Testing', () => {
    test('handles incomplete assessment answers with unresolved steps flagged', () => {
      const category = 'paylater';
      const steps = getStepsForCategory(category);
      const answers: ChecklistAnswers = {
        structure: steps[0].options[0].id, // clear
        transparency: undefined, // missing
        mechanism: steps[2].options[1].id, // warning / non-clear
        sharia: undefined, // missing
        readiness: undefined, // missing
      };

      const unresolved = unresolvedSteps(answers, category);
      // All steps that are not 'clear' are unresolved (4 steps)
      expect(unresolved.length).toBeGreaterThanOrEqual(3);

      const result = computeResult(answers, category);
      expect(result.missing.length).toBeGreaterThanOrEqual(3);
      // Incomplete assessment cannot achieve 'understood' status
      expect(result.state).not.toBe('understood');
    });

    test('handles empty / corrupted storage rehydration gracefully without throwing', () => {
      const emptyState = parsePersisted('');
      expect(emptyState.checks).toEqual([]);
      expect(emptyState.lessonsRead).toEqual([]);

      const corruptedState = parsePersisted('{ bad json: true ');
      expect(corruptedState.checks).toEqual([]);
      expect(corruptedState.displayName).toBe('');
    });
  });
});
