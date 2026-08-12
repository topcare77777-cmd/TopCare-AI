/**
 * TOPCARE AI PLATFORM V2 — APPLICATION ENTRYPOINT
 * Path: assets/js/index.js
 * Version: 145.0.1 (BUILD NEXT — FIXED MARKETPLACE ROUTE)
 * Status: APPROVED & ACTIVE
 */

import { ApplicationEntry } from './runtime/application.entry.service.js';
import { LanguageService } from './core/language.service.js';
import { AssessmentEventListener } from './coach/listeners/assessment.listener.js';
import { appRouter } from './core/router/app-router.js';

/**
 * Factory penangan modul rute secara aman
 */
function createSafeRouteFactory(importFn) {
    return function () {
        return {
            mount: async function (container) {
                const targetContainer = container || document.getElementById('app') || document.body;
                try {
                    const module = await importFn();
                    const ExportedClass = module.default || module.TestIntrovertExtrovertPage || module;
                    const page = typeof ExportedClass === 'function' ? new ExportedClass() : ExportedClass;

                    if (page && typeof page.mount === 'function') {
                        await page.mount(targetContainer);
                    } else if (page && typeof page.render === 'function') {
                        targetContainer.innerHTML = page.render();
                    }
                } catch (err) {
                    console.error('[Route Factory Error]:', err);
                    targetContainer.innerHTML = `
                        <div style="padding: 4rem 1.5rem; text-align: center; color: #f8fafc;">
                            <h2 style="font-size: 1.8rem; margin-bottom: 0.5rem; color: #f87171;">⚠️ Gagal Memuat Modul</h2>
                            <p style="color: #94a3b8; max-width: 500px; margin: 0 auto 1.5rem auto;">${err.message}</p>
                            <a href="#/personality" style="display: inline-block; padding: 0.75rem 1.5rem; background: #2563eb; color: #fff; text-decoration: none; border-radius: 10px; font-weight: 600;">
                                ← Kembali ke Hub Kepribadian
                            </a>
                        </div>
                    `;
                }
            }
        };
    };
}

/**
 * Pendaftaran seluruh rute aplikasi
 */
function registerAllRoutes() {
    if (!appRouter) return;

    appRouter.registerRoute('#/home', {
        title: 'Beranda — TopCare AI Platform',
        requiresAuth: false,
        factory: createSafeRouteFactory(function () { return import('./pages/home.page.js'); })
    });

    appRouter.registerRoute('#/learning', {
        title: 'Pusat Pembelajaran — TopCare AI',
        requiresAuth: false,
        factory: createSafeRouteFactory(function () { return import('./pages/learning.page.js'); })
    });

    appRouter.registerRoute('#/coach', {
        title: 'Diskusi Coach AI — TopCare AI',
        requiresAuth: false,
        factory: createSafeRouteFactory(function () { return import('./pages/coach.page.js'); })
    });

    appRouter.registerRoute('#/creator', {
        title: 'Creator Hub — TopCare AI',
        requiresAuth: false,
        factory: createSafeRouteFactory(function () { return import('./pages/creator.page.js'); })
    });

    appRouter.registerRoute('#/community', {
        title: 'Komunitas Global — TopCare AI',
        requiresAuth: false,
        factory: createSafeRouteFactory(function () { return import('./pages/community.page.js'); })
    });

    appRouter.registerRoute('#/marketplace', {
        title: 'Marketplace Prompt & Asset — TopCare AI',
        requiresAuth: false,
        factory: createSafeRouteFactory(function () { return import('./pages/marketplace.page.js'); })
    });

    appRouter.registerRoute('#/premium', {
        title: 'Premium Center — TopCare AI',
        requiresAuth: false,
        factory: createSafeRouteFactory(function () { return import('./pages/premium.page.js'); })
    });

    appRouter.registerRoute('#/about', {
        title: 'Tentang Kami — TopCare AI',
        requiresAuth: false,
        factory: createSafeRouteFactory(function () { return import('./pages/about.page.js'); })
    });

    // DOMAIN PERSONALITY & TES ENERGI JUNG
    appRouter.registerRoute('#/personality', {
        title: 'Pilih Tes Kepribadian — TopCare AI',
        requiresAuth: false,
        factory: createSafeRouteFactory(function () { return import('./pages/personality.page.js'); })
    });

    appRouter.registerRoute('#/personality-test', {
        title: 'Tes 4 Temperamen Utama — TopCare AI',
        requiresAuth: false,
        factory: createSafeRouteFactory(function () { return import('./pages/personality-test.page.js'); })
    });

    appRouter.registerRoute('#/test-introvert-extrovert', {
        title: 'Tes Energi Introvert vs Ekstrovert — TopCare AI',
        requiresAuth: false,
        factory: createSafeRouteFactory(function () { return import('./pages/test-energy/test-introvert-extrovert.page.js'); })
    });

    appRouter.registerRoute('#/test-mbti', {
        title: 'Tes Tipe MBTI — TopCare AI',
        requiresAuth: false,
        factory: createSafeRouteFactory(function () { return import('./pages/test-mbti.page.js'); })
    });
}

/**
 * Inisialisasi Subsistem
 */
function initSubsystems() {
    if (LanguageService && typeof LanguageService.applyLanguage === 'function') {
        LanguageService.applyLanguage();
    }

    const langBtn = document.getElementById('lang-toggle-btn');
    if (langBtn) {
        langBtn.addEventListener('click', function () {
            if (typeof LanguageService.toggleLanguage === 'function') {
                LanguageService.toggleLanguage();
            }
        });
    }

    if (AssessmentEventListener && typeof AssessmentEventListener.init === 'function') {
        AssessmentEventListener.init();
    }

    registerAllRoutes();

    const appContainer = document.getElementById('app') || document.body;
    if (appRouter && typeof appRouter.init === 'function') {
        appRouter.init(appContainer);
    }
}

document.addEventListener('DOMContentLoaded', async function () {
    try {
        initSubsystems();

        if (ApplicationEntry && typeof ApplicationEntry.bootstrap === 'function') {
            await ApplicationEntry.bootstrap();
        }
    } catch (err) {
        console.error('[Runtime Index] Boot Error:', err);
    }
});