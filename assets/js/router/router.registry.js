/**
 * TOPCARE AI PLATFORM V2 — ROUTES REGISTRY (SINGLE SOURCE OF TRUTH)
 * Path: assets/js/core/router/routes.registry.js
 * Status: APPROVED & REPAIRED (FIXED MARKETPLACE & COACH PATHS)
 * SRP: Centralized route-to-module dynamic import registry.
 */

const pageImport = (path) => function () { return import(path); };

export const ROUTES_REGISTRY = {
    // 1. Core Pages
    'home': pageImport('../../pages/home.page.js'),
    '/home': pageImport('../../pages/home.page.js'),

    'about': pageImport('../../pages/about.page.js'),
    '/about': pageImport('../../pages/about.page.js'),

    'learning': pageImport('../../pages/learning.page.js'),
    '/learning': pageImport('../../pages/learning.page.js'),

    'community': pageImport('../../pages/community.page.js'),
    '/community': pageImport('../../pages/community.page.js'),

    // FIX 1: Pemetaan Coach AI ke Page Orchestrator Controller Resmi
    'coach': pageImport('../../pages/coach.page.js'),
    '/coach': pageImport('../../pages/coach.page.js'),

    'creator': pageImport('../../pages/creator.page.js'),
    '/creator': pageImport('../../pages/creator.page.js'),

    'premium': pageImport('../../pages/premium.page.js'),
    '/premium': pageImport('../../pages/premium.page.js'),

    // FIX 1: Pemetaan Marketplace ke Page Orchestrator Controller Resmi
    'marketplace': pageImport('../../pages/marketplace.page.js'),
    '/marketplace': pageImport('../../pages/marketplace.page.js'),

    // 2. Hub Kepribadian & Asesmen
    'personality': pageImport('../../pages/personality.page.js'),
    '/personality': pageImport('../../pages/personality.page.js'),

    'personality-test': pageImport('../../pages/personality-test.page.js'),
    '/personality-test': pageImport('../../pages/personality-test.page.js'),

    // RUTE TES ENERGI CARL JUNG (DUAL-KEY SLASH SUPPORT)
    'test-introvert-extrovert': pageImport('../../pages/test-energy/test-introvert-extrovert.page.js'),
    '/test-introvert-extrovert': pageImport('../../pages/test-energy/test-introvert-extrovert.page.js'),

    'test-mbti': pageImport('../../pages/test-mbti.page.js'),
    '/test-mbti': pageImport('../../pages/test-mbti.page.js'),

    // 3. Auth & Extra Shortcuts
    'login': pageImport('../../pages/login.page.js'),
    '/login': pageImport('../../pages/login.page.js'),

    'register': pageImport('../../pages/register.page.js'),
    '/register': pageImport('../../pages/register.page.js')
};

export default ROUTES_REGISTRY;