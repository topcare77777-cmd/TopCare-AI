/**
 * file: assets/js/router/route.guard.service.js
 */

import { RouteGuardBase } from './route.guard.base.js';
import { RouteGuardManager } from './route.guard.manager.js';

const engine = RouteGuardManager.initialize(new RouteGuardBase());

export const RouteGuard = Object.freeze({
    check(route) {
        return engine.check(route);
    },
    allow(route, data) {
        return engine.allow(route, data);
    },
    deny(route, redirectTo, data) {
        return engine.deny(route, redirectTo, data);
    }
});