/**
 * file: assets/js/core/performance/performance.service.js
 */

import { PerformanceBase } from './performance.base.js';
import { PerformanceManager } from './performance.manager.js';

const engine = PerformanceManager.initialize(new PerformanceBase());

export const Performance = Object.freeze({
    schedule(task) {
        return engine.schedule(task);
    },
    defer(task) {
        return engine.defer(task);
    },
    idle(task) {
        return engine.idle(task);
    },
    frame(task) {
        return engine.frame(task);
    },
    debounce(task, delay) {
        return engine.debounce(task, delay);
    },
    throttle(task, delay) {
        return engine.throttle(task, delay);
    },
    cancel(id) {
        engine.cancel(id);
        return this;
    }
});