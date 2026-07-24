/**
 * TopCare AI Platform V2.0.0
 * Immutable Audit Logger utilizing deepFreeze() on audit records
 * Path: assets/js/auth/audit/audit.logger.js
 */

class AuditLogger {
    constructor(eventBus, structuredLogger) {
        this.eventBus = eventBus;
        this.logger = structuredLogger;
        this.sequenceCounter = 0;
        this._initListeners();
    }

    _initListeners() {
        const auditMap = {
            [AUTH_EVENTS.LOGIN_SUCCESS]: { action: "LOGIN", result: "SUCCESS", severity: "INFO" },
            [AUTH_EVENTS.LOGIN_FAILED]: { action: "LOGIN", result: "FAILURE", severity: "WARN" },
            [AUTH_EVENTS.REGISTER_SUCCESS]: { action: "REGISTER", result: "SUCCESS", severity: "INFO" },
            [AUTH_EVENTS.REGISTER_FAILED]: { action: "REGISTER", result: "FAILURE", severity: "WARN" },
            [AUTH_EVENTS.LOGOUT]: { action: "LOGOUT", result: "SUCCESS", severity: "INFO" },
            [AUTH_EVENTS.SESSION_EXPIRED]: { action: "SESSION_EXPIRE", result: "TIMEOUT", severity: "WARN" },
            [AUTH_EVENTS.PASSWORD_RESET]: { action: "PASSWORD_RESET", result: "SUCCESS", severity: "INFO" },
            [AUTH_EVENTS.TOKEN_REFRESH]: { action: "TOKEN_REFRESH", result: "SUCCESS", severity: "DEBUG" }
        };

        Object.keys(auditMap).forEach(eventName => {
            const auditInfo = auditMap[eventName];
            this.eventBus.on(eventName, (detail) => {
                this.sequenceCounter++;
                const auditRecord = deepFreeze({
                    id: AuthCryptoUtil.generateUUID(),
                    sequence: this.sequenceCounter,
                    timestamp: new Date().toISOString(),
                    correlationId: detail?.correlationId || RequestContext.current.correlationId,
                    traceId: detail?.traceId || RequestContext.current.traceId,
                    actor: detail?.user?.id || detail?.email || "anonymous",
                    action: auditInfo.action,
                    result: auditInfo.result,
                    category: "AUTHENTICATION",
                    severity: auditInfo.severity,
                    target: "AUTH_SYSTEM",
                    metadata: detail || {}
                });
                this.logger.info(`AUDIT: [${auditInfo.action}] - ${auditInfo.result}`, auditRecord);
            });
        });
    }
}