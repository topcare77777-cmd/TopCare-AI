/**
 * file: assets/js/core/logger/logger.manager.js
 */

import { LoggerBase } from './logger.base.js';

export class LoggerManager {
    static initialize(engine) {
        if (!(engine instanceof LoggerBase)) {
            throw new TypeError("LoggerManager requires an instance of LoggerBase.");
        }
        return engine;
    }
}