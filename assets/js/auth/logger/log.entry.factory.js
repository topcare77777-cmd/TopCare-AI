/**
 * TopCare AI Platform V2.0.0
 * LogEntryFactory responsible strictly for constructing log entry objects (SRP)
 * Path: assets/js/auth/logger/log.entry.factory.js
 */

class LogEntryFactory {
    static create(levelName, message, meta = {}, environment = "production") {
        const ctx = RequestContext.current;
        return {
            timestamp: new Date().toISOString(),
            level: levelName,
            environment,
            correlationId: meta.correlationId || ctx.correlationId,
            traceId: meta.traceId || ctx.traceId,
            sessionId: meta.sessionId || ctx.sessionId,
            userId: meta.userId || ctx.userId,
            message,
            metadata: meta
        };
    }
}