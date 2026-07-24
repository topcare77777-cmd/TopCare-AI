/**
 * TopCare AI Platform V2.0.0
 * TraceContext managing SpanId, TraceId, and distributed tracing hierarchy
 * Path: assets/js/auth/events/observability/trace.context.js
 */

class TraceContext {
    constructor(options = {}) {
        this.traceId = options.traceId || (typeof RequestContext !== 'undefined' ? RequestContext.current?.traceId : null) || ('trc-' + Math.random().toString(36).substring(2, 15));
        this.spanId = options.spanId || ('spn-' + Math.random().toString(36).substring(2, 11));
        this.parentSpanId = options.parentSpanId || null;
        this.operationName = options.operationName || 'DEFAULT_OPERATION';
        this.startTime = options.startTime || Date.now();
        this.attributes = Object.freeze(options.attributes || {});
        Object.freeze(this);
    }

    createChild(childOperationName, attributes = {}) {
        return new TraceContext({
            traceId: this.traceId,
            spanId: 'spn-' + Math.random().toString(36).substring(2, 11),
            parentSpanId: this.spanId,
            operationName: childOperationName,
            attributes: { ...this.attributes, ...attributes }
        });
    }
}