/**
 * TopCare AI Platform V2.0.0
 * JSON Log Formatter Implementation
 * Path: assets/js/auth/logger/formatters/json.log.formatter.js
 */

class JsonLogFormatter extends LogFormatterInterface {
    format(logEntry) {
        return JSON.stringify(logEntry);
    }
}