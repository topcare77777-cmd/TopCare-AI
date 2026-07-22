/**
 * TopCare AI Platform V2.0.0
 * Module Health Monitor
 * Path: assets/js/core/module.health.js
 */
import Logger from './logger.js';

const ModuleHealth = {
    metrics: new Map(),

    record(moduleName, phase, duration) {
        if (!this.metrics.has(moduleName)) {
            this.metrics.set(moduleName, {});
        }
        this.metrics.get(moduleName)[phase] = duration;
        Logger.info(`[ModuleHealth] ${moduleName} - ${phase}: ${duration}ms`);
    },

    report() {
        console.group("[ModuleHealth] Enterprise Health Report");
        for (const [mod, data] of this.metrics.entries()) {
            console.log(`Module: ${mod}`, data);
        }
        console.groupEnd();
    }
};

export default ModuleHealth;