/**
 * file: assets/js/router/route.guard.manager.js
 */

import { RouteGuardBase } from './route.guard.base.js';

export class RouteGuardManager {
    static initialize(engine) {
        if (!(engine instanceof RouteGuardBase)) {
            throw new TypeError("RouteGuardManager requires an instance of RouteGuardBase.");
        }
        return engine;
    }
}