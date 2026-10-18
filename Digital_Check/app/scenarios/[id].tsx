import React, { useState } from 'react';
import { Text } from 'react-native';
import { Redirect, router, useLocalSearchParams } from 'expo-router';
import { Screen } from '../../src/components/Screen';
import { Body, Button, Card, Eyebrow, ListItem, Notice, OptionRow } from '../../src/components/ui';
import { SCENARIOS_BY_ID } from '../../src/data/scenarios';
import { LESSONS_BY_ID } from '../../src/data/lessons';
import { useAppStore } from '../../src/store/AppStore';
import { evaluateScenario } from '../../src/utils/scoring';
import { colors, typography } from '../../src/theme';

export default function ScenarioDetail() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const scenario = id ? SCENARIOS_BY_ID[id] : undefined;
  if (!scenario) return <Redirect href="/scenarios" />;
  return <Detail scenarioId={scenario.id} />;
}

function Detail({ scenarioId }: { scenarioId: string }) {
  const scenario = SCENARIOS_BY_ID[scenarioId];
  const { state, dispatch } = useAppStore();
  const [selected, setSelected] = useState<number | null>(null);
  const feedback = selected !== null ? evaluateScenario(scenario, selected) : null;
  const lesson = LESSONS_BY_ID[scenario.lessonId];
  const done = state.scenariosDone.includes(scenario.id);

  const pick = (i: number) => {
    setSelected(i);
    if (evaluateScenario(scenario, i).correct) {
      dispatch({ type: 'MARK_SCENARIO_DONE', scenarioId: scenario.id, title: scenario.title, at: new Date().toISOString() });
    }
  };

  return (
    <Screen back={{ label: 'Semua skenario', fallback: '/scenarios' }} eyebrow="Skenario edukatif" title={scenario.title}>
      <Card>
        <Body>{scenario.story}</Body>
        <Text accessibilityRole="header" style={[typography.body, { fontWeight: '800', color: colors.text, marginTop: 14 }]}>
          {scenario.question}
        </Text>
        {scenario.options.map((o, i) => (
          <OptionRow
            key={o}
            testID={`scenario-option-${i}`}
            label={o}
            selected={selected === i}
            state={selected === i ? (i === scenario.correctIndex ? 'correct' : 'wrong') : null}
            onPress={() => pick(i)}
          />
        ))}
        {feedback ? (
          <Notice tone={feedback.correct ? 'good' : 'warning'} testID="scenario-feedback">
            {feedback.explanation}
          </Notice>
        ) : null}
        {done && !feedback ? <Notice tone="good">Skenario ini sudah kamu selesaikan ✓</Notice> : null}
      </Card>

      <Eyebrow>Langkah berikutnya</Eyebrow>
      <Card>
        <ListItem icon="book-outline" title={lesson.title} subtitle="Materi terkait" onPress={() => router.push(`/lesson/${lesson.id}`)} />
      </Card>
      <Button
        label="Coba Sharia Digital Check"
        icon="arrow-forward"
        full
        testID="scenario-try-check"
        onPress={() => router.push({ pathname: '/checklist', params: { category: scenario.category } })}
      />
    </Screen>
  );
}
