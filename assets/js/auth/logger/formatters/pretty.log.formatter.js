/**
 * TopCare AI Platform V2.0.0
 * Pretty Log Formatter Implementation for development
 * Path: assets/js/auth/logger/formatters/pretty.log.formatter.js
 */

class PrettyLogFormatter extends LogFormatterInterface {
    format(logEntry) {
        return `[${logEntry.timestamp}] [${logEntry.level}] (${logEntry.correlationId}): ${logEntry.message} ${Object.keys(logEntry.metadata).length ? JSON.stringify(logEntry.metadata) : ''}`;
    }
}