/**
 * TopCare AI Platform V2.0.0
 * EventContext & CancellationToken with deep-frozen metadata immutability
 * Path: assets/js/auth/events/context/event.context.js
 */

class CancellationToken {
    constructor() {
        this.isCancellationRequested = false;
        this._listeners = [];
    }

    cancel() {
        if (!this.isCancellationRequested) {
            this.isCancellationRequested = true;
            this._listeners.forEach(listener => {
                try { listener(); } catch (e) {}
            });
            this._listeners = [];
        }
    }

    register(callback) {
        if (this.isCancellationRequested) {
            callback();
        } else {
            this._listeners.push(callback);
        }
    }
}

class EventContext {
    constructor(options = {}) {
        this.eventId = options.eventId || ('evt-' + Math.random().toString(36).substring(2, 11));
        this.eventName = options.eventName || 'UNKNOWN_EVENT';
        this.timestamp = options.timestamp || new Date().toISOString();
        this.correlationId = options.correlationId || (typeof RequestContext !== 'undefined' ? RequestContext.current.correlationId : null);
        this.traceId = options.traceId || (typeof RequestContext !== 'undefined' ? RequestContext.current.traceId : null);
        this.userId = options.userId || (typeof RequestContext !== 'undefined' ? RequestContext.current.userId : null);
        this.cancellationToken = options.cancellationToken || new CancellationToken();
        
        // Deep freeze metadata recursively if deepFreeze utility exists, otherwise fallback to standard freeze
        const rawMeta = options.metadata || {};
        this.metadata = (typeof deepFreeze === 'function') ? deepFreeze(JSON.parse(JSON.stringify(rawMeta))) : Object.freeze(rawMeta);
        Object.freeze(this);
    }
}