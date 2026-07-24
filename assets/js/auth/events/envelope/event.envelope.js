/**
 * TopCare AI Platform V2.0.0
 * EventEnvelope wrapping business DomainEvent alongside transport context, traceId, and metadata
 * Path: assets/js/auth/events/envelope/event.envelope.js
 */

class EventEnvelope {
    constructor(domainEvent, eventContext) {
        if (!(domainEvent instanceof DomainEvent)) {
            throw new Error("InvalidArgument: EventEnvelope requires a valid DomainEvent instance.");
        }
        if (!(eventContext instanceof EventContext)) {
            throw new Error("InvalidArgument: EventEnvelope requires a valid EventContext instance.");
        }

        this.event = domainEvent;
        this.context = eventContext;
        this.traceId = eventContext.traceId;
        this.correlationId = eventContext.correlationId;
        this.metadata = eventContext.metadata;
        this.wrappedAt = new Date().toISOString();

        if (typeof deepFreeze === 'function') {
            deepFreeze(this);
        } else {
            Object.freeze(this);
        }
    }
}