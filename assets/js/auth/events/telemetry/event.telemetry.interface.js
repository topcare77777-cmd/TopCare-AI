/**
 * TopCare AI Platform V2.0.0
 * IEventTelemetry Contract Interface for OpenTelemetry, Metrics, Tracing, and Logging adapters
 * Path: assets/js/auth/events/telemetry/event.telemetry.interface.js
 */

class IEventTelemetry {
    publish(envelope) { throw new Error("Not implemented"); }
    handlerSucceeded(envelope, handlerName) { throw new Error("Not implemented"); }
    handlerFailed(envelope, error, attempt) { throw new Error("Not implemented"); }
    deadLetter(envelope, error) { throw new Error("Not implemented"); }
}

class ConsoleEventTelemetryAdapter extends IEventTelemetry {
    constructor(logger) {
        super();
        this.logger = logger;
    }

    publish(envelope) {
        this.logger?.debug?.(`Event Published: [${envelope.event.name}] (ID: ${envelope.event.id})`, { eventId: envelope.event.id });
    }

    handlerSucceeded(envelope, handlerName) {
        this.logger?.info?.(`Event Handled Successfully: [${envelope.event.name}] by [${handlerName || 'Anonymous'}]`, { eventId: envelope.event.id });
    }

    handlerFailed(envelope, error, attempt) {
        this.logger?.warn?.(`Event Handler Failed on Attempt ${attempt} for [${envelope.event.name}]`, { eventId: envelope.event.id, error: error?.message });
    }

    deadLetter(envelope, error) {
        this.logger?.error?.(`Event moved to Dead Letter Store: [${envelope.event.name}]`, { eventId: envelope.event.id, error: error?.message });
    }
}