/**
 * TopCare AI Platform V2.0.0
 * Tracing Middleware injecting OpenTelemetry span contexts into event execution
 * Path: assets/js/auth/events/middleware/built.in/tracing.middleware.js
 */

class TracingMiddleware extends IEventMiddleware {
    constructor(telemetryAdapter) {
        super();
        this.telemetryAdapter = telemetryAdapter;
    }

    async handle(dispatchContext, next) {
        const { envelope } = dispatchContext;
        const traceContext = new TraceContext({
            traceId: envelope.traceId,
            operationName: `EventProcess_${envelope.event.name}`
        });

        const startTime = Date.now();
        try {
            await next();
            const durationMs = Date.now() - startTime;
            if (this.telemetryAdapter && typeof this.telemetryAdapter.recordExecutionDuration === 'function') {
                this.telemetryAdapter.recordExecutionDuration(envelope, durationMs);
            }
        } catch (e) {
            const durationMs = Date.now() - startTime;
            if (this.telemetryAdapter && typeof this.telemetryAdapter.recordExecutionDuration === 'function') {
                this.telemetryAdapter.recordExecutionDuration(envelope, durationMs);
            }
            throw e;
        }
    }
}