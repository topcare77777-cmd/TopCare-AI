/**
 * TopCare AI Platform V2.0.0
 * Console Logger Implementation
 * Path: assets/js/auth/logger/console.logger.js
 */

class ConsoleLogger extends LoggerInterface {
    info(message, meta = {}) {
        console.log(`[TopCare INFO] ${new Date().toISOString()} - ${message}`, meta);
    }

    warn(message, meta = {}) {
        console.warn(`[TopCare WARN] ${new Date().toISOString()} - ${message}`, meta);
    }

    error(message, meta = {}) {
        console.error(`[TopCare ERROR] ${new Date().toISOString()} - ${message}`, meta);
    }

    debug(message, meta = {}) {
        console.debug(`[TopCare DEBUG] ${new Date().toISOString()} - ${message}`, meta);
    }
}