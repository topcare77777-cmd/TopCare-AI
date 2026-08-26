/**
 * TOPCARE AI PLATFORM V3 — MAIN ENTRY POINT
 * Path: assets/js/index.js
 * Status: V3-FIX-04 ROUTE RESTORATION COMPLETE
 */

import { appRouter } from './core/router/app-router.js';

// ==========================================
// 1. RUTE PUBLIK UTAMA
// ==========================================

appRouter.registerRoute('#/home', {
    title: 'TopCare AI — Platform Belajar, Mengenal Diri & Berkarya',
    requiresAuth: false,
    factory: async () => {
        const { HomePage } = await import('./pages/home.page.js');
        return new HomePage();
    }
});

appRouter.registerRoute('#/about', {
    title: 'Tentang Kami — TopCare AI',
    requiresAuth: false,
    factory: async () => {
        const { AboutPage } = await import('./pages/about.page.js');
        return new AboutPage();
    }
});

appRouter.registerRoute('#/learning', {
    title: 'Belajar AI — Modul Interaktif TopCare AI',
    requiresAuth: false,
    factory: async () => {
        const { LearningPage } = await import('./pages/learning.page.js');
        return new LearningPage();
    }
});

appRouter.registerRoute('#/personality', {
    title: 'Tes Kepribadian — TopCare AI',
    requiresAuth: false,
    factory: async () => {
        const { PersonalityPage } = await import('./pages/personality.page.js');
        return new PersonalityPage();
    }
});

appRouter.registerRoute('#/community', {
    title: 'Komunitas AI — TopCare AI',
    requiresAuth: false,
    factory: async () => {
        const { CommunityPage } = await import('./pages/community.page.js');
        return new CommunityPage();
    }
});

appRouter.registerRoute('#/creator', {
    title: 'Creator Hub — TopCare AI',
    requiresAuth: false,
    factory: async () => {
        const { CreatorPage } = await import('./pages/creator.page.js');
        return new CreatorPage();
    }
});

appRouter.registerRoute('#/marketplace', {
    title: 'Prompt Marketplace — TopCare AI',
    requiresAuth: false,
    factory: async () => {
        const { MarketplacePage } = await import('./pages/marketplace.page.js');
        return new MarketplacePage();
    }
});

appRouter.registerRoute('#/premium', {
    title: 'Langganan Premium — TopCare AI',
    requiresAuth: false,
    factory: async () => {
        const { PremiumPage } = await import('./pages/premium.page.js');
        return new PremiumPage();
    }
});

// ==========================================
// 2. RUTE INFORMASIONAL & DOKUMEN LEGAL
// ==========================================

appRouter.registerRoute('#/privacy', {
    title: 'Kebijakan Privasi — TopCare AI',
    requiresAuth: false,
    factory: async () => {
        const { PrivacyPage } = await import('./pages/privacy.page.js');
        return new PrivacyPage();
    }
});

appRouter.registerRoute('#/terms', {
    title: 'Syarat & Ketentuan — TopCare AI',
    requiresAuth: false,
    factory: async () => {
        const { TermsPage } = await import('./pages/terms.page.js');
        return new TermsPage();
    }
});

appRouter.registerRoute('#/faq', {
    title: 'Pusat Bantuan & FAQ — TopCare AI',
    requiresAuth: false,
    factory: async () => {
        const { FaqPage } = await import('./pages/faq.page.js');
        return new FaqPage();
    }
});

appRouter.registerRoute('#/contact', {
    title: 'Hubungi Kami — TopCare AI',
    requiresAuth: false,
    factory: async () => {
        const { ContactPage } = await import('./pages/contact.page.js');
        return new ContactPage();
    }
});

// ==========================================
// 3. RUTE TES ASESMEN KHUSUS
// ==========================================

appRouter.registerRoute('#/test-mbti', {
    title: 'Tes MBTI & Kepribadian — TopCare AI',
    requiresAuth: false,
    factory: async () => {
        const { TestMbtiPage } = await import('./pages/mbti/test-mbti.page.js');
        return new TestMbtiPage();
    }
});

appRouter.registerRoute('#/test-energy', {
    title: 'Tes Tipe Energi (Introvert/Extrovert) — TopCare AI',
    requiresAuth: false,
    factory: async () => {
        const { TestIntrovertExtrovertPage } = await import('./pages/test-energy/test-introvert-extrovert.page.js');
        return new TestIntrovertExtrovertPage();
    }
});

// ==========================================
// 4. RUTE AUTENTIKASI
// ==========================================

appRouter.registerRoute('#/login', {
    title: 'Masuk — TopCare AI',
    requiresAuth: false,
    factory: async () => {
        const { LoginPage } = await import('./pages/login.page.js');
        return new LoginPage();
    }
});

appRouter.registerRoute('#/register', {
    title: 'Daftar Akun — TopCare AI',
    requiresAuth: false,
    factory: async () => {
        const { RegisterPage } = await import('./pages/register.page.js');
        return new RegisterPage();
    }
});

appRouter.registerRoute('#/forgot-password', {
    title: 'Atur Ulang Kata Sandi — TopCare AI',
    requiresAuth: false,
    factory: async () => {
        const { ForgotPasswordPage } = await import('./pages/auth/forgot-password.page.js');
        return new ForgotPasswordPage();
    }
});

// ==========================================
// 5. RUTE TERPROTEKSI (MEMBUTUHKAN AUTH)
// ==========================================

appRouter.registerRoute('#/dashboard', {
    title: 'Member Dashboard — TopCare AI',
    requiresAuth: true,
    factory: async () => {
        const { DashboardPage } = await import('./pages/dashboard.page.js');
        return new DashboardPage();
    }
});

appRouter.registerRoute('#/admin', {
    title: 'Super Admin Panel — TopCare AI',
    requiresAuth: true,
    factory: async () => {
        const { AdminPage } = await import('./pages/admin.page.js');
        return new AdminPage();
    }
});

appRouter.registerRoute('#/download-center', {
    title: 'Pusat Unduhan & Lisensi — TopCare AI',
    requiresAuth: true,
    factory: async () => {
        const { DownloadCenterPage } = await import('./pages/download-center.page.js');
        return new DownloadCenterPage();
    }
});

appRouter.registerRoute('#/coach', {
    title: 'AI Smart Coach Workspace — TopCare AI',
    requiresAuth: true,
    factory: async () => {
        const { CoachPage } = await import('./pages/coach.page.js');
        return new CoachPage();
    }
});

// ==========================================
// 6. BOOTSTRAP ROUTER
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    appRouter.init(document.getElementById('app'));
});