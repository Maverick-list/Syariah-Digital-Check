import React from 'react';
import { Text, View } from 'react-native';
import { Redirect, router, useLocalSearchParams } from 'expo-router';
import { Screen, Disclaimer, SourceList } from '../src/components/Screen';
import { Body, Button, Card, Eyebrow, Icon, ListItem, Notice, SectionHeader } from '../src/components/ui';
import { useAppStore } from '../src/store/AppStore';
import { CATEGORY_BY_ID } from '../src/data/checklist';
import { LESSONS_BY_ID } from '../src/data/lessons';
import { computeResult } from '../src/utils/checklist';
import { colors, typography } from '../src/theme';

const ICON = { understood: 'checkmark-circle', needs_checking: 'alert-circle', not_understood: 'pause-circle' } as const;

export default function ResultScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { state } = useAppStore();
  const record = state.checks.find((c) => c.id === id);
  if (!record) return <Redirect href="/(tabs)/check" />;

  const result = computeResult(record.answers, record.category);
  const cat = CATEGORY_BY_ID[record.category];
  const lessons = result.lessonIds.map((l) => LESSONS_BY_ID[l]).filter(Boolean);

  return (
    <Screen back={{ label: 'Beranda', fallback: '/(tabs)' }}>
      <Card style={{ alignItems: 'center', paddingVertical: 24 }} testID="result-summary">
        <Icon name={ICON[result.state]} size={52} color={result.state === 'understood' ? colors.secondary : colors.accent} />
        <View style={{ marginTop: 8, alignItems: 'center' }}>
          <Eyebrow>Hasil pemeriksaan edukatif · {cat.label}</Eyebrow>
          <Text accessibilityRole="header" style={[typography.heading, { color: colors.text, textAlign: 'center', marginTop: 6 }]} testID="result-title">
            {result.title}
          </Text>
          <Body style={{ textAlign: 'center', marginTop: 6 }}>{result.description}</Body>
        </View>
      </Card>

      <SectionHeader title="Yang perlu kamu periksa" />
      <Card testID="result-missing">
        {result.missing.length ? (
          result.missing.map((m) => <ListItem key={m.stepId} icon="information-circle-outline" title={m.label} subtitle={m.hint} />)
        ) : (
          <ListItem
            icon="checkmark-circle-outline"
            title="Tinjau kembali informasi yang kamu peroleh"
            subtitle="Checklist ini tidak menggantikan pemeriksaan dokumen resmi penyedia."
          />
        )}
      </Card>

      <Disclaimer compact />
      <Notice tone="warning">
        Hasil ini bukan fatwa, sertifikasi kepatuhan syariah, atau rekomendasi keuangan. Periksa dokumen resmi dan tanyakan kepada pihak yang kompeten.
      </Notice>

      <Card testID="result-questions">
        <Text style={[typography.body, { fontWeight: '800', color: colors.text }]}>Pertanyaan yang bisa kamu ajukan</Text>
        {result.questions.map((q) => (
          <Text key={q} style={[typography.small, { color: colors.muted, marginTop: 8 }]}>
            • {q}
          </Text>
        ))}
      </Card>

      <SectionHeader title="Materi terkait" />
      <Card>
        {lessons.map((l) => (
          <ListItem
            key={l.id}
            icon="book-outline"
            title={l.title}
            subtitle={`${l.category} · ${l.readingMinutes} menit`}
            onPress={() => router.push(`/lesson/${l.id}`)}
          />
        ))}
      </Card>

      <SourceList ids={result.sourceIds} title="Sumber untuk memeriksa lebih lanjut" />

      <Text style={[typography.small, { color: colors.muted, marginVertical: 8 }]}>
        Hasil pemeriksaan ini sudah tersimpan di perangkat ini.
      </Text>
      <Button label="Baca materi terkait" icon="arrow-forward" full onPress={() => router.push(`/lesson/${lessons[0]?.id ?? 'sumber-tepercaya'}`)} />
      <Button label="Mulai pemeriksaan baru" variant="secondary" full style={{ marginTop: 10 }} testID="result-new-check" onPress={() => router.replace('/(tabs)/check')} />
      <Button label="Ke beranda" variant="ghost" full style={{ marginTop: 10 }} onPress={() => router.replace('/(tabs)')} />
    </Screen>
  );
}
