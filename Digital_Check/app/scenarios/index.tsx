import React from 'react';
import { Screen } from '../../src/components/Screen';
import { Card, ListItem, Notice } from '../../src/components/ui';
import { router } from 'expo-router';
import { SCENARIOS } from '../../src/data/scenarios';
import { useAppStore } from '../../src/store/AppStore';

export default function Scenarios() {
  const { state } = useAppStore();
  return (
    <Screen
      back={{ label: 'Beranda', fallback: '/(tabs)' }}
      eyebrow="Learn with real-life examples"
      title="Skenario transaksi"
      subtitle="Contoh fiktif untuk latihan berpikir kritis — bukan penilaian terhadap produk tertentu."
    >
      <Card>
        {SCENARIOS.map((s) => (
          <ListItem
            key={s.id}
            testID={`scenario-${s.id}`}
            icon={s.icon}
            title={s.title}
            subtitle={`${s.categoryLabel} · contoh fiktif${state.scenariosDone.includes(s.id) ? ' · selesai ✓' : ''}`}
            onPress={() => router.push(`/scenarios/${s.id}`)}
          />
        ))}
      </Card>
      <Notice tone="info">Semua skenario fiktif dan hanya untuk edukasi.</Notice>
    </Screen>
  );
}
