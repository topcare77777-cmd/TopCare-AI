/**
 * TopCare AI Platform V2.0.0
 * TransportSendResult DTO with complete TraceContext tree propagation and Deep Freeze
 * Path: assets/js/auth/events/transport/dto/transport.send.result.dto.js
 */

class TransportSendResult {
    constructor(options = {}) {
        let generatedId;
        if (typeof AuthCryptoUtil !== 'undefined' && typeof AuthCryptoUtil.generateUUID === 'function') {
            generatedId = 'msg-' + AuthCryptoUtil.generateUUID();
        } else if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
            generatedId = 'msg-' + crypto.randomUUID();
        } else {
            throw new Error("Cryptographically secure random number generator is required for TransportSendResult messageId.");
        }

        const envelope = options.envelope || null;
        const traceCtx = envelope?.context || null;

        this.messageId = options.messageId || generatedId;
        this.traceId = options.traceId || traceCtx?.traceId || null;
        this.spanId = options.spanId || traceCtx?.spanId || null;
        this.parentSpanId = options.parentSpanId || traceCtx?.parentSpanId || null;
        this.baggage = Object.freeze(options.baggage || {});
        this.ackStatus = options.ackStatus || TransportAckStatus.ACK;
        this.timestamp = options.timestamp || new Date().toISOString();
        this.transportName = options.transportName || 'DistributedTransport';
        this.broker = options.broker || 'UNKNOWN_BROKER';
        this.brokerVersion = options.brokerVersion || '1.0.0';
        this.platformVersion = typeof PlatformVersion !== 'undefined' ? PlatformVersion.version : '2.0.0';
        this.clusterId = options.clusterId || 'cluster-default';
        this.latencyMs = options.latencyMs || 0;
        this.partition = options.partition !== undefined ? options.partition : 0;
        this.offset = options.offset !== undefined ? options.offset : null;
        this.metadata = Object.freeze(options.metadata || {});

        if (typeof deepFreeze === 'function') {
            deepFreeze(this);
        } else {
            Object.freeze(this);
        }
    }
}