/**
 * TOPCARE AI PLATFORM V2 — ROUTER SERVICE
 * Path: assets/js/router/router.service.js
 * Status: APPROVED & LOCKED
 * SRP: Central Single Page Application Router Engine maintaining hash routing & route lookup.
 */

import { Core } from '../core/index.js';
import { AuthRouteGuard } from '../auth/guards/auth-route.guard.js';

export class RouterServiceEngine {
    constructor() {
        this.routes = new Map();
        this._isStarted = false;
        this._handleHashChange = this._handleHashChange.bind(this);
        Object.seal(this);
    }

    /**
     * Registers a route path with its execution handler.
     * @param {string} path 
     * @param {Function} handler 
     */
    register(path, handler) {
        if (!path || typeof handler !== 'function') return;
        const normalizedPath = this.normalizePath(path);
        this.routes.set(normalizedPath, handler);
    }

    /**
     * Normalizes route path.
     * @param {string} path 
     * @returns {string}
     */
    normalizePath(path) {
        if (!path || typeof path !== 'string') return '/home';
        const trimmed = path.trim().replace(/^#/, '');
        if (trimmed === '' || trimmed === '/') return '/home';
        return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
    }

    /**
     * Checks if a route path is registered.
     * @param {string} path 
     * @returns {boolean}
     */
    has(path) {
        return this.routes.has(this.normalizePath(path));
    }

    /**
     * Starts listening to hash navigation events.
     */
    start() {
        if (this._isStarted) return;
        window.addEventListener('hashchange', this._handleHashChange);
        this._isStarted = true;
        Core.Logger.info('[RouterService] Started hash navigation listener.');
        this._handleHashChange(); // Handle initial route
    }

    /**
     * Programmatically navigates to a target route path.
     * @param {string} path 
     */
    navigate(path) {
        const normalized = this.normalizePath(path);
        const targetHash = `#${normalized}`;

        if (window.location.hash !== targetHash) {
            window.location.hash = targetHash;
        } else {
            this.dispatch(normalized);
        }
    }

    /**
     * Dispatches navigation for a normalized path.
     * @param {string} path 
     */
    async dispatch(path) {
        const normalizedPath = this.normalizePath(path);

        Core.Logger.info(`[RouterService] Dispatching route: '${normalizedPath}'`);

        // Execute Security Route Guards
        if (AuthRouteGuard && typeof AuthRouteGuard.check === 'function') {
            const guardDecision = AuthRouteGuard.check(normalizedPath);
            if (!guardDecision.allowed) {
                Core.Logger.warn(`[RouterService] Guard blocked navigation to '${normalizedPath}'.`);
                if (guardDecision.redirect) {
                    this.navigate(guardDecision.redirect);
                }
                return;
            }
        }

        const handler = this.routes.get(normalizedPath);

        if (handler) {
            try {
                await handler();
            } catch (err) {
                Core.Logger.error(`[RouterService] Error executing handler for '${normalizedPath}': ${err.message}`);
            }
        } else {
            Core.Logger.warn(`[RouterService] Unregistered route '${normalizedPath}'. Falling back to '/home'.`);
            this.navigate('/home');
        }
    }

    /**
     * Hash change event callback.
     * @private
     */
    _handleHashChange() {
        const rawHash = window.location.hash.replace('#', '');
        this.dispatch(rawHash);
    }
}

export const Router = new RouterServiceEngine();
export default Router;