import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { router } from 'expo-router';
import { Screen } from '../../src/components/Screen';
import { Body, Button, Card, Icon, Notice, OptionRow, Pill } from '../../src/components/ui';
import { QUIZ } from '../../src/data/quiz';
import { useAppStore } from '../../src/store/AppStore';
import { evaluateQuizAnswer, scorePercent, scoreQuiz } from '../../src/utils/scoring';
import { makeId } from '../../src/utils/text';
import { colors, typography } from '../../src/theme';

export default function QuizTab() {
  const { state, dispatch } = useAppStore();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(() => QUIZ.map(() => null));
  const [finished, setFinished] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const q = QUIZ[index];
  const feedback = checked && selected !== null ? evaluateQuizAnswer(q, selected) : null;
  const isLast = index === QUIZ.length - 1;

  const check = () => {
    if (selected === null) {
      setMessage('Pilih jawaban terlebih dahulu.');
      return;
    }
    setMessage(null);
    const next = [...answers];
    next[index] = selected;
    setAnswers(next);
    setChecked(true);
  };

  const advance = () => {
    if (isLast) {
      const score = scoreQuiz(QUIZ, answers);
      dispatch({ type: 'ADD_QUIZ_ATTEMPT', attempt: { id: makeId('quiz'), date: new Date().toISOString(), score, total: QUIZ.length } });
      setFinished(true);
      return;
    }
    setIndex(index + 1);
    setSelected(null);
    setChecked(false);
  };

  const retry = () => {
    setIndex(0);
    setSelected(null);
    setChecked(false);
    setAnswers(QUIZ.map(() => null));
    setFinished(false);
    setMessage(null);
  };

  if (finished) {
    const score = scoreQuiz(QUIZ, answers);
    return (
      <Screen tab eyebrow="Test your understanding" title="Kuis selesai">
        <Card style={{ alignItems: 'center', paddingVertical: 24 }} testID="quiz-result">
          <Icon name="ribbon-outline" size={48} color={colors.accent} />
          <Text style={[typography.title, { color: colors.primary, marginTop: 8 }]} testID="quiz-score">
            {score} / {QUIZ.length}
          </Text>
          <Body>Nilai latihan: {scorePercent(score, QUIZ.length)}%</Body>
        </Card>
        <Notice tone="info">
          Nilai hanya menunjukkan hasil latihan ini, bukan sertifikasi pengetahuan atau kepatuhan syariah.
        </Notice>
        <Button label="Ulangi kuis" icon="refresh" full onPress={retry} testID="quiz-retry" />
        <Button label="Lihat progres" variant="secondary" full style={{ marginTop: 10 }} onPress={() => router.push('/progress')} />
      </Screen>
    );
  }

  const last = state.quizAttempts[state.quizAttempts.length - 1];

  return (
    <Screen tab eyebrow="Test your understanding" title="Kuis singkat">
      <Card>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Pill>{`Pertanyaan ${index + 1} dari ${QUIZ.length}`}</Pill>
          <Text style={[typography.tiny, { color: colors.muted }]}>Pilih jawaban terbaik</Text>
        </View>
        <Text accessibilityRole="header" style={[typography.section, { color: colors.text, marginVertical: 12 }]} testID="quiz-question">
          {q.question}
        </Text>
        <View accessibilityRole="radiogroup">
          {q.options.map((o, i) => {
            const isSel = selected === i;
            const st = checked ? (i === q.correctIndex ? 'correct' : isSel ? 'wrong' : null) : null;
            return <OptionRow key={o} testID={`quiz-option-${i}`} label={o} selected={isSel} disabled={checked} state={st} onPress={() => setSelected(i)} />;
          })}
        </View>
        {message ? <Notice tone="warning" testID="quiz-message">{message}</Notice> : null}
        {feedback ? (
          <Notice tone={feedback.correct ? 'good' : 'warning'} testID="quiz-feedback">
            {(feedback.correct ? 'Benar. ' : 'Belum tepat. ') + feedback.explanation}
          </Notice>
        ) : null}
        <Button
          label={!checked ? 'Periksa jawaban' : isLast ? 'Lihat hasil' : 'Pertanyaan berikutnya'}
          full
          testID="quiz-action"
          style={{ marginTop: 12 }}
          onPress={!checked ? check : advance}
        />
      </Card>
      {last ? <Body>Percobaan terakhir: {last.score}/{last.total}</Body> : null}
      <Body style={{ marginTop: 8 }}>Nilai hanya menunjukkan hasil latihan ini, bukan sertifikasi pengetahuan atau kepatuhan syariah.</Body>
    </Screen>
  );
}
