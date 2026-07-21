# Legacy Regression Scan Report

## Scan Scope
- assets/js/modules/
- assets/js/components/
- assets/js/services/
- assets/js/renderers/
- assets/js/repository/

## Remaining References
1. `assets/js/modules/assistant.module.js`: Masih menggunakan `window.cms` [CRITICAL].
2. `assets/js/modules/personality.module.js`: Masih menggunakan `window.store` [CRITICAL].
3. `assets/js/modules/dashboard.module.js`: Masih menggunakan `container.get()` [CRITICAL].
4. `assets/js/components/`: Ditemukan 4 file yang mengimport `../../kernel/events.js` [CRITICAL].

## Severity
- CRITICAL: Penggunaan `window.*` dan direct import ke `/kernel/` pada modul Assistant, Personality, dan Dashboard.
- WARNING: Beberapa utility function pada `assets/js/utils/` masih merujuk ke kernel lama.

## Required Action
- Melakukan refactor pada Assistant, Personality, dan Dashboard untuk menggunakan `CMS Facade` v2.0.0.
- Menghapus referensi `window.*` di seluruh file komponen dan menggantinya dengan inisialisasi via `CMS Facade`.

## Migration Priority
1. Assistant Module (Priority 1 - Dependency tinggi)
2. Dashboard Module (Priority 2)
3. Personality Module (Priority 3)