import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { router } from 'expo-router';
import Constants from 'expo-constants';
import { Screen, Disclaimer } from '../../src/components/Screen';
import { Body, Button, Card, ListItem, Notice, TextField } from '../../src/components/ui';
import { useAppStore } from '../../src/store/AppStore';
import { NAME_MAX_LENGTH, validateDisplayName } from '../../src/utils/text';
import { confirmAction, notify } from '../../src/utils/platform';
import { typography, colors } from '../../src/theme';

export default function Profile() {
  const { state, dispatch } = useAppStore();
  const [name, setName] = useState(state.displayName);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => setName(state.displayName), [state.displayName]);

  const save = () => {
    const v = validateDisplayName(name);
    if (!v.ok) {
      setError(v.error ?? 'Nama tidak valid.');
      setSaved(false);
      return;
    }
    setError(null);
    dispatch({ type: 'SET_NAME', name: v.value });
    setName(v.value);
    setSaved(true);
  };

  const reset = () =>
    confirmAction({
      title: 'Reset progres?',
      message: 'Semua riwayat check, materi dibaca, skenario, dan skor kuis di perangkat ini akan dihapus. Tindakan ini tidak dapat dibatalkan.',
      confirmText: 'Reset',
      destructive: true,
      onConfirm: () => {
        dispatch({ type: 'RESET_PROGRESS' });
        notify('Progres lokal direset.');
      },
    });

  return (
    <Screen tab eyebrow="Your space" title="Profil & pengaturan">
      <Card>
        <TextField
          label="Nama panggilan (opsional)"
          placeholder="Masukkan nama panggilan"
          value={name}
          onChangeText={(t) => {
            setName(t);
            setSaved(false);
          }}
          maxLength={NAME_MAX_LENGTH + 10}
          error={error}
          helper={`Maksimal ${NAME_MAX_LENGTH} karakter. Hanya disimpan di perangkat ini.`}
          testID="profile-name-input"
          autoCapitalize="words"
        />
        <Button label="Simpan profil" full onPress={save} testID="profile-save" />
        {saved ? <Body style={{ marginTop: 8 }} testID="profile-saved">Nama tersimpan secara lokal.</Body> : null}
      </Card>

      <Card>
        <ListItem icon="language-outline" title="Bahasa" subtitle="Bahasa Indonesia (pilihan bahasa lain belum tersedia)" />
        <ListItem icon="analytics-outline" title="Progres belajar" subtitle="Lihat statistik dan aktivitas terakhir" onPress={() => router.push('/progress')} testID="profile-progress" />
        <ListItem icon="lock-closed-outline" title="Data & privasi" subtitle="Progres disimpan di perangkat ini. Tidak ada akun, kredensial bank, atau data pribadi yang dikirim." />
        <ListItem icon="search-outline" title="Sumber & referensi" subtitle="Daftar rujukan dan status verifikasinya" onPress={() => router.push('/sources')} testID="profile-sources" />
        <ListItem icon="color-palette-outline" title="Komponen UI" subtitle="Pustaka komponen desain" onPress={() => router.push('/ui-library')} />
        <ListItem icon="information-circle-outline" title="Tentang aplikasi" subtitle={`Literasi keuangan syariah untuk generasi digital · v${Constants.expoConfig?.version ?? '1.0.0'}`} />
      </Card>

      <Disclaimer />
      <Button label="Reset progres" variant="danger" full icon="trash-outline" onPress={reset} testID="profile-reset" style={{ marginTop: 14 }} />
      <Text style={[typography.tiny, { color: colors.muted, marginTop: 10 }]}>
        Konten edukasi tersedia offline. Aplikasi ini tidak menentukan status halal/haram, tidak mengeluarkan fatwa, dan tidak memberikan nasihat keuangan personal.
      </Text>
    </Screen>
  );
}
