/**
 * TopCare AI Platform V2.0.0
 * Telemetry Engine
 * Path: assets/js/core/telemetry.engine.js
 */
import Logger from '../core/logger.js';

const TelemetryEngine = {
    metrics: [],

    record(category, data) {
        const metric = { category, data, timestamp: Date.now() };
        this.metrics.push(metric);
        Logger.info(`[Telemetry] ${category}:`, data);
    },

    report() {
        return this.metrics;
    }
};

export default TelemetryEngine;