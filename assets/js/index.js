/**
 * file: assets/js/index.js
 * Version: 135.0.0
 * Status: APPROVED & LOCKED
 * SRP: Application Main Entry Module for bootstrapping TopCare AI Platform Runtime V2.
 */

import { bootstrap } from './app/bootstrap.js';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        await bootstrap();
    } catch (err) {
        console.error('[Runtime Index] Critical Boot Failure:', err);
    }
});

import { LanguageService } from './core/language.service.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Terapkan bahasa sesuai preferensi tersimpan saat web dibuka
    LanguageService.applyLanguage();

    // 2. Event Listener Tombol Ganti Bahasa (ID / EN)
    const langBtn = document.getElementById('lang-toggle-btn');
    if (langBtn) {
        langBtn.addEventListener('click', () => {
            LanguageService.toggleLanguage();
        });
    }
});