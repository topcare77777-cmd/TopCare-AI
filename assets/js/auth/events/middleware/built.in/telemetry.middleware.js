/**
 * TopCare AI Platform V2.0.0
 * Built-in Telemetry Performance Timer Middleware
 * Path: assets/js/auth/events/middleware/built.in/telemetry.middleware.js
 */

class TelemetryMiddleware extends IEventMiddleware {
    constructor(telemetrySink) {
        super();
        this.telemetrySink = telemetrySink;
    }

    async handle(dispatchContext, next) {
        const startTime = Date.now();
        const { envelope } = dispatchContext;
        try {
            await next();
            const durationMs = Date.now() - startTime;
            this.telemetrySink?.debug?.(`Event Execution Timer: [${envelope.event.name}] completed in ${durationMs}ms`, { eventId: envelope.event.id, durationMs });
        } catch (e) {
            const durationMs = Date.now() - startTime;
            this.telemetrySink?.warn?.(`Event Execution Timer: [${envelope.event.name}] failed after ${durationMs}ms`, { eventId: envelope.event.id, durationMs, error: e.message });
            throw e;
        }
    }
}