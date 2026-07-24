/**
 * TopCare AI Platform V2.0.0
 * EventDiagnostics Facade interacting exclusively with IEventTelemetry abstraction
 * Path: assets/js/auth/events/diagnostics/event.diagnostics.js
 */

class EventDiagnostics {
    constructor(telemetry) {
        if (!(telemetry instanceof IEventTelemetry)) {
            throw new Error("InvalidArgument: EventDiagnostics requires an IEventTelemetry implementation.");
        }
        this.telemetry = telemetry;
    }

    logPublished(envelope) {
        this.telemetry.publish(envelope);
    }

    logHandled(envelope, handlerName) {
        this.telemetry.handlerSucceeded(envelope, handlerName);
    }

    logHandlerFailed(envelope, error, attempt) {
        this.telemetry.handlerFailed(envelope, error, attempt);
    }

    logDeadLetter(envelope, error) {
        this.telemetry.deadLetter(envelope, error);
    }
}