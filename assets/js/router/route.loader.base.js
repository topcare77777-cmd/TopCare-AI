/**
 * file: assets/js/router/route.loader.base.js
 */

import { Core } from '../core/index.js';
import { RouteLoaderInterface } from './route.loader.interface.js';
import { ROUTER_LOADER_EVENTS } from './route.loader.types.js';

export class RouteLoaderBase extends RouteLoaderInterface {
    constructor() {
        super();
        this._cache = new Map();
        Object.seal(this);
    }

    _validateRoute(route) {
        if (!route || typeof route !== 'object') {
            throw new TypeError("RouteLoader requires a valid route object.");
        }
    }

    isCached(path) {
        if (!path || typeof path !== 'string') return false;
        return this._cache.has(path);
    }

    async load(route) {
        this._validateRoute(route);
        const { path, handler, lazy } = route;

        if (this._cache.has(path)) {
            Core.Logger.debug(`RouteLoader serving cached handler for path: ${path}`);
            return this._cache.get(path);
        }

        Core.Logger.info(`RouteLoader starting to load route: ${path}`);
        Core.Event.emit(ROUTER_LOADER_EVENTS.LOADING, { route });

        try {
            let resolvedHandler = handler;

            if (lazy && typeof handler === 'function') {
                // Execute dynamic import function or lazy resolver
                resolvedHandler = await handler();
            } else if (lazy && typeof handler === 'string') {
                // Optional string-based dynamic loader convention if required
                throw new Error("String-based dynamic import lazy loading is not supported. Use dynamic import factory functions.");
            }

            // Normalize ES Module default exports if present
            if (resolvedHandler && typeof resolvedHandler === 'object' && 'default' in resolvedHandler) {
                resolvedHandler = resolvedHandler.default;
            }

            this._cache.set(path, resolvedHandler);
            Core.Logger.info(`RouteLoader successfully loaded route: ${path}`);
            Core.Event.emit(ROUTER_LOADER_EVENTS.LOADED, { route, handler: resolvedHandler });

            return resolvedHandler;
        } catch (error) {
            Core.Logger.error(`RouteLoader failed to load route: ${path} - ${error.message}`);
            Core.Event.emit(ROUTER_LOADER_EVENTS.FAILED, { route, error });
            throw error;
        }
    }

    async preload(route) {
        try {
            await this.load(route);
        } catch (e) {
            // Suppress error for background preloading
        }
    }

    clearCache() {
        this._cache.clear();
        Core.Logger.debug("RouteLoader cache cleared.");
        return this;
    }
}