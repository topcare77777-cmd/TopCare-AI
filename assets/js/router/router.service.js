/**
 * TOPCARE AI PLATFORM V2 — ROUTER SERVICE
 * Path: assets/js/router/router.service.js
 * Version: 131.1.0 (BUILD 131 — ORCHESTRATION & SEQUENCE VALIDATION)
 * Status: PENDING LOCK
 */

import { AuthRouteGuard } from '../auth/guards/auth-route.guard.js';
import { FeatureLoaderRegistry } from '../features/feature.loader.registry.js';
import { ViewMount } from '../view/view.mount.service.js';
import { Core } from '../core/index.js';

class RouterEngine {
    constructor() {
        this._routes = new Map();
        this._currentPath = null;
        this._navigationSequence = 0; // Monotonic counter for deterministic race safety
        Object.seal(this);
    }

    register(path, metadata) {
        this._routes.set(this.normalizePath(path), metadata);
    }

    normalizePath(path) {
        if (!path) return '/';
        const clean = path.split('?')[0].replace(/\/+$/, '');
        return clean === '' ? '/' : clean;
    }

    async start() {
        window.addEventListener('hashchange', () => this._handleHashChange());
        await this._handleHashChange();
    }

    navigate(path) {
        window.location.hash = path;
    }

    async _handleHashChange() {
        const rawHash = window.location.hash.slice(1) || '/';
        const path = this.normalizePath(rawHash);

        if (path === this._currentPath) return;
        this._currentPath = path;

        const sequence = ++this._navigationSequence;
        await this.dispatch(path, sequence);
    }

    async dispatch(path, sequence) {
        Core.Logger.info(`[Router] Dispatching: '${path}'`);

        // ROOT FALLBACK
        if (path === '/' && this._routes.has('/home')) {
            this.navigate('/home');
            return;
        }

        const routeMeta = this._routes.get(path);

        if (!routeMeta) {
            Core.Logger.error(`[Router] Path '${path}' not mapped.`);
            return;
        }

        // AUTH GUARD CHECK (Contract compliance: expects Object return)
        if (routeMeta.isProtected) {
            const decision = AuthRouteGuard.check(path);
            if (!decision.allowed) {
                Core.Logger.warn(`[Router] AuthGuard blocked: ${decision.reason || 'UNAUTHORIZED'}`);
                if (decision.redirect) {
                    this.navigate(decision.redirect);
                }
                return;
            }
        }

        // LAZY FEATURE LOAD via Canonical Pipeline
        try {
            await FeatureLoaderRegistry.load(routeMeta.featureId);
        } catch (error) {
            Core.Logger.error(`[Router] Lazy load failed for '${routeMeta.featureId}': ${error.message}`);
            return;
        }

        // SEQUENCE VALIDATION (Race Condition Safety)
        if (sequence !== this._navigationSequence) {
            Core.Logger.warn(`[Router] Stale navigation aborted for '${path}'`);
            return;
        }

        // VIEW MOUNT (Lifecycle compatibility check passed)
        await ViewMount.mount(routeMeta.featureId);
    }
}

// Ensure correct export name based on actual repository imports
export const Router = new RouterEngine();
export default Router;