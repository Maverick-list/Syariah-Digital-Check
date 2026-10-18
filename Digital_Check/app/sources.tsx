import React from 'react';
import { Pressable, Text } from 'react-native';
import { Screen, Disclaimer } from '../src/components/Screen';
import { Body, Card, Notice, StatusLabel } from '../src/components/ui';
import { SOURCES } from '../src/data/sources';
import { openExternal } from '../src/utils/platform';
import { formatDate } from '../src/utils/text';
import { colors, typography } from '../src/theme';

export default function SourcesScreen() {
  return (
    <Screen back={{ label: 'Profil', fallback: '/(tabs)/profile' }} eyebrow="Transparansi" title="Sumber & referensi">
      <Body>
        Setiap rujukan menampilkan apa yang sudah diverifikasi. Aplikasi hanya merujuk judul dan situs resmi; isi lengkap harus dibaca langsung pada sumber resminya.
      </Body>
      <Notice tone="info">
        Verifikasi judul/nomor fatwa dilakukan melalui pencarian web pada {formatDate('2026-10-18')}. Naskah primer belum ditinjau ulang oleh tim pengembang, dan ahli syariah belum meninjau konten ini.
      </Notice>
      {SOURCES.map((s) => (
        <Card key={s.id} testID={`source-${s.id}`}>
          <StatusLabel label={s.kind === 'fatwa' ? 'Fatwa' : s.kind === 'regulator' ? 'Regulator' : 'Portal resmi'} tone="info" />
          <Text style={[typography.body, { fontWeight: '800', color: colors.text, marginTop: 8 }]}>{s.title}</Text>
          <Text style={[typography.small, { color: colors.muted }]}>{s.publisher}</Text>
          <Text style={[typography.small, { color: colors.muted, marginTop: 6 }]}>{s.verificationNote}</Text>
          <Text style={[typography.tiny, { color: colors.muted, marginTop: 4 }]}>Terakhir dicek: {formatDate(s.lastVerified)}</Text>
          <Pressable accessibilityRole="link" onPress={() => openExternal(s.url)} style={{ minHeight: 44, justifyContent: 'center' }}>
            <Text style={[typography.small, { color: colors.primary, fontWeight: '800' }]}>Buka situs resmi ›</Text>
          </Pressable>
        </Card>
      ))}
      <Disclaimer />
    </Screen>
  );
}
