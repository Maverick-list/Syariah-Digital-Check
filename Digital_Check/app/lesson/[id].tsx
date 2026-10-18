import React from 'react';
import { Text, View } from 'react-native';
import { Redirect, useLocalSearchParams } from 'expo-router';
import { Screen, Disclaimer, SourceList } from '../../src/components/Screen';
import { Body, Button, Card, Eyebrow, Pill } from '../../src/components/ui';
import { LESSONS_BY_ID } from '../../src/data/lessons';
import { useAppStore } from '../../src/store/AppStore';
import { formatDate } from '../../src/utils/text';
import { colors, typography } from '../../src/theme';

export default function LessonDetail() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const lesson = id ? LESSONS_BY_ID[id] : undefined;
  const { state, dispatch } = useAppStore();
  if (!lesson) return <Redirect href="/(tabs)/learn" />;
  const read = state.lessonsRead.includes(lesson.id);

  return (
    <Screen back={{ label: 'Learning hub', fallback: '/(tabs)/learn' }}>
      <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
        <Pill>{lesson.category}</Pill>
        <Text style={[typography.tiny, { color: colors.muted }]}>{lesson.readingMinutes} menit baca</Text>
      </View>
      <Text accessibilityRole="header" style={[typography.title, { fontSize: 24, color: colors.text, marginTop: 10 }]}>
        {lesson.title}
      </Text>
      <Text style={[typography.tiny, { color: colors.muted, marginTop: 4 }]}>Ditinjau {formatDate(lesson.reviewedAt)}</Text>

      <Card>
        {lesson.body.map((p, i) => (
          <Text key={i} style={[typography.body, { color: colors.text, marginBottom: 10 }]}>
            {p}
          </Text>
        ))}
      </Card>

      <Card>
        <Eyebrow>Poin penting</Eyebrow>
        {lesson.keyPoints.map((k) => (
          <Text key={k} style={[typography.body, { color: colors.text, marginTop: 6 }]}>
            • {k}
          </Text>
        ))}
      </Card>

      <SourceList ids={lesson.sourceIds} />
      <Disclaimer compact />

      <Button
        label={read ? 'Sudah dibaca ✓' : 'Tandai selesai dibaca'}
        variant={read ? 'secondary' : 'primary'}
        disabled={read}
        full
        testID="lesson-mark-read"
        style={{ marginTop: 14 }}
        onPress={() => dispatch({ type: 'MARK_LESSON_READ', lessonId: lesson.id, title: lesson.title, at: new Date().toISOString() })}
      />
      {read ? <Body style={{ marginTop: 8 }}>Progres materi tersimpan di perangkat ini.</Body> : null}
    </Screen>
  );
}
