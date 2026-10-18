import React from 'react';
import { Text, View } from 'react-native';
import { router } from 'expo-router';
import { Screen } from '../src/components/Screen';
import { Body, Button, Card, ProgressBar, SectionHeader } from '../src/components/ui';
import { useAppStore } from '../src/store/AppStore';
import { computeProgress } from '../src/utils/progress';
import { formatDate } from '../src/utils/text';
import { colors, typography } from '../src/theme';

function Stat({ value, label, testID }: { value: string; label: string; testID?: string }) {
  return (
    <View style={{ flexBasis: '47%', flexGrow: 1, backgroundColor: '#fff', borderWidth: 1, borderColor: colors.line, borderRadius: 16, padding: 14 }}>
      <Text testID={testID} style={[typography.title, { fontSize: 24, color: colors.primary }]}>
        {value}
      </Text>
      <Text style={[typography.tiny, { color: colors.muted }]}>{label}</Text>
    </View>
  );
}

export default function ProgressScreen() {
  const { state } = useAppStore();
  const p = computeProgress(state);
  const recent = [...state.activity].reverse().slice(0, 6);

  return (
    <Screen back={{ label: 'Kembali', fallback: '/(tabs)' }} eyebrow="Your journey" title="Progres belajar">
      <Card>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={[typography.body, { fontWeight: '700', color: colors.text }]}>Total pembelajaran selesai</Text>
          <Text style={[typography.body, { fontWeight: '800', color: colors.primary }]} testID="progress-percent">{p.percent}%</Text>
        </View>
        <View style={{ marginVertical: 10 }}>
          <ProgressBar percent={p.percent} label="Total pembelajaran" />
        </View>
        <Body>Dihitung dari checklist, materi, skenario, dan skor kuis terbaik.</Body>
      </Card>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 8 }}>
        <Stat testID="stat-checks" value={String(p.checks)} label="Checklist selesai" />
        <Stat testID="stat-lessons" value={`${p.lessonsRead}/${p.lessonsTotal}`} label="Materi dibaca" />
        <Stat testID="stat-scenarios" value={`${p.scenariosDone}/${p.scenariosTotal}`} label="Skenario selesai" />
        <Stat testID="stat-quizzes" value={String(p.quizAttempts)} label="Kuis diselesaikan" />
        <Stat testID="stat-last-score" value={p.lastQuizScore ? `${p.lastQuizScore.score}/${p.lastQuizScore.total}` : '—'} label="Nilai kuis terakhir" />
        <Stat testID="stat-best" value={p.quizAttempts ? `${p.bestQuizPercent}%` : '—'} label="Skor kuis terbaik" />
      </View>

      <SectionHeader title="Aktivitas terakhir" />
      <Card>
        {recent.length ? (
          recent.map((a, i) => (
            <View key={`${a.date}-${i}`} style={{ paddingVertical: 6 }}>
              <Text style={[typography.small, { color: colors.text, fontWeight: '600' }]}>{a.text}</Text>
              <Text style={[typography.tiny, { color: colors.muted }]}>{formatDate(a.date)}</Text>
            </View>
          ))
        ) : (
          <Body>Aktivitasmu akan muncul setelah kamu mulai belajar.</Body>
        )}
      </Card>
      <Button label="Lanjut belajar" variant="secondary" full onPress={() => router.push('/(tabs)/learn')} />
    </Screen>
  );
}
