/**
 * TOPCARE AI PLATFORM V2 — METRICS REPORTERS
 * Path: assets/js/services/metrics/metrics.snapshot.reporter.js
 * Status: ACTIVE (BUILD AC-027 - LOCKED GOLDEN BASELINE)
 * Role: Provides Read-Only Metric Snapshot Reports for Diagnostics
 */

import { deepFreezeDTO } from '../../core/utils/dto.js';

export const MetricsSnapshotReporter = Object.freeze({
    /**
     * Produces read-only report for dashboard consumption.
     * @param {Object} metricsRegistry
     * @returns {Object} Immutable MetricsSnapshotDTO
     */
    generateReport(metricsRegistry) {
        if (!metricsRegistry || typeof metricsRegistry.getSnapshot !== 'function') {
            throw new Error('[MetricsSnapshotReporter] Valid MetricsRegistry is required.');
        }
        return metricsRegistry.getSnapshot();
    }
});

export const MetricsHealthReporter = Object.freeze({
    /**
     * Generates a quick health status DTO from telemetry streams.
     */
    checkTelemetryHealth(metricsRegistry) {
        const snapshot = metricsRegistry.getSnapshot();
        const summary = snapshot.summary || {};

        return deepFreezeDTO({
            status: 'HEALTHY',
            totalEventsRecorded: Object.values(summary).reduce((a, b) => a + b, 0),
            summary
        });
    }
});
