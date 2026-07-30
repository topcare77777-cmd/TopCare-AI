/**
 * file: assets/js/core/logger/logger.base.js
 */

import { LoggerInterface } from './logger.interface.js';
import { LOG_LEVELS, LOG_LEVEL_NAMES } from './logger.types.js';

export class LoggerBase extends LoggerInterface {
    constructor() {
        super();
        this._level = LOG_LEVELS.INFO;
        Object.seal(this);
    }

    _shouldLog(targetLevel) {
        return targetLevel >= this._level && this._level !== LOG_LEVELS.SILENT;
    }

    _formatMessage(levelName, message, context) {
        const timestamp = new Date().toISOString();
        const ctxString = context ? ` [${JSON.stringify(context)}]` : '';
        return `[TCR:${levelName}] ${timestamp} - ${message}${ctxString}`;
    }

    setLevel(level) {
        if (typeof level !== 'number' || level < LOG_LEVELS.DEBUG || level > LOG_LEVELS.SILENT) {
            throw new TypeError("Invalid log level provided.");
        }
        this._level = level;
        return this;
    }

    getLevel() {
        return this._level;
    }

    debug(message, context = null) {
        if (this._shouldLog(LOG_LEVELS.DEBUG)) {
            // eslint-disable-next-line no-console
            console.debug(this._formatMessage(LOG_LEVEL_NAMES[LOG_LEVELS.DEBUG], message, context));
        }
        return this;
    }

    info(message, context = null) {
        if (this._shouldLog(LOG_LEVELS.INFO)) {
            // eslint-disable-next-line no-console
            console.info(this._formatMessage(LOG_LEVEL_NAMES[LOG_LEVELS.INFO], message, context));
        }
        return this;
    }

    warn(message, context = null) {
        if (this._shouldLog(LOG_LEVELS.WARN)) {
            // eslint-disable-next-line no-console
            console.warn(this._formatMessage(LOG_LEVEL_NAMES[LOG_LEVELS.WARN], message, context));
        }
        return this;
    }

    error(message, context = null) {
        if (this._shouldLog(LOG_LEVELS.ERROR)) {
            // eslint-disable-next-line no-console
            console.error(this._formatMessage(LOG_LEVEL_NAMES[LOG_LEVELS.ERROR], message, context));
        }
        return this;
    }
}