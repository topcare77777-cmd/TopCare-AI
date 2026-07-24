/**
 * TopCare AI Platform V2.0.0
 * Canonical W3C Trace Context & Baggage Grammar Parser
 * Path: assets/js/auth/events/observability/w3c.trace.context.js
 */

class W3CTraceContext {
    constructor(options = {}) {
        const traceIdRegex = /^[0-9a-f]{32}$/;
        const spanIdRegex = /^[0-9a-f]{16}$/;
        const flagsRegex = /^[0-9a-f]{2}$/;

        const version = options.version || '00';
        const traceId = options.traceId || '4bf92f3577b34da6a3ce929d0e0e4736';
        const spanId = options.spanId || '00f067aa0ba902b7';
        const traceFlags = options.traceFlags || '01';

        if (version === 'ff') throw new ValidationException("Invalid W3C version 'ff'.");
        if (!traceIdRegex.test(traceId) || traceId === '00000000000000000000000000000000') {
            throw new ValidationException(`Invalid W3C trace-id: '${traceId}'.`);
        }
        if (!spanIdRegex.test(spanId) || spanId === '0000000000000000') {
            throw new ValidationException(`Invalid W3C span-id: '${spanId}'.`);
        }
        if (!flagsRegex.test(traceFlags)) {
            throw new ValidationException(`Invalid W3C trace-flags: '${traceFlags}'.`);
        }

        const tracestate = options.tracestate || '';
        if (tracestate.length > 512) {
            throw new ValidationException("tracestate exceeds 512 bytes limit.");
        }

        let baggageEntries = options.baggageEntries || [];
        if (baggageEntries.length > 180) {
            throw new ValidationException("Baggage exceeds 180 entries limit.");
        }
        const canonicalBaggage = baggageEntries.map(e => `${e.key}=${e.value}`).join(',');
        if (canonicalBaggage.length > 8192) {
            throw new ValidationException("Baggage exceeds 8192 total bytes limit.");
        }

        this.version = version;
        this.traceId = traceId;
        this.spanId = spanId;
        this.parentSpanId = options.parentSpanId || null;
        this.traceFlags = traceFlags;
        this.tracestate = tracestate;
        this.baggageEntries = Object.freeze([...baggageEntries]);
        
        if (typeof deepFreeze === 'function') deepFreeze(this);
        else Object.freeze(this);
    }

    toTraceParentString() {
        return `${this.version}-${this.traceId}-${this.spanId}-${this.traceFlags}`;
    }

    static fromTraceParentString(traceparent, tracestate = '', baggageEntries = []) {
        if (typeof traceparent !== 'string') throw new ValidationException("traceparent must be string.");
        const parts = traceparent.split('-');
        if (parts.length < 4) throw new ValidationException("Malformed traceparent format.");
        return new W3CTraceContext({
            version: parts[0],
            traceId: parts[1],
            spanId: parts[2],
            traceFlags: parts[3],
            tracestate,
            baggageEntries
        });
    }
}