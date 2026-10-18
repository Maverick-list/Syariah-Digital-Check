import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Icon } from '../src/components/ui';
import { useAppStore } from '../src/store/AppStore';
import { colors, typography } from '../src/theme';

const SLIDES = [
  { key: 'PAUSE', icon: 'pause-circle-outline', text: 'Jangan terburu-buru. Ambil waktu sejenak untuk memahami transaksi finansial sebelum memutuskan.' },
  { key: 'CHECK', icon: 'search-circle-outline', text: 'Pahami mekanisme, ketentuan, dan aspek syariahnya. Periksa informasi dari sumber yang tepercaya.' },
  { key: 'CHOOSE', icon: 'checkmark-circle-outline', text: 'Pilih dengan lebih sadar berdasarkan informasi yang memadai. Aplikasi ini edukasi, bukan fatwa.' },
] as const;

export default function Onboarding() {
  const { dispatch } = useAppStore();
  const [i, setI] = useState(0);
  const slide = SLIDES[i];
  const last = i === SLIDES.length - 1;

  const finish = () => {
    dispatch({ type: 'COMPLETE_ONBOARDING' });
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.root} testID="onboarding-screen">
      <View style={styles.body}>
        <View style={styles.art}>
          <Icon name={slide.icon} size={88} color={colors.primary} />
        </View>
        <Text accessibilityRole="header" style={styles.key}>
          {slide.key}
        </Text>
        <Text style={styles.text}>{slide.text}</Text>
        <View style={styles.dots} accessibilityLabel={`Slide ${i + 1} dari ${SLIDES.length}`}>
          {SLIDES.map((s, idx) => (
            <View key={s.key} style={[styles.dot, idx === i && styles.dotActive]} />
          ))}
        </View>
      </View>
      <View style={styles.actions}>
        {last ? (
          <Button label="Kembali" variant="ghost" onPress={() => setI(i - 1)} style={{ flex: 1 }} />
        ) : (
          <Button label="Lewati" variant="ghost" onPress={finish} testID="onboarding-skip" style={{ flex: 1 }} />
        )}
        <Button
          label={last ? 'Mulai' : 'Selanjutnya'}
          onPress={last ? finish : () => setI(i + 1)}
          testID="onboarding-next"
          style={{ flex: 1 }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  body: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 },
  art: {
    width: 180,
    height: 180,
    borderRadius: 48,
    backgroundColor: colors.soft,
    borderWidth: 1,
    borderColor: colors.softBorder,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  key: { ...typography.title, fontSize: 32, color: colors.primary, letterSpacing: 2 },
  text: { ...typography.body, fontSize: 15, color: colors.muted, textAlign: 'center', marginTop: 12, lineHeight: 23 },
  dots: { flexDirection: 'row', gap: 8, marginTop: 28 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.line },
  dotActive: { width: 24, backgroundColor: colors.primary },
  actions: { flexDirection: 'row', gap: 12, padding: 20 },
});
