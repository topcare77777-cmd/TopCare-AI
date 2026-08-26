/**
 * TOPCARE AI PLATFORM V3 — MAIN ENTRY POINT
 * Path: assets/js/index.js
 * Status: PHASE 2.4.4 TARGETED ROUTE CONSOLIDATION APPLIED
 */

import { appRouter } from './core/router/app-router.js';

// Helper universal untuk instansiasi class constructor maupun singleton instance
const resolvePageModule = (mod) => {
    const Exported = mod.default || Object.values(mod)[0] || mod;
    return typeof Exported === 'function' ? new Exported() : Exported;
};

// ==========================================
// 1. RUTE PUBLIK UTAMA
// ==========================================

appRouter.registerRoute('#/home', {
    title: 'TopCare AI — Platform Belajar, Mengenal Diri & Berkarya',
    requiresAuth: false,
    factory: async () => {
        const mod = await import('./pages/home.page.js');
        return resolvePageModule(mod);
    }
});

appRouter.registerRoute('#/about', {
    title: 'Tentang Kami — TopCare AI',
    requiresAuth: false,
    factory: async () => {
        const mod = await import('./pages/about.page.js');
        return resolvePageModule(mod);
    }
});

appRouter.registerRoute('#/learning', {
    title: 'Belajar AI — Modul Interaktif TopCare AI',
    requiresAuth: false,
    factory: async () => {
        const mod = await import('./pages/learning.page.js');
        return resolvePageModule(mod);
    }
});

appRouter.registerRoute('#/personality', {
    title: 'Tes Kepribadian — TopCare AI',
    requiresAuth: false,
    factory: async () => {
        const mod = await import('./pages/personality.page.js');
        return resolvePageModule(mod);
    }
});

appRouter.registerRoute('#/community', {
    title: 'Komunitas AI — TopCare AI',
    requiresAuth: false,
    factory: async () => {
        const mod = await import('./pages/community.page.js');
        return resolvePageModule(mod);
    }
});

appRouter.registerRoute('#/creator', {
    title: 'Creator Hub — TopCare AI',
    requiresAuth: false,
    factory: async () => {
        const mod = await import('./pages/creator.page.js');
        return resolvePageModule(mod);
    }
});

appRouter.registerRoute('#/marketplace', {
    title: 'Prompt Marketplace — TopCare AI',
    requiresAuth: false,
    factory: async () => {
        const mod = await import('./pages/marketplace.page.js');
        return resolvePageModule(mod);
    }
});

appRouter.registerRoute('#/premium', {
    title: 'Langganan Premium — TopCare AI',
    requiresAuth: false,
    factory: async () => {
        const mod = await import('./pages/premium.page.js');
        return resolvePageModule(mod);
    }
});

// ==========================================
// 2. RUTE INFORMASIONAL & DOKUMEN LEGAL
// ==========================================

appRouter.registerRoute('#/privacy', {
    title: 'Kebijakan Privasi — TopCare AI',
    requiresAuth: false,
    factory: async () => {
        const mod = await import('./pages/privacy.page.js');
        return resolvePageModule(mod);
    }
});

appRouter.registerRoute('#/terms', {
    title: 'Syarat & Ketentuan — TopCare AI',
    requiresAuth: false,
    factory: async () => {
        const mod = await import('./pages/terms.page.js');
        return resolvePageModule(mod);
    }
});

appRouter.registerRoute('#/faq', {
    title: 'Pusat Bantuan & FAQ — TopCare AI',
    requiresAuth: false,
    factory: async () => {
        const mod = await import('./pages/faq.page.js');
        return resolvePageModule(mod);
    }
});

appRouter.registerRoute('#/contact', {
    title: 'Hubungi Kami — TopCare AI',
    requiresAuth: false,
    factory: async () => {
        const mod = await import('./pages/contact.page.js');
        return resolvePageModule(mod);
    }
});

// ==========================================
// 3. RUTE TES ASESMEN KHUSUS
// ==========================================

appRouter.registerRoute('#/test-mbti', {
    title: 'Tes MBTI & Kepribadian — TopCare AI',
    requiresAuth: false,
    factory: async () => {
        const mod = await import('./pages/mbti/test-mbti.page.js');
        return resolvePageModule(mod);
    }
});

appRouter.registerRoute('#/test-energy', {
    title: 'Tes Tipe Energi (Introvert/Extrovert) — TopCare AI',
    requiresAuth: false,
    factory: async () => {
        const mod = await import('./pages/test-energy/test-introvert-extrovert.page.js');
        return resolvePageModule(mod);
    }
});

// ==========================================
// 4. RUTE AUTENTIKASI (CANONICAL + ALIAS REDIRECTS)
// ==========================================

appRouter.registerRoute('#/login', {
    title: 'Masuk — TopCare AI',
    requiresAuth: false,
    factory: async () => {
        const mod = await import('./pages/login.page.js');
        return resolvePageModule(mod);
    }
});

appRouter.registerRoute('#/signin', {
    title: 'Masuk — TopCare AI',
    requiresAuth: false,
    factory: async () => {
        window.location.hash = '#/login';
        return null;
    }
});

appRouter.registerRoute('#/auth/login', {
    title: 'Masuk — TopCare AI',
    requiresAuth: false,
    factory: async () => {
        window.location.hash = '#/login';
        return null;
    }
});

appRouter.registerRoute('#/register', {
    title: 'Daftar Akun — TopCare AI',
    requiresAuth: false,
    factory: async () => {
        const mod = await import('./pages/register.page.js');
        return resolvePageModule(mod);
    }
});

appRouter.registerRoute('#/forgot-password', {
    title: 'Atur Ulang Kata Sandi — TopCare AI',
    requiresAuth: false,
    factory: async () => {
        const mod = await import('./pages/auth/forgot-password.page.js');
        return resolvePageModule(mod);
    }
});

// ==========================================
// 5. RUTE TERPROTEKSI (MEMBUTUHKAN AUTH)
// ==========================================

appRouter.registerRoute('#/dashboard', {
    title: 'Member Dashboard — TopCare AI',
    requiresAuth: true,
    factory: async () => {
        const mod = await import('./pages/dashboard.page.js');
        return resolvePageModule(mod);
    }
});

appRouter.registerRoute('#/admin', {
    title: 'Super Admin Panel — TopCare AI',
    requiresAuth: true,
    factory: async () => {
        const mod = await import('./pages/admin.page.js');
        return resolvePageModule(mod);
    }
});

appRouter.registerRoute('#/download-center', {
    title: 'Pusat Unduhan & Lisensi — TopCare AI',
    requiresAuth: true,
    factory: async () => {
        const mod = await import('./pages/download-center.page.js');
        return resolvePageModule(mod);
    }
});

// Legacy Alias Redirect untuk Pusat Unduhan
appRouter.registerRoute('#/downloads', {
    title: 'Pusat Unduhan & Lisensi — TopCare AI',
    requiresAuth: true,
    factory: async () => {
        window.location.hash = '#/download-center';
        return null;
    }
});

appRouter.registerRoute('#/coach', {
    title: 'AI Smart Coach Workspace — TopCare AI',
    requiresAuth: true,
    factory: async () => {
        const mod = await import('./pages/coach.page.js');
        return resolvePageModule(mod);
    }
});

// ==========================================
// 6. BOOTSTRAP ROUTER
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    appRouter.init(document.getElementById('app'));
});