/**
 * file: assets/js/index.js
 * Version: 137.0.0 (BUILD 129.0 — APPLICATION ENTRY COMPOSITION ROOT MIGRATION)
 * Status: APPROVED & LOCKED
 * SRP: Central Application Composition Root for Bootstrapping TopCare AI Platform Runtime V2.
 */

import { ApplicationEntry } from './runtime/application.entry.service.js';
import { LanguageService } from './core/language.service.js';
import { AssessmentEventListener } from './coach/listeners/assessment.listener.js';

/**
 * Initializes Core Application Subsystems (Language & Domain Event Listeners)
 */
function initSubsystems() {
    // 1. Apply persisted language preference on application startup
    if (LanguageService && typeof LanguageService.applyLanguage === 'function') {
        LanguageService.applyLanguage();
    }

    // 2. Attach Language Switcher Button Event Listener
    const langBtn = document.getElementById('lang-toggle-btn');
    if (langBtn) {
        langBtn.addEventListener('click', () => {
            if (typeof LanguageService.toggleLanguage === 'function') {
                LanguageService.toggleLanguage();
            }
        });
    }

    // 3. Initialize Coach Assessment Event Listener
    if (AssessmentEventListener && typeof AssessmentEventListener.init === 'function') {
        AssessmentEventListener.init();
    }
}

/**
 * Main Application Startup Bootstrapper
 */
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Step 1: Initialize Domain Subsystems
        initSubsystems();

        // Step 2: Bootstrap Enterprise Runtime & Router Composition Root
        if (ApplicationEntry && typeof ApplicationEntry.bootstrap === 'function') {
            await ApplicationEntry.bootstrap();
        } else {
            console.warn('[ApplicationEntry] Bootstrap method missing. Running in fallback mode.');
        }
    } catch (err) {
        console.error('[Runtime Index] Critical Boot Failure:', err);
    }
});