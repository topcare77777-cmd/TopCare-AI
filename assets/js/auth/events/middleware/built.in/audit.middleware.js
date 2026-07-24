/**
 * TopCare AI Platform V2.0.0
 * Audit Middleware recording transparent execution trails for compliance and security
 * Path: assets/js/auth/events/middleware/built.in/audit.middleware.js
 */

class AuditMiddleware extends IEventMiddleware {
    constructor(auditSink) {
        super();
        this.auditSink = auditSink; // e.g. AuditLogger or secure repository
    }

    async handle(dispatchContext, next) {
        const { envelope } = dispatchContext;
        const auditRecord = {
            eventId: envelope.event.id,
            eventName: envelope.event.name,
            timestamp: new Date().toISOString(),
            traceId: envelope.traceId,
            correlationId: envelope.correlationId,
            status: 'PENDING'
        };

        try {
            await next();
            auditRecord.status = 'SUCCESS';
            this.auditSink?.record?.(auditRecord);
        } catch (e) {
            auditRecord.status = 'FAILED';
            auditRecord.error = e.message;
            this.auditSink?.record?.(auditRecord);
            throw e;
        }
    }
}