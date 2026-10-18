export const colors = {
  primary: '#065F46',
  deep: '#043B30',
  secondary: '#047857',
  background: '#F8F7F0',
  surface: '#FFFFFF',
  accent: '#C7A76C',
  text: '#102A24',
  muted: '#5A6B65',
  line: '#E3E8E2',
  soft: '#EAF4EE',
  softBorder: '#D8E7DC',
  warnBg: '#FFF6DF',
  warnBorder: '#F0DFAD',
  warnText: '#6B4E00',
  goodBg: '#EAF7EE',
  goodBorder: '#C9E7D2',
  infoBg: '#E8F1F8',
  infoBorder: '#C5DAEA',
  onPrimary: '#FFFFFF',
  onPrimaryMuted: '#DCEBE2',
  disabled: '#A9B6B0',
} as const;

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 28 } as const;

export const radius = {
  control: 14,
  card: 20,
  hero: 24,
  pill: 99,
} as const;

export const typography = {
  eyebrow: { fontSize: 11, fontWeight: '800' as const, letterSpacing: 1.1 },
  title: { fontSize: 26, fontWeight: '800' as const, letterSpacing: -0.6 },
  heading: { fontSize: 20, fontWeight: '800' as const, letterSpacing: -0.4 },
  section: { fontSize: 18, fontWeight: '800' as const, letterSpacing: -0.3 },
  body: { fontSize: 14, lineHeight: 21 },
  small: { fontSize: 12, lineHeight: 18 },
  tiny: { fontSize: 11, lineHeight: 16 },
  button: { fontSize: 14, fontWeight: '700' as const },
};

export const shadow = {
  card: {
    shadowColor: '#0B3420',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
};

/** Ukuran minimum area sentuh (pt/dp). */
export const MIN_TOUCH = 48;
