/**
 * TopCare AI Platform V2.0.0
 * Error Reporter
 * Path: assets/js/core/error.reporter.js
 */
import Logger from '../core/logger.js';

const ErrorReporter = {
    errors: [],

    capture(error, moduleName = 'Global') {
        const report = {
            message: error.message || error,
            stack: error.stack || '',
            moduleName,
            timestamp: Date.now()
        };
        this.errors.push(report);
        Logger.error(`[ErrorReporter] Captured error in ${moduleName}:`, report);
    },

    exportJSON() {
        return JSON.stringify(this.errors, null, 2);
    }
};

export default ErrorReporter;