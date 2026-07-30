/**
 * file: assets/js/router/route.loader.interface.js
 */

export class RouteLoaderInterface {
    load(route) { throw new Error("Not implemented"); }
    preload(route) { throw new Error("Not implemented"); }
    clearCache() { throw new Error("Not implemented"); }
    isCached(path) { throw new Error("Not implemented"); }
}