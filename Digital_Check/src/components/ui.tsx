import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  type StyleProp,
  type TextInputProps,
  type ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MIN_TOUCH, colors, radius, shadow, spacing, typography } from '../theme';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

export function Icon({ name, size = 20, color = colors.primary }: { name: string; size?: number; color?: string }) {
  return <Ionicons name={name as IconName} size={size} color={color} accessibilityElementsHidden importantForAccessibility="no" />;
}

/* ---------- Button ---------- */
export function Button({
  label,
  onPress,
  variant = 'primary',
  disabled,
  icon,
  full,
  style,
  testID,
  accessibilityHint,
}: {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  disabled?: boolean;
  icon?: string;
  full?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  accessibilityHint?: string;
}) {
  const v = buttonVariants[variant];
  return (
    <Pressable
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.btn,
        { backgroundColor: v.bg, borderColor: v.border },
        full && { alignSelf: 'stretch' },
        pressed && { opacity: 0.85 },
        disabled && { opacity: 0.45 },
        style,
      ]}
    >
      {icon ? <Icon name={icon} color={v.fg} size={18} /> : null}
      <Text style={[typography.button, { color: v.fg }]}>{label}</Text>
    </Pressable>
  );
}

const buttonVariants = {
  primary: { bg: colors.primary, fg: colors.onPrimary, border: colors.primary },
  secondary: { bg: '#EDF5EF', fg: colors.primary, border: colors.softBorder },
  ghost: { bg: 'transparent', fg: colors.primary, border: colors.line },
  danger: { bg: 'transparent', fg: '#9B1C1C', border: '#E8C4C4' },
} as const;

/* ---------- Card ---------- */
export function Card({
  children,
  style,
  onPress,
  accessibilityLabel,
  testID,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  accessibilityLabel?: string;
  testID?: string;
}) {
  if (onPress) {
    return (
      <Pressable
        testID={testID}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        onPress={onPress}
        style={({ pressed }) => [styles.card, pressed && { opacity: 0.88 }, style]}
      >
        {children}
      </Pressable>
    );
  }
  return (
    <View testID={testID} style={[styles.card, style]}>
      {children}
    </View>
  );
}

/* ---------- Typography helpers ---------- */
export function Eyebrow({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <Text style={[typography.eyebrow, { color: light ? colors.onPrimaryMuted : colors.secondary, textTransform: 'uppercase' }]}>
      {children}
    </Text>
  );
}

export function Heading({ children, style }: { children: React.ReactNode; style?: object }) {
  return (
    <Text accessibilityRole="header" style={[typography.heading, { color: colors.text }, style]}>
      {children}
    </Text>
  );
}

export function Body({ children, style, testID }: { children: React.ReactNode; style?: object; testID?: string }) {
  return <Text testID={testID} style={[typography.body, { color: colors.muted }, style]}>{children}</Text>;
}

export function SectionHeader({ eyebrow, title, action }: { eyebrow?: string; title: string; action?: React.ReactNode }) {
  return (
    <View style={styles.sectionHeader}>
      <View style={{ flex: 1 }}>
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <Text accessibilityRole="header" style={[typography.section, { color: colors.text, marginTop: 2 }]}>
          {title}
        </Text>
      </View>
      {action}
    </View>
  );
}

/* ---------- Chip & status ---------- */
export function Chip({
  label,
  active,
  onPress,
  testID,
}: {
  label: string;
  active?: boolean;
  onPress?: () => void;
  testID?: string;
}) {
  return (
    <Pressable
      testID={testID}
      accessibilityRole="button"
      accessibilityState={{ selected: !!active }}
      onPress={onPress}
      style={[styles.chip, active && { backgroundColor: colors.primary, borderColor: colors.primary }]}
    >
      <Text style={[typography.small, { color: active ? colors.onPrimary : colors.text, fontWeight: '600' }]}>{label}</Text>
    </Pressable>
  );
}

export function StatusLabel({ label, tone = 'success' }: { label: string; tone?: 'success' | 'warning' | 'info' }) {
  const t = {
    success: { bg: colors.goodBg, fg: colors.primary },
    warning: { bg: colors.warnBg, fg: colors.warnText },
    info: { bg: colors.infoBg, fg: '#1F4E79' },
  }[tone];
  return (
    <View style={[styles.pill, { backgroundColor: t.bg }]}>
      <Text style={[typography.tiny, { color: t.fg, fontWeight: '700' }]}>{label}</Text>
    </View>
  );
}

export function Pill({ children }: { children: React.ReactNode }) {
  return (
    <View style={[styles.pill, { backgroundColor: colors.soft }]}>
      <Text style={[typography.tiny, { color: colors.primary, fontWeight: '700' }]}>{children}</Text>
    </View>
  );
}

/* ---------- Progress ---------- */
export function ProgressBar({ percent, label }: { percent: number; label?: string }) {
  const p = Math.max(0, Math.min(100, percent));
  return (
    <View
      accessibilityRole="progressbar"
      accessibilityLabel={label ?? 'Progres'}
      accessibilityValue={{ min: 0, max: 100, now: p }}
      style={styles.track}
    >
      <View style={[styles.fill, { width: `${p}%` }]} />
    </View>
  );
}

