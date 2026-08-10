/**
 * TOPCARE AI PLATFORM V2 — FEATURE MANIFEST REGISTRY
 * Path: assets/js/features/feature.manifest.registry.js
 * Status: APPROVED (BUILD 137.6)
 * SRP: Single Source of Truth for Lazy-Loaded Page Routes.
 */

export class FeatureManifestRegistryEngine {
    constructor() {
        this._manifests = new Map();
        this._initializeCoreManifests();
        Object.seal(this);
    }

    _initializeCoreManifests() {
        const coreRoutes = [
            { id: 'home', path: '/home', modulePath: '../pages/home.page.js', isProtected: false, aliases: ['/features'] },
            { id: 'marketplace', path: '/marketplace', modulePath: '../pages/marketplace.page.js', isProtected: false, aliases: [] },
            { id: 'coach', path: '/coach', modulePath: '../pages/coach.page.js', isProtected: true, aliases: [] },
            { id: 'creator', path: '/creator', modulePath: '../pages/creator.page.js', isProtected: true, aliases: [] },
            { id: 'personality', path: '/personality', modulePath: '../pages/personality.page.js', isProtected: true, aliases: ['/personality-test'] },
            { id: 'workspace', path: '/workspace', modulePath: '../pages/workspace.page.js', isProtected: true, aliases: ['/workspace/coach'] },
            { id: 'learning', path: '/learning', modulePath: '../pages/learning.page.js', isProtected: true, aliases: [] },
            { id: 'premium', path: '/premium', modulePath: '../pages/premium.page.js', isProtected: false, aliases: [] },
            { id: 'community', path: '/community', modulePath: '../pages/community.page.js', isProtected: true, aliases: [] },
            { id: 'login', path: '/login', modulePath: '../pages/login.page.js', isProtected: false, aliases: [] },
            { id: 'register', path: '/register', modulePath: '../pages/register.page.js', isProtected: false, aliases: [] },
            { id: 'forgot-password', path: '/forgot-password', modulePath: '../pages/forgot-password.page.js', isProtected: false, aliases: [] },
            { id: 'ebook', path: '/ebook', modulePath: '../pages/ebook.page.js', isProtected: false, aliases: [] },
            { id: 'faq', path: '/faq', modulePath: '../pages/faq.page.js', isProtected: false, aliases: [] },
            { id: 'contact', path: '/contact', modulePath: '../pages/contact.page.js', isProtected: false, aliases: [] },
            { id: 'download-center', path: '/download-center', modulePath: '../pages/download-center.page.js', isProtected: false, aliases: ['/downloads'] },
            { id: 'about', path: '/about', modulePath: '../pages/about.page.js', isProtected: false, aliases: [] },
            
            // BUILD 137.6: MIGRATED LEGACY ROUTES
            { id: 'pricing', path: '/pricing', modulePath: '../pages/pricing.page.js', isProtected: false, aliases: [] },
            { id: 'articles', path: '/articles', modulePath: '../pages/articles.page.js', isProtected: false, aliases: [] },
            { id: 'assistant', path: '/assistant', modulePath: '../pages/assistant.page.js', isProtected: true, aliases: [] },
            { id: 'ai', path: '/ai', modulePath: '../pages/ai.page.js', isProtected: true, aliases: [] },
            { id: 'prompt', path: '/prompt', modulePath: '../pages/prompt.page.js', isProtected: true, aliases: [] },
            { id: 'coach-selection', path: '/coach-selection', modulePath: '../pages/coach-selection.page.js', isProtected: true, aliases: [] },
            { id: 'profile', path: '/profile', modulePath: '../pages/auth/profile.page.js', isProtected: true, aliases: [] }
        ];

        coreRoutes.forEach(route => this.register(route));
    }

    register(manifest) {
        if (!manifest || !manifest.id) return;
        this._manifests.set(manifest.id, manifest);
    }

    getManifests() {
        return Array.from(this._manifests.values());
    }

    getById(id) {
        return this._manifests.get(id) || null;
    }
}

export const FeatureManifestRegistry = new FeatureManifestRegistryEngine();
export default FeatureManifestRegistry;