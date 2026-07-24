/**
 * TopCare AI Platform V2.0.0
 * Metrics Aggregator with batching, filtering, and snapshot caching for high-volume telemetry
 * Path: assets/js/auth/events/observability/aggregators/metrics.aggregator.js
 */

class MetricsAggregator {
    constructor(metricsCollector, exportIntervalMs = 5000) {
        this.collector = metricsCollector;
        this.exportIntervalMs = exportIntervalMs;
        this.cachedSnapshot = null;
        this.lastComputedAt = 0;
        this.exporters = new Set();
    }

    registerExporter(exporter) {
        if (exporter && typeof exporter.export === 'function') {
            this.exporters.add(exporter);
        }
    }

    getSnapshot(forceRefresh = false) {
        const now = Date.now();
        if (!this.cachedSnapshot || forceRefresh || (now - this.lastComputedAt > 2000)) {
            this.cachedSnapshot = this.collector.getMetricsSnapshot();
            this.lastComputedAt = now;
        }
        return this.cachedSnapshot;
    }

    async flush() {
        const snapshot = this.getSnapshot(true);
        const promises = Array.from(this.exporters).map(async exporter => {
            try {
                await exporter.export(snapshot);
            } catch (e) {}
        });
        await Promise.all(promises);
    }
}