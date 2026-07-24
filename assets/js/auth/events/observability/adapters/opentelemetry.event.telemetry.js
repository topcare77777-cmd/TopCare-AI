/**
 * TopCare AI Platform V2.0.0
 * OpenTelemetry compatible Event Telemetry Adapter implementing IEventTelemetry contract
 * Path: assets/js/auth/events/observability/adapters/opentelemetry.event.telemetry.js
 */

class OpenTelemetryEventTelemetryAdapter extends IEventTelemetry {
    constructor(metricsCollector = new MetricsCollector(), exporterEndpoint = null) {
        super();
        this.metrics = metricsCollector;
        this.exporterEndpoint = exporterEndpoint;
    }

    publish(envelope) {
        this.metrics.incrementCounter('events_published_total', 1, { eventName: envelope.event.name });
    }

    handlerSucceeded(envelope, handlerName) {
        this.metrics.incrementCounter('events_handled_success_total', 1, { eventName: envelope.event.name, handler: handlerName });
    }

    handlerFailed(envelope, error, attempt) {
        this.metrics.incrementCounter('events_handled_failed_total', 1, { eventName: envelope.event.name, error: error?.name || 'Error' });
    }

    deadLetter(envelope, error) {
        this.metrics.incrementCounter('events_dead_letter_total', 1, { eventName: envelope.event.name });
    }

    recordExecutionDuration(envelope, durationMs) {
        this.metrics.recordHistogram('event_execution_duration_ms', durationMs, { eventName: envelope.event.name });
    }
}