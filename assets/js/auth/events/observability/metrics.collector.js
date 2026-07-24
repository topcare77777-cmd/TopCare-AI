/**
 * TopCare AI Platform V2.0.0
 * Metrics Collector for event counters, histograms, and operational gauges
 * Path: assets/js/auth/events/observability/metrics.collector.js
 */

class MetricsCollector {
    constructor() {
        this.counters = new Map();
        this.histograms = new Map();
    }

    incrementCounter(name, value = 1, labels = {}) {
        const key = `${name}:${JSON.stringify(labels)}`;
        const current = this.counters.get(key) || 0;
        this.counters.set(key, current + value);
    }

    recordHistogram(name, durationMs, labels = {}) {
        const key = `${name}:${JSON.stringify(labels)}`;
        if (!this.histograms.has(key)) {
            this.histograms.set(key, []);
        }
        this.histograms.get(key).push(durationMs);
    }

    getMetricsSnapshot() {
        const metrics = { counters: {}, histograms: {} };
        for (const [k, v] of this.counters.entries()) {
            metrics.counters[k] = v;
        }
        for (const [k, v] of this.histograms.entries()) {
            const values = v;
            const count = values.length;
            const sum = values.reduce((a, b) => a + b, 0);
            metrics.histograms[k] = {
                count,
                sum,
                avg: count > 0 ? sum / count : 0,
                max: count > 0 ? Math.max(...values) : 0,
                min: count > 0 ? Math.min(...values) : 0
            };
        }
        return metrics;
    }

    clear() {
        this.counters.clear();
        this.histograms.clear();
    }
}