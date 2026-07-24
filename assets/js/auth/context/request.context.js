/**
 * TopCare AI Platform V2.0.0
 * RequestContext using AuthCryptoUtil.generateUUID() consistently
 * Path: assets/js/auth/context/request.context.js
 */

class RequestContext {
    constructor(initialData = {}) {
        this.correlationId = initialData.correlationId || AuthCryptoUtil.generateUUID();
        this.traceId = initialData.traceId || AuthCryptoUtil.generateUUID();
        this.userId = initialData.userId || null;
        this.sessionId = initialData.sessionId || null;
    }

    static get current() {
        if (!window.__tc_current_request_context) {
            window.__tc_current_request_context = new RequestContext();
        }
        return window.__tc_current_request_context;
    }

    static setCurrent(context) {
        window.__tc_current_request_context = context;
    }

    clone(additionalData = {}) {
        return new RequestContext({
            correlationId: this.correlationId,
            traceId: this.traceId,
            userId: additionalData.userId !== undefined ? additionalData.userId : this.userId,
            sessionId: additionalData.sessionId !== undefined ? additionalData.sessionId : this.sessionId
        });
    }
}