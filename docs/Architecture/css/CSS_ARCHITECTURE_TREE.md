# TOPCARE AI PLATFORM V2 — CSS ARCHITECTURE TREE & LAYER GOVERNANCE
**Build Target:** BUILD 128.3 (Architecture Governance Baseline)  
**Status:** APPROVED & LOCKED  
**Module:** Presentation Layer Architecture  

---

## 1. Directory Structure & Layer Ownership Map

```text
assets/css/
│
├── app.css                         <-- Master CSS Bundle Loader & Entry Point
│
├── tokens/                         <-- Raw Design Tokens
│   │   Owner      : Design System Team
│   │   Mutability : LOW
│   │   Depends On : NONE
│   ├── color.css
│   ├── spacing.css
│   ├── radius.css
│   ├── shadow.css
│   ├── zindex.css
│   ├── glass.css
│   └── gradient.css
│
├── core/                           <-- Core System & Extensions
│   │   Owner      : Core Architecture Team
│   │   Mutability : MEDIUM (Extensions only)
│   │   Depends On : tokens/
│   ├── design.tokens.css           <-- Core CSS Variables (LOCKED)
│   ├── design.tokens-ext.css       <-- Extension Tokens (--tc-ext-*)
│   ├── ui-harmonization.css        <-- Mobile & Accessibility Overrides
│   ├── animation.css
│   ├── components.css
│   └── enterprise-polish.css
│
├── foundation/                     <-- Base Layout & Grid Systems
│   │   Owner      : Core UI Team
│   │   Mutability : LOW
│   │   Depends On : tokens/, core/
│   ├── base/
│   │   ├── reset.css
│   │   ├── variables.css
│   │   ├── typography.css
│   │   └── utilities.css
│   ├── container.css
│   ├── grid.css
│   └── section.css
│
├── components/                     <-- Atomic Reusable UI Components
│   │   Owner      : UI Component Team
│   │   Mutability : MEDIUM
│   │   Depends On : tokens/, core/, foundation/
│   ├── button.css
│   ├── dropdown.css
│   ├── tooltip.css
│   ├── toast.css
│   ├── tabs.css
│   ├── card/card.css
│   ├── modal/modal.css
│   ├── navbar/navbar.css
│   └── coach/coach-unified.css
│
├── form/                           <-- Form Controls & Inputs
│   │   Owner      : UI Component Team
│   │   Mutability : MEDIUM
│   │   Depends On : tokens/, core/, foundation/
│   ├── input.css                   <-- Form Controls (In transition to .tc-form-control)
│   ├── checkbox.css
│   ├── radio.css
│   └── textarea.css
│
├── layout/                         <-- Application Shell & Global Frames
│   │   Owner      : Frontend Architecture Team
│   │   Mutability : LOW
│   │   Depends On : tokens/, foundation/, components/
│   ├── application-shell.css
│   ├── header.css
│   └── footer.css
│
├── features/                       <-- Domain Specific Styles
│   │   Owner      : Domain Feature Teams
│   │   Mutability : MEDIUM / LOCKED (Personality)
│   │   Depends On : components/, layout/
│   ├── personality.css             <-- FROZEN DOMAIN
│   ├── community/community.css
│   └── personality/                <-- Assessment Engines (LOCKED)
│       ├── personality-test.css
│       ├── personality-question.css
│       ├── personality-result.css
│       └── personality-responsive.css
│
└── pages/                          <-- View Layer Stylesheets
    │   Owner      : View Layer Team
    │   Mutability : HIGH
    │   Depends On : features/, components/, layout/
    ├── home.css
    ├── dashboard.css
    ├── creator.css
    ├── learning.css
    └── home/ (sub-sections)