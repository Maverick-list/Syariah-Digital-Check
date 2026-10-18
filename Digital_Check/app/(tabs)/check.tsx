import React from 'react';
import { Text } from 'react-native';
import { router } from 'expo-router';
import { Screen, Disclaimer } from '../../src/components/Screen';
import { Body, Card, Eyebrow, ListItem, SectionHeader } from '../../src/components/ui';
import { CATEGORIES, CATEGORY_BY_ID } from '../../src/data/checklist';
import { useAppStore } from '../../src/store/AppStore';
import { TOTAL_STEPS } from '../../src/utils/checklist';
import { formatDate } from '../../src/utils/text';
import { colors, typography } from '../../src/theme';

export default function CheckTab() {
  const { state } = useAppStore();
  const draft = state.draft;
  const recent = [...state.checks].reverse().slice(0, 3);

  return (
    <Screen
      tab
      eyebrow="Sharia Digital Check"
      title="Pilih jenis transaksi"
      subtitle="Pilih kategori yang paling dekat dengan transaksi yang sedang kamu pertimbangkan. Ini panduan edukasi, bukan penilaian halal/haram."
    >
      {draft ? (
        <Card
          testID="check-resume-draft"
          onPress={() => router.push({ pathname: '/checklist', params: { category: draft.category, resume: '1' } })}
          accessibilityLabel="Lanjutkan pemeriksaan yang belum selesai"
          style={{ borderColor: colors.accent }}
        >
          <Eyebrow>Lanjutkan</Eyebrow>
          <Text style={[typography.body, { fontWeight: '700', color: colors.text, marginTop: 4 }]}>
            {CATEGORY_BY_ID[draft.category].label} — langkah {draft.step + 1} dari {TOTAL_STEPS}
          </Text>
          <Body>Jawabanmu tersimpan di perangkat ini.</Body>
        </Card>
      ) : null}

      <Card>
        {CATEGORIES.map((c) => (
          <ListItem
            key={c.id}
            testID={`category-${c.id}`}
            icon={c.icon}
            title={c.label}
            subtitle={c.blurb}
            onPress={() => router.push({ pathname: '/checklist', params: { category: c.id } })}
          />
        ))}
      </Card>

      {recent.length ? (
        <>
          <SectionHeader title="Riwayat check terakhir" />
          <Card>
            {recent.map((r) => (
              <ListItem
                key={r.id}
                icon="time-outline"
                title={CATEGORY_BY_ID[r.category].label}
                subtitle={`${formatDate(r.date)} · ${
                  r.resultState === 'understood'
                    ? 'Informasi utama dipahami'
                    : r.resultState === 'needs_checking'
                      ? 'Masih perlu diperiksa'
                      : 'Belum cukup dipahami'
                }`}
                onPress={() => router.push({ pathname: '/result', params: { id: r.id } })}
              />
            ))}
          </Card>
        </>
      ) : null}

      <Disclaimer compact />
    </Screen>
  );
}
