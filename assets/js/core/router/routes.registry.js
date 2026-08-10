/**
 * TOPCARE AI PLATFORM V2 — ROUTES REGISTRY (SSOT)
 * Path: assets/js/core/router/routes.registry.js
 * Status: APPROVED & FIXED
 * SRP: Centralized route-to-module dynamic import registry.
 */

export const ROUTES_REGISTRY = {
    'home': () => import('../../pages/home.page.js'),
    'about': () => import('../../pages/about.page.js'),
    'learning': () => import('../../pages/learning.page.js'),

    // Hub Kepribadian & Modul Tes Publik
    'personality': () => import('../../pages/personality.page.js'),
    'personality-test': () => import('../../pages/personality-test.page.js'),
    'test-introvert-extrovert': () => import('../../pages/test-introvert-extrovert.page.js'),
    'test-mbti': () => import('../../pages/test-mbti.page.js'),

    'community': () => import('../../pages/community.page.js'),
    'coach': () => import('../../coach/coach.renderer.js'),
    'creator': () => import('../../pages/creator.page.js'),
    'premium': () => import('../../pages/premium.page.js'),
    'marketplace': () => import('../../pages/home.page.js'),

    // Sub-layer Creator Shortcuts
    'ebook': () => import('../../pages/creator.page.js'),
    'artikel': () => import('../../pages/creator.page.js'),
    'prompt': () => import('../../pages/creator.page.js'),

    // Additional Nav Routes
    'faq': () => import('../../pages/home.page.js'),
    'contact': () => import('../../pages/home.page.js'),
    'login': () => import('../../pages/login.page.js'),
    'register': () => import('../../pages/register.page.js')
};

export default ROUTES_REGISTRY;