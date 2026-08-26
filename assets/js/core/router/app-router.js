/**
 * TOPCARE AI PLATFORM V3 — ASYNC APPLICATION ROUTER
 * Path: assets/js/core/router/app-router.js
 * Status: V3-FIX-07.3 RESILIENT FACTORY INSTANTIATION
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

    init(container) {
        this.container = container || document.getElementById('app') || document.body;
        window.addEventListener('hashchange', () => this.handleRouting());

        if (!window.location.hash || window.location.hash === '' || window.location.hash === '#') {
            window.location.hash = '#/home';
        } else {
            this.handleRouting();
        }
    }

    registerRoute(path, routeConfig) {
        this.routes.set(path, routeConfig);
    }

    #normalizePath(hash) {
        if (!hash) return '#/home';
        const cleanHash = hash.split('?')[0];
        return cleanHash.endsWith('/') && cleanHash.length > 2
            ? cleanHash.slice(0, -1)
            : cleanHash;
    }

    async handleRouting() {
        if (this.isNavigating) return;
        this.isNavigating = true;

        const currentHash = this.#normalizePath(window.location.hash);
        let routeConfig = this.routes.get(currentHash);

        if (!routeConfig) {
            routeConfig = this.routes.get('#/home');
            if (!routeConfig) {
                this.isNavigating = false;
                return;
            }
        }

        try {
            let activeSession = null;
            if (routeConfig.requiresAuth || currentHash === '#/login' || currentHash === '#/register') {
                activeSession = await PlatformService.getCurrentUserSession(true);
            }

            if (routeConfig.requiresAuth) {
                if (!activeSession) {
                    sessionStorage.setItem('tcr_redirect_target', currentHash);
                    this.isNavigating = false;
                    window.location.hash = '#/login';
                    return;
                }

                if (currentHash === '#/admin' && activeSession.role !== 'super_admin') {
                    this.isNavigating = false;
                    window.location.hash = '#/dashboard';
                    return;
                }
            }

            if (activeSession && (currentHash === '#/login' || currentHash === '#/register')) {
                this.isNavigating = false;
                window.location.hash = activeSession.role === 'super_admin' ? '#/admin' : '#/dashboard';
                return;
            }

            if (routeConfig.title) {
                document.title = routeConfig.title;
            }

            if (this.currentPageInstance && typeof this.currentPageInstance.destroy === 'function') {
                try {
                    this.currentPageInstance.destroy();
                } catch (e) {
                    console.warn('[Router] Error destroying previous page:', e);
                }
            }
            this.currentPageInstance = null;

            if (typeof routeConfig.factory === 'function') {
                const module = await routeConfig.factory();

                // Resilient instantiation
                const Exported = module?.default || module?.PersonalityPage || module?.PersonalityHubPage || module;
                let pageInstance;
                if (typeof Exported === 'function') {
                    try {
                        pageInstance = new Exported();
                    } catch (e) {
                        pageInstance = Exported();
                    }
                } else {
                    pageInstance = Exported;
                }

                this.currentPageInstance = pageInstance;

                if (pageInstance && typeof pageInstance.mount === 'function') {
                    await pageInstance.mount(this.container);
                } else if (pageInstance && typeof pageInstance.render === 'function') {
                    this.container.innerHTML = pageInstance.render();
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