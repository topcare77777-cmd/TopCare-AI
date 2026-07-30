/**
 * file: assets/js/router/router.base.js
 */

import { Core } from '../core/index.js';
import { RouterInterface } from './router.interface.js';
import { ROUTER_EVENTS } from './router.types.js';
import { RouteGuard } from './route.guard.service.js';
import { RouterUtils } from './router.utils.js';
import { History } from './history.service.js';
import { RouteLoader } from './route.loader.service.js';

export class RouterBase extends RouterInterface {
    constructor() {
        super();
        this._routes = new Map();
        this._currentRoute = null;
        this._started = false;
        this._isInternalNavigation = false;
        this._boundHandleHashChange = this._handleHashChange.bind(this);
        Object.seal(this);
    }

    _validatePath(path) {
        if (!path || typeof path !== 'string') {
            throw new TypeError("Router path must be a valid non-empty string.");
        }
    }

    _validateHandler(handler) {
        if (typeof handler !== 'function' && typeof handler !== 'string') {
            throw new TypeError("Router handler must be a function or view identifier string.");
        }
    }

    _validateOptions(options) {
        if (options !== undefined && (options === null || typeof options !== 'object' || Array.isArray(options))) {
            throw new TypeError("Router options must be a valid object.");
        }
    }

    _normalizePath(path) {
        this._validatePath(path);
        return path.startsWith('/') ? path : `/${path}`;
    }

    _createRouteDefinition(path, handler, options = {}) {
        const normalizedPath = this._normalizePath(path);
        const rawMetadata = (options.metadata && typeof options.metadata === 'object' && !Array.isArray(options.metadata))
            ? options.metadata
            : {};

        const definition = {
            path: normalizedPath,
            handler,
            name: options.name !== undefined ? options.name : normalizedPath,
            title: options.title !== undefined ? options.title : normalizedPath,
            secure: Boolean(options.secure),
            lazy: Boolean(options.lazy),
            metadata: Core.Utils.freeze({ ...rawMetadata })
        };

        return Core.Utils.freeze(definition);
    }

    register(path, handler, options = {}) {
        this._validatePath(path);
        this._validateHandler(handler);
        this._validateOptions(options);

        const normalizedPath = this._normalizePath(path);

        if (this._routes.has(normalizedPath)) {
            Core.Logger.warn(`Router overwriting existing route definition for: ${normalizedPath}`);
        }

        const routeDefinition = this._createRouteDefinition(normalizedPath, handler, options);

        this._routes.set(normalizedPath, routeDefinition);
        Core.Logger.debug(`Router registered route: ${normalizedPath}`);
        Core.Event.emit(ROUTER_EVENTS.REGISTERED, { route: routeDefinition });
        return this;
    }

    unregister(path) {
        const normalizedPath = this._normalizePath(path);

        if (this._routes.has(normalizedPath)) {
            const routeDefinition = this._routes.get(normalizedPath);
            this._routes.delete(normalizedPath);
            Core.Logger.debug(`Router unregistered route: ${normalizedPath}`);
            Core.Event.emit(ROUTER_EVENTS.UNREGISTERED, { route: routeDefinition });
        }
        return this;
    }

    exists(path) {
        if (!path || typeof path !== 'string') {
            return false;
        }
        try {
            const cleanPath = path.split('?')[0];
            const normalizedPath = this._normalizePath(cleanPath);
            if (this._routes.has(normalizedPath)) {
                return true;
            }
            for (const regPath of this._routes.keys()) {
                if (regPath.includes(':')) {
                    const matchResult = RouterUtils.matchRoute(regPath, normalizedPath);
                    if (matchResult.matched) return true;
                }
            }
            return false;
        } catch (e) {
            return false;
        }
    }

    find(path) {
        if (!path || typeof path !== 'string') {
            return null;
        }
        try {
            const [rawPath, rawQuery] = path.split('?');
            const normalizedPath = this._normalizePath(rawPath);

            if (this._routes.has(normalizedPath)) {
                const baseRoute = this._routes.get(normalizedPath);
                return Core.Utils.clone({
                    ...baseRoute,
                    params: {},
                    query: RouterUtils.parseQuery(rawQuery)
                });
            }

            for (const [regPath, baseRoute] of this._routes.entries()) {
                if (regPath.includes(':')) {
                    const matchResult = RouterUtils.matchRoute(regPath, normalizedPath);
                    if (matchResult.matched) {
                        return Core.Utils.clone({
                            ...baseRoute,
                            params: matchResult.params,
                            query: RouterUtils.parseQuery(rawQuery)
                        });
                    }
                }
            }
        } catch (e) {
            return null;
        }
        return null;
    }

    navigate(path) {
        const normalizedPath = this._normalizePath(path);

        Core.Logger.info(`Router navigating to: ${normalizedPath}`);
        Core.Event.emit(ROUTER_EVENTS.NAVIGATE, { path: normalizedPath });

        if (typeof window !== 'undefined') {
            this._isInternalNavigation = true;
            window.location.hash = `#${normalizedPath}`;
            this._isInternalNavigation = false;
        }

        this._resolvePath(normalizedPath, 'push');
        return this;
    }

    async _resolvePath(fullPath, navigationAction = 'push') {
        const cleanPath = fullPath.startsWith('#') ? fullPath.slice(1) : fullPath;
        const route = this.find(cleanPath);

        if (!route) {
            this._currentRoute = null;
            Core.Logger.warn(`Router path not found: ${cleanPath}`);
            Core.Event.emit(ROUTER_EVENTS.NOT_FOUND, { path: cleanPath });
            return;
        }

        const guardResult = RouteGuard.check(route);
        if (!guardResult.allowed) {
            if (guardResult.redirect) {
                this.navigate(guardResult.redirect);
            }
            return;
        }

        try {
            // Load handler via RouteLoader (supports synchronous handlers & asynchronous dynamic imports with caching)
            const resolvedHandler = await RouteLoader.load(route);

            // Construct enriched active route context with resolved handler
            const activeRoute = Core.Utils.clone({
                ...route,
                handler: resolvedHandler
            });

            if (navigationAction === 'replace') {
                History.replace(cleanPath);
            } else {
                History.push(cleanPath);
            }

            this._currentRoute = activeRoute;
            Core.Logger.info(`Router resolved and loaded route successfully for: ${cleanPath}`);
            Core.Event.emit(ROUTER_EVENTS.CHANGED, { path: cleanPath, route: activeRoute });
        } catch (error) {
            Core.Logger.error(`Router failed to resolve route handler for: ${cleanPath}`);
        }
    }

    _handleHashChange() {
        if (typeof window === 'undefined') return;
        if (this._isInternalNavigation) return;

        const hash = window.location.hash.slice(1) || '/';
        this._resolvePath(hash, 'push');
    }

    current() {
        return this._currentRoute ? Core.Utils.clone(this._currentRoute) : null;
    }

    routes() {
        return Array.from(this._routes.values()).map(route => Core.Utils.clone(route));
    }

    start() {
        if (this._started) {
            return this;
        }

        if (typeof window !== 'undefined') {
            window.addEventListener('hashchange', this._boundHandleHashChange);
            this._started = true;
            Core.Logger.info("Router with Lazy Route Loader started successfully.");

            const initialHash = window.location.hash.slice(1) || '/';
            this._resolvePath(initialHash, 'replace');
        }
        return this;
    }
}