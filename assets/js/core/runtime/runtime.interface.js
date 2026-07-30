/**
 * file: assets/js/core/runtime/runtime.interface.js
 */

export class RuntimeInterface {
    boot() { throw new Error("Not implemented"); }
    shutdown() { throw new Error("Not implemented"); }
    isBooted() { throw new Error("Not implemented"); }
    getState() { throw new Error("Not implemented"); }
}