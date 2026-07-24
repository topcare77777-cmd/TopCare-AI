/**
 * TopCare AI Platform V2.0.0
 * IMetricsExporter Interface for decoupled metrics delivery (Prometheus, OTLP, Console)
 * Path: assets/js/auth/events/observability/exporters/metrics.exporter.interface.js
 */

class IMetricsExporter {
    async export(metricsSnapshot) { throw new Error("Not implemented"); }
}

class ConsoleMetricsExporter extends IMetricsExporter {
    constructor(logger) {
        super();
        this.logger = logger;
    }

    async export(metricsSnapshot) {
        this.logger?.info?.("Metrics Export Snapshot:", metricsSnapshot);
    }
}