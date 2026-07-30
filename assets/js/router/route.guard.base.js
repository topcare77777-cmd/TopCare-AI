/**
 * file: assets/js/router/route.guard.base.js
 */

import { Core } from '../core/index.js';
import { Auth } from '../auth/index.js';
import { RouteGuardInterface } from './route.guard.interface.js';
import { ROUTER_EVENTS } from './router.types.js';

export class RouteGuardBase extends RouteGuardInterface {
    constructor() {
        super();
        Object.seal(this);
    }

    _isAuthenticated() {
        try {
            return Auth.isAuthenticated();
        } catch (e) {
            return false;
        }
    }

    allow(route, data = {}) {
        Core.Logger.debug(`RouteGuard allowed route: ${route ? route.path : 'unknown'}`);
        Core.Event.emit(ROUTER_EVENTS.ROUTE_ALLOWED, { route, ...data });
        return {
            allowed: true,
            route,
            ...data
        };
    }

    deny(route, redirectTo = null, data = {}) {
        const defaultLogin = Core.Constants.get('routes', 'LOGIN') || '/login';
        const targetRedirect = redirectTo || defaultLogin;
        
        Core.Logger.warn(`RouteGuard denied route: ${route ? route.path : 'unknown'} -> redirecting to: ${targetRedirect}`);
        Core.Event.emit(ROUTER_EVENTS.ROUTE_DENIED, { route, redirect: targetRedirect, ...data });
        Core.Event.emit(ROUTER_EVENTS.ROUTE_REDIRECT, { path: targetRedirect });
        
        return {
            allowed: false,
            redirect: targetRedirect,
            route,
            ...data
        };
    }

    check(route) {
        const reasons = Core.Constants.getAll().auth_reasons || {
            UNAUTHENTICATED: 'unauthenticated',
            ROUTE_MISSING: 'route_missing'
        };
        const defaultLogin = Core.Constants.get('routes', 'LOGIN') || '/login';

        if (!route) {
            return this.deny(route, defaultLogin, { reason: reasons.ROUTE_MISSING });
        }

        // If route is not secure, allow immediately
        if (!route.secure) {
            return this.allow(route);
        }

        // Route is secure; evaluate via Auth Runtime SSOT
        if (this._isAuthenticated()) {
            return this.allow(route);
        } else {
            return this.deny(route, defaultLogin, { reason: reasons.UNAUTHENTICATED });
        }
    }
}