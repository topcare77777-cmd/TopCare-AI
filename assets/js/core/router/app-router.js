/**
 * TOPCARE AI PLATFORM V3 — ASYNC APPLICATION ROUTER
 * Path: assets/js/core/router/app-router.js
 * Status: V3-FIX-02 AUTHORITATIVE AUTH GUARD APPLIED (forceRefresh = true)
 */

import { PlatformService } from '../services/platform.service.js';

export class AppRouter {
    constructor() {
        this.routes = new Map();
        this.container = null;
        this.currentRoute = null;
        this.currentPageInstance = null;
        this.isNavigating = false;
    }

    /**
     * Inisialisasi router dan listener hashchange
     */
    init(container) {
        this.container = container || document.getElementById('app') || document.body;

        window.addEventListener('hashchange', () => this.handleRouting());

        // Handle routing initial load
        if (!window.location.hash || window.location.hash === '' || window.location.hash === '#') {
            window.location.hash = '#/home';
        } else {
            this.handleRouting();
        }
    }

    /**
     * Mendaftarkan rute baru
     * @param {string} path - Hash rute (contoh: '#/dashboard')
     * @param {Object} routeConfig - { title, requiresAuth, factory }
     */
    registerRoute(path, routeConfig) {
        this.routes.set(path, routeConfig);
    }

    /**
     * Normalisasi string hash URL
     */
    #normalizePath(hash) {
        if (!hash) return '#/home';
        const cleanHash = hash.split('?')[0];
        return cleanHash.endsWith('/') && cleanHash.length > 2
            ? cleanHash.slice(0, -1)
            : cleanHash;
    }

    /**
     * Router core handler dengan Authoritative Async Supabase Guard
     */
    async handleRouting() {
        if (this.isNavigating) return;
        this.isNavigating = true;

        const currentHash = this.#normalizePath(window.location.hash);
        let routeConfig = this.routes.get(currentHash);

        // Fallback jika route tidak ditemukan
        if (!routeConfig) {
            routeConfig = this.routes.get('#/home');
            if (!routeConfig) {
                this.isNavigating = false;
                return;
            }
        }

        try {
            // 1. Verifikasi Authoritative Asinkron Langsung ke Supabase (forceRefresh: true)
            let activeSession = null;
            if (routeConfig.requiresAuth || currentHash === '#/login' || currentHash === '#/register') {
                // Security Guard mem-bypass in-memory cache untuk memastikan token belum revoked/expired
                activeSession = await PlatformService.getCurrentUserSession(true);
            }

            // 2. Guard: Rute Terproteksi (requiresAuth: true)
            if (routeConfig.requiresAuth) {
                if (!activeSession) {
                    sessionStorage.setItem('tcr_redirect_target', currentHash);
                    this.isNavigating = false;
                    window.location.hash = '#/login';
                    return;
                }

                // Proteksi Khusus Super Admin
                if (currentHash === '#/admin' && activeSession.role !== 'super_admin') {
                    this.isNavigating = false;
                    window.location.hash = '#/dashboard';
                    return;
                }
            }

            // 3. Guard: Reverse Auth (User dengan sesi valid dicegah membuka halaman login/register)
            if (activeSession && (currentHash === '#/login' || currentHash === '#/register')) {
                this.isNavigating = false;
                window.location.hash = activeSession.role === 'super_admin' ? '#/admin' : '#/dashboard';
                return;
            }

            // 4. Update Document Title
            if (routeConfig.title) {
                document.title = routeConfig.title;
            }

            // 5. Cleanup Lifecycle Halaman Sebelumnya
            if (this.currentPageInstance && typeof this.currentPageInstance.destroy === 'function') {
                try {
                    this.currentPageInstance.destroy();
                } catch (e) {
                    console.warn('[Router] Error destroying previous page:', e);
                }
            }
            this.currentPageInstance = null;

            // 6. Instansiasi dan Mount Halaman Baru (Zero UI Flash)
            if (typeof routeConfig.factory === 'function') {
                const pageModule = await routeConfig.factory();
                this.currentPageInstance = pageModule;

                if (pageModule && typeof pageModule.mount === 'function') {
                    await pageModule.mount(this.container);
                }
            }

            this.currentRoute = currentHash;
            window.scrollTo(0, 0);

        } catch (error) {
            console.error('[Router Navigation Error]:', error);
            if (this.container) {
                this.container.innerHTML = `
                    <div style="padding: 4rem 1.5rem; text-align: center; color: #f8fafc;">
                        <h2 style="font-size: 1.8rem; margin-bottom: 0.5rem; color: #f87171;">⚠️ Terjadi Kendala Navigasi</h2>
                        <p style="color: #94a3b8; max-width: 500px; margin: 0 auto 1.5rem auto;">${error.message}</p>
                        <a href="#/home" style="display: inline-block; padding: 0.75rem 1.5rem; background: #2563eb; color: #fff; text-decoration: none; border-radius: 10px; font-weight: 600;">
                            Kembali ke Beranda
                        </a>
                    </div>
                `;
            }
        } finally {
            this.isNavigating = false;
        }
    }
}

export const appRouter = new AppRouter();
export default appRouter;