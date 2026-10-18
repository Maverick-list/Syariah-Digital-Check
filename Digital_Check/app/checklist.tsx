import React, { useCallback, useState } from 'react';
import { Text, View } from 'react-native';
import { Redirect, router, useLocalSearchParams } from 'expo-router';
import { Screen, BackButton } from '../src/components/Screen';
import { Button, Notice, OptionRow, Pill, ProgressBar, Eyebrow, Body } from '../src/components/ui';
import { useAppStore } from '../src/store/AppStore';
import { CATEGORY_BY_ID, CHECKLIST_STEPS } from '../src/data/checklist';
import { TOTAL_STEPS, computeResult, progressPercent, sanitizeAnswers, validateStep } from '../src/utils/checklist';
import { makeId } from '../src/utils/text';
import { colors, spacing, typography } from '../src/theme';
import type { ChecklistAnswers, StepId, TransactionCategory } from '../src/types';

export default function ChecklistScreen() {
  const params = useLocalSearchParams<{ category?: string; resume?: string }>();
  const category = params.category as TransactionCategory | undefined;
  const valid = !!category && category in CATEGORY_BY_ID;
  if (!valid) return <Redirect href="/(tabs)/check" />;
  return <ChecklistFlow category={category as TransactionCategory} resume={params.resume === '1'} />;
}

function ChecklistFlow({ category, resume }: { category: TransactionCategory; resume: boolean }) {
  const { state, dispatch } = useAppStore();
  const cat = CATEGORY_BY_ID[category];

  const [init] = useState(() => {
    const d = state.draft;
    if (resume && d && d.category === category) return { step: d.step, answers: d.answers, startedAt: d.startedAt };
    return { step: 0, answers: {} as ChecklistAnswers, startedAt: new Date().toISOString() };
  });
  const [step, setStep] = useState(init.step);
  const [answers, setAnswers] = useState<ChecklistAnswers>(init.answers);
  const [error, setError] = useState<string | null>(null);

  const persist = useCallback(
    (nextStep: number, nextAnswers: ChecklistAnswers) =>
      dispatch({
        type: 'SAVE_DRAFT',
        draft: { category, step: nextStep, answers: sanitizeAnswers(nextAnswers), startedAt: init.startedAt },
      }),
    [dispatch, category, init.startedAt],
  );

  const def = CHECKLIST_STEPS[step];
  const isLast = step === TOTAL_STEPS - 1;

  const choose = (optionId: string) => {
    const next = { ...answers, [def.id as StepId]: optionId };
    setAnswers(next);
    setError(null);
    persist(step, next);
  };

  const goNext = () => {
    const err = validateStep(step, answers);
    if (err) {
      setError(err);
      return;
    }
    if (!isLast) {
      setStep(step + 1);
      persist(step + 1, answers);
      return;
    }
    const clean = sanitizeAnswers(answers);
    const result = computeResult(clean, category);
    const record = {
      id: makeId('check'),
      date: new Date().toISOString(),
      category,
      answers: clean,
      resultState: result.state,
      unresolvedCount: result.missing.length,
    };
    dispatch({ type: 'ADD_CHECK', record, text: `Menyelesaikan Sharia Digital Check: ${cat.label}` });
    router.replace({ pathname: '/result', params: { id: record.id } });
  };

  const goPrev = () => {
    if (step === 0) return;
    setStep(step - 1);
    setError(null);
    persist(step - 1, answers);
  };

  return (
    <Screen
      footer={
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <Button label="Sebelumnya" variant="ghost" onPress={goPrev} disabled={step === 0} testID="checklist-prev" style={{ flex: 1 }} />
          <Button label={isLast ? 'Lihat ringkasan' : 'Lanjut'} icon="arrow-forward" onPress={goNext} testID="checklist-next" style={{ flex: 1.4 }} />
        </View>
      }
    >
      <BackButton label="Simpan & keluar" fallback="/(tabs)/check" />
      <Eyebrow>{cat.label}</Eyebrow>
      <Text accessibilityRole="header" style={[typography.title, { fontSize: 22, color: colors.text, marginTop: 4 }]}>
        Periksa sebelum memilih
      </Text>
      <Body style={{ marginTop: 4, marginBottom: spacing.md }}>
        Jawab sesuai informasi yang kamu ketahui. Ini panduan edukasi, bukan penilaian halal/haram.
      </Body>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Pill>{`LANGKAH ${step + 1} DARI ${TOTAL_STEPS}`}</Pill>
        <Text style={[typography.body, { fontWeight: '800', color: colors.primary }]} testID="checklist-percent">
          {progressPercent(step)}%
        </Text>
      </View>
      <View style={{ marginVertical: spacing.md }}>
        <ProgressBar percent={progressPercent(step)} label={`Langkah ${step + 1} dari ${TOTAL_STEPS}`} />
      </View>

      <Eyebrow>{`${step + 1}. ${def.topic}`}</Eyebrow>
      <Text accessibilityRole="header" style={[typography.section, { color: colors.text, marginTop: 4 }]} testID="checklist-question">
        {def.question}
      </Text>
      <Body style={{ marginTop: 4, marginBottom: spacing.sm }}>{def.help}</Body>

      <View accessibilityRole="radiogroup">
        {def.options.map((o) => (
          <OptionRow
            key={o.id}
            testID={`option-${def.id}-${o.id}`}
            label={o.label}
            selected={answers[def.id] === o.id}
            onPress={() => choose(o.id)}
          />
        ))}
      </View>
      {error ? (
        <View accessibilityLiveRegion="polite">
          <Notice tone="warning" testID="checklist-error">
            {error}
          </Notice>
        </View>
      ) : null}
      <View style={{ height: spacing.md }} />
      <Notice tone="info">
        Ingat: jika informasi belum jelas, pilihan yang bijak adalah berhenti sejenak dan mencari penjelasan yang tepercaya.
      </Notice>
    </Screen>
  );
}
