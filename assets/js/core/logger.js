/**
 * TopCare AI Platform V2.0.0
 * Logger Utility
 * Path: assets/js/core/logger.js
 */
const Logger = {
    enabled: false, // Set to true for debugging, false for production
    info(message, ...optionalParams) {
        if (this.enabled) {
            console.log(`[INFO] ${message}`, ...optionalParams);
        }
    },
    warn(message, ...optionalParams) {
        if (this.enabled) {
            console.warn(`[WARN] ${message}`, ...optionalParams);
        }
    },
    error(message, ...optionalParams) {
        console.error(`[ERROR] ${message}`, ...optionalParams);
    }
};

export default Logger;