/* ---------- Notice ---------- */
export function Notice({
  children,
  tone = 'warning',
  testID,
}: {
  children: React.ReactNode;
  tone?: 'warning' | 'good' | 'info';
  testID?: string;
}) {
  const t = {
    warning: { bg: colors.warnBg, border: colors.warnBorder },
    good: { bg: colors.goodBg, border: colors.goodBorder },
    info: { bg: colors.infoBg, border: colors.infoBorder },
  }[tone];
  return (
    <View testID={testID} style={[styles.notice, { backgroundColor: t.bg, borderColor: t.border }]}>
      <Text style={[typography.small, { color: colors.text }]}>{children}</Text>
    </View>
  );
}

/* ---------- Option (radio) ---------- */
export function OptionRow({
  label,
  selected,
  onPress,
  disabled,
  state,
  testID,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
  disabled?: boolean;
  state?: 'correct' | 'wrong' | null;
  testID?: string;
}) {
  const border =
    state === 'correct' ? colors.secondary : state === 'wrong' ? '#C9A227' : selected ? colors.secondary : colors.line;
  const bg = state === 'correct' ? colors.goodBg : state === 'wrong' ? colors.warnBg : selected ? '#EFF8F1' : colors.surface;
  return (
    <Pressable
      testID={testID}
      accessibilityRole="radio"
      accessibilityState={{ selected, disabled: !!disabled }}
      accessibilityLabel={label}
      disabled={disabled}
      onPress={onPress}
      style={[styles.option, { borderColor: border, backgroundColor: bg }, selected && { borderWidth: 1.5 }]}
    >
      <View style={[styles.radio, selected && { borderColor: colors.secondary }]}>
        {selected ? <View style={styles.radioDot} /> : null}
      </View>
      <Text style={[typography.body, { color: colors.text, flex: 1 }]}>{label}</Text>
      {state === 'correct' ? <Icon name="checkmark-circle" color={colors.secondary} /> : null}
    </Pressable>
  );
}

/* ---------- List item ---------- */
export function ListItem({
  icon,
  title,
  subtitle,
  onPress,
  right,
  testID,
}: {
  icon: string;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  right?: React.ReactNode;
  testID?: string;
}) {
  const content = (
    <View style={styles.listItem}>
      <View style={styles.iconBox}>
        <Icon name={icon} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[typography.body, { color: colors.text, fontWeight: '700' }]}>{title}</Text>
        {subtitle ? <Text style={[typography.small, { color: colors.muted, marginTop: 2 }]}>{subtitle}</Text> : null}
      </View>
      {right ?? (onPress ? <Icon name="chevron-forward" color={colors.secondary} /> : null)}
    </View>
  );
  if (!onPress) return content;
  return (
    <Pressable
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={subtitle ? `${title}. ${subtitle}` : title}
      onPress={onPress}
      style={({ pressed }) => pressed && { opacity: 0.8 }}
    >
      {content}
    </Pressable>
  );
}

/* ---------- Text field ---------- */
export function TextField({
  label,
  error,
  helper,
  ...props
}: TextInputProps & { label: string; error?: string | null; helper?: string }) {
  return (
    <View style={{ marginBottom: spacing.md }}>
      <Text style={[typography.small, { color: colors.text, fontWeight: '700', marginBottom: 6 }]}>{label}</Text>
      <TextInput
        accessibilityLabel={label}
        placeholderTextColor={colors.disabled}
        style={[styles.field, !!error && { borderColor: '#B42318' }]}
        {...props}
      />
      {error ? (
        <Text accessibilityLiveRegion="polite" style={[typography.tiny, { color: '#B42318', marginTop: 4 }]}>
          {error}
        </Text>
      ) : helper ? (
        <Text style={[typography.tiny, { color: colors.muted, marginTop: 4 }]}>{helper}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    minHeight: MIN_TOUCH,
    borderRadius: radius.control,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.line,
    padding: spacing.lg,
    marginVertical: 6,
    ...shadow.card,
  },
  sectionHeader: { flexDirection: 'row', alignItems: 'flex-end', marginTop: spacing.xl, marginBottom: spacing.sm },
  chip: {
    minHeight: 36,
    justifyContent: 'center',
    paddingHorizontal: 13,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.surface,
  },
  pill: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 5, borderRadius: radius.pill },
  track: { height: 8, borderRadius: 8, backgroundColor: '#E5ECE6', overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 8, backgroundColor: colors.secondary },
  notice: { borderWidth: 1, borderRadius: radius.control, padding: spacing.md, marginVertical: 6 },
  option: {
    minHeight: MIN_TOUCH,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderRadius: radius.control,
    padding: 14,
    marginVertical: 5,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.disabled,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.secondary },
  listItem: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10, minHeight: MIN_TOUCH },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#E8F3EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  field: {
    minHeight: MIN_TOUCH,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 13,
    backgroundColor: colors.surface,
    paddingHorizontal: 14,
    color: colors.text,
    fontSize: 15,
  },
});
