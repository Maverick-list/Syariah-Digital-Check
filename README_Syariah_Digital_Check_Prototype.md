# Syariah Digital Check — Interactive Standalone File Note

## File Purpose & Source of Truth
- `index.html`: **Primary Web Production Application (Single Source of Truth for Web)**.
- `Syariah_Digital_Check_Interactive_Prototype.html`: Standalone portable single-file mirror synchronized with `index.html` (v2.4.0 Production Release).
- `Digital_Check/`: Cross-platform React Native / Expo codebase with 103 automated tests (`npm test`).
- `Syariah_Digital_Check_UI_UX_Design_Guide.pdf`: UI/UX design direction, screen inventory, user flow, and design system reference.
- `a_wide_clean_presentation_board_ui_design_mocku.png`: Visual design board reference.

## Running in Browser
1. Open `index.html` (or `Syariah_Digital_Check_Interactive_Prototype.html`) directly in any modern desktop or mobile web browser, or serve via any static HTTP server (e.g. `python3 -m http.server 8088`).
2. The application is **100% native browser-responsive** (no viewport switchers or simulated frames required).
3. Progress, quiz attempts, and evaluation history are safely stored in the browser's local storage (`localStorage`). No private data is transmitted to external servers.

## Verified Content & Legal Boundaries
- Educational content, quiz questions, and case study assessments are verified against official Fatwas of the National Sharia Board – Indonesian Council of Ulamas (DSN-MUI) and Financial Services Authority (OJK) regulations (e.g., POJK No. 40/2024).
- The platform is an educational literacy tool designed to build consumer awareness; it does not issue binding fatwas, certify commercial compliance, or provide personalized financial advisory.
