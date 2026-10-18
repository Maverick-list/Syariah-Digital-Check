import React from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, spacing, typography } from '../theme';
import { DISCLAIMER } from '../data/checklist';
import { getSources } from '../data/sources';
import { Eyebrow, Icon, Notice, Card } from './ui';
import { openExternal } from '../utils/platform';
import { formatDate } from '../utils/text';

export function goBackOr(fallback: string) {
  if (router.canGoBack()) router.back();
  else router.replace(fallback as never);
}

export function BackButton({ label = 'Kembali', fallback = '/' }: { label?: string; fallback?: string }) {
  return (
    <Pressable
      testID="back-button"
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={() => goBackOr(fallback)}
      style={styles.back}
    >
      <Icon name="chevron-back" color={colors.primary} />
      <Text style={[typography.button, { color: colors.primary }]}>{label}</Text>
    </Pressable>
  );
}

export function Screen({
  children,
  eyebrow,
  title,
  subtitle,
  back,
  tab,
  footer,
}: {
  children: React.ReactNode;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  back?: { label?: string; fallback?: string };
  /** true bila layar berada di dalam tab bar (tab bar menangani safe area bawah). */
  tab?: boolean;
  footer?: React.ReactNode;
}) {
  return (
    <SafeAreaView style={styles.safe} edges={tab ? ['top'] : ['top', 'bottom']}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {back ? <BackButton {...back} /> : null}
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          {title ? (
            <Text accessibilityRole="header" style={[typography.title, { color: colors.text, marginTop: 4 }]}>
              {title}
            </Text>
          ) : null}
          {subtitle ? (
            <Text style={[typography.body, { color: colors.muted, marginTop: 6, marginBottom: 8 }]}>{subtitle}</Text>
          ) : null}
          {children}
        </ScrollView>
        {footer ? <View style={styles.footer}>{footer}</View> : null}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export function Disclaimer({ compact }: { compact?: boolean }) {
  return (
    <Notice testID="disclaimer">
      {compact
        ? 'Aplikasi ini sarana edukasi, bukan fatwa, nasihat keuangan profesional, atau sertifikasi kepatuhan syariah.'
        : DISCLAIMER}
    </Notice>
  );
}

export function SourceList({ ids, title = 'Sumber & referensi' }: { ids: string[]; title?: string }) {
  const sources = getSources(ids);
  if (!sources.length) return null;
  return (
    <Card testID="source-list">
      <Text accessibilityRole="header" style={[typography.body, { fontWeight: '800', color: colors.text }]}>
        {title}
      </Text>
      {sources.map((s) => (
        <Pressable
          key={s.id}
          accessibilityRole="link"
          accessibilityLabel={`${s.title}, ${s.publisher}`}
          onPress={() => openExternal(s.url)}
          style={{ paddingVertical: spacing.sm }}
        >
          <Text style={[typography.small, { color: colors.primary, fontWeight: '700' }]}>{s.title}</Text>
          <Text style={[typography.tiny, { color: colors.muted }]}>
            {s.publisher} · dicek {formatDate(s.lastVerified)}
          </Text>
          <Text style={[typography.tiny, { color: colors.muted }]}>{s.verificationNote}</Text>
        </Pressable>
      ))}
    </Card>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: 40 },
  back: { flexDirection: 'row', alignItems: 'center', minHeight: 44, alignSelf: 'flex-start', marginLeft: -6 },
  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.line,
    backgroundColor: colors.background,
  },
});
