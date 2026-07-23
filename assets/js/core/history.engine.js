/**
 * TopCare AI Platform V2.0.0
 * Enterprise History Engine
 * Path: assets/js/core/history.engine.js
 */

import Logger from './logger.js';

const HistoryEngine = {
    callback: null,

    init(callback) {
        this.callback = callback;
        window.addEventListener('popstate', (e) => {
            const path = window.location.pathname;
            Logger.info(`[HistoryEngine] Popstate triggered for path: ${path}`);
            if (this.callback) {
                this.callback(path);
            }
        });
        Logger.info("[HistoryEngine] History Engine initialized.");
    },

    push(path) {
        if (window.location.pathname !== path) {
            window.history.pushState({}, '', path);
            Logger.info(`[HistoryEngine] Pushed state: ${path}`);
        }
    },

    replace(path) {
        window.history.replaceState({}, '', path);
        Logger.info(`[HistoryEngine] Replaced state: ${path}`);
    }
};

export default HistoryEngine;