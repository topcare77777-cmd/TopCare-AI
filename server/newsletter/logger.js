/**
 * TOPCARE AI PLATFORM V2 — STRUCTURED ENTERPRISE LOGGER
 * Path: api/newsletter/logger.js
 * Architecture: Cross-Module Observability Client
 * Status: APPROVED & LOCKED (BUILD 129.7)
 */

export class Logger {
    static _format(level, context, detail, correlationId) {
        return JSON.stringify({
            timestamp: new Date().toISOString(),
            correlationId: correlationId || 'GLOBAL',
            level: level,
            context: context,
            detail: detail instanceof Error ? detail.message : detail
        });
    }

    static info(context, detail, correlationId) {
        console.log(this._format('INFO', context, detail, correlationId));
    }

    static warn(context, detail, correlationId) {
        console.warn(this._format('WARN', context, detail, correlationId));
    }

    static error(context, detail, correlationId) {
        console.error(this._format('ERROR', context, detail, correlationId));
    }
}

export default Logger;