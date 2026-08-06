# TOPCARE AI PLATFORM V2 — CSS MIGRATION BACKLOG
**Build Target:** BUILD 128.3  
**Status:** APPROVED & LOCKED  
**Purpose:** Lifecycle Tracking for CSS Refactoring, Refinement & Merges  

---

## 1. Migration Backlog Items

| Item ID | Task Description | Current State | Target State | Target Build | Status |
| :---: | :--- | :--- | :--- | :---: | :---: |
| **MIG-01** | **Form Namespace Migration** | HTML Renderers use native `<input>`, `<select>`, `<textarea>` without namespaces. | Wrap all form controls with `.tc-form-control` / `.tc-input-field`. | **BUILD 128.3** | 🟡 Planned |
| **MIG-02** | **Remove Native Input Selectors** | CSS contains native `input[type="text"]` global rules in `ui-harmonization.css`. | Purge native selectors after MIG-01 HTML renderer update is verified. | **BUILD 128.3** | 🟡 Planned |
| **MIG-03** | **Hardcoded Hex Color Audit** | `#8b5cf6` and `#3b82f6` repeated 40+ times across page stylesheets. | Replace all repeated hex codes with `var(--tc-color-primary)`. | **BUILD 128.3** | 🟡 Planned |
| **MIG-04** | **Specificity Deep Audit** | Selectors with >4 levels (e.g. `.tc-home-wrapper .section .card h3 span`). | Flatten selectors to maximum 2-3 levels using BEM/Namespaced classes. | **BUILD 128.3** | 🟡 Planned |
| **MIG-05** | **Token Consolidation** | Variables use `--tc-ext-*` prefix in `design.tokens-ext.css`. | Merge `--tc-ext-*` into SSOT `design.tokens.css` core file. | **BUILD 130** | ⏳ Scheduled |
| **MIG-06** | **Extension Stylesheet Merge** | Overrides live in isolated `ui-harmonization.css`. | Merge extension rules into base component files (`button.css`, `card.css`). | **BUILD 130** | ⏳ Scheduled |
| **MIG-07** | **Legacy Unused Rule Cleanup** | Legacy CSS definitions from V1 prototype present in `app.css`. | Safely purge unused classes confirmed by coverage report. | **BUILD 130** | ⏳ Scheduled |

---

## 2. Acceptance Criteria for Migration Execution
1. Setiap item migrasi **TIDAK BOLEH** mengubah tampilan visual Desktop yang sudah terverifikasi pada BUILD 127/128.2A.
2. Setiap item migrasi **WAJIB** diverifikasi pada 4 target viewport: Desktop (1440px), Tablet (768px), Android (360px), dan iPhone (390px).
3. Modul **Personality Domain** tetap **LOCKED TOTAL** dari segala aktivitas refactoring.