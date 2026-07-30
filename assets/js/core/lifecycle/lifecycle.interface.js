/**
 * file: assets/js/core/lifecycle/lifecycle.interface.js
 */

export class LifecycleInterface {
    registerBeforeBoot(callback) { throw new Error("Not implemented"); }
    registerAfterBoot(callback) { throw new Error("Not implemented"); }
    registerBeforeShutdown(callback) { throw new Error("Not implemented"); }
    registerAfterShutdown(callback) { throw new Error("Not implemented"); }
    executeBeforeBoot() { throw new Error("Not implemented"); }
    executeAfterBoot() { throw new Error("Not implemented"); }
    executeBeforeShutdown() { throw new Error("Not implemented"); }
    executeAfterShutdown() { throw new Error("Not implemented"); }
    clear() { throw new Error("Not implemented"); }
}