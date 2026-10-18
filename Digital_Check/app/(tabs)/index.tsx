import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Body, Button, Card, Eyebrow, Icon, ListItem, Notice, Pill, ProgressBar, SectionHeader } from '../../src/components/ui';
import { Disclaimer } from '../../src/components/Screen';
import { useAppStore } from '../../src/store/AppStore';
import { LESSONS } from '../../src/data/lessons';
import { SCENARIOS } from '../../src/data/scenarios';
import { CATEGORY_BY_ID } from '../../src/data/checklist';
import { computeProgress } from '../../src/utils/progress';
import { TOTAL_STEPS } from '../../src/utils/checklist';
import { colors, radius, spacing, typography } from '../../src/theme';

export default function Home() {
  const { state, saveError } = useAppStore();
  const progress = computeProgress(state);
  const nextLesson = LESSONS.find((l) => !state.lessonsRead.includes(l.id)) ?? LESSONS[0];
  const nextScenario = SCENARIOS.find((s) => !state.scenariosDone.includes(s.id)) ?? SCENARIOS[0];
  const draft = state.draft;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        <SafeAreaView edges={['top']} style={styles.top}>
          <View style={styles.topRow}>
            <Text style={styles.brand}>◈ Syariah Digital Check</Text>
            <View style={styles.avatar} accessibilityLabel="Profil">
              <Text style={{ color: '#fff', fontWeight: '800' }}>
                {(state.displayName || 'S').slice(0, 2).toUpperCase()}
              </Text>
            </View>
          </View>
          <Text accessibilityRole="header" style={styles.greet} testID="home-greeting">
            Assalamu’alaikum,{'\n'}
            {state.displayName || 'Sahabat'} 👋
          </Text>
          <Text style={styles.tag}>Cerdas sebelum transaksi, bijak dalam pilihan.</Text>
        </SafeAreaView>

        <View style={{ padding: spacing.lg }}>
          {saveError ? <Notice tone="warning">{saveError}</Notice> : null}

          <View style={styles.hero}>
            <Eyebrow>30-second check</Eyebrow>
            <Text style={[typography.heading, { color: colors.text, marginTop: 6 }]}>Sudah siap sebelum klik?</Text>
            <Body style={{ marginVertical: 8 }}>
              Pahami transaksi, cek hal penting, lalu tentukan pilihan dengan lebih sadar.
            </Body>
            <Button
              label="Mulai Syariah Digital Check"
              icon="arrow-forward"
              full
              testID="home-start-check"
              onPress={() => router.push('/(tabs)/check')}
            />
          </View>

          <View style={styles.stepsRow}>
            {[
              ['pause-circle-outline', 'PAUSE', 'Berhenti sejenak'],
              ['search-circle-outline', 'CHECK', 'Pahami informasi'],
              ['checkmark-circle-outline', 'CHOOSE', 'Putuskan sadar'],
            ].map(([icon, k, d]) => (
              <View key={k} style={styles.stepMini} accessible accessibilityLabel={`${k}: ${d}`}>
                <Icon name={icon} size={26} />
                <Text style={[typography.small, { fontWeight: '800', color: colors.text, marginTop: 4 }]}>{k}</Text>
                <Text style={[typography.tiny, { color: colors.muted }]}>{d}</Text>
              </View>
            ))}
          </View>

          {draft ? (
            <Card
              testID="home-resume-draft"
              onPress={() => router.push({ pathname: '/checklist', params: { category: draft.category, resume: '1' } })}
              accessibilityLabel="Lanjutkan pemeriksaan yang belum selesai"
              style={{ borderColor: colors.accent }}
            >
              <Eyebrow>Belum selesai</Eyebrow>
              <Text style={[typography.body, { color: colors.text, fontWeight: '700', marginTop: 4 }]}>
                Lanjutkan check: {CATEGORY_BY_ID[draft.category].label}
              </Text>
              <Body>
                Langkah {draft.step + 1} dari {TOTAL_STEPS}
              </Body>
            </Card>
          ) : null}

          <SectionHeader eyebrow="Your learning" title="Perjalanan belajarmu" action={<Pill>{progress.percent > 0 ? 'Terus bertumbuh' : 'Mulai hari ini'}</Pill>} />
          <Card testID="home-progress-card" onPress={() => router.push('/progress')} accessibilityLabel={`Progres belajar ${progress.percent} persen. Buka detail progres`}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={[typography.body, { fontWeight: '700', color: colors.text }]}>Progres belajar</Text>
              <Text style={[typography.body, { fontWeight: '800', color: colors.primary }]} testID="home-progress-percent">
                {progress.percent}%
              </Text>
            </View>
            <View style={{ marginVertical: 10 }}>
              <ProgressBar percent={progress.percent} label="Progres belajar" />
            </View>
            <Body>
              {progress.checks} checklist · {progress.lessonsRead} materi · {progress.quizAttempts} kuis
            </Body>
          </Card>

          <SectionHeader
            title="Belajar hari ini"
          />
          <Card>
            <ListItem
              testID="home-daily-lesson"
              icon="book-outline"
              title={nextLesson.title}
              subtitle={`${nextLesson.category} · ${nextLesson.readingMinutes} menit`}
              onPress={() => router.push(`/lesson/${nextLesson.id}`)}
            />
          </Card>

          <SectionHeader
            title="Skenario pilihan"
            action={
              <Text accessibilityRole="link" onPress={() => router.push('/scenarios')} style={[typography.small, { color: colors.primary, fontWeight: '800', padding: 8 }]}>
                Lihat semua ›
              </Text>
            }
          />
          <Card>
            <ListItem
              testID="home-featured-scenario"
              icon={nextScenario.icon}
              title={nextScenario.title}
              subtitle={`${nextScenario.categoryLabel} · contoh fiktif`}
              onPress={() => router.push(`/scenarios/${nextScenario.id}`)}
            />
          </Card>

          <View style={{ marginTop: spacing.lg }}>
            <Disclaimer compact />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  top: { backgroundColor: colors.deep, paddingHorizontal: 20, paddingBottom: 22, borderBottomLeftRadius: 26, borderBottomRightRadius: 26 },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 },
  brand: { ...typography.eyebrow, color: '#D8E9DF', textTransform: 'uppercase' },
  avatar: { width: 38, height: 38, borderRadius: 19, borderWidth: 1, borderColor: '#ffffff60', alignItems: 'center', justifyContent: 'center' },
  greet: { ...typography.title, color: '#fff', marginTop: 22, marginBottom: 8, lineHeight: 32 },
  tag: { ...typography.small, color: colors.onPrimaryMuted },
  hero: { backgroundColor: '#EEF6EF', borderWidth: 1, borderColor: '#D4E6D8', borderRadius: radius.hero, padding: 18 },
  stepsRow: { flexDirection: 'row', gap: 8, marginTop: 14 },
  stepMini: { flex: 1, backgroundColor: '#fff', borderWidth: 1, borderColor: colors.line, borderRadius: 15, alignItems: 'center', paddingVertical: 12 },
});
