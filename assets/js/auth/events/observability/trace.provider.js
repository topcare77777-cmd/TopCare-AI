/**
 * TopCare AI Platform V2.0.0
 * Enterprise OpenTelemetry-style Span, Tracer, and TraceProvider with full SpanKind and Baggage lifecycle
 * Path: assets/js/auth/events/observability/trace.provider.js
 */

const SpanKind = Object.freeze({
    INTERNAL: 'INTERNAL',
    SERVER: 'SERVER',
    CLIENT: 'CLIENT',
    PRODUCER: 'PRODUCER',
    CONSUMER: 'CONSUMER'
});

class Span {
    constructor(operationName, traceContext, kind = SpanKind.INTERNAL) {
        this.operationName = operationName;
        this.context = traceContext;
        this.kind = kind;
        this.startTime = Date.now();
        this.endTime = null;
        this.status = { code: 'UNSET', message: '' };
        this.attributes = {};
        this.events = [];
        this.baggage = new Map();
        this.resource = { serviceName: 'topcare-ai-platform', version: '2.0.0' };
    }

    setAttribute(key, value) {
        this.attributes[key] = value;
        return this;
    }

    setBaggage(key, value) {
        this.baggage.set(key, value);
        return this;
    }

    getBaggage(key) {
        return this.baggage.get(key);
    }

    addEvent(name, attributes = {}) {
        this.events.push({ name, timestamp: Date.now(), attributes });
        return this;
    }

    setStatus(code, message = '') {
        this.status = { code, message };
        return this;
    }

    recordException(error) {
        this.status = { code: 'ERROR', message: error?.message || String(error) };
        this.attributes['error.message'] = error?.message;
        this.attributes['error.stack'] = error?.stack;
        this.events.push({ name: 'exception', timestamp: Date.now(), attributes: { message: error?.message } });
        return this;
    }

    end() {
        if (!this.endTime) {
            this.endTime = Date.now();
        }
        return this.endTime - this.startTime;
    }
}

class Tracer {
    constructor(tracerName) {
        this.tracerName = tracerName;
    }

    startSpan(operationName, parentContext = null, kind = SpanKind.INTERNAL) {
        let traceContext;
        if (parentContext && typeof parentContext.createChild === 'function') {
            traceContext = parentContext.createChild(operationName);
        } else {
            const traceId = TraceIdGenerator.generateTraceId();
            const spanId = TraceIdGenerator.generateSpanId();
            traceContext = new TraceContext({ traceId, spanId, operationName });
        }
        return new Span(operationName, traceContext, kind);
    }
}

class TraceProvider {
    static getTracer(name = 'topcare-default-tracer') {
        return new Tracer(name);
    }
}