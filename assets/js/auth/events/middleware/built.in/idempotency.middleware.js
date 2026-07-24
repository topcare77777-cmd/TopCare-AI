/**
 * TopCare AI Platform V2.0.0
 * Idempotency Middleware preventing duplicate event processing based on unique event IDs
 * Path: assets/js/auth/events/middleware/built.in/idempotency.middleware.js
 */

class IdempotencyMiddleware extends IEventMiddleware {
    constructor(store = new Map()) {
        super();
        this.processedEvents = store; // Can be swapped with Redis/Cache store
    }

    async handle(dispatchContext, next) {
        const { envelope } = dispatchContext;
        const eventId = envelope.event.id;

        if (this.processedEvents.has(eventId)) {
            // Idempotent hit: skip processing silently or log, but do not re-execute handler
            return;
        }

        await next();
        this.processedEvents.set(eventId, Date.now());
    }
}