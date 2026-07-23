/**
 * TopCare AI Platform V2.0.0
 * Performance Engine V2
 * Path: assets/js/core/performance.engine.js
 */
import Logger from '../core/logger.js';

const PerformanceEngine = {
    initialized: false,

    init() {
        if (this.initialized) return;

        // Image priority & lazy loading enforcement
        document.querySelectorAll('img:not([loading])').forEach(img => {
            img.setAttribute('loading', 'lazy');
            img.setAttribute('decoding', 'async');
        });

        this.initialized = true;
        Logger.info("[PerformanceEngine] Initialized successfully.");
    },

    scheduleIdleTask(task) {
        if ('requestIdleCallback' in window) {
            requestIdleCallback(task);
        } else {
            setTimeout(task, 1);
        }
    }
};

export default PerformanceEngine;