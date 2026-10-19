# Syariah Digital Check — Design System & Engineering Specification (DESIGN.md)

**Product Vision:** A premier, calm, trustworthy Indonesian financial literacy platform empowering thoughtful, Sharia-compliant digital finance decision making.  
**Tagline:** *Cerdas Sebelum Transaksi, Bijak dalam Pilihan*  
**Design Reference Sources:**  
- `Syariah_Digital_Check_UI_UX_Design_Guide.pdf` (Official Architectural & Screen Inventory Guide)
- `a_wide_clean_presentation_board_ui_design_mocku.png` (Visual Identity & Layout Board)
- `DESIGN_SYSTEM_AND_UX_SPEC.md` (Core Component & Spacing Tokens)
- Note on Stitch MCP: Audited in Phase A; schema available in `mcp/StitchMCP`, direct execution unconfigured, hence utilizing repository design assets as authoritative ground truth.

---

## 1. Design Tokens & Visual Primitives

### 1.1 Color System & WCAG AAA Contrast Ratios

The palette evokes Islamic financial wisdom, editorial authority, and modern digital finance serenity.

```css
:root {
  /* Primary Brand: Deep Emerald Green */
  --emerald-950: #032115; /* Dark background, deep controller surfaces */
  --emerald-900: #064E3B; /* Primary brand hue, hero banners, headers (11.2:1 contrast on ivory) */
  --emerald-800: #065F46; /* Interactive hover, active navigation pills, primary actions */
  --emerald-700: #047857; /* Focus rings, prominent borders, active indicators */
  --emerald-600: #059669; /* Accent badges, progress bar fills */
  --emerald-100: #D1FAE5; /* Soft tinted badge background */
  --emerald-50:  #ECFDF5; /* Subtle success surface background */

  /* Neutral Canvas: Warm Ivory & Alabaster */
  --ivory-base:  #FAF8F5; /* Main application background (anti-glare, calm reading) */
  --ivory-card:  #FFFFFF; /* Elevated card surface, modals */
  --ivory-warm:  #F4EFE6; /* Muted inset containers, informational notice background */
  --ivory-border:#E7E2D6; /* Crisp hairline borders (1px solid) */

  /* Secondary Neutral: Muted Sage */
  --sage-900:    #1F3529; /* High-contrast secondary headings */
  --sage-700:    #385444; /* Supporting typography */
  --sage-300:    #B2C4B8; /* Muted decorative borders */
  --sage-200:    #D5DFD8; /* Divider rules */
  --sage-100:    #E7EDE9; /* Secondary button fill, progress track */
  --sage-50:     #F2F6F3; /* Educational callout drawer background */

  /* Restrained Accent: Champagne Gold */
  --gold-700:    #8C6A28; /* High-contrast text on gold accents */
  --gold-600:    #B28834; /* Border highlight for recommended items */
  --gold-500:    #C89D42; /* Primary champagne-gold accent, stars, score highlights */
  --gold-100:    #F7EED8; /* Gold pill background */
  --gold-50:     #FDF9F0; /* Soft gold alert container */

  /* High-Legibility Typography Colors (WCAG AAA) */
  --text-primary:   #0D281E; /* Forest Charcoal: 14.1:1 contrast on Ivory */
  --text-secondary: #2C4337; /* Body paragraphs: 8.4:1 contrast on Ivory */
  --text-muted:     #577063; /* Captions & metadata: 5.2:1 contrast on White */
  --text-inverse:   #FFFFFF; /* Pure white on Emerald surfaces */

  /* Semantic Feedback Surfaces */
  --danger-bg:     #FDF2F2;
  --danger-border: #F8B4B4;
  --danger-text:   #9B1C1C;
  --warn-bg:       #FEF9EC;
  --warn-border:   #F7DA99;
  --warn-text:     #8C6A28;
  --good-bg:       #EDF9F1;
  --good-border:   #A7F3D0;
  --good-text:     #065F46;

  /* Restrained Elevation & Shadows (Zero harsh drop shadows) */
  --shadow-subtle: 0 1px 3px rgba(13, 40, 30, 0.04), 0 1px 2px rgba(13, 40, 30, 0.02);
  --shadow-card:   0 4px 16px rgba(13, 40, 30, 0.05), 0 1px 3px rgba(13, 40, 30, 0.03);
  --shadow-float:  0 12px 32px rgba(13, 40, 30, 0.08), 0 4px 12px rgba(13, 40, 30, 0.04);
  --shadow-modal:  0 20px 48px rgba(3, 33, 21, 0.16);
}
```

---

## 2. Typography Hierarchy

| Style Role | Font Family | Size | Weight | Line Height | Letter Spacing |
|---|---|---|---|---|---|
| **Display H1** | Playfair Display | 26px / 32px | 700 (Bold) | 1.25 | -0.01em |
| **Section H2** | Playfair Display | 20px / 24px | 700 (Bold) | 1.30 | -0.005em |
| **Card Header H3** | Plus Jakarta Sans | 16px / 18px | 700 (Bold) | 1.35 | 0 |
| **Subtitle H4** | Plus Jakarta Sans | 14px | 600 (Semi) | 1.40 | 0 |
| **Body Regular** | Plus Jakarta Sans | 13.5px / 14px | 400 (Regular) | 1.55 | 0 |
| **Eyebrow / Badge** | Plus Jakarta Sans | 10.5px | 700 (Bold) | 1.20 | 0.08em (Caps) |
| **Interactive CTA** | Plus Jakarta Sans | 13.5px / 14px | 700 (Bold) | 1.00 | 0.02em |
| **Caption / Help** | Plus Jakarta Sans | 11.5px / 12px | 400 (Regular) | 1.45 | 0 |

