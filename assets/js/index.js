/**
 * TOPCARE AI PLATFORM V2 — APPLICATION ENTRYPOINT
 * Path: assets/js/index.js
 * Version: 138.0.0 (BUILD 138.0 — PERSONALITY HUB & PUBLIC ROUTE REGISTRATION)
 * Status: APPROVED & ACTIVE
 * SRP: Central Application Composition Root for Bootstrapping TopCare AI Platform Runtime V2.
 */

import { ApplicationEntry } from './runtime/application.entry.service.js';
import { LanguageService } from './core/language.service.js';
import { AssessmentEventListener } from './coach/listeners/assessment.listener.js';
import { appRouter } from './core/router/app-router.js';

/**
 * Register Public Personality Assessment Routes (No Auth Guard Required)
 */
function registerPersonalityRoutes() {
    if (!appRouter) return;

    // 1. Hub Utama Personality (3 Pilihan Tes)
    appRouter.registerRoute('#/personality', {
        title: 'Pilih Tes Kepribadian — TopCare AI',
        requiresAuth: false,
        factory: () => ({
            mount: async (container) => {
                const module = await import('./pages/personality.page.js');
                const page = module.default || module;
                if (typeof page.mount === 'function') {
                    await page.mount(container);
                } else if (container && typeof page.render === 'function') {
                    container.innerHTML = page.render();
                }
            }
        })
    });

    // 2. Tes 4 Temperamen Utama (Tes Pilihan Usia)
    appRouter.registerRoute('#/personality-test', {
        title: 'Tes 4 Temperamen Utama — TopCare AI',
        requiresAuth: false,
        factory: () => ({
            mount: async (container) => {
                const module = await import('./pages/personality-test.page.js');
                const page = module.default || module;
                if (typeof page.mount === 'function') {
                    await page.mount(container);
                } else if (container && typeof page.render === 'function') {
                    container.innerHTML = page.render();
                }
            }
        })
    });

    // 3. Tes Energi Introvert vs Ekstrovert
    appRouter.registerRoute('#/test-introvert-extrovert', {
        title: 'Tes Energi Introvert vs Ekstrovert — TopCare AI',
        requiresAuth: false,
        factory: () => ({
            mount: async (container) => {
                const module = await import('./pages/test-introvert-extrovert.page.js');
                const page = module.default || module;
                if (typeof page.mount === 'function') {
                    await page.mount(container);
                } else if (container && typeof page.render === 'function') {
                    container.innerHTML = page.render();
                }
            }
        })
    });

    // 4. Tes Tipe MBTI (16 Kepribadian)
    appRouter.registerRoute('#/test-mbti', {
        title: 'Tes Tipe MBTI — TopCare AI',
        requiresAuth: false,
        factory: () => ({
            mount: async (container) => {
                const module = await import('./pages/test-mbti.page.js');
                const page = module.default || module;
                if (typeof page.mount === 'function') {
                    await page.mount(container);
                } else if (container && typeof page.render === 'function') {
                    container.innerHTML = page.render();
                }
            }
        })
    });
}

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

    // 4. Register All Personality Assessment Hub Routes
    registerPersonalityRoutes();
}

/**
 * Main Application Startup Bootstrapper
 */
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Step 1: Initialize Domain Subsystems & Personality Routes
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