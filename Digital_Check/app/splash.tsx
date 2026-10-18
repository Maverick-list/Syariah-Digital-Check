import React, { useEffect, useRef } from 'react';
import { AccessibilityInfo, Animated, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Icon } from '../src/components/ui';
import { useAppStore } from '../src/store/AppStore';
import { colors, typography } from '../src/theme';

export default function Splash() {
  const { state } = useAppStore();
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let cancelled = false;
    AccessibilityInfo.isReduceMotionEnabled().then((reduce) => {
      if (cancelled) return;
      const duration = reduce ? 0 : 1400;
      Animated.timing(progress, { toValue: 1, duration, useNativeDriver: false }).start();
      timer = setTimeout(
        () => router.replace(state.onboardingDone ? '/(tabs)' : '/onboarding'),
        reduce ? 300 : duration + 200,
      );
    });
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const width = progress.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });

  return (
    <View style={styles.root} testID="splash-screen">
      <View style={styles.mark}>
        <Icon name="shield-checkmark" size={56} color={colors.accent} />
      </View>
      <Text accessibilityRole="header" style={styles.title}>
        Syariah{'\n'}Digital Check
      </Text>
      <Text style={styles.tagline}>Cerdas Sebelum Transaksi,{'\n'}Bijak dalam Pilihan.</Text>
      <View style={styles.track}>
        <Animated.View style={[styles.fill, { width }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.deep, alignItems: 'center', justifyContent: 'center', padding: 32 },
  mark: {
    width: 104,
    height: 104,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#ffffff30',
    backgroundColor: '#ffffff10',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: { ...typography.title, fontSize: 34, color: colors.onPrimary, textAlign: 'center', lineHeight: 40 },
  tagline: { ...typography.body, color: colors.onPrimaryMuted, textAlign: 'center', marginTop: 14 },
  track: { width: 120, height: 4, borderRadius: 4, backgroundColor: '#ffffff25', marginTop: 40, overflow: 'hidden' },
  fill: { height: '100%', backgroundColor: colors.accent },
});