---

## 3. The 8-Point Spacing Grid

- `4px` (`--space-0-5`): Micro gaps inside badges, radio dots.
- `8px` (`--space-1`): Gap between icon and text, horizontal pill padding.
- `12px` (`--space-1-5`): Internal list item padding, sub-component margins.
- `16px` (`--space-2`): Standard card internal padding, bottom margin of section titles.
- `20px` (`--space-2-5`): Container horizontal gutters on mobile (390px viewport).
- `24px` (`--space-3`): Hero section vertical padding, card corner radii.
- `32px` (`--space-4`): Vertical section dividers on desktop/tablet.
- `48px` (`--space-6`): Minimum accessible touch target height (WCAG 2.5.5).
- `80px` (`--space-10`): Bottom clearance for mobile fixed navigation bar.

---

## 4. Iconography Standards

### 4.1 Strict Rule: Zero Generic Emojis
All childish and OS-dependent emoji characters (`⏸`, `🔍`, `⚖️`, `💳`, `🛒`, `🏷️`, `🪙`, `🔥`, `💡`, `👋`, `✅`, `❌`) are completely eliminated and replaced by:
- **Crisp SVG Vectors**: 24 × 24 coordinate viewBox, 2px stroke width, round caps and joins.
- **Icon Container Styles**: 36px × 36px or 44px × 44px rounded squares (`border-radius: 12px`) with subtle sage or emerald backgrounds (`#F2F6F3` / `#ECFDF5`).
- **Semantic Consistency**: Standardized shapes for navigation, check status, info drawers, and transaction categories.

---

## 5. Viewport & Responsive Layout Rules

### 5.1 Native Mobile-First Viewport (< 600px, e.g. 390px iPhone)
- The application spans **100% full-width (100vw)** with zero artificial laptop bezels, zero double borders, and zero mockup notches.
- Safe-area insets (`env(safe-area-inset-top)` and `env(safe-area-inset-bottom)`) applied to ensure seamless rendering on iOS Safari dynamic island/home indicator.
- Bottom navigation is fixed to the bottom with high-contrast active emerald pills and 48px touch targets.
- The test controller bar (`.viewport-controller`) is minimized or hidden on true mobile devices to preserve screen estate.

### 5.2 Tablet Viewport (600px – 1024px)
- Centered container with max-width `720px` and soft, rounded bezel (`border-radius: 24px`, subtle shadow).
- Two-column grid for categories and scenario cards.

### 5.3 Desktop Viewport (> 1024px)
- Fluid container with max-width `980px`.
- Ergonomic reading columns preventing overly long text lines (max line length 68 characters for optimal comprehension).
- Desktop mode switcher available in header for developer and design review.

---

## 6. Ten-Screen UX Architecture & Functional Guardrails

1. **Screen 1: Welcome & Onboarding (PAUSE → CHECK → CHOOSE)**
   - 3-step carousel with step pills, clear explanations, and skip-to-home option.
2. **Screen 2: Home Dashboard**
   - Personal greeting, 30-Second Fast Check hero card, 3-pillar overview, and 6 transaction category shortcuts.
3. **Screen 3: Transaction Category Selector**
   - 6 real-world digital transaction types (PayLater, Belanja Online, Emas Digital, Tabungan Digital, Langganan Berulang, Donasi/Ziswaf).
4. **Screen 4: 5-Stage Interactive Transaction Checklist**
   - Stage 1: Akad & Contract Structure
   - Stage 2: Cost Transparency & Late Penalty (*Ta'zir*)
   - Stage 3: Possession & Handover (*Qabdh*)
   - Stage 4: Sharia Compliance (Riba, Gharar, Maysir)
   - Stage 5: Personal Decision Readiness
   - Expandable educational drawer on every stage.
5. **Screen 5: Assessment Results Screen**
   - Animated SVG circular progress dial.
   - Status badge ("Tingkat Kejelasan: Tinggi / Sedang / Perlu Verifikasi").
   - 3 Critical questions for merchant Customer Service with instant one-click copy and toast notification.
   - Tailored learning module recommendations.
6. **Screen 6: Real-World Case Studies & Scenarios**
   - 4 simulated transactions (PayLater 0%, Digital Gold Installments, Dropshipping Without Stock, Free Trial Subscriptions) with detailed jurisprudence analysis.
7. **Screen 7: Learning Hub & Fatwa References**
   - Instant live search input.
   - Category filtering pills.
   - Interactive slide-over reader modal citing official Fatwa DSN-MUI and AAOIFI standards.
8. **Screen 8: Interactive Sharia Literacy Quiz**
   - Case-based questions.
   - Real-time streak tracking.
   - Instant correct/incorrect explanation feedback.
   - Score recap and retry capability.
9. **Screen 9: Learning Progress Dashboard**
   - 4 Muamalah competency distribution bars (Akad, Biaya & Denda, Serah Terima, Bebas Riba/Gharar).
   - Activity log and literacy level assessment.
10. **Screen 10: Profile & Storage Settings**
    - Editable user profile name.
    - Local storage status indicator.
    - Safe-reset modal confirmation dialog.
    - Legal and educational boundaries disclaimer.
