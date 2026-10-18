import React, { useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { router } from 'expo-router';
import { Screen } from '../../src/components/Screen';
import { Body, Card, Chip, Notice, Pill, TextField } from '../../src/components/ui';
import { LESSONS } from '../../src/data/lessons';
import { useAppStore } from '../../src/store/AppStore';
import { formatDate } from '../../src/utils/text';
import { colors, typography } from '../../src/theme';

import { filterLessons } from '../../src/utils/lessons';

export default function Learn() {
  const { state } = useAppStore();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Semua');
  const cats = useMemo(() => ['Semua', ...Array.from(new Set(LESSONS.map((l) => l.category)))], []);
  const list = filterLessons(query, category);

  return (
    <Screen tab eyebrow="Bite-sized learning" title="Learning hub">
      <TextField label="Cari materi" placeholder="Cari materi..." value={query} onChangeText={setQuery} testID="lesson-search" returnKeyType="search" />
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
        {cats.map((c) => (
          <Chip key={c} label={c} active={category === c} onPress={() => setCategory(c)} testID={`lesson-cat-${c}`} />
        ))}
      </View>

      {list.length ? (
        list.map((l) => (
          <Card key={l.id} testID={`lesson-${l.id}`} onPress={() => router.push(`/lesson/${l.id}`)} accessibilityLabel={`${l.title}. ${l.category}, ${l.readingMinutes} menit`}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Pill>{l.category}</Pill>
              <Text style={[typography.tiny, { color: colors.muted }]}>
                {l.readingMinutes} menit{state.lessonsRead.includes(l.id) ? ' · dibaca ✓' : ''}
              </Text>
            </View>
            <Text style={[typography.body, { fontWeight: '800', color: colors.text, marginTop: 8 }]}>{l.title}</Text>
            <Body style={{ marginTop: 4 }}>{l.summary}</Body>
            <Text style={[typography.tiny, { color: colors.muted, marginTop: 8 }]}>Ditinjau {formatDate(l.reviewedAt)}</Text>
          </Card>
        ))
      ) : (
        <Body testID="lesson-empty">Materi tidak ditemukan.</Body>
      )}
      <Notice tone="info">
        Materi bersifat edukatif dan konseptual. Rujukan ditampilkan pada tiap materi beserta status verifikasinya.
      </Notice>
    </Screen>
  );
}
