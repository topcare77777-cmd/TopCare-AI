/**
 * TOPCARE AI PLATFORM V2 — CANONICAL VIEW REGISTRY
 * Path: assets/js/view/view.registry.js
 * Status: APPROVED & LOCKED
 * SRP: Single Source of Truth for Page View Instantiation and Resolution.
 */

import { Core } from '../core/index.js';

export class ViewRegistryEngine {
    constructor() {
        this._views = new Map();
        Object.seal(this);
    }

    /**
     * Normalizes view identifiers by removing leading/trailing slashes and lowercasing.
     * @param {string} viewId 
     * @returns {string}
     */
    normalizeKey(viewId) {
        if (!viewId || typeof viewId !== 'string') return '';
        return viewId.trim().replace(/^\/+|\/+$/g, '').toLowerCase();
    }

    /**
     * Registers a view class or renderer instance with a normalized canonical key.
     * @param {string} viewId 
     * @param {Object|Function} viewInstanceOrClass 
     */
    register(viewId, viewInstanceOrClass) {
        const key = this.normalizeKey(viewId);
        if (!key) {
            Core.Logger.error('[ViewRegistry] Cannot register view with an empty or invalid key.');
            return;
        }

        if (this._views.has(key)) {
            Core.Logger.warn(`[ViewRegistry] View key '${key}' is already registered. Overwriting with new instance.`);
        }

        this._views.set(key, viewInstanceOrClass);
        Core.Logger.info(`[ViewRegistry] Successfully registered view identifier: '${key}'`);
    }

    /**
     * Resolves a view instance or class by identifier.
     * @param {string} viewId 
     * @returns {Object|Function|null}
     */
    resolve(viewId) {
        const key = this.normalizeKey(viewId);
        if (!key) return null;
        return this._views.get(key) || null;
    }

    /**
     * Checks if a view is registered under the given identifier.
     * @param {string} viewId 
     * @returns {boolean}
     */
    has(viewId) {
        const key = this.normalizeKey(viewId);
        return this._views.has(key);
    }

    /**
     * Unregisters a view identifier.
     * @param {string} viewId 
     */
    unregister(viewId) {
        const key = this.normalizeKey(viewId);
        this._views.delete(key);
    }

    /**
     * Resets all registered views.
     */
    clear() {
        this._views.clear();
        Core.Logger.info('[ViewRegistry] Cleared all registered views.');
    }
}

export const ViewRegistry = new ViewRegistryEngine();
export default ViewRegistry;