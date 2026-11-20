# SYARIAH DIGITAL CHECK — ENGINEERING PRINCIPLES
**Core Architectural Guidelines & Engineering Standards**  
*Document Version: 1.0.0 — Production Release (v2.4.0)*

---

All architecture, software engineering, UI/UX implementation, educational content authoring, and quality assurance in the **Syariah Digital Check** initiative must strictly adhere to these twelve foundational principles:

---

## 1. PRODUCT FIRST
> **Build a real educational product, not a visual prototype.**

- The platform must function as a complete, reliable, and production-grade educational product.
- Every interactive element—whether a 30-second conscious pause timer, multi-step transaction questionnaire, learning progress tracker, or quiz engine—must deliver tangible educational utility to end-users rather than acting as a static mock-up.
- Architecture decisions must favor long-term maintainability, robust type systems, and clear domain models over cosmetic shortcuts.

---

## 2. NO FAKE FUNCTIONALITY
> **No static analytics presented as real user data, fake authentication, nonfunctional buttons, or simulated backend integrations.**

- Do not hardcode static progress percentages, simulated streak numbers, or pre-filled fake user activity in production UI screens.
- When a user has completed zero assessments, the interface must transparently show an empty state (`0 Evaluasi Selesai`) and guide them to their first action.
- Literacy indexes, competency pillar scores, and category breakdowns must derive from mathematical functions over actual `localStorage` records.
- Avoid deceptive UI patterns, such as faux login modals that do not authenticate, or buttons that lead to dead-ends.

---

## 3. NO GENERIC TEMPLATES
> **Use a bespoke design language tailored to Islamic financial literacy.**

- Avoid cookie-cutter SaaS dashboard templates, generic AI-generated component layouts, or monotonous card grids.
- Adhere to the established bespoke visual identity:
  - **Deep Emerald Green** (`#064E3B`, `#022C22`): Represents trust, depth, and classical Islamic heritage.
  - **Warm Ivory** (`#FAF8F5`, `#FDFBF7`): Replaces harsh sterile white with a welcoming, contemplative background.
  - **Muted Sage** (`#344C3D`, `#E8ECE9`): Provides calm structural framing.
  - **Champagne Gold** (`#C89D42`, `#B08428`): Accents critical callouts, verified fatwa badges, and milestones.
- The visual hierarchy must directly reflect the **PAUSE → CHECK → CHOOSE** framework.

---

## 4. PRESERVE EXISTING WORK
> **Understand existing architecture before modifying components. Avoid unnecessary rewrites.**

- Prioritize deep codebase audits before introducing structural modifications.
- Preserve established design tokens, typography scales, accessibility properties, and routing models.
- Refactor surgically to enhance reliability, performance, or coverage without breaking established conventions or discarding working logic.

---

## 5. SOURCE-BASED EDUCATION
> **Every important Islamic finance explanation must have traceable supporting sources.**

- No ruling, verdict, or fiqh explanation may exist without an explicit, verifiable reference.
- Every learning module, case study scenario, quiz explanation, and checklist recommendation must map to:
  - An official DSN-MUI fatwa number and title (e.g., Fatwa DSN-MUI No. 17/DSN-MUI/IX/2000, No. 77/DSN-MUI/V/2010, No. 117/DSN-MUI/II/2018).
  - A statutory regulation from the Financial Services Authority (OJK) or Bank Indonesia (e.g., POJK No. 40/2024, POJK No. 22/2023).
  - Public URLs or accessible document identifiers enabling independent verification.

---

## 6. HUMAN REVIEW
> **Unverified religious and regulatory content must never be represented as expert-approved.**

- Content status must be explicitly classified in governance metadata (`VERIFIED`, `PENDING_REVIEW`, or `EDUCATIONAL_SIMULATION`).
- The application must never claim formal certification or binding legal authority (*fatwa mulzimah*).
- Clearly communicate the educational boundary: Syariah Digital Check is an independent consumer literacy tool, not an authorized fatwa body or licensed financial advisory firm.
- Prominently maintain the **Non-Affiliation Notice**: no implied endorsement by DSN-MUI, OJK, or Bank Indonesia unless formally authorized.

---

## 7. PRIVACY FIRST
> **Guest-first experience, minimal data collection, and optional registration for synchronization.**

