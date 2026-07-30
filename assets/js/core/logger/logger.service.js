/**
 * file: assets/js/core/logger/logger.service.js
 */

import { LoggerBase } from './logger.base.js';
import { LoggerManager } from './logger.manager.js';

const engine = LoggerManager.initialize(new LoggerBase());

export const Logger = Object.freeze({
    debug(message, context) {
        engine.debug(message, context);
        return this;
    },
    info(message, context) {
        engine.info(message, context);
        return this;
    },
    warn(message, context) {
        engine.warn(message, context);
        return this;
    },
    error(message, context) {
        engine.error(message, context);
        return this;
    },
    setLevel(level) {
        engine.setLevel(level);
        return this;
    },
    getLevel() {
        return engine.getLevel();
    }
});