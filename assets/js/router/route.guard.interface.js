/**
 * file: assets/js/router/route.guard.interface.js
 */

export class RouteGuardInterface {
    check(route) { throw new Error("Not implemented"); }
    allow(route, data) { throw new Error("Not implemented"); }
    deny(route, redirectTo, data) { throw new Error("Not implemented"); }
}