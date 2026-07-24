/**
 * TopCare AI Platform V2.0.0
 * Outbox-Ready TransportSendContext DTO supporting deadlines, cancellation, and retry contexts
 * Path: assets/js/auth/events/transport/dto/transport.send.context.js
 */

class TransportSendContext {
    constructor(destinationChannel, eventEnvelope, options = {}) {
        this.destinationChannel = destinationChannel;
        this.envelope = eventEnvelope;
        this.timeoutMs = options.timeoutMs || 5000;
        this.deadline = options.deadline || (Date.now() + this.timeoutMs);
        this.correlationId = options.correlationId || eventEnvelope?.context?.correlationId || null;
        this.cancellationToken = options.cancellationToken || eventEnvelope?.context?.cancellationToken || null;
        this.retryContext = Object.freeze(options.retryContext || { attempt: 1, maxAttempts: 3 });
        this.headers = Object.freeze(options.headers || {});
        this.routingKey = options.routingKey || null;
        this.priority = options.priority || 0;
        this.deliveryMode = options.deliveryMode || 'persistent';
        this.traceContext = eventEnvelope?.context || null;
        this.metadata = Object.freeze(options.metadata || {});
        
        if (typeof deepFreeze === 'function') {
            deepFreeze(this);
        } else {
            Object.freeze(this);
        }
    }
}