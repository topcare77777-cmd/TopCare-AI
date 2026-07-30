/**
 * file: assets/js/core/performance/performance.manager.js
 */

import { PerformanceBase } from './performance.base.js';

export class PerformanceManager {
    static initialize(engine) {
        if (!(engine instanceof PerformanceBase)) {
            throw new TypeError("PerformanceManager requires an instance of PerformanceBase.");
        }
        return engine;
    }
}