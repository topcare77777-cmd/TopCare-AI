/**
 * file: assets/js/router/router.interface.js
 */

export class RouterInterface {
    register(path, handler, options) { throw new Error("Not implemented"); }
    unregister(path) { throw new Error("Not implemented"); }
    exists(path) { throw new Error("Not implemented"); }
    find(path) { throw new Error("Not implemented"); }
    navigate(path) { throw new Error("Not implemented"); }
    current() { throw new Error("Not implemented"); }
    routes() { throw new Error("Not implemented"); }
    start() { throw new Error("Not implemented"); }
}