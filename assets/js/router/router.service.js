/**
 * TOPCARE AI PLATFORM V2 — ROUTER SERVICE ENGINE (SSOT)
 * Path: assets/js/router/router.service.js
 * Status: APPROVED & STRICT LOCK GUARDED (SYNCHRONIZED WITH ROUTES_REGISTRY)
 */

import { ROUTES_REGISTRY } from '../core/router/routes.registry.js';
import { Core } from '../core/index.js';

class RouterEngine {
    constructor() {
        if (window.__TC_ROUTER_INSTANCE__) {
            return window.__TC_ROUTER_INSTANCE__;
        }

        this._routes = new Map();
        this._currentPath = '';
        this._isDispatching = false;
        this._currentPageInstance = null;

        this._initRegistry();
        this._bindHashListener();

        window.__TC_ROUTER_INSTANCE__ = this;
    }

    _initRegistry() {
        // Mendaftar seluruh rute langsung dari ROUTES_REGISTRY (SSOT)
        if (typeof ROUTES_REGISTRY !== 'undefined' && ROUTES_REGISTRY) {
            Object.keys(ROUTES_REGISTRY).forEach(key => {
                this.register(key, ROUTES_REGISTRY[key]);
            });
        }
    }

    register(path, resolver) {
        if (!path) return;
        const normalized = path.startsWith('/') ? path : `/${path}`;
        const keyWithoutSlash = path.replace(/^\//, '');

        // PROTEKSI RESOLVER: Jika rute sudah memiliki resolver berupa 'function' (dynamic import),
        // jangan izinkan objek metadata biasa menimpanya.
        const existingNormalized = this._routes.get(normalized);
        const existingKey = this._routes.get(keyWithoutSlash);

        if (typeof existingNormalized !== 'function' || typeof resolver === 'function') {
            this._routes.set(normalized, resolver);
        }

        if (typeof existingKey !== 'function' || typeof resolver === 'function') {
            this._routes.set(keyWithoutSlash, resolver);
        }
    }

    async dispatch(rawPath) {
        if (!rawPath) return false;

        let path = rawPath.replace(/^#\//, '/').replace(/^#/, '/');
        if (!path.startsWith('/')) path = '/' + path;

        // STRICT GUARD: Jika sedang proses dispatch atau rute yang sama sudah aktif, stop!
        if (this._isDispatching) return false;
        if (this._currentPath === path && document.getElementById('app')?.children.length > 0) {
            return false;
        }

        this._isDispatching = true;

        if (Core && Core.Logger) {
            Core.Logger.info(`[Router] Dispatching: '${path}'`);
        }

        const keyWithoutSlash = path.replace(/^\//, '');
        const resolver = this._routes.get(path) || this._routes.get(keyWithoutSlash);

        if (!resolver) {
            if (Core && Core.Logger) {
                Core.Logger.error(`[Router] Path '${path}' not mapped.`);
            }
            this._isDispatching = false;
            return false;
        }

        try {
            const targetContainer = document.getElementById('app') || document.body;

            // Cleanup Instance Halaman Sebelumnya
            if (this._currentPageInstance) {
                if (typeof this._currentPageInstance.destroy === 'function') {
                    try { this._currentPageInstance.destroy(); } catch (e) { }
                } else if (typeof this._currentPageInstance.unmount === 'function') {
                    try { this._currentPageInstance.unmount(); } catch (e) { }
                }
                this._currentPageInstance = null;
            }

            const module = typeof resolver === 'function' ? await resolver() : await resolver;

            const ExportedEntity = module.default ||
                module.CoachPage ||
                module.MarketplacePage ||
                module.HomePage ||
                module;

            let pageInstance = null;
            if (typeof ExportedEntity === 'function') {
                pageInstance = new ExportedEntity(targetContainer);
            } else {
                pageInstance = ExportedEntity;
            }

            this._currentPageInstance = pageInstance;

            // LIFECYCLE MOUNTING HANDLER
            if (pageInstance && typeof pageInstance.mount === 'function') {
                await pageInstance.mount(targetContainer);
            } else if (pageInstance && typeof pageInstance.render === 'function') {
                const html = await pageInstance.render();
                if (html) targetContainer.innerHTML = html;
            } else if (pageInstance && typeof pageInstance.renderPage === 'function') {
                targetContainer.innerHTML = pageInstance.renderPage();
            }

            this._currentPath = path;
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (err) {
            console.error(`[Router Error] Failed to load route ${path}:`, err);
        } finally {
            // Un-lock setelah jeda singkat untuk mencegah duplikasi event dari click & hashchange
            setTimeout(() => {
                this._isDispatching = false;
            }, 100);
        }

        return true;
    }

    _bindHashListener() {
        if (window.__TC_HASH_LISTENER_BOUND__) return;
        window.__TC_HASH_LISTENER_BOUND__ = true;

        window.addEventListener('hashchange', () => {
            const hash = window.location.hash || '#/home';
            this.dispatch(hash);
        });
    }

    start() {
        const hash = window.location.hash || '#/home';
        this.dispatch(hash);
    }

    static register(path, resolver) {
        const instance = new RouterEngine();
        instance.register(path, resolver);
    }

    static dispatch(rawPath) {
        const instance = new RouterEngine();
        return instance.dispatch(rawPath);
    }

    static start() {
        const instance = new RouterEngine();
        instance.start();
    }
}

export const routerService = new RouterEngine();
export const Router = RouterEngine;
export default RouterEngine;