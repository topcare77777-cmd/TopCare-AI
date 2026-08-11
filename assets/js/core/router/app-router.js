/**
 * TOPCARE AI PLATFORM V2 — CORE PLATFORM ROUTER ENGINE
 * Path: assets/js/core/router/app-router.js
 * Status: APPROVED & REPAIRED (SAFE CONTAINER INJECTION FOR PAGE CONSTRUCTORS)
 */

import { ROUTES_REGISTRY } from './routes.registry.js';

export class AppRouterEngine {
    constructor() {
        this._routes = new Map();
        this._activeComponent = null;
        this._currentRoute = null;
        this._mainContainer = null;
        this._isInitialized = false;

        this._onHashChange = this._handleRouteTransition.bind(this);
        Object.seal(this);
    }

    init(mainContainer) {
        if (this._isInitialized) return;
        if (!mainContainer) {
            mainContainer = document.getElementById('app') || document.body;
        }

        this._mainContainer = mainContainer;
        window.removeEventListener('hashchange', this._onHashChange);
        window.addEventListener('hashchange', this._onHashChange);
        this._isInitialized = true;

        this._handleRouteTransition('initial');
    }

    /**
     * Mendaftarkan Rute ke dalam Router Engine
     */
    registerRoute(path, routeDefinition) {
        if (!path || !routeDefinition) return;

        const normalizedPath = path.startsWith('#') ? path : `#/${path.replace(/^\//, '')}`;
        this._routes.set(normalizedPath, routeDefinition);
    }

    async _handleRouteTransition(navigationType = 'hashchange') {
        const targetHash = window.location.hash || '#/home';

        if (targetHash === this._currentRoute && this._activeComponent) {
            return;
        }

        // 1. Teardown komponen lama
        if (this._activeComponent && typeof this._activeComponent.destroy === 'function') {
            try {
                this._activeComponent.destroy();
            } catch (err) {
                console.warn("[AppRouter] Component destroy error:", err);
            }
        }

        this._activeComponent = null;

        if (!this._mainContainer) {
            this._mainContainer = document.getElementById('app') || document.body;
        }

        if (this._mainContainer) {
            this._mainContainer.innerHTML = '';
        }

        // 2. Cari rute terdaftar atau dari ROUTES_REGISTRY
        let route = this._routes.get(targetHash);
        const routeKey = targetHash.replace(/^#\//, '').replace(/^#/, '') || 'home';

        this._currentRoute = targetHash;

        try {
            let component = null;

            if (route && typeof route.factory === 'function') {
                const result = route.factory();
                component = typeof result.mount === 'function' ? result : await result;
            } else if (ROUTES_REGISTRY[routeKey]) {
                const module = await ROUTES_REGISTRY[routeKey]();
                const ExportedClass = module.default ||
                    module.MarketplacePage ||
                    module.CoachPage ||
                    module.HomePage ||
                    module;

                // FIX 3: Injeksi aman this._mainContainer ke constructor untuk CoachPage & MarketplacePage
                if (typeof ExportedClass === 'function') {
                    try {
                        component = new ExportedClass(this._mainContainer);
                    } catch (e) {
                        component = new ExportedClass();
                    }
                } else {
                    component = ExportedClass;
                }
            }

            // 3. Mounting ke DOM (Mendukung mount Async & Standalone Render)
            if (component && typeof component.mount === 'function') {
                await component.mount(this._mainContainer);
                this._activeComponent = component;
            } else if (component && typeof component.renderPage === 'function') {
                this._mainContainer.innerHTML = component.renderPage();
                this._activeComponent = component;
            } else if (component && typeof component.renderCard === 'function') {
                this._mainContainer.innerHTML = component.renderCard();
                this._activeComponent = component;
            } else if (component && typeof component.render === 'function') {
                const html = await component.render();
                if (html) this._mainContainer.innerHTML = html;
                this._activeComponent = component;
            }

            document.title = (route && route.title) ? route.title : 'TopCare AI Platform';

            window.scrollTo({ top: 0, behavior: 'smooth' });

        } catch (err) {
            console.error(`[AppRouter] Error loading route [${targetHash}]:`, err);
            this._renderErrorState(err);
        }
    }

    _renderErrorState(err) {
        if (!this._mainContainer) return;

        this._mainContainer.innerHTML = `
            <div style="padding: 4rem 1.5rem; text-align: center; color: #f87171;">
                <h2>⚠️ Gagal Memuat Halaman</h2>
                <p style="color: #94a3b8; margin: 1rem 0;">${err.message}</p>
                <a href="#/home" onclick="window.location.reload()" style="display: inline-block; padding: 0.75rem 1.5rem; background: #2563eb; color: #fff; text-decoration: none; border-radius: 10px; font-weight: 600;">
                    ← Kembali ke Beranda
                </a>
            </div>
        `;
    }

    destroy() {
        if (!this._isInitialized) return;
        window.removeEventListener('hashchange', this._onHashChange);
        this._mainContainer = null;
        this._isInitialized = false;
    }
}

export const appRouter = new AppRouterEngine();
export default appRouter;