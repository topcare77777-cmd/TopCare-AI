/**
 * TOPCARE AI PLATFORM V2 — FEATURE MANIFEST REGISTRY
 * Path: assets/js/features/feature.manifest.registry.js
 * Version: 130.1.0 (BUILD 130.1 — CLEAN MANIFEST REGISTRATION)
 * Status: APPROVED & LOCKED
 * SRP: Single Source of Truth (SSOT) for all Application Feature Manifests.
 */

export const FEATURE_MANIFEST = Object.freeze([
    // --- Authentication Pages ---
    {
        id: 'login',
        path: '/login',
        modulePath: '../pages/auth/login.page.js',
        isProtected: false,
        aliases: []
    },
    {
        id: 'register',
        path: '/register',
        modulePath: '../pages/auth/register.page.js',
        isProtected: false,
        aliases: []
    },
    {
        id: 'forgot-password',
        path: '/forgot-password',
        modulePath: '../pages/auth/forgot-password.page.js',
        isProtected: false,
        aliases: []
    },

    // --- Core Application Pages ---
    {
        id: 'home',
        path: '/home',
        modulePath: '../pages/home.page.js',
        isProtected: false,
        aliases: ['/features']
    },
    {
        id: 'coach',
        path: '/coach',
        modulePath: '../pages/coach.page.js',
        isProtected: true,
        aliases: []
    },
    {
        id: 'coach-selection',
        path: '/coach-selection',
        modulePath: '../pages/coach-selection.page.js',
        isProtected: true,
        aliases: []
    },
    {
        id: 'personality',
        path: '/personality',
        modulePath: '../pages/personality.page.js',
        isProtected: false,
        aliases: ['/personality-test']
    },
    {
        id: 'learning',
        path: '/learning',
        modulePath: '../pages/learning.page.js',
        isProtected: false,
        aliases: []
    },
    {
        id: 'community',
        path: '/community',
        modulePath: '../pages/community.page.js',
        isProtected: false,
        aliases: []
    },
    {
        id: 'premium',
        path: '/premium',
        modulePath: '../pages/premium.page.js',
        isProtected: false,
        aliases: []
    },
    {
        id: 'about',
        path: '/about',
        modulePath: '../pages/about.page.js',
        isProtected: false,
        aliases: []
    },
    {
        id: 'assistant',
        path: '/assistant',
        modulePath: '../pages/assistant.page.js',
        isProtected: true,
        aliases: []
    },
    {
        id: 'ebook',
        path: '/ebook',
        modulePath: '../pages/ebook.page.js',
        isProtected: false,
        aliases: []
    },
    {
        id: 'faq',
        path: '/faq',
        modulePath: '../pages/faq.page.js',
        isProtected: false,
        aliases: []
    },
    {
        id: 'prompt',
        path: '/prompt',
        modulePath: '../pages/prompt.page.js',
        isProtected: false,
        aliases: []
    },
    {
        id: 'marketplace',
        path: '/marketplace',
        modulePath: '../pages/marketplace.page.js',
        isProtected: false,
        aliases: []
    },
    {
        id: 'artikel',
        path: '/artikel',
        modulePath: '../pages/artikel.page.js',
        isProtected: false,
        aliases: []
    },
    {
        id: 'creator',
        path: '/creator',
        modulePath: '../pages/creator.page.js',
        isProtected: true,
        aliases: []
    },

    // --- Composite Domain Pages ---
    {
        id: 'workspace',
        path: '/workspace',
        modulePath: '../pages/coach.page.js',
        isProtected: true,
        aliases: ['/workspace/coach']
    }
]);

export class FeatureManifestRegistryEngine {
    constructor() {
        Object.freeze(this);
    }

    getManifests() {
        return FEATURE_MANIFEST;
    }

    getById(id) {
        if (!id) return null;
        return FEATURE_MANIFEST.find(item => item.id === id) || null;
    }
}

export const FeatureManifestRegistry = new FeatureManifestRegistryEngine();
export default FeatureManifestRegistry;