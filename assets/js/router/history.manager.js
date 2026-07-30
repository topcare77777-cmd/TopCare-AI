/**
 * file: assets/js/router/history.manager.js
 */

import { HistoryBase } from './history.base.js';

export class HistoryManager {
    static initialize(engine) {
        if (!(engine instanceof HistoryBase)) {
            throw new TypeError("HistoryManager requires an instance of HistoryBase.");
        }
        return engine;
    }
}