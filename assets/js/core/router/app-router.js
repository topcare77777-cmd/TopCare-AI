/**
 * TOPCARE AI PLATFORM V2 — CORE PLATFORM ROUTER ENGINE
 * Path: assets/js/core/router/app-router.js
 * Version: 136.1.0 (BUILD 136.1 — ENTERPRISE ROUTER REFACTOR)
 * Status: APPROVED & LOCKED
 * SRP: Generic platform router supporting dynamic feature registration, same-route guards, and clean listeners.
 */

import { Core } from '../index.js';

export class AppRouterEngine {
    constructor() {
        this._routes = new Map();
        this._activeComponent = null;
        this._currentRoute = null;
        this._mainContainer = null;
        this._isInitialized = false;

        // Bound event listener reference for clean teardown
        this._onHashChange = this._handleRouteTransition.bind(this);
        Object.seal(this);
    }

    init(mainContainer) {
        if (this._isInitialized) return;
        if (!mainContainer) {
            throw new Error("[AppRouter] Main container element is required for router initialization.");
        }

        this._mainContainer = mainContainer;
        window.addEventListener('hashchange', this._onHashChange);
        this._isInitialized = true;

        this._handleRouteTransition('initial');
    }

    registerRoute(path, routeDefinition) {
        if (!path || !routeDefinition || typeof routeDefinition.factory !== 'function') {
            throw new Error(`[AppRouter] Invalid route definition for path: ${path}`);
        }
        this._routes.set(path, routeDefinition);
    }

    unregisterRoute(path) {
        if (this._routes.has(path)) {
            this._routes.delete(path);
        }
    }

    hasRoute(path) {
        return this._routes.has(path);
    }

    async _handleRouteTransition(navigationType = 'hashchange') {
        const targetHash = window.location.hash || '#/marketplace';

        // Same-route Guard: Prevent redundant teardown/remount if route has not changed
        if (targetHash === this._currentRoute && this._activeComponent) {
            return;
        }

        const previousRoute = this._currentRoute;

        // 1. Teardown active component cleanly
        if (this._activeComponent && typeof this._activeComponent.destroy === 'function') {
            try {
                this._activeComponent.destroy();
            } catch (err) {
                if (Core && Core.Logger) {
                    Core.Logger.error("[AppRouter] Component teardown error:", err);
                }
            }
            this._activeComponent = null;
        }

        if (this._mainContainer) {
            this._mainContainer.innerHTML = '';
        }

        // 2. Resolve route target safely (Fallback to #/marketplace or first registered route)
        const route = this._routes.get(targetHash) || this._routes.get('#/marketplace');
        this._currentRoute = targetHash;

        if (route) {
            document.title = route.title || 'TopCare AI Platform';

            try {
                const component = route.factory();
                await component.mount(this._mainContainer);
                this._activeComponent = component;

                // Rich Event Payload for Analytics/Debugger
                window.dispatchEvent(new CustomEvent('tc:route:changed', {
                    detail: {
                        previousRoute,
                        currentRoute: targetHash,
                        title: route.title,
                        timestamp: Date.now(),
                        navigationType
                    }
                }));

            } catch (err) {
                if (Core && Core.Logger) {
                    Core.Logger.error(`[AppRouter] Failed to mount route ${targetHash}:`, err);
                }
                this._renderErrorState(err);
            }
        }
    }

    _renderErrorState(err) {
        if (!this._mainContainer) return;

        // Environment check: Show detailed message in Dev, generic message in Prod
        const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        const displayMsg = isDev ? err.message : 'Terjadi kesalahan sistem saat memuat modul.';

        this._mainContainer.innerHTML = `
            <div class="tc-router-error-box" style="padding: 3rem; text-align: center; color: #f87171;">
                <h2>⚠️ Gagal Memuat Halaman</h2>
                <p>${displayMsg}</p>
                <a href="#/marketplace" style="color: #38bdf8; text-decoration: underline;">Kembali ke Marketplace</a>
            </div>
        `;
    }

    destroy() {
        if (!this._isInitialized) return;

        window.removeEventListener('hashchange', this._onHashChange);

        if (this._activeComponent && typeof this._activeComponent.destroy === 'function') {
            this._activeComponent.destroy();
            this._activeComponent = null;
        }

        this._routes.clear();
        this._mainContainer = null;
        this._isInitialized = false;
    }
}

export const appRouter = new AppRouterEngine();
export default appRouter;
