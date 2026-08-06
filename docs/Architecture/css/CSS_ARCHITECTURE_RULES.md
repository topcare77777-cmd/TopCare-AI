# TOPCARE AI PLATFORM V2 — CSS ARCHITECTURE RULES
**Build Target:** BUILD 128.3  
**Status:** MANDATORY ENFORCEMENT  

---

### 📌 CORE CODING RULES

- **RULE-001 (No Hardcoded Hex Colors):** Seluruh properti warna wajib menggunakan variabel token CSS (`var(--tc-color-*)`).
- **RULE-002 (Page Stylesheet Isolation):** Stylesheet di folder `pages/` dilarang keras dipanggil atau digunakan oleh halaman lain.
- **RULE-003 (No Component Overrides by Component):** Komponen atomik dilarang saling menimpa gaya komponen atomik lainnya.
- **RULE-004 (Maximum Selector Specificity):** Selector CSS maksimal terdiri dari 3 tingkat kedalaman (contoh: `.tc-card .tc-card-body .tc-card-title`).
- **RULE-005 (No ID Selectors):** Dilarang menggunakan ID selector (`#header`, `#my-button`) untuk styling CSS. Gunakan class (`.tc-*`).
- **RULE-006 (No !important Usage):** Penggunaan `!important` dilarang keras, kecuali pada utility accessibility spesifik (misal: focus ring overrides).
- **RULE-007 (Extension Lifetime Restriction):** Variable ber-prefix `--tc-ext-*` hanya boleh dibuat dan hidup pada BUILD 128–129.
- **RULE-008 (BUILD 130 Consolidation Mandate):** Seluruh file extension wajib dikonsolidasi ke dalam Core System pada BUILD 130.
- **RULE-009 (Touch Target Accessibility):** Seluruh elemen interaktif wajib memiliki `min-height` dan `min-width` sebesar 44px pada layar sentuh.
- **RULE-010 (No Inline CSS):** Dilarang menulis inline CSS (`style="..."`) pada JavaScript Renderers maupun HTML templates.