- Core features (reading modules, assessing transactions, solving case studies, taking quizzes) must remain 100% accessible without account creation.
- Adhere strictly to **Data Minimization**:
  - Never request, record, or store passwords, card CVVs, PINs, OTP tokens, or bank account numbers.
  - Store progress and evaluation history locally in client memory (`localStorage` / `AsyncStorage`).
- Provide immediate, accessible user rights:
  - **Export Data**: Single-click download of all stored activity in `.json` format.
  - **Permanent Wipe**: Complete erasure of client-side data without residual server tracking.
- Any future cloud synchronization must remain strictly optional and adhere to Row Level Security (RLS).

---

## 8. RESPONSIVE BY DESIGN
> **Real browser-native responsive behavior across all supported screen sizes.**

- Every screen, modal, and drawer must render natively and fluidly across:
  - **390px** (Mobile viewport) — thumb-friendly bottom navigation, full-width touch targets.
  - **768px** (Tablet viewport) — balanced two-column layout.
  - **1024px** (Laptop viewport) — expanded sidebar/topbar navigation.
  - **1440px** (Desktop viewport) — max-width containers preventing line-length fatigue.
- Avoid horizontal scrolling anomalies, text clipping, or fixed-width containers that break viewport boundaries.
- Support Progressive Web App (PWA) behaviors: standalone display mode, safe area insets on mobile notches, and touch-optimized gestures.

---

## 9. TEST BEFORE CLAIMING
> **Every implemented feature must be tested. Report actual results.**

- Never mark a feature complete based solely on visual layout.
- Maintain automated test suites in `Digital_Check/src/tests/` covering:
  - Scoring and weighting algorithms.
  - Questionnaire logic and answer aggregation.
  - Content governance and source reference linkage.
  - Quiz evaluation and explanation integrity.
  - Privacy serialization, import validation, and sanitization.
- Require `100% PASS` across all test suites and `0 Errors` on static type checking (`tsc --noEmit`) prior to production releases.

---

## 10. PRODUCTION QUALITY
> **Prioritize reliability, accessibility, security, maintainability, and usability over decorative complexity.**

- **Accessibility**: Ensure contrast ratios exceed WCAG 2.2 AA (minimum 4.5:1 for normal text, 7:1 for AAA emerald headings), support keyboard navigation (`Tab`, `Escape` to close modals), and provide descriptive ARIA attributes.
- **Security**: Implement strict Content Security Policies (CSP), HSTS preload, X-Frame-Options DENY, and MIME sniffing protection in `_headers`.
- **Resilience**: Handle offline states gracefully via Service Worker caching (`syariah-check-v2`) and global unhandled error traps preventing white-screen crashes.

---

## 11. CONTROLLED DEVELOPMENT
> **Execute one development phase at a time. Review its results before progressing.**

- Avoid speculative scope creep or chaotic parallel implementations.
- Progress systematically through defined development phases:
  1. Full Project Audit & Quality Baselining
  2. UX & Design Architecture
  3. Content & Knowledge Governance
  4. Transaction Checker Engine
  5. Learning Hub & Case Studies
  6. Quiz Engine & Intelligence Dashboard
  7. User System & Privacy Persistence
  8. Production Launch & Public Readiness
- Review visual evidence (screenshots), test logs, and git commits at the close of each phase before advancing.

---

## 12. DOCUMENT EVERYTHING
> **Maintain architecture documentation, implementation notes, test reports, and known limitations.**

- Keep the `docs/` repository current and comprehensive:
  - `docs/PROJECT_AUDIT.md`: Baseline status and architectural inventory.
  - `docs/TECHNICAL_ARCHITECTURE.md`: Component models and state flow.
  - `docs/SOURCE_REGISTRY.md`: Verified fatwa and regulatory catalog.
  - `docs/CONTENT_GOVERNANCE.md`: Verification protocols and update lifecycles.
  - `docs/BACKEND_AND_SYNC_ARCHITECTURE.md`: Zero-knowledge RLS sync design.
  - `docs/PRODUCTION_READINESS.md`: Quality checklist and verification results.
  - `docs/DEPLOYMENT_GUIDE.md`: Multi-platform deployment procedures.
  - `docs/USER_GUIDE.md`: End-user manual and PWA setup.
  - `docs/KNOWN_LIMITATIONS.md`: Transparent operational and legal boundaries.
  - `docs/RELEASE_NOTES.md`: Chronological milestone changelog.
- Maintain structured artifacts for each phase in the system archive.
