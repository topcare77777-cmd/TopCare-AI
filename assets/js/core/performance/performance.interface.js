/**
 * file: assets/js/core/performance/performance.interface.js
 */

export class PerformanceInterface {
    schedule(task) { throw new Error("Not implemented"); }
    defer(task) { throw new Error("Not implemented"); }
    idle(task) { throw new Error("Not implemented"); }
    frame(task) { throw new Error("Not implemented"); }
    debounce(task, delay) { throw new Error("Not implemented"); }
    throttle(task, delay) { throw new Error("Not implemented"); }
    cancel(id) { throw new Error("Not implemented"); }
}